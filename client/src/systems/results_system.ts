import { TopPartyScreenComponent } from "../components/top_party_screen_component"
import { LifetimeBestScreenComponent } from "../components/lifetime_best_screen_component"

export class ResultsSystem
{    
    private topPartyScreenMain: IEntity
    private lifetimeBestScreenMain: IEntity
    private lifetimeBestScreenRight: IEntity
    private lifetimeBestScreenDash: IEntity

    constructor()
    {    
        this.topPartyScreenMain = engine.getComponentGroup(TopPartyScreenComponent).entities[0]        
        this.lifetimeBestScreenMain = engine.getComponentGroup(LifetimeBestScreenComponent).entities[0]
        this.lifetimeBestScreenRight = engine.getComponentGroup(LifetimeBestScreenComponent).entities[1]
        this.lifetimeBestScreenDash = engine.getComponentGroup(LifetimeBestScreenComponent).entities[2]
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
        let textMain = this.lifetimeBestScreenMain.getComponent(TextShape)
        let textRight = this.lifetimeBestScreenRight.getComponent(TextShape)
        let textDash = this.lifetimeBestScreenDash.getComponent(TextShape)

        var allBest: Array<String> = bestComp.lifetimeBest 

        var maxLength = 0

        var mainRes = ""
        var rightRes = ""
        var dashRes = ""

        for (var i = 0; i < allBest.length; i++)
        {
            if (i == allBest.length - 2)
            {
                continue
            }

            maxLength = Math.max(maxLength, allBest[i].substr(0, allBest[i].lastIndexOf(" ")).length)
        }

        for (var i = 0; i < allBest.length; i++)
        {
            if (i == allBest.length - 2)
            {
                mainRes += allBest[i] + "\n"       
                rightRes += "\n"
                dashRes += "\n"

                continue
            }

            var lastSpaceInd = allBest[i].lastIndexOf(" ")

            var mainStr = allBest[i].substr(0, lastSpaceInd)
            var rightStr = allBest[i].substr(lastSpaceInd + 1)            

            mainRes += "      " + mainStr
            rightRes += rightStr

            dashRes += "---"

            for (var j = mainStr.length; j < maxLength; j++)
            {
                dashRes += "-"
            }

            if (i < allBest.length - 1)
            {
                mainRes += "\n"
                rightRes += "\n"
                dashRes += "\n"
            }
        }
        
        textMain.value = mainRes        
        textMain.fontSize = 1
        textRight.value = rightRes     
        textRight.fontSize = 1
        textDash.value = dashRes
        textDash.fontSize = 1
    }
}