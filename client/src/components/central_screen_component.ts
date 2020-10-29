import { AnswerStatistics } from "../entities_utils/answer_statistics"
import { Question } from "../entities_utils/question"

@Component("centralScreenComponent")
export class CentralScreenComponent
{
    connected: string    
    question: Question
    answer: string

    answerStatistics: AnswerStatistics

    connectedLoaded: boolean    
    nextQuestionLoaded: boolean
    answerLoaded: boolean
    answerStatisticsLoaded: boolean
    finishLoaded: boolean
    getLoaded: boolean    

    constructor()
    {
        this.clear()
    }

    clear(): void
    {
        this.connected = ""        
        this.question = null
        this.answer = ""        

        this.connectedLoaded = false        
        this.nextQuestionLoaded = false
        this.answerLoaded = false
        this.answerStatisticsLoaded = false
        this.finishLoaded = false
        this.getLoaded = false        
    }
}