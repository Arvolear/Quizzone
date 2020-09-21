import { TopPartyScreenComponent } from "../components/top_party_screen_component"
import { LifetimeBestScreenComponent } from "../components/lifetime_best_screen_component"

export class ResultsSystem
{    
    private topPartyScreenMain: IEntity
    private lifetimeBestScreenMain: IEntity

    constructor()
    {    
        this.topPartyScreenMain = engine.getComponentGroup(TopPartyScreenComponent).entities[0]
        this.lifetimeBestScreenMain = engine.getComponentGroup(LifetimeBestScreenComponent).entities[0]
    }

    update(dt: number)
    {        
        this.updateTopParty()
        this.updateBest()
    }

    private updateTopParty(): void
    {
        let topComp = this.topPartyScreenMain.getComponent(TopPartyScreenComponent)

        if (topComp.topPartyPlayersLoaded)
        {
            this.displayTopParty()

            topComp.topPartyPlayersLoaded = false
        }
    }

    private updateBest(): void
    {
        let bestComp = this.lifetimeBestScreenMain.getComponent(LifetimeBestScreenComponent)

        if (bestComp.lifetimeBestLoaded)
        {
            this.displayBest()

            bestComp.lifetimeBestLoaded = false
        }
    }

    private displayTopParty(): void
    {
        let topComp = this.topPartyScreenMain.getComponent(TopPartyScreenComponent)

        let text = this.topPartyScreenMain.getComponent(TextShape)

        text.value = topComp.topPartyPlayers
        text.fontSize = 1
    }

    private displayBest(): void
    {
        let bestComp = this.lifetimeBestScreenMain.getComponent(LifetimeBestScreenComponent)

        let text = this.lifetimeBestScreenMain.getComponent(TextShape)

        text.value = bestComp.lifetimeBest
        text.fontSize = 1
    }
}