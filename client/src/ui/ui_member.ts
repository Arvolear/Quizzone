import * as ui from '../../node_modules/@dcl/ui-utils/index'
import * as EthConnect from '../../node_modules/eth-connect/esm'
import { abi } from '../../../ethereum/contracts/abi'
import { getProvider } from '@decentraland/web3-provider'
import { UI } from "./ui"
import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { CustomPromptText } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index"
import { DappClientSocket } from '../app/dapp_client_socket'
import { delay } from '../../node_modules/@dcl/l2-utils/utils/index'

export class UIMember
{
    private static CONTRACT = "0xa4A8CE76b804d1e378bC86B55cDFd94c1645Db7b"
    private static mainBalance: float
    private static price: float

    private static member: ui.CustomPrompt

    private static uiCallback: UI

    constructor(ui: UI)
    {
        UIMember.uiCallback = ui

        this.configAutocomplete()
    }

    private configAutocomplete(): void
    {
        UIMember.member = new ui.CustomPrompt(PromptStyles.LIGHT, 570, 450)
        UIMember.member.background.isPointerBlocker = true

        UIMember.member.addText('Quizzone membership', 0, 205, Color4.Black(), 30)

        UIMember.member.addText('Quizzone members have 50% off the boosters price', 0, 155, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIMember.member.addText('You will receive an ERC721 token named \"QZONE\"', 0, 105, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIMember.member.addText('that denotes a membership', 0, 75, new Color4(0.24, 0.22, 0.25, 1.0), 20)

        UIMember.member.addText('Your balance:  ...  ETH', 0, 20, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIMember.member.addText('Membership price:', -67, -35, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIMember.member.addText(UI.properties.getComponent(UIPropertiesComponent).membershipPrice.toString(), 87, -35, new Color4(1.0, 0.15, 0.3, 1.0), 25)
        UIMember.member.addText('ETH', 151, -35, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIMember.member.addText('Become a Quizzone member?', 0, -95, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIMember.member.addButton(
            'Yeah',
            -100,
            -175,
            () =>
            {
                UIMember.checkBuyMembership()
            },
            ButtonStyles.E
        )

        UIMember.member.addButton(
            'Nope',
            100,
            -175,
            () =>
            {
                UIMember.uiCallback.hideMember()
            },
            ButtonStyles.F
        )

        UIMember.member.close()
    }

    public static checkMembership(): void
    {
        const membershipPromise = executeTask(async () =>
        {
            const provider = await getProvider()
            const requestManager = new EthConnect.RequestManager(provider)
            const factory = new EthConnect.ContractFactory(requestManager, abi)
            const contract = (await factory.at(UIMember.CONTRACT)) as any

            const member = await contract.isMember(DappClientSocket.playerWallet)

            UI.properties.getComponent(UIPropertiesComponent).member = member
        })

        membershipPromise.then()
    }

    private static buyMembership(): void
    {
        const buyMembershipPromise = executeTask(async () =>
        {
            const provider = await getProvider()
            const requestManager = new EthConnect.RequestManager(provider)
            const factory = new EthConnect.ContractFactory(requestManager, abi)
            const contract = (await factory.at(UIMember.CONTRACT)) as any
            const price = await contract.getPrice()

            try
            {
                let res = await contract.buy(DappClientSocket.playerWallet,
                    {
                        from: DappClientSocket.playerWallet,
                        value: price
                    })

                let receipt = null

                while (receipt == null)
                {
                    await delay(2000)
                    receipt = await requestManager.eth_getTransactionReceipt(res.toString())
                }

                UI.properties.getComponent(UIPropertiesComponent).member = true
                UIMember.uiCallback.showTick(8)
            }
            catch (exception)
            {
                log(exception.toString())

                UIMember.uiCallback.hideCheckMetamask()
                UIMember.uiCallback.hideHourglass()
            }
        })

        buyMembershipPromise.then()
    }

    private static checkBuyMembership(): void
    {
        if (UIMember.mainBalance < UIMember.price)
        {
            UIMember.uiCallback.showNotEnoughFundsError()
        }
        else
        {
            UIMember.buyMembership()
            UIMember.uiCallback.showCheckMetamask()
        }
    }

    public reopen(): void
    {
        const balancePromise = executeTask(async () =>
        {
            const provider = await getProvider()
            const requestManager = new EthConnect.RequestManager(provider)
            const factory = new EthConnect.ContractFactory(requestManager, abi)
            const contract = (await factory.at(UIMember.CONTRACT)) as any
            const blockNum = await requestManager.eth_blockNumber()
            const playerBalance = await requestManager.eth_getBalance(DappClientSocket.playerWallet, blockNum)
            const price = await contract.getPrice()

            let valueBalanceText = UIMember.member.elements[4] as CustomPromptText

            let playerBalanceStr = EthConnect.fromWei(playerBalance.toNumber(), "ether").toString()
            let dotIndex = playerBalanceStr.indexOf(".")

            UIMember.mainBalance = parseFloat(playerBalanceStr);
            valueBalanceText.text.value = "Your balance:  " + playerBalanceStr.substr(0, dotIndex > 0 ? dotIndex + 5 : playerBalanceStr.length) + "  ETH"

            let valuePriceText = UIMember.member.elements[6] as CustomPromptText

            let priceStr = EthConnect.fromWei(price.toNumber(), "ether").toString()
            dotIndex = playerBalanceStr.indexOf(".")

            UIMember.price = parseFloat(priceStr)
            valuePriceText.text.value = priceStr.substr(0, dotIndex > 0 ? dotIndex + 5 : priceStr.length)
        })

        balancePromise.then()

        UIMember.member.reopen()
    }

    public close(): void
    {
        UIMember.member.close()
    }
}