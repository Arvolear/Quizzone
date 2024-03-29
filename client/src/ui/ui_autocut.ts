import * as ui from "../../node_modules/@arvolear/alternative-dcl-ui-utils/index"
import { ButtonStyles, PromptStyles } from '../../node_modules/@arvolear/alternative-dcl-ui-utils/utils/types';
import { CustomPromptText } from "../../node_modules/@arvolear/alternative-dcl-ui-utils/prompts/customPrompt/index"
import { UICallback } from '../callbacks/ui_callback'
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { Sounds } from "../app/sounds"
import { General } from "../blockchain/general"
import { AppCallback } from '../callbacks/app_callback'

export class UIAutocut
{
    private static autoCut: ui.CustomPrompt

    private static uiCallback: UICallback

    private static sounds: Sounds

    constructor(ui: UICallback)
    {
        UIAutocut.sounds = Sounds.getInstance()
        UIAutocut.uiCallback = ui

        this.configAutocomplete()
    }
   
    private configAutocomplete(): void
    {
        UIAutocut.autoCut = new ui.CustomPrompt(PromptStyles.LIGHT, 400, 300)
        UIAutocut.autoCut.background.isPointerBlocker = true

        UIAutocut.autoCut.addText('50/50', 0, 130, Color4.Black(), 30)
        UIAutocut.autoCut.addText('Boosters left:', -30, 60, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UIAutocut.autoCut.addText(UICallback.properties.getComponent(UIPropertiesComponent).autocompleteLeft.toString(), 115, 60, new Color4(1.0, 0.15, 0.3, 1.0), 30)
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
        UIAutocut.sounds.playUseBooster()

        var toSend = "use_autocut\n" +
            General.playerWallet

        AppCallback.dappClientSocket.send(toSend)
    }

    public updateAutocutLeft(): void
    {
        let valueText = UIAutocut.autoCut.elements[2] as CustomPromptText
        let value = UICallback.properties.getComponent(UIPropertiesComponent).autocutLeft.toString()

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