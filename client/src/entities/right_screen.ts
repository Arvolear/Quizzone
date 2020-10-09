import { Screen } from "./screen"
import { RightScreenComponent } from "../components/right_screen_component"

export class RightScreen extends Screen
{  
    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)
                
        this.main.addComponent(new RightScreenComponent())        
    }
}