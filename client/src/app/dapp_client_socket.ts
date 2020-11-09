import { getCurrentRealm } from "@decentraland/EnvironmentAPI"
import { getUserData } from "@decentraland/Identity"
import { Question } from "../entities_utils/question"
import { CentralScreenComponent } from "../components/central_screen_component"
import { LeftScreenComponent } from "../components/left_screen_component"
import { RightScreenComponent } from "../components/right_screen_component"
import { BlockComponent } from "../components/block_component"
import { TopPartyScreenComponent } from "../components/top_party_screen_component"
import { LifetimeBestScreenComponent } from "../components/lifetime_best_screen_component"
import { TimedQuizScreenComponent } from "../components/timed_quiz_screen_component"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { SceneCallback } from "./scene_callback"
import { AnswerStatistics } from "../entities_utils/answer_statistics"
import { Sounds } from "./sounds"

export class DappClientSocket
{    
    private static location = "wss://quiz-service.dapp-craft.com:8444"
    // private static location = "ws://localhost:8080"

    private static sceneCallback: SceneCallback
    private socket: WebSocket

    private static centralScreenMain: IEntity

    private static DISTANCE_CODE: number = 3001
    private static LEAVE_CODE: number = 3002

    constructor(sceneCallback: SceneCallback)
    {
        DappClientSocket.sceneCallback = sceneCallback
        DappClientSocket.centralScreenMain = engine.getComponentGroup(CentralScreenComponent).entities[0]
    }

    static getDistanceCode(): number
    {
        return DappClientSocket.DISTANCE_CODE
    }

    static getLeaveCode(): number
    {
        return DappClientSocket.LEAVE_CODE
    }

    public connect(): void
    {
        if (this.socket != null)
        {
            return;
        }

        this.socket = new WebSocket(DappClientSocket.location)

        this.socket.onopen = this.onOpen
        this.socket.onclose = this.onClose
        this.socket.onmessage = this.onMessage
    }

    public join(): void
    {
        var response = "join\n"
        this.send(response)
    }

    private static readToTheEndFrom(lines: string[], index: number, useNewLine: boolean = true): string
    {
        var actualMessage = ""

        for (var i = index; i < lines.length; i++)
        {
            actualMessage += lines[i] + (useNewLine ? "\n" : "")

            if (i < lines.length - 1)
            {
                actualMessage += "\n"
            }
        }

        return actualMessage
    }

    private static getQuestionFrom(lines: string[], index: number): Question
    {
        let question = new Question(
            lines[index],
            [
                lines[index + 1],
                lines[index + 2],
                lines[index + 3],
                lines[index + 4]
            ]
        )

        return question
    }

    private static getAnswerStatisticsFrom(lines: string[], index: number): AnswerStatistics
    {
        let answerStatistics = new AnswerStatistics(
            lines[index],
            [
                lines[index + 1],
                lines[index + 2],
                lines[index + 3],
                lines[index + 4]
            ],
            lines[index + 5] + "\n" + lines[index + 6]
        )

        return answerStatistics
    }

    private static getScheduledTimerFrom(lines: string[], index: number): string
    {
        let start = ""

        for (var i = index; i < lines.length; i++)
        {
            start += lines[i]

            if (i == lines.length - 2)
            {
                start += "\n"
            }

            if (i < lines.length - 1)
            {
                start += "\n"
            }
        }

        return start
    }

    private static getPartyTopFrom(lines: string[], index: number): string
    {
        let partyTop = lines[index] + "\n\n";

        var tmpMessage = DappClientSocket.readToTheEndFrom(lines, index + 1, false)

        partyTop += tmpMessage

        return partyTop
    }

    private static getLifetimeBestFrom(lines: string[], index: number): Array<String>
    {
        var actualMessage: Array<String> = []

        for (var i = index; i < lines.length; i++)
        {
            actualMessage.push(lines[i])
        }

        return actualMessage
    }

