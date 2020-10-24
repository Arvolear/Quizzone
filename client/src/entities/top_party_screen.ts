import { Screen } from "./screen"
import { TopPartyScreenComponent } from "../components/top_party_screen_component"

export class TopPartyScreen extends Screen
{
    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)
        
        this.main.addComponent(new TopPartyScreenComponent())
    }
}