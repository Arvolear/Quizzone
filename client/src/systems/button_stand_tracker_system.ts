import { ButtonComponent } from "../components/button_component"
import { BlockComponent } from "../components/block_component"
import { CentralScreenComponent } from "../components/central_screen_component"
import { TopPartyScreenComponent } from "../components/top_party_screen_component"

export class ButtonStandTrackerSystem implements ISystem
{
    private buttonsGroup: any
    private topPartyScreenMain: IEntity
    private centralScreenMain: IEntity

    private static DISTANCE: number = 2.8

    constructor()
    {
        this.buttonsGroup = engine.getComponentGroup(ButtonComponent)
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
        let topBlockComp = this.topPartyScreenMain.getComponentOrNull(BlockComponent)
        let centralBlockComp = this.centralScreenMain.getComponentOrNull(BlockComponent)    
        
        this.clearButtonsColor()

        if ((topBlockComp != null || centralBlockComp != null) && 
            this.topPartyScreenMain.getComponent(TopPartyScreenComponent).mustSelectedButton == -1)
        {
            return
        }

        for (let button of this.buttonsGroup.entities)
        {            
            let dist = this.distanceXYZ(button.getComponent(Transform).position, Camera.instance.position)      

            if (this.topPartyScreenMain.getComponent(TopPartyScreenComponent).mustSelectedButton != -1)
            {
                button.getComponent(Material).albedoColor = Color3.FromHexString("#80ffb0")

                var index = button.getComponent(ButtonComponent).index                

                this.displayText(index)
                this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton = 
                    this.topPartyScreenMain.getComponent(TopPartyScreenComponent).mustSelectedButton
            }
            else if (dist < ButtonStandTrackerSystem.DISTANCE)
            {            
                button.getComponent(Material).albedoColor = Color3.FromHexString("#80b0ff")               

                var index = button.getComponent(ButtonComponent).index

                this.displayText(index)
                this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton = index                
            }            
        }
    }

    private clearButtonsColor(): void
    {
        for (let button of this.buttonsGroup.entities)
        { 
            var index = button.getComponent(ButtonComponent).index
            var curIndex = this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton

            if (index == curIndex)
            {
                continue
            }
            else
            {
                button.getComponent(Material).albedoColor = Color3.White()
            }
        }
    }

    private displayText(index: number): void
    {
        let text = this.topPartyScreenMain.getComponent(TextShape)

        text.fontSize = 2

        switch(index)
        {
            case 0:
                {
                    text.value = "4\t3\n\n2    >1"
                    break
                }
            case 1:
                {
                    text.value = "4\t3\n\n2<    1"                    
                    break
                }
            case 2:
                {
                    text.value = "4    >3\n\n2\t1"                    
                    break
                }
            case 3:
                {
                    text.value = "4<    3\n\n2\t1"                    
                    break
                }
        }
    }
}