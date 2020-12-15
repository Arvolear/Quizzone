import { UICallback } from "../callbacks/ui_callback"
import * as ui from "../../node_modules/@arvolear/alternative-dcl-ui-utils/index"
import { ButtonStyles, PromptStyles } from '../../node_modules/@arvolear/alternative-dcl-ui-utils/utils/types';
import { CustomPromptText } from '../../node_modules/@arvolear/alternative-dcl-ui-utils/prompts/customPrompt/index';

export class UIError
{    
    private static universalError: ui.CustomPrompt
    private static fourSlotError: ui.CustomPrompt
    private static reconnectError: ui.CustomPrompt

    private static uiCallback: UICallback

    constructor(ui: UICallback)
    {
        UIError.uiCallback = ui        

        this.configUniversalError()
        this.configFourSlotError()
        this.configReconnectError()
    }

    private configUniversalError(): void
    {
        UIError.universalError = new ui.CustomPrompt(PromptStyles.LIGHT, 420, 350)
        UIError.universalError.background.isPointerBlocker = true

        UIError.universalError.addText('Error', 0, 153, Color4.Black(), 30)
        UIError.universalError.addText('', 0, 26, new Color4(1.0, 0.15, 0.3, 1.0), 35)

        UIError.universalError.addButton(
            'Close',
            -0,
            -120,
            () =>
            {
                UIError.uiCallback.hideError()
            },
            ButtonStyles.F
        )

        UIError.universalError.close()
    }

    private configFourSlotError(): void
    {
        UIError.fourSlotError = new ui.CustomPrompt(PromptStyles.LIGHT, 420, 350)
        UIError.fourSlotError.background.isPointerBlocker = true

        UIError.fourSlotError.addText('', 0, 153, Color4.Black(), 30)
        UIError.fourSlotError.addText('', 0, 80, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIError.fourSlotError.addText('', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 24)
        UIError.fourSlotError.addText('', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 24)

        UIError.fourSlotError.addButton(
            'Ok',
            -0,
            -120,
            () =>
            {
                UIError.uiCallback.hideError()
            },
            ButtonStyles.F
        )

        UIError.fourSlotError.close()
    }   

    private configReconnectError(): void
    {
        UIError.reconnectError = new ui.CustomPrompt(PromptStyles.LIGHT, 420, 350)
        UIError.reconnectError.background.isPointerBlocker = true

        UIError.reconnectError.addText('Error', 0, 153, Color4.Black(), 30)
        UIError.reconnectError.addText('You were disconnected', 0, 93, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIError.reconnectError.addText('Please contact the Quizzone', 0, 40, new Color4(0.24, 0.22, 0.25, 1.0), 23)
        UIError.reconnectError.addText('so we could fix the issue', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 23)
        UIError.reconnectError.addText('You may need to join', 0, -30, new Color4(0.24, 0.22, 0.25, 1.0), 23)
        UIError.reconnectError.addText('the quiz once again', 0, -55, new Color4(0.24, 0.22, 0.25, 1.0), 23)

        UIError.reconnectError.addButton(
            'Sure',
            -0,
            -130,
            () =>
            {
                UIError.uiCallback.hideError()
            },
            ButtonStyles.F
        )

        UIError.reconnectError.close()
    }

    public close(): void
    {                
        UIError.universalError.close()
        UIError.fourSlotError.close()
        UIError.reconnectError.close()    
    }

    private updateFourSlotError(one: string, two: string, three: string, four: string)
    {
        let text1 = UIError.fourSlotError.elements[0] as CustomPromptText
        let text2 = UIError.fourSlotError.elements[1] as CustomPromptText
        let text3 = UIError.fourSlotError.elements[2] as CustomPromptText
        let text4 = UIError.fourSlotError.elements[3] as CustomPromptText
        
        text1.text.value = one
        text2.text.value = two
        text3.text.value = three
        text4.text.value = four
    }

    public showUniversalError(value: string): void
    {        
        let text = UIError.universalError.elements[1] as CustomPromptText
        text.text.value = value

        UIError.universalError.reopen()
    }

    public showNotEnoughManaFundsError(): void
    {
        this.updateFourSlotError("Error", "Not enough funds", "Please consider topping up", "matic MANA")

        UIError.fourSlotError.reopen()
    }

    public showWaitStartError(): void
    {        
        this.updateFourSlotError("Error", "Can't check in", "The special quiz", "registration will open soon")

        UIError.fourSlotError.reopen()
    }

    public showFullError(): void
    {        
        this.updateFourSlotError("Error", "Can't check in", "The quiz is full,", "please wait")

        UIError.fourSlotError.reopen()
    }

    public showGoConnectError(): void
    {        
        this.updateFourSlotError("Shhhh...", "Do not disturb", "If you wish to play,", "click the check in table")
        
        UIError.fourSlotError.reopen()
    }

    public showAlreadyJoinedError(): void
    {
        this.updateFourSlotError("Error", "Can't check in", "You've already checked in,", "please enter the playing field")

        UIError.fourSlotError.reopen()
    }

    public showConnectMetamaskError(): void
    {
        this.updateFourSlotError("Error", "No Metamask detected", "You can't use blockchain", "without Metamask connection")

        UIError.fourSlotError.reopen()
    }

    public showReconnectError(): void
    {        
        UIError.reconnectError.reopen()
    }
}