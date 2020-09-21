import { Screen } from "./screen"
import { TopPartyScreenComponent } from "../components/top_party_screen_component"

export class TopPartyScreen extends Screen
{
    constructor(position: Vector3, rotation: Quaternion = Quaternion.Euler(0, 0, 0), scale: Vector3 = new Vector3(1, 1, 1), stand: boolean = true)
    {
        super(position, rotation, scale, stand)
    }

    protected configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)

        this.main.getComponent(Transform).scale = new Vector3(1 / (scale.z / scale.y), 1, 1)
        this.main.addComponent(new TopPartyScreenComponent())
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