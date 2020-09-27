import { DappClientSocket } from "./dapp_client_socket";
import { getUserData } from "@decentraland/Identity"
import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { ButtonStyles, PromptStyles } from "../../node_modules/@dcl/ui-utils/utils/types";
import { UIPropertiesComponent } from "../components/ui_properties_component";
import { CustomPromptText, CustomPromptTextBox } from "../../node_modules/@dcl/ui-utils/prompts/customPrompt/index";
import { Delay } from "../../node_modules/decentraland-ecs-utils/timer/component/delay";

export class UI 
{
    private static ui: UI

    private static properties: Entity

    private static canvas: UICanvas
    private static dappClientSocket: DappClientSocket

    private static autocompleter: ui.CustomPrompt
    private static checkMetamask: ui.CustomPrompt
    private static topUpMatic: ui.CustomPrompt
    private static fundsError: ui.CustomPrompt
    private static universalError: ui.CustomPrompt

    private static bottomRect: UIContainerRect
    private static topUpButton: UIImage
    private static autocompleteButton: UIImage
    private static hourglassImage: UIImage
    private static tickImage: UIImage

    private static playerWallet;
    private static myWallet = "0xEd498E75d471C3b874461a87Bb7146453CC8175A"
    private static network = "goerli"

    private constructor()
    {
        UI.canvas = new UICanvas()

        const playerDataPromise = executeTask(async () =>
        {
            let data = await getUserData()
            UI.playerWallet = data.publicKey;
        })

        playerDataPromise.then()

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
        this.configTopUp()
        this.configCheckMetamask()
        this.configAutocomplete()
        this.configBottom()
    }

