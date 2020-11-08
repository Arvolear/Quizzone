import { Screen } from "./screen"
import { LifetimeBestScreenComponent } from "../components/lifetime_best_screen_component"
import { BlockComponent } from "../components/block_component"

export class LifetimeBestScreen extends Screen
{
    private right: Entity
    private dash: Entity
    
    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)
        
        this.main.addComponent(new LifetimeBestScreenComponent())
        this.main.addComponent(new BlockComponent())
        this.main.getComponent(TextShape).hTextAlign = "left"        

        this.configRight(position, rotation, scale)
        this.configDash(position, rotation, scale)
    }

    public configRight(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        this.right = new Entity()

        this.right.addComponent(new Transform(
            {
                position: new Vector3(position.x, position.y, position.z + 9),
                rotation: rotation,
                scale: scale
            }
        ))

        let initialText = ""

        let textShape = new TextShape(initialText)
        textShape.font = new Font(Fonts.SanFrancisco_Heavy)
        textShape.fontSize = 1
        textShape.color = Color3.White()
        textShape.hTextAlign = "right"

        this.right.addComponent(textShape)
        this.right.addComponent(new LifetimeBestScreenComponent())
    }

    public configDash(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        this.dash = new Entity()

        this.dash.addComponent(new Transform(
            {
                position: new Vector3(position.x, position.y, position.z + 7.1),
                rotation: rotation,
                scale: scale
            }
        ))

        let initialText = ""

        let textShape = new TextShape(initialText)
        textShape.font = new Font(Fonts.SanFrancisco_Heavy)
        textShape.fontSize = 1
        textShape.color = Color3.White()    
        textShape.hTextAlign = "right"

        this.dash.addComponent(textShape)
        this.dash.addComponent(new LifetimeBestScreenComponent())
    }

    public addToEngine(): void
    {
        super.addToEngine()

        engine.addEntity(this.right)
        engine.addEntity(this.dash)
    }
}