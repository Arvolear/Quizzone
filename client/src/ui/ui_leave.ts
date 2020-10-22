import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UICallback } from '../app/ui_callback'
import { DappClientSocket } from "../app/dapp_client_socket"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { CustomPromptText } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index"

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
        UILeave.leaver = new ui.CustomPrompt(PromptStyles.LIGHT, 420, 300)
        UILeave.leaver.background.isPointerBlocker = true

        UILeave.leaver.addText('Leave the quiz', 0, 130, Color4.Black(), 30)
        UILeave.leaver.addText('', 0, 60, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UILeave.leaver.addText('', 0, 20, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UILeave.leaver.addText('Leave the quiz?', 0, -50, new Color4(0.24, 0.22, 0.25, 1.0), 30)

        UILeave.leaver.addButton(
            'Yeah',
            -95,
            -110,
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
            -110,
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
        UICallback.dappClientSocket.close(DappClientSocket.getLeaveCode())
        UICallback.dappClientSocket.connect()
    }

    public updateMessage(): void
    {
        let valueText1 = UILeave.leaver.elements[1] as CustomPromptText
        let valueText2 = UILeave.leaver.elements[2] as CustomPromptText

        let uiPropertiesComp = UICallback.properties.getComponent(UIPropertiesComponent)
        let freeLeave = uiPropertiesComp.freeLeave

        if (freeLeave)
        {
            valueText1.text.value = "If you leave now"
            valueText2.text.value = "you may join back later"
        }
        else
        {
            valueText1.text.value = "If you leave now"
            valueText2.text.value = "you won't be able to join"
        }
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