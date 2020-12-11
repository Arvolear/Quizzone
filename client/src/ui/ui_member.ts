import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UICallback } from "../callbacks/ui_callback"
import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { CustomPromptText } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index"
import { Membership } from '../blockchain/membership'
import { General } from '../blockchain/general'

export class UIMember
{
    private static mainBalance: float
    private static price: float

    private static member: ui.CustomPrompt

    private static uiCallback: UICallback

    private static membership: Membership
    private static general: General

    constructor(uiCallback: UICallback)
    {
        UIMember.uiCallback = uiCallback
        UIMember.membership = Membership.getInstance(uiCallback)
        UIMember.general = General.getInstance()

        this.configAutocomplete()
    }

    private configAutocomplete(): void
    {
        UIMember.member = new ui.CustomPrompt(PromptStyles.LIGHT, 585, 450)
        UIMember.member.background.isPointerBlocker = true

        UIMember.member.addText('Quizzone membership', 0, 205, Color4.Black(), 30)

        UIMember.member.addText('Quizzone members have 50% off the boosters price', 0, 155, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIMember.member.addText('You will receive an NFT token named \"QZONE\"', 0, 105, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIMember.member.addText('that denotes a membership', 0, 75, new Color4(0.24, 0.22, 0.25, 1.0), 20)

        UIMember.member.addText('Your balance:  ...  ETH', 0, 20, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIMember.member.addText('Membership price:', -151, -35, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIMember.member.addText(UICallback.properties.getComponent(UIPropertiesComponent).membershipPrice.toString(), 6, -35, new Color4(1.0, 0.15, 0.3, 1.0), 25)
        UIMember.member.addText('ETH (1000 MANA)', 160, -35, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIMember.member.addText('Become a Quizzone member?', 0, -95, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIMember.member.addButton(
            'Yeah',
            -100,
            -175,
            () =>
            {
                this.checkBuyMembership()
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

    private checkBuyMembership(): void
    {
        if (UIMember.mainBalance < UIMember.price)
        {
            UIMember.uiCallback.showUniversalError("Not enough funds")
        }
        else
        {
            UIMember.membership.buyMembership()
            UIMember.uiCallback.showCheckMetamask()
        }
    }

    public reopen(): void
    {
        if (General.playerWallet != null)
        {
            const balancePromise = executeTask(async () =>
            {
                const playerBalanceStr = await UIMember.general.getMainBalance()
                const priceStr = await UIMember.membership.getMemberShipPrice()

                let valueBalanceText = UIMember.member.elements[4] as CustomPromptText
                let dotIndex = playerBalanceStr.indexOf(".")

                UIMember.mainBalance = parseFloat(playerBalanceStr);
                valueBalanceText.text.value = "Your balance:  " + playerBalanceStr.substr(0, dotIndex > 0 ? dotIndex + 5 : playerBalanceStr.length) + "  ETH"

                let valuePriceText = UIMember.member.elements[6] as CustomPromptText
                dotIndex = priceStr.indexOf(".")

                UIMember.price = parseFloat(priceStr)
                valuePriceText.text.value = priceStr.substr(0, dotIndex > 0 ? dotIndex + 4 : Math.max(priceStr.length, 4))
            })

            balancePromise.then()

            UIMember.member.reopen()
        }
        else
        {
            UIMember.uiCallback.showConnectMetamaskError()
        }
    }

    public close(): void
    {
        UIMember.member.close()
    }
}