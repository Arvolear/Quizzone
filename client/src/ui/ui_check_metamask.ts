import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UI } from "./ui"

export class UICheckMetamask
{
    private static checkMetamask: ui.CustomPrompt    

    private static uiCallback: UI

    constructor(ui: UI)
    {
        UICheckMetamask.uiCallback = ui

        this.configCheckMetamask()
    }

    private configCheckMetamask(): void
    {
        UICheckMetamask.checkMetamask = new ui.CustomPrompt(PromptStyles.LIGHT, 400, 300)
        UICheckMetamask.checkMetamask.background.isPointerBlocker = true

        UICheckMetamask.checkMetamask.addText('Metamask', 0, 130, Color4.Black(), 30)
        UICheckMetamask.checkMetamask.addText('Please check', 0, 45, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UICheckMetamask.checkMetamask.addText('your Metamask', 0, 0, new Color4(0.24, 0.22, 0.25, 1.0), 30)

        UICheckMetamask.checkMetamask.addButton(
            'Close',
            -0,
            -110,
            () =>
            {
                UICheckMetamask.uiCallback.hideCheckMetamask()
            },
            ButtonStyles.F
        )

        UICheckMetamask.checkMetamask.close()
    }

    public reopen(): void
    {
        UICheckMetamask.checkMetamask.reopen()
    }

    public close(): void
    {
        UICheckMetamask.checkMetamask.close()
    }
}