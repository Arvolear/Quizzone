@Component("topPartyScreenComponent")
export class TopPartyScreenComponent
{
    topPartyPlayers: string
    topPartyPlayersLoaded: boolean

    selectedButton: number
    mustSelectedButton: number

    constructor()
    {
        this.clear()
    }

    clear(): void
    {
        this.topPartyPlayers = ""
        this.topPartyPlayersLoaded = false

        this.selectedButton = -1
        this.mustSelectedButton = -1
    }
}