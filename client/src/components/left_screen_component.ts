@Component("leftScreenComponent")
export class LeftScreenComponent
{
    totalQuestions: number
    currentQuestion: number

    constructor()
    {
        this.clear()    
    }

    clear(): void
    {
        this.totalQuestions = 0;
        this.currentQuestion = -1;
    }
}