@Component("lifetimeBestScreenComponent")
export class LifetimeBestScreenComponent
{
    isPlayer: Boolean
    lifetimeBest: Array<String>
    lifetimeBestLoaded: boolean

    constructor()
    {
        this.clear()
    }

    clear(): void
    {        
        this.lifetimeBest = []
        this.isPlayer = false
        this.lifetimeBestLoaded = false
    }
}