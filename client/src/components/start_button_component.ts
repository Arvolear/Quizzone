@Component("startButtonComponent")
export class StartButtonComponent
{
    canJoin: boolean

    constructor()
    {
        this.clear();
    }

    clear(): void
    {
        this.canJoin = false
    }
}