    private configError(): void
    {
        UI.fundsError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UI.fundsError.addText('Error', 0, 153, Color4.Black(), 30)
        UI.fundsError.addText('Not enough funds', 0, 80, new Color4(1.0, 0.15, 0.3, 1.0), 30)
        UI.fundsError.addText('Please consider topping up', 0, 15, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UI.fundsError.addText('matic MANA', 0, -20, new Color4(0.24, 0.22, 0.25, 1.0), 25)

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

        UI.universalError = new ui.CustomPrompt(PromptStyles.LIGHT)
        UI.universalError.addText('Error', 0, 153, Color4.Black(), 30)
        UI.universalError.addText('', 0, 30, new Color4(1.0, 0.15, 0.3, 1.0), 35)

        UI.universalError.addButton(
            'Close',
            -0,
            -120,
            () =>
            {
                UI.closeTopUp()
            },
            ButtonStyles.F
        )

        UI.universalError.close()
    }

    private configTopUp(): void
    {
        UI.topUpMatic = new ui.CustomPrompt(PromptStyles.LIGHT)
        UI.topUpMatic.addText('Top up matic MANA', 0, 153, Color4.Black(), 30)
        UI.topUpMatic.addText('(takes 5-10 minutes)', 0, 135, Color4.Black(), 18)
        UI.topUpMatic.addText('Main balance:', 0, 90, new Color4(0.24, 0.22, 0.25, 1.0), 25)
        UI.topUpMatic.addText('Matic balance:', 0, 60, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UI.topUpMatic.addText('Amount:', -104, 13, new Color4(0.24, 0.22, 0.25, 1.0), 25)

        UI.topUpMatic.addTextBox(
            0,
            -37,
            "Enter MANA"
        )

        UI.topUpMatic.addButton(
            'Top up',
            -95,
            -120,
            () =>
            {
                UI.transferToMatic()
            },
            ButtonStyles.E
        )

        UI.topUpMatic.addButton(
            'Cancel',
            95,
            -120,
            () =>
            {
                UI.closeTopUp()
            },
            ButtonStyles.F
        )

        UI.topUpMatic.close()
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

        let topUpPath = "images/top_up_matic.png"
        let topUpTexture = new Texture(topUpPath);

        UI.topUpButton = new UIImage(UI.bottomRect, topUpTexture);
        UI.topUpButton.hAlign = "left"
        UI.topUpButton.sourceWidth = 2400
        UI.topUpButton.sourceHeight = 400
        UI.topUpButton.positionY = "-10px"
        UI.topUpButton.width = 180
        UI.topUpButton.height = 30
        UI.topUpButton.onClick = new OnClick(this.displayTopUp)
        UI.topUpButton.opacity = 0.9

        let autocompletePath = "images/autocomplete.png"
        let autocompleteTexture = new Texture(autocompletePath);

        UI.autocompleteButton = new UIImage(UI.bottomRect, autocompleteTexture);
        UI.autocompleteButton.hAlign = "center"
        UI.autocompleteButton.sourceWidth = 2800
        UI.autocompleteButton.sourceHeight = 400
        UI.autocompleteButton.positionY = "-5px"
        UI.autocompleteButton.width = 280
        UI.autocompleteButton.height = 40
        UI.autocompleteButton.onClick = new OnClick(this.displayConfirmAutocomplete)
        UI.autocompleteButton.opacity = 0.9

        let hourglassPath = "images/hourglass.png"
        let hourglassTexture = new Texture(hourglassPath);

        UI.hourglassImage = new UIImage(UI.bottomRect, hourglassTexture);
        UI.hourglassImage.hAlign = "right"
        UI.hourglassImage.sourceWidth = 350
        UI.hourglassImage.sourceHeight = 350
        UI.hourglassImage.positionY = "10px"
        UI.hourglassImage.width = 80
        UI.hourglassImage.height = 80
        UI.hourglassImage.opacity = 0.95

        UI.hourglassImage.visible = false

        let tickPath = "images/tick.png"
        let tickTexture = new Texture(tickPath);

        UI.tickImage = new UIImage(UI.bottomRect, tickTexture);
        UI.tickImage.hAlign = "right"
        UI.tickImage.sourceWidth = 350
        UI.tickImage.sourceHeight = 350
        UI.tickImage.positionY = "10px"
        UI.tickImage.width = 70
        UI.tickImage.height = 70
        UI.tickImage.opacity = 0.95

        UI.tickImage.visible = false
    }

    public updateAutocompletePrice(): void
    {
        let valueText = UI.autocompleter.elements[2] as CustomPromptText
        let value = UI.properties.getComponent(UIPropertiesComponent).autocompletePrice.toString()

        valueText.text.value = value == "Infinity" ? "inf" : value
    }

    public updateAutocutPrice(): void
    {
        // TODO
    }

    private displayTopUp(): void
    {
        UI.canvas.isPointerBlocker = true

        const balancePromise = executeTask(async () =>
        {
            return await matic.balance(UI.playerWallet, UI.network)
        })

        balancePromise.then((balance) => 
        {
            let valueMainText = UI.topUpMatic.elements[2] as CustomPromptText
            let valueMaticText = UI.topUpMatic.elements[3] as CustomPromptText

            let balanceMainStr = balance.l1.toString()
            let dotMainIndex = balanceMainStr.indexOf(".")

            let balanceMaticStr = balance.l2.toString()
            let dotMaticIndex = balanceMaticStr.indexOf(".")

            valueMainText.text.value = 'Main balance: ' + balanceMainStr.substr(0, dotMainIndex > 0 ? dotMainIndex : balanceMainStr.length) + ' MANA'
            valueMaticText.text.value = 'Matic balance: ' + balanceMaticStr.substr(0, dotMaticIndex > 0 ? dotMaticIndex : balanceMaticStr.length) + ' MANA'
        })

        UI.closeConfirm()
        UI.topUpMatic.reopen()
    }

    private displayConfirmAutocomplete(): void
    {
        UI.canvas.isPointerBlocker = true

        UI.closeTopUp()
        UI.autocompleter.reopen()
    }

    private static closeTopUp(): void
    {
        UI.universalError.close()
        UI.topUpMatic.close()
        UI.hourglassImage.visible = false
    }

    private static closeConfirm(): void
    {
        UI.canvas.isPointerBlocker = false

        UI.autocompleter.close()
        UI.fundsError.close()
        UI.checkMetamask.close()
        UI.hourglassImage.visible = false
    }

    private static displayCheckMetamask(): void
    {
        UI.canvas.isPointerBlocker = true

        UI.topUpMatic.close()
        UI.autocompleter.close()
        UI.checkMetamask.reopen()
    }

    private static displayNotEnoughFundsError(): void
    {
        UI.canvas.isPointerBlocker = true

        UI.autocompleter.close()
        UI.topUpMatic.close()
        UI.fundsError.reopen()
    }

    private static displayUniversalError(value: string): void
    {
        UI.canvas.isPointerBlocker = true

        UI.topUpMatic.close()
        UI.autocompleter.close()

        let text = UI.universalError.elements[1] as CustomPromptText
        text.text.value = value

        UI.universalError.reopen()
    }

    private static showHourglass(): void
    {
        UI.tickImage.visible = false
        UI.hourglassImage.visible = true
    }

    private static showTick(duration: number): void
    {
        UI.hourglassImage.visible = false
        UI.tickImage.visible = true

        let dummyEntity = new Entity()
        engine.addEntity(dummyEntity)

        dummyEntity.addComponentOrReplace(new Delay(duration > 0 ? duration * 1000 : 5000, () =>
        {
            UI.tickImage.visible = false
            engine.removeEntity(dummyEntity)
        }))
    }

    private static buyAutocomplete(): void
    {
        const sendAutocomplete = executeTask(async () =>
        {
            UI.properties.getComponent(UIPropertiesComponent).autocompleteVisible = false
            UI.showHourglass()

            await matic.sendMana(UI.myWallet, UI.properties.getComponent(UIPropertiesComponent).autocompletePrice, true, UI.network).then(() => 
            {
                var toSend = "buy_autocomplete\n" + UI.playerWallet
                UI.dappClientSocket.send(toSend)

                UI.closeConfirm()
                UI.showTick(8)
            }).catch((e) => 
            {
                UI.properties.getComponent(UIPropertiesComponent).autocompleteVisible = true
                UI.closeConfirm()
            })
        })

        sendAutocomplete.then()
    }

    private static checkBuyAutocomplete(): void
    {
        const balancePromise = executeTask(async () =>
        {
            return await matic.balance(UI.playerWallet, UI.network)
        })

        balancePromise.then((balance) => 
        {
            if (balance.l2 < UI.properties.getComponent(UIPropertiesComponent).autocompletePrice)
            {
                UI.displayNotEnoughFundsError()
            }
            else
            {
                UI.buyAutocomplete()
                UI.displayCheckMetamask()
            }
        });
    }

    private static transferToMatic(): void
    {
        let valueText = UI.topUpMatic.elements[2] as CustomPromptText
        let valueTextBox = UI.topUpMatic.elements[5] as CustomPromptTextBox

        let firstSpace = valueText.text.value.indexOf(' ')
        let lastSpace = valueText.text.value.lastIndexOf(' ')

        let amount = parseFloat(valueTextBox.currentText)
        let balance = parseFloat(valueText.text.value.substr(firstSpace + 1, lastSpace - firstSpace - 1))

        if (isNaN(amount) || amount <= 0)
        {
            UI.displayUniversalError("Wrong input")
            return
        }

        if (amount > balance)
        {
            UI.displayUniversalError("Not enough funds")
            return
        }

        const topUp = executeTask(async () =>
        {
            UI.displayCheckMetamask()
            UI.showHourglass()

            await matic.depositMana(amount, UI.network).then(() => 
            {
                UI.showTick(16)
            }).catch(() => 
            {
                UI.closeTopUp()
            })
        })

        topUp.then()
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

    }

    public hideAutocut(): void
    {

    }

    public getProperties(): Entity
    {
        return UI.properties
    }
}