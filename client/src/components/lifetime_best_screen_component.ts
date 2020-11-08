@Component("lifetimeBestScreenComponent")
export class LifetimeBestScreenComponent
{
    lifetimeBest: Array<String>
    lifetimeBestLoaded: boolean

    constructor()
    {
        this.clear()
    }

    clear(): void
    {        
        this.lifetimeBest = []
        this.lifetimeBestLoaded = false
    }
}