import * as ui from '../../node_modules/@dcl/ui-utils/index'
import * as EthConnect from '../../node_modules/eth-connect/esm'
import { abi as abiBuy } from '../../../ethereum/contracts/abi_opensea_buy'
import { abi as abiToken } from '../../../ethereum/contracts/abi_opensea_token'
import { getProvider } from '@decentraland/web3-provider'
import { UICallback } from "../app/ui_callback"
import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { CustomPromptText } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index"
import { DappClientSocket } from '../app/dapp_client_socket'
import { delay } from '../../node_modules/@dcl/l2-utils/utils/index'
import { getUserData } from '@decentraland/Identity'

export class UIMember
{
    private static CONTRACT_BUY = "0xb6480a1AEaDa32e42CB9eeDF904F03d82a1A0d92" // opensea
    private static CONTRACT_TOKEN = "0xd997fe65D5f4259840A220E39b1E9A33b645459b" // opensea
    private static TOKEN_ID = 42 // opensea
    
    private static mainBalance: float
    private static price: float

    private static member: ui.CustomPrompt

    private static uiCallback: UICallback

    constructor(ui: UICallback)
    {
        UIMember.uiCallback = ui

        this.configurePlayerData()
        this.configAutocomplete()
    }

    private configurePlayerData(): void
    {
        const playerDataPromise = executeTask(async () =>
        {
            let data = await getUserData()
            DappClientSocket.playerWallet = data.publicKey;
        })

        playerDataPromise.then(() => 
        {
            UIMember.checkMembership()
        })
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
        UIMember.member.addText(UICallback.properties.getComponent(UIPropertiesComponent).membershipPrice.toString(), 87, -35, new Color4(1.0, 0.15, 0.3, 1.0), 25)
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
            const factory = new EthConnect.ContractFactory(requestManager, abiToken)
            const contract = (await factory.at(UIMember.CONTRACT_TOKEN)) as any
            const amount = await contract.balanceOf(DappClientSocket.playerWallet, UIMember.TOKEN_ID) as number
            
            if (amount > 0)
            {
                UICallback.properties.getComponent(UIPropertiesComponent).member = true
            }
            else
            {
                UICallback.properties.getComponent(UIPropertiesComponent).member = false
            }
        })

        membershipPromise.then()
    }

    private static buyMembership(): void
    {
        const buyMembershipPromise = executeTask(async () =>
        {
            const provider = await getProvider()
            const requestManager = new EthConnect.RequestManager(provider)
            const factory = new EthConnect.ContractFactory(requestManager, abiBuy)            
            const contractBuy = (await factory.at(UIMember.CONTRACT_BUY)) as any
            const prices = await contractBuy.getPrices([UIMember.TOKEN_ID]);
            const price = prices[0];

            try
            {            
                let res = await contractBuy.buyNFTForETH(UIMember.TOKEN_ID, 1, [],
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

                await delay(5000)

                UICallback.properties.getComponent(UIPropertiesComponent).member = true
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
            UIMember.uiCallback.showUniversalError("Not enough funds")
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
            const factory = new EthConnect.ContractFactory(requestManager, abiBuy)
            const contractBuy = (await factory.at(UIMember.CONTRACT_BUY)) as any
            const blockNum = await requestManager.eth_blockNumber()
            const playerBalance = await requestManager.eth_getBalance(DappClientSocket.playerWallet, blockNum)
            const prices = await contractBuy.getPrices([UIMember.TOKEN_ID]);
            const price = prices[0];

            let valueBalanceText = UIMember.member.elements[4] as CustomPromptText

            let playerBalanceStr = EthConnect.fromWei(playerBalance.toNumber(), "ether").toString()
            let dotIndex = playerBalanceStr.indexOf(".")

            UIMember.mainBalance = parseFloat(playerBalanceStr);
            valueBalanceText.text.value = "Your balance:  " + playerBalanceStr.substr(0, dotIndex > 0 ? dotIndex + 5 : playerBalanceStr.length) + "  ETH"

            let valuePriceText = UIMember.member.elements[6] as CustomPromptText

            let priceStr = EthConnect.fromWei(price.toNumber(), "ether").toString()
            dotIndex = playerBalanceStr.indexOf(".")

            UIMember.price = parseFloat(priceStr)
            valuePriceText.text.value = priceStr.substr(0, dotIndex > 0 ? dotIndex + 4 : Math.max(priceStr.length, 4))
        })

        balancePromise.then()

        UIMember.member.reopen()
    }

    public close(): void
    {
        UIMember.member.close()
    }
}