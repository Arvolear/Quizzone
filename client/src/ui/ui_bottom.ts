import { setSection } from "../../node_modules/@dcl/ui-utils/utils/resources"
import { Delay } from "../../node_modules/@dcl/ui-utils/utils/timerComponents"
import { UICallback } from "../app/ui_callback"

export class UIBottom
{
    private static bottomRect: UIContainerRect

    private static topUpButton: UIImage    
    private static autocompleteButton: UIImage
    private static autocutButton: UIImage

    private static hourglassImage: UIImage
    private static tickImage: UIImage

    private static uiCallback: UICallback

    constructor(ui: UICallback)
    {
        UIBottom.uiCallback = ui

        this.configBottom()
    }

    private configBottom(): void
    {
        UIBottom.bottomRect = new UIContainerRect(UICallback.canvas)
        UIBottom.bottomRect.adaptHeight = true
        UIBottom.bottomRect.adaptWidth = true
        UIBottom.bottomRect.width = "100%"
        UIBottom.bottomRect.vAlign = "bottom"

        let atlasPath = "images/atlas.png"
        let atlasTexture = new Texture(atlasPath);

        UIBottom.topUpButton = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.topUpButton.isPointerBlocker = true
        UIBottom.topUpButton.hAlign = "left"
        setSection(UIBottom.topUpButton, { sourceLeft: 53, sourceTop: 547, sourceWidth: 790, sourceHeight: 190 })
        UIBottom.topUpButton.positionY = "-10px"
        UIBottom.topUpButton.width = 166
        UIBottom.topUpButton.height = 40
        UIBottom.topUpButton.onClick = new OnClick(UIBottom.uiCallback.showTopUp)
        UIBottom.topUpButton.opacity = 0.9 

        UIBottom.autocompleteButton = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.autocompleteButton.isPointerBlocker = true
        UIBottom.autocompleteButton.hAlign = "center"
        setSection(UIBottom.autocompleteButton, { sourceLeft: 566, sourceTop: 137, sourceWidth: 500, sourceHeight: 230 })
        UIBottom.autocompleteButton.positionX = "-100px"
        UIBottom.autocompleteButton.positionY = "5px"
        UIBottom.autocompleteButton.width = 152
        UIBottom.autocompleteButton.height = 70
        UIBottom.autocompleteButton.onClick = new OnClick(UIBottom.uiCallback.showAutocompleteWindow)
        UIBottom.autocompleteButton.opacity = 0.9

        UIBottom.autocutButton = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.autocutButton.isPointerBlocker = true
        UIBottom.autocutButton.hAlign = "center"
        setSection(UIBottom.autocutButton, { sourceLeft: 51, sourceTop: 137, sourceWidth: 500, sourceHeight: 230 })
        UIBottom.autocutButton.positionX = "100px"
        UIBottom.autocutButton.positionY = "5px"
        UIBottom.autocutButton.width = 152
        UIBottom.autocutButton.height = 70
        UIBottom.autocutButton.onClick = new OnClick(UIBottom.uiCallback.showAutocutWindow)
        UIBottom.autocutButton.opacity = 0.9

        UIBottom.hourglassImage = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.hourglassImage.hAlign = "right"
        setSection(UIBottom.hourglassImage, { sourceLeft: 230, sourceTop: 740, sourceWidth: 200, sourceHeight: 180 })
        UIBottom.hourglassImage.positionY = "10px"
        UIBottom.hourglassImage.width = 78
        UIBottom.hourglassImage.height = 70
        UIBottom.hourglassImage.opacity = 0.95

        UIBottom.tickImage = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.tickImage.hAlign = "right"
        setSection(UIBottom.tickImage, { sourceLeft: 455, sourceTop: 740, sourceWidth: 200, sourceHeight: 180 })
        UIBottom.tickImage.positionY = "10px"
        UIBottom.tickImage.width = 78
        UIBottom.tickImage.height = 70
        UIBottom.tickImage.opacity = 0.95

        UIBottom.tickImage.visible = false
        UIBottom.hourglassImage.visible = false
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

    public showAutocutButton(): void
    {
        UIBottom.autocutButton.visible = true
    }

    public hideAutocutButton(): void
    {
        UIBottom.autocutButton.visible = false
    }
}