    // Be careful, different this! 
    private onMessage(event: any): void
    {
        log("RECEIVED: " + event.data)

        let sounds = Sounds.getInstance()

        let centralScreenMain = engine.getComponentGroup(CentralScreenComponent).entities[0]
        let leftScreenMain = engine.getComponentGroup(LeftScreenComponent).entities[0]
        let rightScreenMain = engine.getComponentGroup(RightScreenComponent).entities[0]
        let topPartyScreenMain = engine.getComponentGroup(TopPartyScreenComponent).entities[0]
        let lifetimeBestScreenMain = engine.getComponentGroup(LifetimeBestScreenComponent).entities[0]
        let timedQuizScreenMain = engine.getComponentGroup(TimedQuizScreenComponent).entities[0]

        let uiProperties = engine.getComponentGroup(UIPropertiesComponent).entities[0]

        var centralComp = centralScreenMain.getComponent(CentralScreenComponent)
        var leftComp = leftScreenMain.getComponent(LeftScreenComponent)
        var rightComp = rightScreenMain.getComponent(RightScreenComponent)
        var topComp = topPartyScreenMain.getComponent(TopPartyScreenComponent)
        var bestComp = lifetimeBestScreenMain.getComponent(LifetimeBestScreenComponent)
        var timedComp = timedQuizScreenMain.getComponent(TimedQuizScreenComponent)

        var uiComp = uiProperties.getComponent(UIPropertiesComponent)

        var message = event.data
        var lines = message.split("\n")

        switch (lines[0])
        {
            case "host_connected":
                {
                    var autocompletePrice = parseInt(lines[1])
                    var autocutPrice = parseInt(lines[2])

                    var actualMessage = DappClientSocket.readToTheEndFrom(lines, 3)

                    uiComp.canJoin = true
                    uiComp.beforeTimed = false
                    uiComp.canLeave = false

                    uiComp.autocompletePrice = autocompletePrice
                    uiComp.autocutPrice = autocutPrice

                    centralComp.connected = actualMessage
                    centralComp.connectedLoaded = true

                    sounds.playIdleMusic()

                    break
                }
            case "join_connected":
                {
                    var autocompletePrice = parseInt(lines[1])
                    var autocutPrice = parseInt(lines[2])

                    var actualMessage = DappClientSocket.readToTheEndFrom(lines, 3)

                    uiComp.canJoin = true
                    uiComp.beforeTimed = false
                    uiComp.canLeave = false

                    uiComp.autocompletePrice = autocompletePrice
                    uiComp.autocutPrice = autocutPrice

                    centralComp.connected = actualMessage
                    centralComp.connectedLoaded = true

                    sounds.playJoinMusic()
                    sounds.playFocus()

                    break
                }
            case "awaiting_connected":
                {
                    var actualMessage = DappClientSocket.readToTheEndFrom(lines, 1)

                    uiComp.canJoin = false
                    uiComp.beforeTimed = true
                    uiComp.canLeave = false
                    uiComp.timeToQuizStart = ""

                    centralComp.connected = actualMessage
                    centralComp.connectedLoaded = true

                    sounds.playAwaitingMusic()
                    sounds.playFocus()

                    break
                }
            case "full_connected":
                {
                    var actualMessage = DappClientSocket.readToTheEndFrom(lines, 1)

                    DappClientSocket.sceneCallback.turnOnButtonCollisions()

                    uiComp.canJoin = false
                    uiComp.beforeTimed = false
                    uiComp.canLeave = false                    

                    centralComp.connected = actualMessage
                    centralComp.connectedLoaded = true            

                    break
                }
            case "bad_connected":
                {
                    DappClientSocket.sceneCallback.turnOnButtonCollisions()
                    
                    uiComp.canJoin = false
                    uiComp.beforeTimed = false
                    uiComp.canLeave = false
                    uiComp.timeToQuizStart = ""

                    centralComp.hasStarted = true

                    break
                }
            case "successful_join":
                {
                    uiComp.canJoin = false
                    uiComp.canLeave = true
                    uiComp.freeLeave = true

                    DappClientSocket.sceneCallback.setColliderAndTeleport()
                    lifetimeBestScreenMain.removeComponent(BlockComponent)

                    DappClientSocket.sceneCallback.buyBoostersIfShould()

                    break
                }
            case "countdown":
                {
                    var actualMessage = DappClientSocket.readToTheEndFrom(lines, 1)
                    
                    uiComp.beforeTimed = false

                    centralComp.connected = actualMessage
                    centralComp.connectedLoaded = true                              

                    sounds.playJoinMusic()
                    sounds.playJoinQuiz()

                    break
                }
            case "control_buttons":
                {
                    var action = lines[1]

                    if (action == "show")
                    {
                        uiComp.controlVisible = true
                    }
                    else if (action == "hide")
                    {
                        uiComp.controlVisible = false
                    }

                    break
                }
            case "autocomplete":
                {
                    var action = lines[1]

                    if (action == "show")
                    {
                        var autocompleteLeft = parseInt(lines[2])

                        uiComp.autocompleteVisible = true
                        uiComp.autocompleteLeft = autocompleteLeft
                    }
                    else if (action == "hide")
                    {
                        uiComp.autocompleteVisible = false
                    }
                    else if (action == "display")
                    {
                        topComp.mustSelectedButton = parseInt(lines[2])
                    }

                    break
                }
            case "autocut":
                {
                    var action = lines[1]

                    if (action == "show")
                    {
                        var autocutLeft = parseInt(lines[2])

                        uiComp.autocutVisible = true
                        uiComp.autocutLeft = autocutLeft
                    }
                    else if (action == "hide")
                    {
                        uiComp.autocutVisible = false
                    }
                    else if (action == "display")
                    {
                        let question = DappClientSocket.getQuestionFrom(lines, 3)

                        centralComp.question = question

                        centralComp.nextQuestionLoaded = true
                    }

                    break
                }
            case "start_idle":
                {
                    var currentQuestion = parseInt(lines[1])
                    var totalQuestions = parseInt(lines[2])

                    let question = DappClientSocket.getQuestionFrom(lines, 4)

                    DappClientSocket.sceneCallback.turnOnButtonCollisions()

                    uiComp.canJoin = false
                    uiComp.timeToQuizStart = ""

                    centralComp.hasStarted = true
                    centralComp.nowQuestion = true
                    centralComp.nowAnswer = false
                    centralComp.question = question
                    leftComp.totalQuestions = totalQuestions
                    leftComp.currentQuestion = currentQuestion

                    centralComp.nextQuestionLoaded = true

                    sounds.muteMusic()
                    sounds.playNextQuestion()

                    break
                }
            case "start_playing":
                {
                    var currentQuestion = parseInt(lines[1])
                    var totalQuestions = parseInt(lines[2])

                    let question = DappClientSocket.getQuestionFrom(lines, 4)

                    uiComp.canJoin = false
                    uiComp.canLeave = true
                    uiComp.freeLeave = false
                    uiComp.timeToQuizStart = ""

                    centralComp.hasStarted = true
                    centralComp.nowQuestion = true
                    centralComp.nowAnswer = false
                    centralComp.question = question
                    leftComp.totalQuestions = totalQuestions
                    leftComp.currentQuestion = currentQuestion

                    centralComp.nextQuestionLoaded = true

                    sounds.muteMusic()
                    sounds.playNextQuestion()

                    break
                }
            case "timer":
                {
                    rightComp.timeLeft = lines[1]

                    if (uiComp.canJoin)
                    {
                        uiComp.timeToQuizStart = lines[1]
                    }

                    switch (rightComp.timeLeft)
                    {
                        case "1":
                        case "2":
                        case "3":
                            {
                                if (!centralComp.hasStarted)
                                {
                                    sounds.playSoundPrestart()
                                }
                                else if (centralComp.nowQuestion)
                                {
                                    sounds.playSound321()
                                }

                                break
                            }
                        case "10":
                            {
                                if (centralComp.hasStarted && centralComp.nowQuestion)
                                {
                                    sounds.playQuestionMusic()
                                }
                            }
                    }

                    break
                }
            case "scheduled_timer":
                {
                    var start = DappClientSocket.getScheduledTimerFrom(lines, 1)

                    timedComp.timeLeft = start

                    break
                }
            case "get":
                {
                    centralComp.getLoaded = true

                    break
                }
            case "answer":
                {
                    var isCorrect = (lines[1] == "true")
                    var answer = DappClientSocket.readToTheEndFrom(lines, 2)

                    centralComp.nowQuestion = false
                    centralComp.nowAnswer = true
                    centralComp.answer = answer
                    centralComp.answerLoaded = true

                    if (isCorrect)
                    {
                        sounds.playCorrect()
                    }
                    else
                    {
                        sounds.playWrong()
                    }

                    sounds.muteMusic()

                    break
                }
            case "answer_statistics":
                {
                    let answerStatistics = DappClientSocket.getAnswerStatisticsFrom(lines, 1)

                    centralComp.answerStatistics = answerStatistics
                    centralComp.answerStatisticsLoaded = true

                    sounds.muteMusic()

                    break
                }
            case "answer_statistics_sound":
                {
                    sounds.playStatistics()

                    break
                }
            case "next":
                {
                    var currentQuestion = parseInt(lines[1])
                    var totalQuestions = parseInt(lines[2])

                    let question = DappClientSocket.getQuestionFrom(lines, 4)

                    centralComp.nowQuestion = true
                    centralComp.nowAnswer = false
                    centralComp.question = question
                    leftComp.totalQuestions = totalQuestions
                    leftComp.currentQuestion = currentQuestion

                    centralComp.nextQuestionLoaded = true

                    sounds.playNextQuestion()

                    break
                }
            case "finish":
                {
                    uiComp.canLeave = false
                    uiComp.freeLeave = true

                    centralComp.nowQuestion = false
                    centralComp.nowAnswer = false
                    centralComp.finishLoaded = true

                    DappClientSocket.sceneCallback.turnOffButtonCollisions()
                    DappClientSocket.sceneCallback.dropCollider()
                    lifetimeBestScreenMain.addComponentOrReplace(new BlockComponent)

                    sounds.playCompleteQuiz()

                    break
                }
            case "applauds":
                {
                    sounds.playApplauds()

                    break
                }
            case "top_party":
                {
                    var partyTop = DappClientSocket.getPartyTopFrom(lines, 1)

                    topComp.topPartyPlayers = partyTop
                    topComp.topPartyPlayersLoaded = true

                    break
                }
            case "lifetime_best":
                {
                    var allBest = DappClientSocket.getLifetimeBestFrom(lines, 1)

                    bestComp.lifetimeBest = allBest
                    bestComp.lifetimeBestLoaded = true

                    break
                }
            case "clear_timed":
                {
                    timedQuizScreenMain.getComponent(TimedQuizScreenComponent).clear()

                    timedQuizScreenMain.getComponent(TextShape).value = ""

                    break
                }
            case "clear":
                {
                    centralScreenMain.addComponentOrReplace(new BlockComponent)
                    lifetimeBestScreenMain.addComponentOrReplace(new BlockComponent)

                    uiProperties.getComponent(UIPropertiesComponent).clear()

                    centralScreenMain.getComponent(CentralScreenComponent).clear()
                    leftScreenMain.getComponent(LeftScreenComponent).clear()
                    rightScreenMain.getComponent(RightScreenComponent).clear()
                    topPartyScreenMain.getComponent(TopPartyScreenComponent).clear()
                    timedQuizScreenMain.getComponent(TimedQuizScreenComponent).clear()

                    centralScreenMain.getComponent(TextShape).value = ""
                    leftScreenMain.getComponent(TextShape).value = ""
                    rightScreenMain.getComponent(TextShape).value = ""
                    topPartyScreenMain.getComponent(TextShape).value = ""
                    timedQuizScreenMain.getComponent(TextShape).value = ""

                    DappClientSocket.sceneCallback.turnOffButtonCollisions()
                    DappClientSocket.sceneCallback.dropCollider()

                    sounds.playIdleMusic()

                    break
                }
        }

        if (centralScreenMain.getComponentOrNull(BlockComponent) != null)
        {
            centralScreenMain.removeComponent(BlockComponent)
        }
    }

