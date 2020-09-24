import { DappClientSocket } from "./dapp_client_socket";
import { getUserData } from "@decentraland/Identity"
import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'

export class UI 
{
    private static canvas: UICanvas
    private static dappClientSocket: DappClientSocket

    private static background: UIImage
    private static centralRect: UIContainerRect
    private static errorRect: UIContainerRect
    private static bottomRect: UIContainerRect

    constructor(dappClientSocket: DappClientSocket)
    {
        UI.canvas = new UICanvas()
        UI.dappClientSocket = dappClientSocket

        this.configInitialDisplay()
    }

    private configInitialDisplay(): void
    {
        UI.background = new UIImage(UI.canvas, null);        
        UI.background.width = "100%"
        UI.background.height = "100%"    
        UI.background.onClick = new OnClick(this.closeConfirm)
        UI.background.visible = false;        

        this.configCentral()
        this.configBottom()
        this.configError()
    }

    private configError(): void
    {
        UI.errorRect = new UIContainerRect(UI.canvas)
        UI.errorRect.adaptHeight = true
        UI.errorRect.adaptWidth = true
        UI.errorRect.width = "100%"
        UI.errorRect.vAlign = "center"

        let fundsPath = "images/not_enough_funds.png"
        let fundsTexture = new Texture(fundsPath);

        let errorDialog = new UIImage(UI.errorRect, fundsTexture);
        errorDialog.hAlign = "center"
        errorDialog.sourceWidth = 1920
        errorDialog.sourceHeight = 1080
        errorDialog.positionY = "50px"
        errorDialog.width = 533
        errorDialog.height = 300 

        let crossPath = "images/cross.png"
        let crossTexture = new Texture(crossPath);

        let crossButton = new UIImage(UI.errorRect, crossTexture);
        crossButton.hAlign = "center"
        crossButton.sourceWidth = 700
        crossButton.sourceHeight = 700
        crossButton.positionX = "222px"
        crossButton.positionY = "153px"
        crossButton.width = 35
        crossButton.height = 35
        crossButton.onClick = new OnClick(this.closeConfirm)

        UI.errorRect.visible = false;
    }

    private configCentral(): void
    {
        UI.centralRect = new UIContainerRect(UI.canvas)
        UI.centralRect.adaptHeight = true
        UI.centralRect.adaptWidth = true
        UI.centralRect.width = "100%"
        UI.centralRect.vAlign = "center"

        let confirmPath = "images/confirm.png"
        let confirmTexture = new Texture(confirmPath);

        let confirmDialog = new UIImage(UI.centralRect, confirmTexture);
        confirmDialog.hAlign = "center"
        confirmDialog.sourceWidth = 1920
        confirmDialog.sourceHeight = 1080
        confirmDialog.positionY = "50px"
        confirmDialog.width = 533
        confirmDialog.height = 300   

        let noPath = "images/no.png"
        let noTexture = new Texture(noPath);
        
        let noButton = new UIImage(UI.centralRect, noTexture);
        noButton.hAlign = "center"
        noButton.sourceWidth = 711
        noButton.sourceHeight = 400
        noButton.positionX = "-110px"
        noButton.width = 195
        noButton.height = 110
        noButton.onClick = new OnClick(this.closeConfirm)

        let yesPath = "images/yes.png"
        let yesTexture = new Texture(yesPath);

        let yesButton = new UIImage(UI.centralRect, yesTexture);
        yesButton.hAlign = "center"
        yesButton.sourceWidth = 711
        yesButton.sourceHeight = 400
        yesButton.positionX = "110px"
        yesButton.width = 195
        yesButton.height = 110
        yesButton.onClick = new OnClick(this.buy);

        let crossPath = "images/cross.png"
        let crossTexture = new Texture(crossPath);

        let crossButton = new UIImage(UI.centralRect, crossTexture);
        crossButton.hAlign = "center"
        crossButton.sourceWidth = 700
        crossButton.sourceHeight = 700
        crossButton.positionX = "222px"
        crossButton.positionY = "153px"
        crossButton.width = 35
        crossButton.height = 35
        crossButton.onClick = new OnClick(this.closeConfirm)

        UI.centralRect.visible = false
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

        let autocompleteButton = new UIImage(UI.bottomRect, autocompleteTexture);
        autocompleteButton.hAlign = "center"
        autocompleteButton.sourceWidth = 3000
        autocompleteButton.sourceHeight = 600
        autocompleteButton.positionY = "-5px"
        autocompleteButton.width = 300
        autocompleteButton.height = 60
        autocompleteButton.onClick = new OnClick(this.showConfirm)
    }

    private showConfirm(): void
    {     
        UI.canvas.isPointerBlocker = true
        UI.background.visible = true
        UI.background.opacity = 0.0;
        UI.centralRect.visible = true
        UI.bottomRect.visible = false        
    }

    private closeConfirm(): void
    {        
        UI.canvas.isPointerBlocker = false
        UI.background.visible = false
        UI.centralRect.visible = false
        UI.bottomRect.visible = true      
        UI.errorRect.visible = false;  
    }

    private static displayNotEnoughFunds(): void
    {
        UI.errorRect.visible = true;
    }

    private buy(): void
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
                return await matic.balance(wallet, "goerli")                
            })

            balancePromise.then((balance) => 
            {
                if (balance.l2 < 100)
                {
                    UI.displayNotEnoughFunds()
                }
            });
        })
    }
}