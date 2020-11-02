import { ButtonComponent } from "../components/button_component"
import { BlockComponent } from "../components/block_component"
import { CentralScreenComponent } from "../components/central_screen_component"
import { TopPartyScreenComponent } from "../components/top_party_screen_component"
import { Button } from "../entities/button"
import { LifetimeBestScreenComponent } from "../components/lifetime_best_screen_component"
import { Sounds } from "../app/sounds"

export class ButtonStandTrackerSystem implements ISystem
{
    private sounds: Sounds

    private buttonsGroup: Array<Button>

    private lifeTimeBestScreenMain: IEntity
    private topPartyScreenMain: IEntity
    private centralScreenMain: IEntity

    private static DISTANCE: number = 4.5

    constructor(buttonsGroup: Array<Button>)
    {
        this.sounds = Sounds.getInstance()
        this.buttonsGroup = buttonsGroup
        this.lifeTimeBestScreenMain = engine.getComponentGroup(LifetimeBestScreenComponent).entities[0]
        this.topPartyScreenMain = engine.getComponentGroup(TopPartyScreenComponent).entities[0]
        this.centralScreenMain = engine.getComponentGroup(CentralScreenComponent).entities[0]
    }

    private distanceXYZ(left: Vector3, right: Vector3): float
    {
        var a = left.z - right.z
        var b = left.x - right.x
        var c = left.y - right.y

        return Math.sqrt(a * a + b * b + c * c)
    }

    update(dt: number)
    {
        let lifeTimeBestBlockComp = this.lifeTimeBestScreenMain.getComponentOrNull(BlockComponent)
        let topBlockComp = this.topPartyScreenMain.getComponentOrNull(BlockComponent)
        let centralBlockComp = this.centralScreenMain.getComponentOrNull(BlockComponent)

        let mustIndex = this.topPartyScreenMain.getComponent(TopPartyScreenComponent).mustSelectedButton

        this.clearButtonsColor()

        if (lifeTimeBestBlockComp != null || ((topBlockComp != null || centralBlockComp != null) && mustIndex == -1))
        {
            return
        }

        for (let button of this.buttonsGroup)
        {
            let dist = this.distanceXYZ(button.getEntity().getComponent(Transform).position, Camera.instance.position)
            var index = button.getEntity().getComponent(ButtonComponent).index

            if (mustIndex != -1)
            {
                this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton = mustIndex - 1

                if (mustIndex - 1 == index)
                {
                    button.showYellow()
                }
            }
            else if (dist < ButtonStandTrackerSystem.DISTANCE)
            {
                if (this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton != index)
                {
                    button.showBlue()

                    if (this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton != -1)
                    {
                        this.sounds.playTile()
                    }
                    
                    this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton = index
                }

                return
            }
        }
    }

    private clearButtonsColor(): void
    {
        for (let button of this.buttonsGroup) 
        {
            var index = button.getEntity().getComponent(ButtonComponent).index
            var curIndex = this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton

            if (index == curIndex)
            {
                continue
            }
            else
            {
                button.showPurple()
            }
        }
    }
}