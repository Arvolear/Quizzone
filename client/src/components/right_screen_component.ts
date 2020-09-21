@Component("rightScreenComponent")
export class RightScreenComponent
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