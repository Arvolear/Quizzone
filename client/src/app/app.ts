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
import { StartButton } from "../entities/start_button"
import { Scene } from "../entities/scene"

export class App
{
    private ui: UI;

    private scene: Scene

    private buttons: Array<Button> = []
    private beams: Array<Beam> = []

    private centralScreen: Screen
    private leftScreen: Screen
    private rightScreen: Screen
    private topPartyScreen: Screen
    private lifetimeBestScreen: Screen
    private timedQuizScreen: Screen

    private startButton: StartButton

    private dappClientSocket: DappClientSocket

    private static INITIAL_X = 16.2
    private static INITIAL_Y = 0.15
    private static INITIAL_Z = -19.79
    private static SCALE_FACTOR = 7.42
    private static SCALE_OFFSET = 0.1

    constructor()
    {
        this.configureScene()
        this.configureButtons()
        this.configureBeams()
        this.configureScreens()
        this.configureSocket()
        this.configureUI()
        this.configureSystems()
        this.configureStartButton()
    }

    private configureScene(): void
    {
        this.scene = new Scene()
    }

    private configureButtons(): void
    {
        for (var i = 0; i < 2; i++)
        {
            for (var j = 0; j < 2; j++)
            {
                let button = new Button(i * 2 + j,
                    new Vector3(-(App.INITIAL_Z + j * App.SCALE_FACTOR), App.INITIAL_Y, App.INITIAL_X + i * App.SCALE_FACTOR),
                    Quaternion.Euler(0, -90, 0),
                    new Vector3(App.SCALE_FACTOR - App.SCALE_OFFSET, 0.1, App.SCALE_FACTOR - App.SCALE_OFFSET))

                button.addToEngine()
                this.buttons.push(button)
            }
        }
    }

    private configureBeams(): void
    {
        let beam1 = new Beam(
            new Vector3(-(App.INITIAL_Z + App.SCALE_FACTOR / 2), App.INITIAL_Y, App.INITIAL_X + App.SCALE_FACTOR / 2),
            Quaternion.Euler(0, -90, 0),
            new Vector3(App.SCALE_FACTOR * 2 - App.SCALE_OFFSET, 0.11, 0.1));

        let beam2 = new Beam(
            new Vector3(-(App.INITIAL_Z + App.SCALE_FACTOR / 2), App.INITIAL_Y, App.INITIAL_X + App.SCALE_FACTOR / 2),
            Quaternion.Euler(0, 0, 0),
            new Vector3(App.SCALE_FACTOR * 2 - App.SCALE_OFFSET, 0.11, 0.1));

        beam1.addToEngine()
        beam2.addToEngine()

        this.beams.push(beam1)
        this.beams.push(beam2)
    }

    private configureScreens(): void
    {
        this.centralScreen = new CentralScreen()
        this.leftScreen = new LeftScreen()
        this.rightScreen = new RightScreen()
        this.topPartyScreen = new TopPartyScreen()
        this.lifetimeBestScreen = new LifetimeBestScreen()
        this.timedQuizScreen = new TimedQuizScreen()

        this.centralScreen.configMain(new Vector3(16, 2.8, 30.9), Quaternion.Euler(0, 0, 0), new Vector3(4, 4, 4))
        this.leftScreen.configMain(new Vector3(16, 5, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(4, 4, 4))
        this.rightScreen.configMain(new Vector3(9.8, 8.5, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(8, 8, 8))
        this.topPartyScreen.configMain(new Vector3(9.8, 8.5, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(4, 4, 4))
        this.lifetimeBestScreen.configMain(new Vector3(1.2, 5.3, 19.4), Quaternion.Euler(0, -90, 0), new Vector3(5.5, 5.5, 5.5))
        this.timedQuizScreen.configMain(new Vector3(22.2, 8.5, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(5, 5, 5))

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

    private configureStartButton(): void
    {
        this.startButton = new StartButton(this)
        this.startButton.configMain(new Vector3(29.03, 0.76, 29.95), Quaternion.Euler(0, 0, 0), new Vector3(1.1, 1.2, 0.9))
        this.startButton.addToEngine()
    }    

    startGame(): void
    {
        this.ui.showStartUp()
    }
}