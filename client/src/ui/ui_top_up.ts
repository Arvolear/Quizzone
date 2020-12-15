import * as ui from "../../node_modules/@arvolear/alternative-dcl-ui-utils/index"
import { ButtonStyles, PromptStyles } from '../../node_modules/@arvolear/alternative-dcl-ui-utils/utils/types';
import { CustomPromptText, CustomPromptTextBox } from "../../node_modules/@arvolear/alternative-dcl-ui-utils/prompts/customPrompt/index"
import { UICallback } from "../callbacks/ui_callback"
import { General } from '../blockchain/general'
import { MaticTopUp } from '../blockchain/matic_topup'

export class UITopUp
{
    private static topUpMatic: ui.CustomPrompt

    private static uiCallback: UICallback

    private static maticTopUp: MaticTopUp
    private static general: General

    constructor(ui: UICallback)
    {
        UITopUp.uiCallback = ui
        UITopUp.maticTopUp = MaticTopUp.getInstance(ui)
        UITopUp.general = General.getInstance()

        this.configTopUp()
    }

    private configTopUp(): void
    {
        UITopUp.topUpMatic = new ui.CustomPrompt(PromptStyles.LIGHT, 500, 450)
        UITopUp.topUpMatic.background.isPointerBlocker = true

        UITopUp.topUpMatic.addText('Top up matic MANA', 0, 205, Color4.Black(), 30)
        UITopUp.topUpMatic.addText('The whole procedure takes 5-10 minutes', 0, 170, Color4.Black(), 20)
        UITopUp.topUpMatic.addText('You will have to sign TWO transactions', 0, 140, new Color4(1.0, 0.15, 0.3, 1.0), 20)
        UITopUp.topUpMatic.addText('After main MANA is withdrawn,', 0, 110, Color4.Black(), 20)
        UITopUp.topUpMatic.addText('matic MANA will appear shortly', 0, 90, Color4.Black(), 20)
        UITopUp.topUpMatic.addText('Main balance:  ...  MANA', 0, 40, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UITopUp.topUpMatic.addText('Matic balance:  ...  MANA', 0, 10, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UITopUp.topUpMatic.addText('Amount:', -104, -40, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UITopUp.topUpMatic.addTextBox(
            0,
            -90,
            "Enter MANA"
        )

        UITopUp.topUpMatic.addButton(
            'Top up',
            -100,
            -175,
            () =>
            {
                this.transferToMatic()
            },
            ButtonStyles.E
        )

        UITopUp.topUpMatic.addButton(
            'Cancel',
            100,
            -175,
            () =>
            {
                UITopUp.uiCallback.hideTopUp()
            },
            ButtonStyles.F
        )

        UITopUp.topUpMatic.close()
    }

    public reopen(): void
    {
        if (General.playerWallet != null)
        {
            const balancePromise = executeTask(async () => 
            {
                const balance = await UITopUp.general.getMaticBalance()

                let valueMainText = UITopUp.topUpMatic.elements[5] as CustomPromptText
                let valueMaticText = UITopUp.topUpMatic.elements[6] as CustomPromptText

                let balanceMainStr = balance.l1.toString()
                let dotMainIndex = balanceMainStr.indexOf(".")

                let balanceMaticStr = balance.l2.toString()
                let dotMaticIndex = balanceMaticStr.indexOf(".")

                valueMainText.text.value = 'Main balance:  ' + balanceMainStr.substr(0, dotMainIndex > 0 ? dotMainIndex : balanceMainStr.length) + '  MANA'
                valueMaticText.text.value = 'Matic balance:  ' + balanceMaticStr.substr(0, dotMaticIndex > 0 ? dotMaticIndex : balanceMaticStr.length) + '  MANA'
            })

            balancePromise.then()

            UITopUp.topUpMatic.reopen()
        }
        else
        {
            UITopUp.uiCallback.showConnectMetamaskError()
        }
    }

    public close(): void
    {
        UITopUp.topUpMatic.close()
    }

    private transferToMatic(): void
    {
        let valueText = UITopUp.topUpMatic.elements[5] as CustomPromptText
        let valueTextBox = UITopUp.topUpMatic.elements[8] as CustomPromptTextBox

        let firstSpace = valueText.text.value.indexOf('  ')
        let lastSpace = valueText.text.value.lastIndexOf('  ')

        let amount = parseFloat(valueTextBox.currentText)
        let balance = parseFloat(valueText.text.value.substr(firstSpace + 2, lastSpace - firstSpace))

        UITopUp.maticTopUp.transferToMatic(balance, amount)
    }
}