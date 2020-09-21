@Component("timedQuizScreenComponent")
export class TimedQuizScreenComponent
{
    timeLeft: string

    constructor()
    {
        this.clear();
    }

    clear(): void
    {
        this.timeLeft = ""
    }
}