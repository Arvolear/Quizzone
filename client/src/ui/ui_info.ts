import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UICallback } from '../app/ui_callback'

export class UIInfo
{
    private static uiCallback: UICallback

    private static info: ui.CustomPrompt

    constructor(uiCallback: UICallback)
    {        
        UIInfo.uiCallback = uiCallback

        this.configInfo()
    }

    private configInfo(): void
    {
        UIInfo.info = new ui.CustomPrompt(PromptStyles.LIGHT, 450, 300)
        UIInfo.info.background.isPointerBlocker = true

        UIInfo.info.addText('Quizzone Info', 0, 130, Color4.Black(), 30)
        UIInfo.info.addText('You will find everything here:', 0, 60, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIInfo.info.addButton("", 0, -15,
            () =>
            {
                openExternalURL("https://dapp-craft.com/quizzone/about")
            }, ButtonStyles.CUSTOM, new Texture("images/dapp-craft.png"), 270, 50, 1350, 250, false)
                
        UIInfo.info.addButton(
            'Close',
            0,
            -100,
            () =>
            {
                UIInfo.uiCallback.hideInfo()
            },
            ButtonStyles.F
        )

        UIInfo.info.close()
    }

    public reopen(): void
    {
        UIInfo.info.reopen()
    }

    public close(): void
    {
        UIInfo.info.close()
    }
}