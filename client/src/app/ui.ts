import { DappClientSocket } from "./dapp_client_socket";
import { getUserData } from "@decentraland/Identity"
import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types";
import { UIPropertiesComponent } from "../components/ui_properties_component";
import { CustomPromptText } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index";

export class UI 
{
    private static ui: UI

    private static properties: Entity

    private static canvas: UICanvas
    private static dappClientSocket: DappClientSocket
    
    private static autocompleter: ui.CustomPrompt
    private static checkMetamask: ui.CustomPrompt
    private static fundsError: ui.CustomPrompt

    private static bottomRect: UIContainerRect
    private static autocompleteButton: UIImage

    private static myWallet = "0xEd498E75d471C3b874461a87Bb7146453CC8175A"
    // private static myWallet = "0x0704675A283396508c4C989570BC4b63D6e331B0"
    private static network = "goerli"

    private constructor()
    {
        UI.canvas = new UICanvas()                

        this.configureProperties()
        this.configInitialDisplay()
    }

    public static setClientSocket(dappClientSocket: DappClientSocket): void
    {
        UI.dappClientSocket = dappClientSocket;
    }

    public static getInstance(): UI
    {
        if (UI.ui == null)
        {
            UI.ui = new UI()
        }

        return UI.ui;
    }

    private configureProperties(): void
    {
        UI.properties = new Entity()

        UI.properties.addComponent(new UIPropertiesComponent())

        engine.addEntity(UI.properties)
    }

    private configInitialDisplay(): void
    {        
        this.configError()           
        this.configCheckMetamask()      
        this.configAutocomplete()               
        this.configBottom()
    }    

