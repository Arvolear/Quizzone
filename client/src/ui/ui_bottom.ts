import { Delay } from "../../node_modules/@dcl/ui-utils/utils/timerComponents"
import { UI } from "./ui"

export class UIBottom
{
    private static bottomRect: UIContainerRect
    private static topUpButton: UIImage
    private static autocompleteButton: UIImage
    private static hourglassImage: UIImage
    private static tickImage: UIImage

    private static uiCallback: UI

    constructor(ui: UI)
    {
        UIBottom.uiCallback = ui

        this.configBottom()
    }

    private configBottom(): void
    {
        UIBottom.bottomRect = new UIContainerRect(UI.canvas)        
        UIBottom.bottomRect.adaptHeight = true
        UIBottom.bottomRect.adaptWidth = true
        UIBottom.bottomRect.width = "100%"
        UIBottom.bottomRect.vAlign = "bottom"

        let topUpPath = "images/top_up_matic.png"
        let topUpTexture = new Texture(topUpPath);

        UIBottom.topUpButton = new UIImage(UIBottom.bottomRect, topUpTexture);
        UIBottom.topUpButton.isPointerBlocker = true
        UIBottom.topUpButton.hAlign = "left"
        UIBottom.topUpButton.sourceWidth = 2400
        UIBottom.topUpButton.sourceHeight = 400
        UIBottom.topUpButton.positionY = "-10px"
        UIBottom.topUpButton.width = 180
        UIBottom.topUpButton.height = 30
        UIBottom.topUpButton.onClick = new OnClick(UIBottom.uiCallback.showTopUp)
        UIBottom.topUpButton.opacity = 0.9

        let autocompletePath = "images/autocomplete.png"
        let autocompleteTexture = new Texture(autocompletePath);

        UIBottom.autocompleteButton = new UIImage(UIBottom.bottomRect, autocompleteTexture);
        UIBottom.autocompleteButton.isPointerBlocker = true
        UIBottom.autocompleteButton.hAlign = "center"
        UIBottom.autocompleteButton.sourceWidth = 2800
        UIBottom.autocompleteButton.sourceHeight = 400
        UIBottom.autocompleteButton.positionY = "-5px"
        UIBottom.autocompleteButton.width = 280
        UIBottom.autocompleteButton.height = 40
        UIBottom.autocompleteButton.onClick = new OnClick(UIBottom.uiCallback.showAutocompleteWindow)
        UIBottom.autocompleteButton.opacity = 0.9

        let hourglassPath = "images/hourglass.png"
        let hourglassTexture = new Texture(hourglassPath);

        UIBottom.hourglassImage = new UIImage(UIBottom.bottomRect, hourglassTexture);
        UIBottom.hourglassImage.hAlign = "right"
        UIBottom.hourglassImage.sourceWidth = 350
        UIBottom.hourglassImage.sourceHeight = 350
        UIBottom.hourglassImage.positionY = "10px"
        UIBottom.hourglassImage.width = 80
        UIBottom.hourglassImage.height = 80
        UIBottom.hourglassImage.opacity = 0.95

        UIBottom.hourglassImage.visible = false

        let tickPath = "images/tick.png"
        let tickTexture = new Texture(tickPath);

        UIBottom.tickImage = new UIImage(UIBottom.bottomRect, tickTexture);
        UIBottom.tickImage.hAlign = "right"
        UIBottom.tickImage.sourceWidth = 350
        UIBottom.tickImage.sourceHeight = 350
        UIBottom.tickImage.positionY = "10px"
        UIBottom.tickImage.width = 70
        UIBottom.tickImage.height = 70
        UIBottom.tickImage.opacity = 0.95

        UIBottom.tickImage.visible = false
    }

    public showHourglass(): void
    {
        UIBottom.tickImage.visible = false
        UIBottom.hourglassImage.visible = true
    }

    public hideHourglass(): void
    {
        UIBottom.hourglassImage.visible = false
    }

    public showTick(duration: number): void
    {
        UIBottom.hourglassImage.visible = false
        UIBottom.tickImage.visible = true

        let dummyEntity = new Entity()
        engine.addEntity(dummyEntity)

        dummyEntity.addComponentOrReplace(new Delay(duration > 0 ? duration : 5, () =>
        {
            UIBottom.tickImage.visible = false
            engine.removeEntity(dummyEntity)
        }))
    }

    public hideTick(): void
    {
        UIBottom.tickImage.visible = false
    }
    
    public showAutocompleteButton(): void
    {
        UIBottom.autocompleteButton.visible = true
    }

    public hideAutocompleteButton(): void
    {
        UIBottom.autocompleteButton.visible = false
    }
}