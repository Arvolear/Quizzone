import { Button } from "../entities/button"
import { ButtonStandTrackerSystem } from "../systems/button_stand_tracker_system"
import { Screen } from "../entities/screen"
import { QuestionsSystem } from "../systems/questions_system"
import { CentralScreen } from "../entities/central_screen"
import { LeftScreen } from "../entities/left_screen"
import { RightScreen } from "../entities/right_screen"
import { DappClientSocket } from "./dapp_client_socket"
import { TopPartyScreen } from "../entities/top_party_screen"
import { ScreenDistanceSystem } from "../systems/screen_distance_system"
import { ResultsSystem } from "../systems/results_system"
import { LifetimeBestScreen } from "../entities/lifetime_best_screen"
import { TimedQuizScreen } from "../entities/timed_quiz_screen"
import { TimerSystem } from "../systems/timer_system"
import { Beam } from "../entities/beam"
import { UI } from "../ui/ui"
import { UISystem } from "../systems/ui_system"

export class App
{
    private ui: UI;

    private buttons: Array<Button> = []

    private beams: Array<Beam> = []

    private centralScreen: Screen
    private leftScreen: Screen
    private rightScreen: Screen
    private topPartyScreen: Screen
    private lifetimeBestScreen: Screen
    private timedQuizScreen: Screen

    private dappClientSocket: DappClientSocket

    private static INITIAL_X = 6
    private static INITIAL_Z = 3.5
    private static SCALE_FACTOR = 4
    private static SCALE_OFFSET = 0.1

    constructor()
    {        
        this.configureButtons()
        this.configureBeams()
        this.configureScreens()
        this.configureSocket()
        this.configureUI()
        this.configureSystems()        
    }
    
    private configureBeams(): void
    {
        let beam1 = new Beam(
            new Vector3(App.INITIAL_Z + App.SCALE_FACTOR / 2, 0, App.INITIAL_X + App.SCALE_FACTOR / 2),
            Quaternion.Euler(0, 0, 0),
            new Vector3(App.SCALE_FACTOR * 2 - App.SCALE_OFFSET, 0.11, 0.1));

        let beam2 = new Beam(
            new Vector3(App.INITIAL_Z + App.SCALE_FACTOR / 2, 0, App.INITIAL_X + App.SCALE_FACTOR / 2),
            Quaternion.Euler(0, 90, 0),
            new Vector3(App.SCALE_FACTOR * 2 - App.SCALE_OFFSET, 0.11, 0.1));

        beam1.addToEngine()
        beam2.addToEngine()

        this.beams.push(beam1)
        this.beams.push(beam2)
    }

    private configureButtons(): void
    {
        for (var i = 0; i < 2; i++)
        {
            for (var j = 0; j < 2; j++)
            {
                let button = new Button(i * 2 + j,
                    new Vector3(App.INITIAL_Z + i * App.SCALE_FACTOR, 0, App.INITIAL_X + j * App.SCALE_FACTOR),
                    Quaternion.Euler(0, 0, 0),
                    new Vector3(App.SCALE_FACTOR - App.SCALE_OFFSET, 0.1, App.SCALE_FACTOR - App.SCALE_OFFSET))

                button.addToEngine()
                this.buttons.push(button)
            }
        }
    }

    private configureScreens(): void
    {
        this.centralScreen = new CentralScreen(new Vector3(14, 2.2, 8), Quaternion.Euler(0, 0, 0), new Vector3(0.1, 4, 8))
        this.leftScreen = new LeftScreen(new Vector3(13, 2.2, 13.7), Quaternion.Euler(0, -30, 0), new Vector3(0.1, 4, 4))
        this.rightScreen = new RightScreen(new Vector3(13, 2.2, 2.3), Quaternion.Euler(0, 30, 0), new Vector3(0.1, 4, 4))
        this.topPartyScreen = new TopPartyScreen(new Vector3(13.7, 7, 11.7), Quaternion.Euler(0, -15, 15), new Vector3(0.1, 3, 7))
        this.lifetimeBestScreen = new LifetimeBestScreen(new Vector3(5.5, 1.65, 15.4), Quaternion.Euler(0, -90, 0), new Vector3(0.1, 3, 7))
        this.timedQuizScreen = new TimedQuizScreen(new Vector3(13.7, 7, 4.3), Quaternion.Euler(0, 15, 15), new Vector3(0.1, 3, 7))

        this.centralScreen.addToEngine()
        this.leftScreen.addToEngine()
        this.rightScreen.addToEngine()
        this.topPartyScreen.addToEngine()
        this.lifetimeBestScreen.addToEngine()
        this.timedQuizScreen.addToEngine()
    }

    private configureSocket(): void
    {
        this.dappClientSocket = new DappClientSocket()
    }

    private configureUI(): void
    {
        UI.setClientSocket(this.dappClientSocket);
        this.ui = UI.getInstance()        
    }

    private configureSystems(): void
    {
        engine.addSystem(new ButtonStandTrackerSystem())
        engine.addSystem(new QuestionsSystem(this.dappClientSocket))
        engine.addSystem(new ResultsSystem())
        engine.addSystem(new ScreenDistanceSystem(this.dappClientSocket))
        engine.addSystem(new TimerSystem())
        engine.addSystem(new UISystem())
    }    

    startGame(): void
    {
        this.ui.showStartUp()        
    }
}