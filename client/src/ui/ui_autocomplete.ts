import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UI } from "./ui"
import { DappClientSocket } from "../app/dapp_client_socket"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { CustomPromptText } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index"

export class UIAutocomplete
{
    private static dappClientSocket: DappClientSocket

    private static autocompleter: ui.CustomPrompt

    private static uiCallback: UI

    constructor(ui: UI)
    {
        UIAutocomplete.uiCallback = ui

        this.configAutocomplete()
    }

    public static setClientSocket(dappClientSocket: DappClientSocket): void
    {
        UIAutocomplete.dappClientSocket = dappClientSocket;
    }

    private configAutocomplete(): void
    {
        UIAutocomplete.autocompleter = new ui.CustomPrompt(PromptStyles.LIGHT)
        UIAutocomplete.autocompleter.addText('Autocompleter', 0, 153, Color4.Black(), 30)
        UIAutocomplete.autocompleter.addText('Boosters left:', -30, 70, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UIAutocomplete.autocompleter.addText(UI.properties.getComponent(UIPropertiesComponent).autocompleteLeft.toString(), 115, 70, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIAutocomplete.autocompleter.addText('Autocomplete the question?', 0, -9, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIAutocomplete.autocompleter.addButton(
            'Yeah',
            -95,
            -120,
            () =>
            {
                UIAutocomplete.activateAutocomplete()
                UIAutocomplete.uiCallback.hideAllWindows()
            },
            ButtonStyles.E
        )

        UIAutocomplete.autocompleter.addButton(
            'Nope',
            95,
            -120,
            () =>
            {
                UIAutocomplete.uiCallback.hideAutocompleteWindow()                                   
            },
            ButtonStyles.F
        )

        UIAutocomplete.autocompleter.close()
    }

    private static activateAutocomplete(): void
    {
        var toSend = "use_autocomplete\n" +            
            DappClientSocket.playerWallet
    }

    public updateAutocompleteLeft(): void
    {
        let valueText = UIAutocomplete.autocompleter.elements[2] as CustomPromptText
        let value = UI.properties.getComponent(UIPropertiesComponent).autocompleteLeft.toString()

        valueText.text.value = value
    }

    public reopen(): void
    {        
        UIAutocomplete.autocompleter.reopen()     
    }

    public close(): void
    {
        UIAutocomplete.autocompleter.close()
    }
}