    private configError(): void
    {
        UI.fundsError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UI.fundsError.addText('Error', 0, 153, Color4.Black(), 30)
        UI.fundsError.addText('Not enough funds', 0, 80, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UI.fundsError.addText('Please consider transferring', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 25)        
        UI.fundsError.addText('MANA to matic', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UI.fundsError.addButton(
            'Close',
            -0,
            -120,
            () =>
            {
                UI.closeConfirm()
            },
            ButtonStyles.F
        )

        UI.fundsError.close()
    }

    private configCheckMetamask(): void
    {
        UI.checkMetamask = new ui.CustomPrompt(PromptStyles.LIGHT)
        UI.checkMetamask.addText('Metamask', 0, 153, Color4.Black(), 30)
        UI.checkMetamask.addText('Please check Metamask', 0, 30, new Color4(0.24, 0.22, 0.25, 1.0), 30)

        UI.checkMetamask.addButton(
            'Close',
            -0,
            -120,
            () =>
            {
                UI.closeConfirm()
            },
            ButtonStyles.F
        )

        UI.checkMetamask.close()
    }

    private configAutocomplete(): void
    {
        UI.autocompleter = new ui.CustomPrompt(PromptStyles.LIGHT)
        UI.autocompleter.addText('Autocompleter', 0, 153, Color4.Black(), 30)
        UI.autocompleter.addText('Pay', -90, 80, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UI.autocompleter.addText(UI.properties.getComponent(UIPropertiesComponent).autocompletePrice.toString(), -20, 80, new Color4(1.0, 0.15, 0.3, 1.0), 33)
        UI.autocompleter.addText('MANA', 70, 80, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UI.autocompleter.addText('to autocomplete', 0, 30, new Color4(0.24, 0.22, 0.25, 1.0), 30)
        UI.autocompleter.addText('the question?', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 30)

        UI.autocompleter.addButton(
            'Yeah',
            -95,
            -120,
            () =>
            {
                UI.checkBuyAutocomplete()
            },
            ButtonStyles.E
        )

        UI.autocompleter.addButton(
            'Nope',
            95,
            -120,
            () =>
            {
                UI.closeConfirm()
            },
            ButtonStyles.F
        )        

        UI.autocompleter.close()
    }

    private configBottom(): void
    {
        UI.bottomRect = new UIContainerRect(UI.canvas)
        UI.bottomRect.adaptHeight = true
        UI.bottomRect.adaptWidth = true
        UI.bottomRect.width = "100%"
        UI.bottomRect.vAlign = "bottom"
        UI.bottomRect.opacity = 0.9

        let autocompletePath = "images/autocomplete.png"
        let autocompleteTexture = new Texture(autocompletePath);

        UI.autocompleteButton = new UIImage(UI.bottomRect, autocompleteTexture);
        UI.autocompleteButton.hAlign = "center"
        UI.autocompleteButton.sourceWidth = 3000
        UI.autocompleteButton.sourceHeight = 600
        UI.autocompleteButton.positionY = "-5px"
        UI.autocompleteButton.width = 300
        UI.autocompleteButton.height = 60
        UI.autocompleteButton.onClick = new OnClick(this.showConfirmAutocomplete)
    }

    public updateAutocompletePrice(): void
    {
        let valueText = UI.autocompleter.elements[2] as CustomPromptText
        let value = UI.properties.getComponent(UIPropertiesComponent).autocompletePrice.toString()

        valueText.text.value = value == "infinity" ? "inf" : value
    }

    public updateAutocutPrice(): void
    {
        // TODO
    }

    private showConfirmAutocomplete(): void
    {
        UI.canvas.isPointerBlocker = true         

        UI.autocompleter.reopen()
    }

    private static closeConfirm(): void
    {
        UI.canvas.isPointerBlocker = false        

        UI.autocompleter.close()
        UI.fundsError.close()
        UI.checkMetamask.close()
    }

    private static displayCheckMetamask(): void
    {
        UI.canvas.isPointerBlocker = true

        UI.autocompleter.close()
        UI.checkMetamask.reopen()
    }

    private static displayNotEnoughFunds(): void
    {
        UI.canvas.isPointerBlocker = true       

        UI.autocompleter.close()
        UI.fundsError.reopen()
    }

    private static buyAutocomplete(wallet): void
    {
        const sendAutocomplete = executeTask(async () =>
        {
            UI.properties.getComponent(UIPropertiesComponent).autocompleteVisible = false

            await matic.sendMana(UI.myWallet, UI.properties.getComponent(UIPropertiesComponent).autocompletePrice, true, UI.network).then(() => 
            {
                var toSend = "buy_autocomplete\n" + wallet

                UI.dappClientSocket.send(toSend)                  
            }).catch((e) => 
            {                   
                UI.properties.getComponent(UIPropertiesComponent).autocompleteVisible = true
            })
        })

        sendAutocomplete.then()
    }

    private static checkBuyAutocomplete(): void
    {
        const playerDataPromise = executeTask(async () =>
        {
            let data = await getUserData()
            let wallet = data.publicKey;

            return wallet
        })

        playerDataPromise.then((wallet) => 
        {
            const balancePromise = executeTask(async () =>
            {
                return await matic.balance(wallet, UI.network)
            })

            balancePromise.then((balance) => 
            {
                if (balance.l2 < UI.properties.getComponent(UIPropertiesComponent).autocompletePrice)
                {
                    UI.displayNotEnoughFunds()
                }
                else
                {                    
                    UI.buyAutocomplete(wallet)
                    UI.displayCheckMetamask()
                }
            });
        })
    }

    public showAutocomplete(): void
    {
        UI.autocompleteButton.visible = true
    }

    public hideAutocomplete(): void
    {        
        UI.autocompleteButton.visible = false
    }

    public showAutocut(): void
    {
        // UI.autocutButton.visible = true
    }

    public hideAutocut(): void
    {
        // UI.canvas.isPointerBlocker = false

        // UI.autocutter.close()
        // UI.fundsError.close()
        // UI.autocompleteButton.visible = false
    }

    public getProperties(): Entity
    {
        return UI.properties
    }
}