    // Be careful, different this! 
    private onOpen(event: any): void
    {
        log("CONNECTED!")

        const playerDataPromise = executeTask(async () =>
        {
            var response = "connect\n"

            let realm = await getCurrentRealm()
            let data = await getUserData()

            let realmName = `${JSON.stringify(realm.displayName)}`
            let nick = data.displayName
            let wallet = data.publicKey

            response += realmName + "\n" + wallet + "\n" + nick;

            return response
        })

        playerDataPromise.then((value) => 
        {
            log("SENT: " + value)
            this.send(value)
        })
    }

    // Be careful, different this! 
    private onClose(event: any): void
    {
        log("CLOSED!")
        log("REMOTE CLOSE")

        let sounds = Sounds.getInstance()

        let centralScreenMain = engine.getComponentGroup(CentralScreenComponent).entities[0]
        let rightScreenMain = engine.getComponentGroup(RightScreenComponent).entities[0]
        let leftScreenMain = engine.getComponentGroup(LeftScreenComponent).entities[0]
        let topPartyScreenMain = engine.getComponentGroup(TopPartyScreenComponent).entities[0]
        let lifetimeBestScreenMain = engine.getComponentGroup(LifetimeBestScreenComponent).entities[0]
        let timedQuizScreenMain = engine.getComponentGroup(TimedQuizScreenComponent).entities[0]

        let uiProperties = engine.getComponentGroup(UIPropertiesComponent).entities[0]

        centralScreenMain.addComponentOrReplace(new BlockComponent)
        lifetimeBestScreenMain.addComponentOrReplace(new BlockComponent)

        uiProperties.getComponent(UIPropertiesComponent).clear()

        centralScreenMain.getComponent(CentralScreenComponent).clear()
        leftScreenMain.getComponent(LeftScreenComponent).clear()
        rightScreenMain.getComponent(RightScreenComponent).clear()
        topPartyScreenMain.getComponent(TopPartyScreenComponent).clear()
        lifetimeBestScreenMain.getComponent(LifetimeBestScreenComponent).clear()
        timedQuizScreenMain.getComponent(TimedQuizScreenComponent).clear()

        if (event.code != DappClientSocket.DISTANCE_CODE &&
            event.code != DappClientSocket.LEAVE_CODE)
        {
            centralScreenMain.getComponent(TextShape).value = "Disconnected remotely\n\nPlease consider reconnecting"
            centralScreenMain.getComponent(TextShape).fontSize = 1
        }
        else
        {
            if (event.code == DappClientSocket.LEAVE_CODE)
            {
                DappClientSocket.sceneCallback.turnOnSpecialCaseCollision()
                sounds.playLeaveQuiz()
            }

            centralScreenMain.getComponent(TextShape).value = ""
        }

        leftScreenMain.getComponent(TextShape).value = ""
        rightScreenMain.getComponent(TextShape).value = ""
        topPartyScreenMain.getComponent(TextShape).value = ""
        lifetimeBestScreenMain.getComponent(TextShape).value = ""
        timedQuizScreenMain.getComponent(TextShape).value = ""

        DappClientSocket.sceneCallback.turnOffButtonCollisions()
        DappClientSocket.sceneCallback.dropCollider()
    }

    send(message: string): void
    {
        log("SENT: " + message)

        DappClientSocket.centralScreenMain.addComponentOrReplace(new BlockComponent())

        this.socket.send(message)
    }

    close(code?: number, reason?: string): void
    {
        if (this.socket == null)
        {
            return;
        }

        this.socket.close(code, reason)
        this.socket = null
    }
}