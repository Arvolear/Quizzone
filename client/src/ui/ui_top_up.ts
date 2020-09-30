import * as ui from '../../node_modules/@dcl/ui-utils/index'
import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import { UI } from "./ui"
import { CustomPromptText, CustomPromptTextBox } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index"
import { DappClientSocket } from "../app/dapp_client_socket"

export class UITopUp
{
    private static topUpMatic: ui.CustomPrompt
    private static universalError: ui.CustomPrompt

    private static uiCallback: UI

    constructor(ui: UI)
    {
        UITopUp.uiCallback = ui

        this.configError()
        this.configTopUp()
    }

    private configError(): void
    {
        UITopUp.universalError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UITopUp.universalError.addText('Error', 0, 153, Color4.Black(), 30)
        UITopUp.universalError.addText('', 0, 30, new Color4(1.0, 0.15, 0.3, 1.0), 35)

        UITopUp.universalError.addButton(
            'Close',
            -0,
            -120,
            () =>
            {
                UITopUp.uiCallback.hideTopUp()
            },
            ButtonStyles.F
        )

        UITopUp.universalError.close()
    }

    private configTopUp(): void
    {
        UITopUp.topUpMatic = new ui.CustomPrompt(PromptStyles.LIGHT)
        UITopUp.topUpMatic.addText('Top up matic MANA', 0, 153, Color4.Black(), 30)
        UITopUp.topUpMatic.addText('(takes 5-10 minutes)', 0, 135, Color4.Black(), 18)
        UITopUp.topUpMatic.addText('Main balance:', 0, 90, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UITopUp.topUpMatic.addText('Matic balance:', 0, 60, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UITopUp.topUpMatic.addText('Amount:', -104, 13, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UITopUp.topUpMatic.addTextBox(
            0,
            -37,
            "Enter MANA"
        )

        UITopUp.topUpMatic.addButton(
            'Top up',
            -95,
            -120,
            () =>
            {
                UITopUp.transferToMatic()
            },
            ButtonStyles.E
        )

        UITopUp.topUpMatic.addButton(
            'Cancel',
            95,
            -120,
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
        UI.canvas.isPointerBlocker = true

        const balancePromise = executeTask(async () =>
        {
            return await matic.balance(DappClientSocket.playerWallet, DappClientSocket.network)
        })

        balancePromise.then((balance) => 
        {
            let valueMainText = UITopUp.topUpMatic.elements[2] as CustomPromptText
            let valueMaticText = UITopUp.topUpMatic.elements[3] as CustomPromptText

            let balanceMainStr = balance.l1.toString()
            let dotMainIndex = balanceMainStr.indexOf(".")

            let balanceMaticStr = balance.l2.toString()
            let dotMaticIndex = balanceMaticStr.indexOf(".")

            valueMainText.text.value = 'Main balance: ' + balanceMainStr.substr(0, dotMainIndex > 0 ? dotMainIndex : balanceMainStr.length) + ' MANA'
            valueMaticText.text.value = 'Matic balance: ' + balanceMaticStr.substr(0, dotMaticIndex > 0 ? dotMaticIndex : balanceMaticStr.length) + ' MANA'
        })

        UITopUp.uiCallback.hideAllWindows()
        UITopUp.topUpMatic.reopen()
    }

    public close(): void
    {
        UITopUp.topUpMatic.close()
        UITopUp.universalError.close()
    }

    private static transferToMatic(): void
    {
        let valueText = UITopUp.topUpMatic.elements[2] as CustomPromptText
        let valueTextBox = UITopUp.topUpMatic.elements[5] as CustomPromptTextBox

        let firstSpace = valueText.text.value.indexOf(' ')
        let lastSpace = valueText.text.value.lastIndexOf(' ')

        let amount = parseFloat(valueTextBox.currentText)
        let balance = parseFloat(valueText.text.value.substr(firstSpace + 1, lastSpace - firstSpace - 1))

        if (isNaN(amount) || amount <= 0)
        {
            UITopUp.uiCallback.showUniversalError("Wrong input")
            return
        }

        if (amount > balance)
        {
            UITopUp.uiCallback.showUniversalError("Not enough funds")
            return
        }

        const topUp = executeTask(async () =>
        {
            UITopUp.uiCallback.showCheckMetamask()
            UITopUp.uiCallback.showHourglass()

            await matic.depositMana(amount, DappClientSocket.network).then(() => 
            {
                UITopUp.uiCallback.showTick(16)
            }).catch(() => 
            {
                UITopUp.uiCallback.hideTopUp()
            })
        })

        topUp.then()
    }

    public showUniversalError(value: string): void
    {
        UITopUp.topUpMatic.close()        

        let text = UITopUp.universalError.elements[1] as CustomPromptText
        text.text.value = value

        UITopUp.universalError.reopen()
    }
}