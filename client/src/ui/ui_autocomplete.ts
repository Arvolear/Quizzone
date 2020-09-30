import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UI } from "./ui"
import { DappClientSocket } from "../app/dapp_client_socket"

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
        UIAutocomplete.autocompleter.addText('Are you sure to autocomplete', 0, 30, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UIAutocomplete.autocompleter.addText('the question?', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 30)

        UIAutocomplete.autocompleter.addButton(
            'Yeah',
            -95,
            -120,
            () =>
            {
                UIAutocomplete.activateAutocomplete()
            },
            ButtonStyles.E
        )

        UIAutocomplete.autocompleter.addButton(
            'Nope',
            95,
            -120,
            () =>
            {
                UIAutocomplete.uiCallback.hideAutocomplete()                                   
            },
            ButtonStyles.F
        )

        UIAutocomplete.autocompleter.close()
    }

    private static activateAutocomplete(): void
    {
        // TODO
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