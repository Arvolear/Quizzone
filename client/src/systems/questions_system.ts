import { BlockComponent } from "../components/block_component"
import { CentralScreenComponent } from "../components/central_screen_component"
import { LeftScreenComponent } from "../components/left_screen_component"
import { RightScreenComponent } from "../components/right_screen_component"
import { DappClientSocket } from "../app/dapp_client_socket"
import { TopPartyScreenComponent } from "../components/top_party_screen_component"

export class QuestionsSystem implements ISystem
{
    private dappClientSocket: DappClientSocket

    private centralScreenMain: IEntity
    private leftScreenMain: IEntity
    private topPartyScreenMain: IEntity
    private rightScreenMain: IEntity    

    constructor(dappClientSocket: DappClientSocket)
    {
        this.dappClientSocket = dappClientSocket

        this.centralScreenMain = engine.getComponentGroup(CentralScreenComponent).entities[0]
        this.leftScreenMain = engine.getComponentGroup(LeftScreenComponent).entities[0]
        this.topPartyScreenMain = engine.getComponentGroup(TopPartyScreenComponent).entities[0]
        this.rightScreenMain = engine.getComponentGroup(RightScreenComponent).entities[0]        
    }

    update(dt: number)
    {
        this.updateCentral()                
    }

    private updateCentral(): void
    {
        let centralComp = this.centralScreenMain.getComponent(CentralScreenComponent)

        if (centralComp.getLoaded)
        {
            this.sendAnswer()

            centralComp.getLoaded = false
        }

        if (centralComp.connectedLoaded)
        {
            this.displayConnected()

            this.topPartyScreenMain.addComponentOrReplace(new BlockComponent())

            centralComp.connectedLoaded = false
        }        
        else if (centralComp.nextQuestionLoaded)
        {
            this.displayQuestion()            
            this.displayQuestionNumber()

            this.topPartyScreenMain.removeComponent(BlockComponent)

            centralComp.nextQuestionLoaded = false
        }
        else if (centralComp.answerLoaded)
        {
            this.displayAnswer()

            this.topPartyScreenMain.addComponentOrReplace(new BlockComponent())

            centralComp.answerLoaded = false
        }
        else if (centralComp.answerStatisticsLoaded)
        {
            this.displayAnswerStatistics()

            this.topPartyScreenMain.addComponentOrReplace(new BlockComponent())

            centralComp.answerStatisticsLoaded = false
        }
        else if (centralComp.finishLoaded)
        {
            this.displayFinish()

            this.topPartyScreenMain.addComponentOrReplace(new BlockComponent())

            centralComp.finishLoaded = false
        }
    }

    private sendAnswer(): void
    {
        var chosen = this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton + 1
        var currentQuestion = this.leftScreenMain.getComponent(LeftScreenComponent).currentQuestion

        var toSend = "answer\n" + currentQuestion + "\n" + chosen

        this.dappClientSocket.send(toSend)
    }

    private displayConnected(): void
    {
        this.rightScreenMain.getComponent(RightScreenComponent).clear();
        this.rightScreenMain.getComponent(TextShape).value = ""

        let centralComp = this.centralScreenMain.getComponent(CentralScreenComponent)
        let text = this.centralScreenMain.getComponent(TextShape)

        text.value = centralComp.connected
        text.fontSize = 1
    }   

    private displayFinish(): void
    {
        this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton = -1; 
        this.topPartyScreenMain.getComponent(TopPartyScreenComponent).mustSelectedButton = -1;        

        this.leftScreenMain.getComponent(LeftScreenComponent).clear()
        this.leftScreenMain.getComponent(TextShape).value = ""    

        this.centralScreenMain.getComponent(TextShape).value = ""
    }

    private displayAnswer(): void
    {
        let centralComp = this.centralScreenMain.getComponent(CentralScreenComponent)
        var answer = centralComp.answer

        let text = this.centralScreenMain.getComponent(TextShape)

        text.value = answer
        text.fontSize = 1
    }

    private displayAnswerStatistics(): void
    {
        let centralComp = this.centralScreenMain.getComponent(CentralScreenComponent)
        var answerStatistics = centralComp.answerStatistics

        var toDisplay = answerStatistics.headMessage.trim() + "\n"

        for (var i = 0; i < answerStatistics.answers.length; i++)
        {
            toDisplay += answerStatistics.answers[i].trim()

            if (i % 2 == 1)
            {
                toDisplay += "\n"
            }
            else
            {
                toDisplay += "     "
            }
        }

        toDisplay += "\n" + answerStatistics.tailMessage;

        let text = this.centralScreenMain.getComponent(TextShape)

        text.value = toDisplay
        text.fontSize = 1
    }

    private displayQuestion(): void
    {
        this.topPartyScreenMain.getComponent(TopPartyScreenComponent).selectedButton = -1;
        this.topPartyScreenMain.getComponent(TopPartyScreenComponent).mustSelectedButton = -1;
        
        let centralComp = this.centralScreenMain.getComponent(CentralScreenComponent)
        var question = centralComp.question

        var actualQuestion = question.actualQuestion.trim()

        var i = 60;

        while (i < actualQuestion.length)
        {
            i = actualQuestion.indexOf(" ", i);

            if (i >= actualQuestion.length || i <= 0)
            {
                break
            }

            actualQuestion = actualQuestion.substring(0, i) + '\n' + actualQuestion.substring(i + 1);

            i += 60;
        }

        var toDisplay = actualQuestion + "\n\n"

        for (var i = 0; i < question.answers.length; i++)
        {
            toDisplay += question.answers[i].trim()

            if (i % 2 == 1)
            {
                toDisplay += "\n"
            }
            else
            {
                toDisplay += "     "
            }
        }

        let text = this.centralScreenMain.getComponent(TextShape)

        text.value = toDisplay
        text.fontSize = 1
    }

    private displayQuestionNumber(): void
    {
        var current = this.leftScreenMain.getComponent(LeftScreenComponent).currentQuestion + 1
        var total = this.leftScreenMain.getComponent(LeftScreenComponent).totalQuestions
        let text = this.leftScreenMain.getComponent(TextShape)

        text.value = "Question\n" + current + "/" + total;
        text.fontSize = 1
    }
}