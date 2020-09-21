import { ButtonComponent } from "../components/button_component"

export class Button
{
    private tile: Entity

    private text: Entity

    constructor(index: number, position: Vector3, rotation: Quaternion = Quaternion.Euler(0, 0, 0), scale: Vector3 = new Vector3(1, 1, 1))
    {
        this.tile = new Entity()

        this.tile.addComponent(new Transform(
            {
                position: position,
                rotation: rotation,
                scale: scale
            }
        ));

        this.tile.addComponent(new BoxShape())
        this.tile.addComponent(new ButtonComponent(index))

        let material = new Material()
        material.albedoColor = Color3.White()
        material.metallic = 0.1
        material.roughness = 0.9

        this.tile.addComponent(material)

        this.configText(index, position, rotation, scale)
    }

    private configText(index: number, position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        this.text = new Entity()

        this.text.setParent(this.tile)

        this.text.addComponent(new Transform(
            {
                position: new Vector3(0, 0.6, 0),
                rotation: Quaternion.Euler(90, 0, -90)
            }
        ))

        let initialText = (index + 1).toString() 

        let textShape = new TextShape(initialText)
        textShape.font = new Font(Fonts.SanFrancisco_Heavy)
        textShape.fontSize = 5
        textShape.color = Color3.Black()

        this.text.addComponent(textShape)
    }

    getIndex(): number
    {
        return this.tile.getComponent(ButtonComponent).index
    }

    addToEngine(): void
    {
        engine.addEntity(this.tile)
        engine.addEntity(this.text)
    }
}