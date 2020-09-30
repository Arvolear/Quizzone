import * as ui from '../../node_modules/@dcl/ui-utils/index'
import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import { UIPropertiesComponent } from "../components/ui_properties_component";
import { DappClientSocket } from "../app/dapp_client_socket";
import { UI } from './ui';
import { ButtonStyles, PromptStyles } from '../../node_modules/@dcl/ui-utils/utils/types';
import { CustomPromptText } from '../../node_modules/@dcl/ui-utils/prompts/customPrompt/index';

export class UIStartUp
{    
    private static dappClientSocket: DappClientSocket

    private static startUp: ui.CustomPrompt            
    private static fundsError: ui.CustomPrompt    

    private static uiCallback: UI

    private static autocompleteNum: number
    private static autocutNum: number
    private static boostersToBuyValue: number

    constructor(ui: UI)
    {
        UIStartUp.uiCallback = ui
        UIStartUp.autocompleteNum = 0
        UIStartUp.autocutNum = 0
        UIStartUp.boostersToBuyValue = 0

        this.configError()
        this.configStartUp()
    }

    public static setClientSocket(dappClientSocket: DappClientSocket): void
    {
        UIStartUp.dappClientSocket = dappClientSocket;
    }

    private configError(): void
    {
        UIStartUp.fundsError = new ui.CustomPrompt(PromptStyles.LIGHT)
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
        UIStartUp.startUp.addText('Let\'s start!', 0, 225, Color4.Black(), 35)

        UIStartUp.startUp.addText('Maximum 3 boosters per quiz are allowed', 0, 190, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIStartUp.startUp.addText('The unused ones will be burned', 0, 170, new Color4(0.24, 0.22, 0.25, 1.0), 20)

        UIStartUp.startUp.addText('Autocomplete question booster', 0, 130, Color4.Black(), 25)
        UIStartUp.startUp.addText(UI.properties.getComponent(UIPropertiesComponent).autocompletePrice.toString(), -65, 105, new Color4(1.0, 0.15, 0.3, 1.0), 20)
        UIStartUp.startUp.addText('MANA each', 25, 105, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIStartUp.startUp.addIcon("images/minus.png", -100, 45, 50, 50, { sourceWidth: 550, sourceHeight: 550 }).image.onClick = new OnClick(() => 
        {
            let autocompleteText = UIStartUp.startUp.elements[7] as CustomPromptText
            UIStartUp.autocompleteNum = parseInt(autocompleteText.text.value)

            if (UIStartUp.autocompleteNum > 0)
            {
                UIStartUp.autocompleteNum--;
                autocompleteText.text.value = UIStartUp.autocompleteNum.toString()
                this.updateButtonText()
            }
        })

        UIStartUp.startUp.addText('0', 0, 55, Color4.Black(), 30)
        UIStartUp.startUp.addIcon("images/plus.png", 100, 45, 50, 50, { sourceWidth: 550, sourceHeight: 550 }).image.onClick = new OnClick(() => 
        {
            let autocompleteText = UIStartUp.startUp.elements[7] as CustomPromptText
            UIStartUp.autocompleteNum = parseInt(autocompleteText.text.value)

            if (UIStartUp.autocompleteNum + UIStartUp.autocutNum < 3)
            {
                UIStartUp.autocompleteNum++;
                autocompleteText.text.value = UIStartUp.autocompleteNum.toString()
                this.updateButtonText()
            }
        })

        UIStartUp.startUp.addText('50/50 booster', 0, -10, Color4.Black(), 25)
        UIStartUp.startUp.addText(UI.properties.getComponent(UIPropertiesComponent).autocutPrice.toString(), -65, -35, new Color4(1.0, 0.15, 0.3, 1.0), 20)
        UIStartUp.startUp.addText('MANA each', 25, -35, new Color4(0.24, 0.22, 0.25, 1.0), 20)
        UIStartUp.startUp.addIcon("images/minus.png", -100, -95, 50, 50, { sourceWidth: 550, sourceHeight: 550 }).image.onClick = new OnClick(() => 
        {
            let autocompleteText = UIStartUp.startUp.elements[13] as CustomPromptText
            UIStartUp.autocutNum = parseInt(autocompleteText.text.value)

            if (UIStartUp.autocutNum > 0)
            {
                UIStartUp.autocutNum--;
                autocompleteText.text.value = UIStartUp.autocutNum.toString()
                this.updateButtonText()
            }
        })

        UIStartUp.startUp.addText('0', 0, -85, Color4.Black(), 30)
        UIStartUp.startUp.addIcon("images/plus.png", 100, -95, 50, 50, { sourceWidth: 550, sourceHeight: 550 }).image.onClick = new OnClick(() => 
        {
            let autocompleteText = UIStartUp.startUp.elements[13] as CustomPromptText
            UIStartUp.autocutNum = parseInt(autocompleteText.text.value)

            if (UIStartUp.autocompleteNum + UIStartUp.autocutNum < 3)
            {
                UIStartUp.autocutNum++;
                autocompleteText.text.value = UIStartUp.autocutNum.toString()
                this.updateButtonText()
            }
        })

        UIStartUp.startUp.addButton("", 0, -200,
            () =>
            {
                this.joinTheQuiz()
            }, ButtonStyles.CUSTOM, new Texture("images/button_back.png"), 450, 120, 1450, 400, true)

        UIStartUp.startUp.addIcon("images/e.png", -155, -185, 40, 40, { sourceWidth: 400, sourceHeight: 400 })
        UIStartUp.startUp.addText('Join without boosters', 35, -175, Color4.White(), 25)

        UIStartUp.startUp.close()
    }

    private updateButtonText(): void
    {
        let buttonText = UIStartUp.startUp.elements[17] as CustomPromptText

        UIStartUp.boostersToBuyValue = UI.properties.getComponent(UIPropertiesComponent).autocompletePrice * UIStartUp.autocompleteNum +
                    UI.properties.getComponent(UIPropertiesComponent).autocutPrice * UIStartUp.autocutNum           

        if (UIStartUp.autocompleteNum + UIStartUp.autocutNum > 0)
        {
            buttonText.text.value = "Spend " + UIStartUp.boostersToBuyValue.toString() + " MANA and join"
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
            UIStartUp.uiCallback.showCheckMetamask()
            UIStartUp.checkBuyBoosters()
        }
        else
        {            
            UIStartUp.uiCallback.hideAllWindows()
            UIStartUp.dappClientSocket.join()
        }
    }

    private static buyBoosters(): void
    {
        const sendAutocomplete = executeTask(async () =>
        {            
            UIStartUp.uiCallback.showHourglass()

            await matic.sendMana(DappClientSocket.myWallet, UI.properties.getComponent(UIPropertiesComponent).autocompletePrice, true, DappClientSocket.network).then(() => 
            {
                var toSend = "buy_boosters\n" + 
                    UIStartUp.autocompleteNum + "\n" + 
                    UIStartUp.autocutNum + "\n" +
                    DappClientSocket.playerWallet

                UIStartUp.dappClientSocket.send(toSend)
                UIStartUp.dappClientSocket.join()

                UIStartUp.uiCallback.hideStartUp()
                UIStartUp.uiCallback.showTick(8)
            }).catch((e) => 
            {                
                UIStartUp.uiCallback.hideStartUp()
            })
        })

        sendAutocomplete.then()
    }

    private static checkBuyBoosters(): void
    {
        const balancePromise = executeTask(async () =>
        {
            return await matic.balance(DappClientSocket.playerWallet, DappClientSocket.network)
        })

        balancePromise.then((balance) => 
        {
            if (balance.l2 < UI.properties.getComponent(UIPropertiesComponent).autocompletePrice)
            {
                UIStartUp.uiCallback.showNotEnoughFundsError()
            }
            else
            {
                UIStartUp.buyBoosters()
                UIStartUp.uiCallback.showCheckMetamask()
            }
        });
    }

    public updateAutocompletePrice(): void
    {
        let valueText = UIStartUp.startUp.elements[4] as CustomPromptText
        let value = UI.properties.getComponent(UIPropertiesComponent).autocompletePrice.toString()

        valueText.text.value = value == "Infinity" ? "Inf" : value
    }

    public updateAutocutPrice(): void
    {    
        let valueText = UIStartUp.startUp.elements[10] as CustomPromptText
        let value = UI.properties.getComponent(UIPropertiesComponent).autocutPrice.toString()

        valueText.text.value = value == "Infinity" ? "Inf" : value
    }

    public reopen(): void
    {
        UIStartUp.startUp.reopen()        
    }

    public close(): void
    {
        UIStartUp.startUp.close()
        UIStartUp.fundsError.close()
    }

    public showNotEnoughFundsError(): void
    {
        UIStartUp.startUp.close()
        UIStartUp.fundsError.reopen()
    }
}