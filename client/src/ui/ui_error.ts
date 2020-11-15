import { UICallback } from "../callbacks/ui_callback"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { ButtonStyles, PromptStyles } from '../../node_modules/@dcl/ui-utils/utils/types';
import { CustomPromptText } from '../../node_modules/@dcl/ui-utils/prompts/customPrompt/index';

export class UIError
{    
    private static fundsError: ui.CustomPrompt
    private static universalError: ui.CustomPrompt
    private static waitStartError: ui.CustomPrompt
    private static waitEndError: ui.CustomPrompt
    private static reconnectError: ui.CustomPrompt

    private static uiCallback: UICallback

    constructor(ui: UICallback)
    {
        UIError.uiCallback = ui        

        this.configFundsError()    
        this.configUniversalError()
        this.configWaitStartError()
        this.configWaitEndError()
        this.configReconnectError()
    }

    private configFundsError(): void
    {
        UIError.fundsError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UIError.fundsError.background.isPointerBlocker = true

        UIError.fundsError.addText('Error', 0, 153, Color4.Black(), 30)
        UIError.fundsError.addText('Not enough funds', 0, 80, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIError.fundsError.addText('Please consider topping up', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIError.fundsError.addText('matic MANA', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIError.fundsError.addButton(
            'Close',
            -0,
            -120,
            () =>
            {
                UIError.uiCallback.hideError()
            },
            ButtonStyles.F
        )

        UIError.fundsError.close()
    }

    private configUniversalError(): void
    {
        UIError.universalError = new ui.CustomPrompt(PromptStyles.LIGHT)
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

    private configWaitStartError(): void
    {
        UIError.waitStartError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UIError.waitStartError.background.isPointerBlocker = true

        UIError.waitStartError.addText('Error', 0, 153, Color4.Black(), 30)
        UIError.waitStartError.addText('', 0, 80, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIError.waitStartError.addText('The special quiz', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIError.waitStartError.addText('registration will open soon', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIError.waitStartError.addButton(
            'Ok',
            -0,
            -120,
            () =>
            {
                UIError.uiCallback.hideError()
            },
            ButtonStyles.F
        )

        UIError.waitStartError.close()
    }

    private configWaitEndError(): void
    {
        UIError.waitEndError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UIError.waitEndError.background.isPointerBlocker = true

        UIError.waitEndError.addText('Error', 0, 153, Color4.Black(), 30)
        UIError.waitEndError.addText('', 0, 80, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIError.waitEndError.addText('Quiz has already started', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIError.waitEndError.addText('please wait for it to end', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIError.waitEndError.addButton(
            'Ok',
            -0,
            -120,
            () =>
            {
                UIError.uiCallback.hideError()
            },
            ButtonStyles.F
        )

        UIError.waitEndError.close()
    }

    private configReconnectError(): void
    {
        UIError.reconnectError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UIError.reconnectError.background.isPointerBlocker = true

        UIError.reconnectError.addText('Error', 0, 153, Color4.Black(), 30)
        UIError.reconnectError.addText('You were disconnected', 0, 93, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIError.reconnectError.addText('Please contact the Quizzone', 0, 40, new Color4(0.24, 0.22, 0.25, 1.0), 22)
        UIError.reconnectError.addText('so we could fix the issue', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 22)
        UIError.reconnectError.addText('You may need to join', 0, -25, new Color4(0.24, 0.22, 0.25, 1.0), 22)
        UIError.reconnectError.addText('the quiz once again', 0, -50, new Color4(0.24, 0.22, 0.25, 1.0), 22)

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
        UIError.fundsError.close()
        UIError.universalError.close()
        UIError.waitEndError.close()    
        UIError.waitStartError.close()    
        UIError.reconnectError.close()    
    }

    public showNotEnoughManaFundsError(): void
    {     
        UIError.fundsError.reopen()
    }

    public showUniversalError(value: string): void
    {        
        let text = UIError.universalError.elements[1] as CustomPromptText
        text.text.value = value

        UIError.universalError.reopen()
    }

    public showWaitStartError(value: string): void
    {
        let text = UIError.waitStartError.elements[1] as CustomPromptText
        text.text.value = value

        UIError.waitStartError.reopen()
    }

    public showWaitEndError(value: string): void
    {
        let text = UIError.waitEndError.elements[1] as CustomPromptText
        text.text.value = value

        UIError.waitEndError.reopen()
    }

    public showReconnectError(): void
    {        
        UIError.reconnectError.reopen()
    }
}