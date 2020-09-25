import { CentralScreenComponent } from "../components/central_screen_component"
import { LeftScreenComponent } from "../components/left_screen_component"
import { RightScreenComponent } from "../components/right_screen_component"
import { BlockComponent } from "../components/block_component"
import { getCurrentRealm } from "@decentraland/EnvironmentAPI"
import { getUserData } from "@decentraland/Identity"
import { Question } from "./question"
import { TopPartyScreenComponent } from "../components/top_party_screen_component"
import { LifetimeBestScreenComponent } from "../components/lifetime_best_screen_component"
import { TimedQuizScreenComponent } from "../components/timed_quiz_screen_component"
import { UIPropertiesComponent } from "../components/ui_properties_component"

export class DappClientSocket
{
    private socket: WebSocket

    private centralScreenMain: IEntity    

    private static DISTANCE_CODE: number = 3001;    

    constructor()
    {
        this.centralScreenMain = engine.getComponentGroup(CentralScreenComponent).entities[0]        
    }

    static getDistanceCode(): number
    {
        return DappClientSocket.DISTANCE_CODE
    }

    connect(): void
    {
        if (this.socket != null)
        {
            return;
        }

        //this.socket = new WebSocket("wss://quiz-service.dapp-craft.com:8444")
        this.socket = new WebSocket("ws://localhost:8080")

        this.socket.onopen = this.onOpen
        this.socket.onclose = this.onClose
        this.socket.onmessage = this.onMessage
    }

    join(): void
    {         
        var response = "join\n"
        this.send(response)
    }

    // Be careful, different this! 
    private onMessage(event: any): void
    {
        log("RECEIVED: " + event.data)

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
            case "connected":
            case "countdown":
                {
                    var actualMessage = ""

                    for (var i = 1; i < lines.length; i++)
                    {
                        actualMessage += lines[i] + "\n"

                        if (i < lines.length - 1)
                        {
                            actualMessage += "\n"
                        }
                    }

                    centralComp.connected = actualMessage
                    centralComp.connectedLoaded = true                    

                    break
                }
            case "autocomplete":
                {
                    var action = lines[1]

                    if (action == "show")
                    {
                        uiComp.autocompleteVisible = true
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
                    // TODO

                    break
                }
            case "start":
                {                    
                    var autocompletePrice = parseInt(lines[1])
                    var autocutPrice = parseInt(lines[2])
                    var totalQuestions = parseInt(lines[3])

                    let question = new Question(
                        lines[5],
                        [
                            lines[6],
                            lines[7],
                            lines[8],
                            lines[9]
                        ]
                    )

                    uiComp.autocompletePrice = autocompletePrice
                    uiComp.autocutPrice = autocutPrice

                    centralComp.question = question
                    leftComp.totalQuestions = totalQuestions
                    leftComp.currentQuestion = 0

                    centralComp.nextQuestionLoaded = true
                    centralComp.answerLoaded = false

                    break;
                }
            case "timer":
                {
                    rightComp.timeLeft = lines[1]

                    break
                }
            case "scheduled_timer":
                {
                    var start = ""

                    for (var i = 1; i < lines.length; i++)
                    {
                        start += lines[i]

                        if (i < lines.length - 1)
                        {
                            start += "\n"
                        }
                    }    

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
                    var answer = lines[1]

                    centralComp.answer = answer
                    centralComp.answerLoaded = true

                    break
                }
            case "next":
                {
                    var currentQuestion = parseInt(lines[1])

                    let question = new Question(
                        lines[3],
                        [
                            lines[4],
                            lines[5],
                            lines[6],
                            lines[7]
                        ]
                    )

                    centralComp.question = question                
                    leftComp.currentQuestion = currentQuestion

                    centralComp.nextQuestionLoaded = true

                    break
                }
            case "finish":
                {
                    var finish = lines[1] + "\n\n" + lines[2]

                    centralComp.finish = finish

                    centralComp.finishLoaded = true

                    break
                }
            case "top_party":
                {
                    var partyTop = ""

                    for (var i = 1; i < lines.length; i++)
                    {
                        partyTop += lines[i]

                        if (i < lines.length - 1)
                        {
                            partyTop += "\n"
                        }
                    }        

                    topComp.topPartyPlayers = partyTop

                    topComp.topPartyPlayersLoaded = true

                    break
                }
            case "lifetime_best":
                {
                    var allBest = ""

                    for (var i = 1; i < lines.length; i++)
                    {
                        allBest += lines[i]

                        if (i < lines.length - 1)
                        {
                            allBest += "\n"
                        }
                    }    

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

        let centralScreenMain = engine.getComponentGroup(CentralScreenComponent).entities[0]
        let rightScreenMain = engine.getComponentGroup(RightScreenComponent).entities[0]
        let leftScreenMain = engine.getComponentGroup(LeftScreenComponent).entities[0]
        let topPartyScreenMain = engine.getComponentGroup(TopPartyScreenComponent).entities[0]
        let lifetimeBestScreenMain = engine.getComponentGroup(LifetimeBestScreenComponent).entities[0]
        let timedQuizScreenMain = engine.getComponentGroup(TimedQuizScreenComponent).entities[0]

        centralScreenMain.addComponentOrReplace(new BlockComponent)

        centralScreenMain.getComponent(CentralScreenComponent).clear()
        leftScreenMain.getComponent(LeftScreenComponent).clear()
        rightScreenMain.getComponent(RightScreenComponent).clear()
        topPartyScreenMain.getComponent(TopPartyScreenComponent).clear()
        lifetimeBestScreenMain.getComponent(LifetimeBestScreenComponent).clear()
        timedQuizScreenMain.getComponent(TimedQuizScreenComponent).clear()

        if (event.code != DappClientSocket.DISTANCE_CODE)
        {
            centralScreenMain.getComponent(TextShape).value = "Disconnected remotely"
            centralScreenMain.getComponent(TextShape).fontSize = 1
        }
        else
        {
            centralScreenMain.getComponent(TextShape).value = ""
        }

        leftScreenMain.getComponent(TextShape).value = ""
        rightScreenMain.getComponent(TextShape).value = ""
        topPartyScreenMain.getComponent(TextShape).value = ""
        lifetimeBestScreenMain.getComponent(TextShape).value = ""
        timedQuizScreenMain.getComponent(TextShape).value = ""
    }

    send(message: string): void
    {
        log("SENT: " + message)

        this.centralScreenMain.addComponentOrReplace(new BlockComponent())

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