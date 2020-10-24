import { UICallback } from "../app/ui_callback"
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import { UIPropertiesComponent } from "../components/ui_properties_component";
import { DappClientSocket } from "../app/dapp_client_socket";
import { ButtonStyles, PromptStyles } from '../../node_modules/@dcl/ui-utils/utils/types';
import { CustomPromptText } from '../../node_modules/@dcl/ui-utils/prompts/customPrompt/index';
import { UIMember } from './ui_member';

export class UIStartUp
{
    private static startUp: ui.CustomPrompt
    private static fundsError: ui.CustomPrompt

    private static uiCallback: UICallback

    private static maticBalance: number
    private static autocompleteNum: number
    private static autocutNum: number
    private static boostersToBuyValue: number

    constructor(ui: UICallback)
    {
        UIStartUp.uiCallback = ui
        UIStartUp.maticBalance = 0
        UIStartUp.autocompleteNum = 0
        UIStartUp.autocutNum = 0        
        UIStartUp.boostersToBuyValue = 0

        this.configError()
        this.configStartUp()
    }   

    private configError(): void
    {
        UIStartUp.fundsError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UIStartUp.fundsError.background.isPointerBlocker = true

        UIStartUp.fundsError.addText('Error', 0, 153, Color4.Black(), 30)
        UIStartUp.fundsError.addText('Not enough funds', 0, 80, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UIStartUp.fundsError.addText('Please consider topping up', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UIStartUp.fundsError.addText('matic MANA', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UIStartUp.fundsError.addButton(
            'Close',
            -0,
            -120,
            () =>
            {
                UIStartUp.uiCallback.hideStartUp()
            },
            ButtonStyles.F
        )

        UIStartUp.fundsError.close()
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
            UIStartUp.checkBuyBoosters()              
        }
        else
        {
            UICallback.properties.getComponent(UIPropertiesComponent).canJoin = false
            UIStartUp.uiCallback.hideAllWindows()        
            UICallback.dappClientSocket.join()
        }
    }

    private static buyBoosters(): void
    {
        const sendAutocomplete = executeTask(async () =>
        {            
            UIStartUp.uiCallback.showHourglass()
            UICallback.dappClientSocket.join()

            await matic.sendMana(DappClientSocket.myWallet, UIStartUp.boostersToBuyValue, true, DappClientSocket.network).then(() => 
            {                            
                var toSend = "buy_boosters\n" +
                    UIStartUp.autocompleteNum + "\n" +
                    UIStartUp.autocutNum + "\n" +
                    DappClientSocket.playerWallet

                UICallback.dappClientSocket.send(toSend)                

                UIStartUp.uiCallback.hideAllWindows()
                UIStartUp.uiCallback.showTick(8)
            }).catch((e) => 
            {                                                              
                UIStartUp.uiCallback.hideHourglass()
                UIStartUp.uiCallback.hideAllWindows()
            })
        })

        sendAutocomplete.then()
    }

    private static checkBuyBoosters(): void
    {
        if (UIStartUp.maticBalance < UIStartUp.boostersToBuyValue)
        {
            UIStartUp.uiCallback.showNotEnoughManaFundsError()
        }
        else
        {
            UICallback.properties.getComponent(UIPropertiesComponent).canJoin = false
            UIStartUp.buyBoosters()            
            UIStartUp.uiCallback.showCheckMetamask()
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
        UIStartUp.autocompleteNum = 0
        UIStartUp.autocutNum = 0
        UIStartUp.boostersToBuyValue = 0

        let autocompleteText = UIStartUp.startUp.elements[9] as CustomPromptText
        let autocutText = UIStartUp.startUp.elements[15] as CustomPromptText

        autocompleteText.text.value = "0"
        autocutText.text.value = "0"

        UIMember.checkMembership()

        const balancePromise = executeTask(async () =>
        {
            return await matic.balance(DappClientSocket.playerWallet, DappClientSocket.network)
        })

        balancePromise.then((balance) => 
        {
            let valueMaticText = UIStartUp.startUp.elements[4] as CustomPromptText

            let balanceMaticStr = balance.l2.toString()
            let dotMaticIndex = balanceMaticStr.indexOf(".")

            UIStartUp.maticBalance = balance.l2
            valueMaticText.text.value = "Your matic balance:  " + balanceMaticStr.substr(0, dotMaticIndex > 0 ? dotMaticIndex : balanceMaticStr.length) + "  MANA"
        })

        UIStartUp.startUp.reopen()
    }

    public close(): void
    {
        UIStartUp.startUp.close()
        UIStartUp.fundsError.close()
    }

    public showNotEnoughManaFundsError(): void
    {
        UIStartUp.startUp.close()
        UIStartUp.fundsError.reopen()
    }
}