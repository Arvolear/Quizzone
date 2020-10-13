import { Question } from "../app/question"

@Component("centralScreenComponent")
export class CentralScreenComponent
{
    connected: string    
    question: Question
    answer: string    

    connectedLoaded: boolean    
    nextQuestionLoaded: boolean
    answerLoaded: boolean
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
        this.finishLoaded = false
        this.getLoaded = false        
    }
}