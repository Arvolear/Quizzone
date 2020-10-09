import { Screen } from "./screen"
import { CentralScreenComponent } from "../components/central_screen_component"
import { BlockComponent } from "../components/block_component"

export class CentralScreen extends Screen
{
    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)
        
        this.main.addComponent(new CentralScreenComponent())
        this.main.addComponent(new BlockComponent())
    }
}