export abstract class Screen
{
    protected main: Entity

    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        this.main = new Entity()

        this.main.addComponent(new Transform(
            {
                position: position,
                rotation: rotation,
                scale: scale
            }
        ))

        let initialText = ""

        let textShape = new TextShape(initialText)
        textShape.font = new Font(Fonts.SanFrancisco_Heavy)        
        textShape.fontSize = 1
        textShape.color = Color3.White()

        this.main.addComponent(textShape)
    }

    public getEntity(): Entity
    {
        return this.main
    }

    public addToEngine(): void
    {        
        engine.addEntity(this.main)
    }
}