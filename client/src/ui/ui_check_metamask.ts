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
        UICheckMetamask.checkMetamask = new ui.CustomPrompt(PromptStyles.LIGHT)
        UICheckMetamask.checkMetamask.addText('Metamask', 0, 153, Color4.Black(), 30)
        UICheckMetamask.checkMetamask.addText('Please check Metamask', 0, 30, new Color4(0.24, 0.22, 0.25, 1.0), 30)

        UICheckMetamask.checkMetamask.addButton(
            'Close',
            -0,
            -120,
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