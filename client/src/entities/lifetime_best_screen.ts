import { Screen } from "./screen"
import { LifetimeBestScreenComponent } from "../components/lifetime_best_screen_component"

export class LifetimeBestScreen extends Screen
{
    constructor(position: Vector3, rotation: Quaternion = Quaternion.Euler(0, 0, 0), scale: Vector3 = new Vector3(1, 1, 1), stand: boolean = true)
    {
        super(position, rotation, scale, stand)
    }

    protected configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)

        this.main.getComponent(Transform).scale = new Vector3(1 / (scale.z / scale.y), 1, 1)
        this.main.addComponent(new LifetimeBestScreenComponent())
    }

    startGame()
    {
        this.main.getComponent(LifetimeBestScreenComponent).clear()
    }
}