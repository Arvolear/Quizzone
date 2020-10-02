import { DappClientSocket } from "../app/dapp_client_socket"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UI } from "./ui"
import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { CustomPromptText } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index"

export class UIAutocut
{
    private static dappClientSocket: DappClientSocket

    private static autoCut: ui.CustomPrompt

    private static uiCallback: UI

    constructor(ui: UI)
    {
        UIAutocut.uiCallback = ui

        this.configAutocomplete()
    }

    public static setClientSocket(dappClientSocket: DappClientSocket): void
    {
        UIAutocut.dappClientSocket = dappClientSocket;
    }

    private configAutocomplete(): void
    {
        UIAutocut.autoCut = new ui.CustomPrompt(PromptStyles.LIGHT, 400, 300)
        UIAutocut.autoCut.background.isPointerBlocker = true

        UIAutocut.autoCut.addText('50/50', 0, 130, Color4.Black(), 30)
        UIAutocut.autoCut.addText('Boosters left:', -30, 60, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UIAutocut.autoCut.addText(UI.properties.getComponent(UIPropertiesComponent).autocompleteLeft.toString(), 115, 60, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIAutocut.autoCut.addText('Use 50/50 booster?', 0, -10, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIAutocut.autoCut.addButton(
            'Yeah',
            -95,
            -100,
            () =>
            {
                UIAutocut.activateAutocut()
                UIAutocut.uiCallback.hideAllWindows()
            },
            ButtonStyles.E
        )

        UIAutocut.autoCut.addButton(
            'Nope',
            95,
            -100,
            () =>
            {
                UIAutocut.uiCallback.hideAutocutWindow()
            },
            ButtonStyles.F
        )

        UIAutocut.autoCut.close()
    }

    private static activateAutocut(): void
    {
        var toSend = "use_autocut\n" +
            DappClientSocket.playerWallet

        UIAutocut.dappClientSocket.send(toSend)
    }

    public updateAutocutLeft(): void
    {
        let valueText = UIAutocut.autoCut.elements[2] as CustomPromptText
        let value = UI.properties.getComponent(UIPropertiesComponent).autocutLeft.toString()

        valueText.text.value = value
    }

    public reopen(): void
    {
        UIAutocut.autoCut.reopen()
    }

    public close(): void
    {
        UIAutocut.autoCut.close()
    }
}