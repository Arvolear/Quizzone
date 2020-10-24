import { SceneCallback } from "../app/scene_callback"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { UICallback } from "../app/ui_callback"

export class StartButton
{
    private button: Entity
    private sceneCallback: SceneCallback

    constructor(sceneCallback: SceneCallback)
    {
        this.sceneCallback = sceneCallback
    }

    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        this.button = new Entity()

        this.button.addComponent(new Transform(
            {
                position: position,
                rotation: rotation,
                scale: scale
            }
        ))

        this.button.addComponent(new BoxShape())

        let material = new Material()
        material.albedoColor = Color4.FromHexString("#00000000")
        
        this.button.addComponent(material)

        this.button.addComponent(new OnPointerDown(
            () =>
            {
                if (UICallback.properties.getComponent(UIPropertiesComponent).canJoin)
                {
                    this.sceneCallback.startGame()
                }
            }))
    }

    public addToEngine(): void
    {
        engine.addEntity(this.button)
    }
}