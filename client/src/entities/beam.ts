export class Beam
{
    private beam: Entity

    constructor(position: Vector3, rotation: Quaternion = Quaternion.Euler(0, 0, 0), scale: Vector3 = new Vector3(1, 1, 1))
    {
        this.beam = new Entity()

        this.beam.addComponent(new Transform(
            {
                position: position,
                rotation: rotation,
                scale: scale
            }
        ));

        this.beam.addComponent(new BoxShape())        

        let material = new Material()
        material.albedoColor = Color3.Black()
        material.metallic = 0.1
        material.roughness = 0.9

        this.beam.addComponent(material)
    }

    addToEngine(): void
    {
        engine.addEntity(this.beam)
    }
}