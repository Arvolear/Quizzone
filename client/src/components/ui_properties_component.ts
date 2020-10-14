@Component("uiPropertiesComponent")
export class UIPropertiesComponent
{
    canJoin: boolean    
    member: boolean

    timeToQuizStart: string

    autocompleteVisible: boolean
    autocutVisible: boolean

    autocompleteLeft: number
    autocutLeft: number

    membershipPrice: float
    autocompletePrice: number
    autocutPrice: number

    constructor()
    {
        this.clear()
    }

    public clear(): void
    {
        this.canJoin = false
        this.member = false    
        this.autocompleteVisible = false
        this.autocutVisible = false
        // this.autocompleteVisible = true
        // this.autocutVisible = true
        this.timeToQuizStart = ""
        this.membershipPrice = 0.0
        this.autocompleteLeft = 0
        this.autocutLeft = 0
        this.autocompletePrice = Number.POSITIVE_INFINITY
        this.autocutPrice = Number.POSITIVE_INFINITY
    }
}