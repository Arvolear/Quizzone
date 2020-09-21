@Component("lifetimeBestScreenComponent")
export class LifetimeBestScreenComponent
{
    lifetimeBest: string
    lifetimeBestLoaded: boolean

    constructor()
    {
        this.clear()
    }

    clear(): void
    {
        this.lifetimeBest = ""
        this.lifetimeBestLoaded = false
    }
}