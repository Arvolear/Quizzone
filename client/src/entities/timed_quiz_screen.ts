import { Screen } from "./screen"
import { TimedQuizScreenComponent } from "../components/timed_quiz_screen_component"

export class TimedQuizScreen extends Screen
{  
    public configMain(position: Vector3, rotation: Quaternion, scale: Vector3): void
    {
        super.configMain(position, rotation, scale)

        this.main.addComponent(new TimedQuizScreenComponent())
    }
}