import { Scene } from "../entities/scene"
import { DappClientSocket } from "./dapp_client_socket"
import { UI } from "../ui/ui"
import { ButtonStandTrackerSystem } from "../systems/button_stand_tracker_system"
import { QuestionsSystem } from "../systems/questions_system"
import { ScreenDistanceSystem } from "../systems/screen_distance_system"
import { ResultsSystem } from "../systems/results_system"
import { TimerSystem } from "../systems/timer_system"
import { UISystem } from "../systems/ui_system"
import { SoundsTrackerSystem } from "../systems/sounds_tracker_system"
import { General } from "../blockchain/general"
import { AppCallback } from "../callbacks/app_callback"

export class App extends AppCallback
{    
    private scene: Scene      
    
    private general: General

    constructor()
    {        
        super()

        this.configureBlockchain()
        this.configureScene()
        this.configureSocket()        
        this.configureSystems()
    }  

    private configureBlockchain(): void
    {
        this.general = General.getInstance()
    }

    private configureScene(): void
    {
        this.scene = new Scene()

        UI.setSceneCallback(this.scene)
    }

    private configureSocket(): void
    {
        AppCallback.dappClientSocket = new DappClientSocket(this.scene, this.scene.getUI())        
    }    

    private configureSystems(): void
    {
        engine.addSystem(new ButtonStandTrackerSystem(this.scene.getButtons()))
        engine.addSystem(new QuestionsSystem(AppCallback.dappClientSocket))
        engine.addSystem(new ResultsSystem())
        engine.addSystem(new ScreenDistanceSystem(AppCallback.dappClientSocket))
        engine.addSystem(new TimerSystem())
        engine.addSystem(new UISystem(this.scene.getUI()))
        engine.addSystem(new SoundsTrackerSystem())
    }  
}