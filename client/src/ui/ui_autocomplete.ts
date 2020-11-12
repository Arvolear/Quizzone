import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { UICallback } from '../callbacks/ui_callback'
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { CustomPromptText } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index"
import { Sounds } from "../app/sounds"
import { General } from "../blockchain/general"
import { AppCallback } from "../callbacks/app_callback"

export class UIAutocomplete
{
    private static autocompleter: ui.CustomPrompt

    private static uiCallback: UICallback

    private static sounds: Sounds

    constructor(ui: UICallback)
    {
        UIAutocomplete.sounds = Sounds.getInstance()
        UIAutocomplete.uiCallback = ui

        this.configAutocomplete()
    }

    private configAutocomplete(): void
    {
        UIAutocomplete.autocompleter = new ui.CustomPrompt(PromptStyles.LIGHT, 400, 300)
        UIAutocomplete.autocompleter.background.isPointerBlocker = true

        UIAutocomplete.autocompleter.addText('Autocompleter', 0, 130, Color4.Black(), 30)
        UIAutocomplete.autocompleter.addText('Boosters left:', -30, 60, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UIAutocomplete.autocompleter.addText(UICallback.properties.getComponent(UIPropertiesComponent).autocompleteLeft.toString(), 115, 60, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIAutocomplete.autocompleter.addText('Use autocomplete booster?', 0, -10, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIAutocomplete.autocompleter.addButton(
            'Yeah',
            -95,
            -100,
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
            -100,
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
        UIAutocomplete.sounds.playUseBooster()

        var toSend = "use_autocomplete\n" +            
            General.playerWallet

        AppCallback.dappClientSocket.send(toSend)    
    }

    public updateAutocompleteLeft(): void
    {
        let valueText = UIAutocomplete.autocompleter.elements[2] as CustomPromptText
        let value = UICallback.properties.getComponent(UIPropertiesComponent).autocompleteLeft.toString()

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