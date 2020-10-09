import { App } from "../app/app"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { UI } from "../ui/ui"

export class StartButton
{
    private button: Entity
    private app: App

    constructor(app: App)
    {
        this.app = app
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
                if (UI.properties.getComponent(UIPropertiesComponent).canJoin)
                {
                    this.app.startGame()
                }
            }))
    }

    public addToEngine(): void
    {
        engine.addEntity(this.button)
    }
}