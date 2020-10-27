import { setSection } from "../../node_modules/@dcl/ui-utils/utils/resources"
import { Delay } from "../../node_modules/@dcl/ui-utils/utils/timerComponents"
import { UICallback } from "../app/ui_callback"

export class UIBottom
{
    private static bottomRect: UIContainerRect

    private static topUpButton: UIImage
    private static howToPlayButton: UIImage
    private static autocompleteButton: UIImage
    private static autocutButton: UIImage
    private static leaveButton: UIImage

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
        UIBottom.topUpButton.hAlign = "center"
        setSection(UIBottom.topUpButton, { sourceLeft: 53, sourceTop: 547, sourceWidth: 790, sourceHeight: 190 })
        UIBottom.topUpButton.positionX = "-70px"
        UIBottom.topUpButton.positionY = "-10px"
        UIBottom.topUpButton.width = 145
        UIBottom.topUpButton.height = 35
        UIBottom.topUpButton.onClick = new OnClick(UIBottom.uiCallback.showTopUp)
        UIBottom.topUpButton.opacity = 0.9

        UIBottom.howToPlayButton = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.howToPlayButton.isPointerBlocker = true
        UIBottom.howToPlayButton.hAlign = "center"
        setSection(UIBottom.howToPlayButton, { sourceLeft: 53, sourceTop: 363, sourceWidth: 790, sourceHeight: 190 })
        UIBottom.howToPlayButton.positionX = "70px"
        UIBottom.howToPlayButton.positionY = "-10px"
        UIBottom.howToPlayButton.width = 145
        UIBottom.howToPlayButton.height = 35
        UIBottom.howToPlayButton.onClick = new OnClick(UIBottom.uiCallback.showHowToPlay)
        UIBottom.howToPlayButton.opacity = 0.9

        UIBottom.autocompleteButton = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.autocompleteButton.isPointerBlocker = true
        UIBottom.autocompleteButton.hAlign = "center"
        setSection(UIBottom.autocompleteButton, { sourceLeft: 561, sourceTop: 137, sourceWidth: 490, sourceHeight: 230 })
        UIBottom.autocompleteButton.positionX = "-60px"
        UIBottom.autocompleteButton.positionY = "-5px"
        UIBottom.autocompleteButton.width = 106
        UIBottom.autocompleteButton.height = 50
        UIBottom.autocompleteButton.onClick = new OnClick(UIBottom.uiCallback.showAutocompleteWindow)
        UIBottom.autocompleteButton.opacity = 0.9

        UIBottom.autocutButton = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.autocutButton.isPointerBlocker = true
        UIBottom.autocutButton.hAlign = "center"
        setSection(UIBottom.autocutButton, { sourceLeft: 56, sourceTop: 137, sourceWidth: 490, sourceHeight: 230 })
        UIBottom.autocutButton.positionX = "55px"
        UIBottom.autocutButton.positionY = "-5px"
        UIBottom.autocutButton.width = 106
        UIBottom.autocutButton.height = 50
        UIBottom.autocutButton.onClick = new OnClick(UIBottom.uiCallback.showAutocutWindow)
        UIBottom.autocutButton.opacity = 0.9

        UIBottom.leaveButton = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.leaveButton.isPointerBlocker = true
        UIBottom.leaveButton.hAlign = "right"
        setSection(UIBottom.leaveButton, { sourceLeft: 680, sourceTop: 740, sourceWidth: 200, sourceHeight: 180 })
        UIBottom.leaveButton.positionX = "-45px"
        UIBottom.leaveButton.positionY = "-7px"
        UIBottom.leaveButton.width = 39
        UIBottom.leaveButton.height = 35
        UIBottom.leaveButton.onClick = new OnClick(UIBottom.uiCallback.showLeaveWindow)
        UIBottom.leaveButton.opacity = 0.95

        UIBottom.hourglassImage = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.hourglassImage.hAlign = "right"
        setSection(UIBottom.hourglassImage, { sourceLeft: 230, sourceTop: 740, sourceWidth: 200, sourceHeight: 180 })
        UIBottom.hourglassImage.positionX = "0px"
        UIBottom.hourglassImage.positionY = "-7px"
        UIBottom.hourglassImage.width = 39
        UIBottom.hourglassImage.height = 35
        UIBottom.hourglassImage.opacity = 0.95

        UIBottom.tickImage = new UIImage(UIBottom.bottomRect, atlasTexture);
        UIBottom.tickImage.hAlign = "right"
        setSection(UIBottom.tickImage, { sourceLeft: 455, sourceTop: 740, sourceWidth: 200, sourceHeight: 180 })
        UIBottom.tickImage.positionX = "0px"
        UIBottom.tickImage.positionY = "-7px"
        UIBottom.tickImage.width = 39
        UIBottom.tickImage.height = 35
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

    public showControlButtons(): void
    {
        UIBottom.topUpButton.visible = true
        UIBottom.howToPlayButton.visible = true
    }

    public hideControlButtons(): void
    {
        UIBottom.topUpButton.visible = false
        UIBottom.howToPlayButton.visible = false
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

    public showLeaveButton(): void
    {
        UIBottom.leaveButton.visible = true
    }

    public hideLeaveButton(): void
    {
        UIBottom.leaveButton.visible = false
    }
}