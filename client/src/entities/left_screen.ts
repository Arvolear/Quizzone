import { Screen } from "./screen"
import { LeftScreenComponent } from "../components/left_screen_component"

export class LeftScreen extends Screen
{
    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)
        
        this.main.addComponent(new LeftScreenComponent())
    }
}