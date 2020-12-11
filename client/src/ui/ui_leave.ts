import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UICallback } from '../callbacks/ui_callback'
import { DappClientSocket } from "../app/dapp_client_socket"
import { AppCallback } from "../callbacks/app_callback"

export class UILeave
{
    private static leaver: ui.CustomPrompt

    private static uiCallback: UICallback

    constructor(ui: UICallback)
    {
        UILeave.uiCallback = ui

        this.configAutocomplete()
    }

    private configAutocomplete(): void
    {
        UILeave.leaver = new ui.CustomPrompt(PromptStyles.LIGHT, 420, 350)
        UILeave.leaver.background.isPointerBlocker = true

        UILeave.leaver.addText('Leave the quiz', 0, 150, Color4.Black(), 30)
        UILeave.leaver.addText('Unless the quiz has finished', 0, 65, new Color4(0.24, 0.22, 0.25, 1.0), 26)
        UILeave.leaver.addText('you may join back later', 0, 20, new Color4(0.24, 0.22, 0.25, 1.0), 26)        
        UILeave.leaver.addText('Leave the quiz?', 0, -60, new Color4(0.24, 0.22, 0.25, 1.0), 28)

        UILeave.leaver.addButton(
            'Yeah',
            -95,
            -130,
            () =>
            {
                UILeave.leave()
                UILeave.uiCallback.hideAllWindows()
            },
            ButtonStyles.E
        )

        UILeave.leaver.addButton(
            'Nope',
            95,
            -130,
            () =>
            {
                UILeave.uiCallback.hideLeaveWindow()
            },
            ButtonStyles.F
        )

        UILeave.leaver.close()
    }

    private static leave(): void
    {
        AppCallback.dappClientSocket.close(DappClientSocket.getLeaveCode())
        AppCallback.dappClientSocket.connect()
    }    

    public reopen(): void
    {
        UILeave.leaver.reopen()
    }

    public close(): void
    {
        UILeave.leaver.close()
    }
}