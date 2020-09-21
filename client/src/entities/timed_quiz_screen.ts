import { Screen } from "./screen"
import { TimedQuizScreenComponent } from "../components/timed_quiz_screen_component"

export class TimedQuizScreen extends Screen
{
    constructor(position: Vector3, rotation: Quaternion = Quaternion.Euler(0, 0, 0), scale: Vector3 = new Vector3(1, 1, 1), stand: boolean = true)
    {
        super(position, rotation, scale, true)
    }

    protected configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)

        this.main.getComponent(Transform).scale = new Vector3(1 / (scale.z / scale.y), 1, 1)
        this.main.addComponent(new TimedQuizScreenComponent())
    }

    protected configStand(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configStand(position, rotation, scale)

        this.stand.addComponentOrReplace(new Transform(
            {
                position: new Vector3(0, -4.5 / scale.y, 0),
                scale: new Vector3(3, scale.y / 1.48, 1 / scale.z)
            }))
    }
}