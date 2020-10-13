import { Scene } from "../entities/scene"
import { DappClientSocket } from "./dapp_client_socket"
import { UI } from "../ui/ui"
import { ButtonStandTrackerSystem } from "../systems/button_stand_tracker_system"
import { QuestionsSystem } from "../systems/questions_system"
import { ScreenDistanceSystem } from "../systems/screen_distance_system"
import { ResultsSystem } from "../systems/results_system"
import { TimerSystem } from "../systems/timer_system"
import { UISystem } from "../systems/ui_system"

export class App
{    
    private scene: Scene  

    public static dappClientSocket: DappClientSocket   

    constructor()
    {
        this.configureScene()
        this.configureSocket()
        this.configureSystems()
    }  

    private configureScene(): void
    {
        this.scene = new Scene()
        UI.setSceneCallback(this.scene)
    }

    private configureSocket(): void
    {
        App.dappClientSocket = new DappClientSocket()
        UI.setClientSocket(App.dappClientSocket)
    }

    private configureSystems(): void
    {
        engine.addSystem(new ButtonStandTrackerSystem(this.scene.getButtons()))
        engine.addSystem(new QuestionsSystem(App.dappClientSocket))
        engine.addSystem(new ResultsSystem())
        engine.addSystem(new ScreenDistanceSystem(App.dappClientSocket))
        engine.addSystem(new TimerSystem())
        engine.addSystem(new UISystem())
    }  
}