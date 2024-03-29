import { UICallback } from "../callbacks/ui_callback"
import * as ui from "../../node_modules/@arvolear/alternative-dcl-ui-utils/index"
import { ButtonStyles, PromptStyles } from '../../node_modules/@arvolear/alternative-dcl-ui-utils/utils/types';
import { CustomPromptText } from "../../node_modules/@arvolear/alternative-dcl-ui-utils/prompts/customPrompt/index"
import { UIPropertiesComponent } from "../components/ui_properties_component";
import { Sounds } from "../app/sounds";
import { Membership } from "../blockchain/membership";
import { General } from "../blockchain/general";
import { BoostersBuy } from "../blockchain/boosters_buy";
import { AppCallback } from "../callbacks/app_callback";

export class UIStartUp
{
    private static startUp: ui.CustomPrompt

    private static uiCallback: UICallback

    private static sounds: Sounds

    private static maticBalance: number
    private static autocompleteNum: number
    private static autocutNum: number
    private static boostersToBuyValue: number

    private static shallBuyBoosters: boolean

    private static membership: Membership
    private static general: General
    private static boostersBuy: BoostersBuy

    constructor(ui: UICallback)
    {
        UIStartUp.sounds = Sounds.getInstance()

        UIStartUp.uiCallback = ui
        UIStartUp.maticBalance = 0
        UIStartUp.autocompleteNum = 0
        UIStartUp.autocutNum = 0
        UIStartUp.boostersToBuyValue = 0
        UIStartUp.shallBuyBoosters = false

        UIStartUp.membership = Membership.getInstance(ui)
        UIStartUp.general = General.getInstance()
        UIStartUp.boostersBuy = BoostersBuy.getInstance(ui)

        this.configStartUp()
    }

