import utils from "../../node_modules/decentraland-ecs-utils/index"
import { UICallback } from "../app/ui_callback"

export class ButtonsColliderTrigger
{
    private collisionBox: Entity

    private static uiCallback: UICallback

    private specialCase: boolean

    constructor(uiCallback: UICallback, position: Vector3, rotation: Quaternion, scale: Vector3)
    {
        ButtonsColliderTrigger.uiCallback = uiCallback

        let transform = new Transform(
            {
                position: position,
                rotation: rotation,
                scale: scale
            })

        this.collisionBox = new Entity()

        let boxShape = new BoxShape()
        boxShape.withCollisions = false

        this.collisionBox.addComponent(boxShape)
        this.collisionBox.addComponent(transform)

        let material = new Material()
        material.albedoColor = Color4.FromHexString("#00000000")

        this.collisionBox.addComponent(material)

        let triggerBox = new utils.TriggerBoxShape(scale, Vector3.Zero())

        this.collisionBox.addComponent(
            new utils.TriggerComponent(
                triggerBox,
                0,
                0,
                null,
                () =>
                {
                    this.specialCase = false
                },
                () =>
                {
                    if (!this.specialCase)
                    {
                        log("WAIT FOR THE QUIZ TO END")

                        ButtonsColliderTrigger.uiCallback.showWaitEndError("Too late...")
                    }
                },
                null,
                false
            )
        )

        this.collisionBox.getComponent(utils.TriggerComponent).enabled = false
    }

    public getEntity(): Entity
    {
        return this.collisionBox;
    }

    public turnOnSpecialCaseCollision(): void
    {
        this.specialCase = true
    }

    public turnOnCollisions(): void
    {
        this.collisionBox.getComponent(utils.TriggerComponent).enabled = true
    }

    public turnOffCollisions(): void
    {
        this.collisionBox.getComponent(utils.TriggerComponent).enabled = false
    }

    public addToEngine(): void
    {
        engine.addEntity(this.collisionBox)
    }
}