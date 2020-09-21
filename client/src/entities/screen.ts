export abstract class Screen
{
    protected sheet: Entity
    protected stand: Entity
    
    protected main: Entity

    constructor(position: Vector3, rotation: Quaternion, scale: Vector3, stand: boolean)
    {
        this.configSheet(position, rotation, scale)        
        this.configMain(position, rotation, scale)

        if (stand)
        {
            this.configStand(position, rotation, scale)
        }
    }

    protected configSheet(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        this.sheet = new Entity()

        this.sheet.addComponent(new Transform(
            {
                position: position,
                rotation: rotation,
                scale: scale
            }))

        this.sheet.addComponent(new BoxShape())

        let material = new Material()

        material.albedoColor = Color3.Black()
        material.metallic = 0.1
        material.roughness = 0.9

        this.sheet.addComponent(material)
    }

    protected configStand(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        this.stand = new Entity()        

        this.stand.setParent(this.sheet)

        this.stand.addComponent(new Transform(
            {
                position: new Vector3(0, -0.54, 0),                
                scale: new Vector3(3, 0.1, 1)
            }))

        this.stand.addComponent(new BoxShape())

        let material = new Material()

        material.albedoColor = Color3.Gray()
        material.metallic = 0.1
        material.roughness = 0.9

        this.stand.addComponent(material)
    }

    protected configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        this.main = new Entity()

        this.main.setParent(this.sheet)

        this.main.addComponent(new Transform(
            {
                position: new Vector3(-scale.x * 6, 0, 0),
                rotation: Quaternion.Euler(0, 90, 0),        
            }
        ))

        let initialText = ""

        let textShape = new TextShape(initialText)
        textShape.font = new Font(Fonts.SanFrancisco_Heavy)        
        textShape.fontSize = 1
        textShape.color = Color3.White()

        this.main.addComponent(textShape)
    }

    getEntity(): Entity
    {
        return this.main
    }

    addToEngine(): void
    {
        engine.addEntity(this.sheet) 
        engine.addEntity(this.main)

        if (this.stand != null)
        {
            engine.addEntity(this.stand)
        }
    }
}