    private configStartUp(): void
    {
        UIStartUp.startUp = new ui.CustomPrompt(PromptStyles.LIGHT, 600, 500)
        UIStartUp.startUp.background.isPointerBlocker = true

        UIStartUp.startUp.addText('Let\'s start!', 0, 225, Color4.Black(), 35)
        UIStartUp.startUp.addText('', 180, 228, Color4.Black(), 30)

        UIStartUp.startUp.addText('Maximum 3 boosters per quiz are allowed', 0, 195, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIStartUp.startUp.addText('The unused ones will be burned', 0, 175, new Color4(0.24, 0.22, 0.25, 1.0), 20)

        UIStartUp.startUp.addText('Your matic balance:  ...  MANA', 0, 145, new Color4(1.0, 0.15, 0.3, 1.0), 20)

        UIStartUp.startUp.addText('Autocomplete question booster', 0, 110, Color4.Black(), 25)
        UIStartUp.startUp.addText(UICallback.properties.getComponent(UIPropertiesComponent).autocompletePrice.toString(), -65, 83, new Color4(1.0, 0.15, 0.3, 1.0), 20)
        UIStartUp.startUp.addText('MANA each', 25, 83, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIStartUp.startUp.addIcon("images/minus.png", -100, 25, 50, 50, { sourceWidth: 550, sourceHeight: 550 }).image.onClick = new OnClick(() => 
        {
            let autocompleteText = UIStartUp.startUp.elements[9] as CustomPromptText
            UIStartUp.autocompleteNum = parseInt(autocompleteText.text.value)

            if (UIStartUp.autocompleteNum > 0)
            {
                UIStartUp.sounds.playLessBooster()

                UIStartUp.autocompleteNum--;
                autocompleteText.text.value = UIStartUp.autocompleteNum.toString()
                this.updateButtonText()
            }
        })

        UIStartUp.startUp.addText('0', 0, 35, Color4.Black(), 30)
        UIStartUp.startUp.addIcon("images/plus.png", 100, 25, 50, 50, { sourceWidth: 550, sourceHeight: 550 }).image.onClick = new OnClick(() => 
        {
            let autocompleteText = UIStartUp.startUp.elements[9] as CustomPromptText
            UIStartUp.autocompleteNum = parseInt(autocompleteText.text.value)

            if (UIStartUp.autocompleteNum + UIStartUp.autocutNum < 3)
            {
                UIStartUp.sounds.playMoreBooster()

                UIStartUp.autocompleteNum++;
                autocompleteText.text.value = UIStartUp.autocompleteNum.toString()
                this.updateButtonText()
            }
        })

        UIStartUp.startUp.addText('50/50 booster', 0, -25, Color4.Black(), 25)
        UIStartUp.startUp.addText(UICallback.properties.getComponent(UIPropertiesComponent).autocutPrice.toString(), -65, -52, new Color4(1.0, 0.15, 0.3, 1.0), 20)
        UIStartUp.startUp.addText('MANA each', 25, -52, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIStartUp.startUp.addIcon("images/minus.png", -100, -110, 50, 50, { sourceWidth: 550, sourceHeight: 550 }).image.onClick = new OnClick(() => 
        {
            let autocompleteText = UIStartUp.startUp.elements[15] as CustomPromptText
            UIStartUp.autocutNum = parseInt(autocompleteText.text.value)

            if (UIStartUp.autocutNum > 0)
            {
                UIStartUp.sounds.playLessBooster()

                UIStartUp.autocutNum--;
                autocompleteText.text.value = UIStartUp.autocutNum.toString()
                this.updateButtonText()
            }
        })

        UIStartUp.startUp.addText('0', 0, -100, Color4.Black(), 30)
        UIStartUp.startUp.addIcon("images/plus.png", 100, -110, 50, 50, { sourceWidth: 550, sourceHeight: 550 }).image.onClick = new OnClick(() => 
        {
            let autocompleteText = UIStartUp.startUp.elements[15] as CustomPromptText
            UIStartUp.autocutNum = parseInt(autocompleteText.text.value)

            if (UIStartUp.autocompleteNum + UIStartUp.autocutNum < 3)
            {
                UIStartUp.sounds.playMoreBooster()

                UIStartUp.autocutNum++;
                autocompleteText.text.value = UIStartUp.autocutNum.toString()
                this.updateButtonText()
            }
        })

        UIStartUp.startUp.addButton("", 0, -210,
            () =>
            {
                this.joinTheQuiz()
            }, ButtonStyles.CUSTOM, new Texture("images/button_back.png"), 450, 120, 1450, 400, true)

        UIStartUp.startUp.addIcon("images/e.png", -155, -195, 40, 40, { sourceWidth: 400, sourceHeight: 400 })
        UIStartUp.startUp.addText('Join without boosters', 35, -185, Color4.White(), 25).text.isPointerBlocker = false

        UIStartUp.startUp.close()
    }

    private updateButtonText(): void
    {
        let buttonText = UIStartUp.startUp.elements[19] as CustomPromptText
        let uiPropertiesComp = UICallback.properties.getComponent(UIPropertiesComponent)

        UIStartUp.boostersToBuyValue = uiPropertiesComp.autocompletePrice * UIStartUp.autocompleteNum + uiPropertiesComp.autocutPrice * UIStartUp.autocutNum

        if (uiPropertiesComp.member)
        {
            UIStartUp.boostersToBuyValue /= 2;
        }

        if (UIStartUp.autocompleteNum + UIStartUp.autocutNum > 0)
        {
            buttonText.text.value = "Join and spend " + UIStartUp.boostersToBuyValue.toString() + " MANA"
        }
        else
        {
            buttonText.text.value = "Join without boosters"
        }
    }

    private joinTheQuiz(): void
    {
        if (UIStartUp.autocompleteNum + UIStartUp.autocutNum > 0)
        {
            this.checkBuyBoosters()
        }
        else
        {
            UIStartUp.uiCallback.hideAllWindows()
            AppCallback.dappClientSocket.join()
        }
    }

    public buyBoosters(): void
    {
        if (!UIStartUp.shallBuyBoosters)
        {
            return
        }

        UIStartUp.boostersBuy.buyBoosters(UIStartUp.boostersToBuyValue, UIStartUp.autocompleteNum, UIStartUp.autocutNum)
    }

    private checkBuyBoosters(): void
    {
        if (UIStartUp.maticBalance < UIStartUp.boostersToBuyValue)
        {
            UIStartUp.uiCallback.showNotEnoughManaFundsError()
        }
        else
        {
            UIStartUp.shallBuyBoosters = true
            AppCallback.dappClientSocket.join()
        }
    }

    public updateAutocompletePrice(): void
    {
        let valueText = UIStartUp.startUp.elements[6] as CustomPromptText
        let uiPropertiesComp = UICallback.properties.getComponent(UIPropertiesComponent)
        let value = uiPropertiesComp.autocompletePrice

        if (uiPropertiesComp.member)
        {
            value /= 2;
        }

        let valueStr = value.toString()

        valueText.text.value = valueStr == "Infinity" ? "Inf" : valueStr
    }

    public updateAutocutPrice(): void
    {
        let valueText = UIStartUp.startUp.elements[12] as CustomPromptText
        let uiPropertiesComp = UICallback.properties.getComponent(UIPropertiesComponent)
        let value = uiPropertiesComp.autocutPrice

        if (uiPropertiesComp.member)
        {
            value /= 2;
        }

        let valueStr = value.toString()

        valueText.text.value = valueStr == "Infinity" ? "Inf" : valueStr
    }

    public updateTimer(): void
    {
        let valueText = UIStartUp.startUp.elements[1] as CustomPromptText
        let value = UICallback.properties.getComponent(UIPropertiesComponent).timeToQuizStart

        valueText.text.value = value
    }

    public reopen(): void
    {
        UIStartUp.shallBuyBoosters = false
        UIStartUp.autocompleteNum = 0
        UIStartUp.autocutNum = 0
        UIStartUp.boostersToBuyValue = 0

        let autocompleteText = UIStartUp.startUp.elements[9] as CustomPromptText
        let autocutText = UIStartUp.startUp.elements[15] as CustomPromptText

        autocompleteText.text.value = "0"
        autocutText.text.value = "0"

        this.updateButtonText()

        UIStartUp.membership.checkMembership()

        const balancePromise = executeTask(async () =>
        {
            const balance = await UIStartUp.general.getMaticBalance()

            let valueMaticText = UIStartUp.startUp.elements[4] as CustomPromptText

            let balanceMaticStr = balance.l2.toString()
            let dotMaticIndex = balanceMaticStr.indexOf(".")

            UIStartUp.maticBalance = balance.l2
            valueMaticText.text.value = "Your matic balance:  " + balanceMaticStr.substr(0, dotMaticIndex > 0 ? dotMaticIndex : balanceMaticStr.length) + "  MANA"
        })

        balancePromise.then()

        UIStartUp.startUp.reopen()
    }

    public close(): void
    {
        UIStartUp.startUp.close()
    }
}