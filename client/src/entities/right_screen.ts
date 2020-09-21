import { BlockComponent } from "../components/block_component"
import { Screen } from "./screen"
import { RightScreenComponent } from "../components/right_screen_component"

export class RightScreen extends Screen
{
    constructor(position: Vector3, rotation: Quaternion = Quaternion.Euler(0, 0, 0), scale: Vector3 = new Vector3(1, 1, 1), stand: boolean = true)
    {
        super(position, rotation, scale, true)
    }

    protected configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)

        this.main.getComponent(Transform).scale = new Vector3(1 / (scale.z / scale.y), 1, 1)
        this.main.addComponent(new RightScreenComponent())
    }
}