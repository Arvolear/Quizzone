import { Screen } from "./screen"
import { LifetimeBestScreenComponent } from "../components/lifetime_best_screen_component"

export class LifetimeBestScreen extends Screen
{
    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)
        
        this.main.addComponent(new LifetimeBestScreenComponent())
    }
}