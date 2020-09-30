import { App } from "../app/app"
import { StartButtonComponent } from "../components/start_button_component"

export class StartButton
{
    private button: Entity
    private app: App

    constructor(app: App)
    {
        this.app = app

        this.button = new Entity()

        this.button.addComponent(new Transform(
            {
                position: new Vector3(8, 0, 2),
                scale: new Vector3(0.2, 2, 0.2)
            }
        ))

        this.button.addComponent(new BoxShape())

        let material = new Material()
        material.albedoColor = Color3.White()
        material.metallic = 0.1
        material.roughness = 0.9

        this.button.addComponent(material)

        this.button.addComponent(new StartButtonComponent())

        this.button.addComponent(new OnPointerDown(
            (event) => {
                if (this.button.getComponent(StartButtonComponent).canJoin)
                {
                    this.app.startGame()
                }
            }))
    }

    addToEngine(): void
    {
        engine.addEntity(this.button)
    }
}