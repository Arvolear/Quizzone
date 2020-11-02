@Component("uiPropertiesComponent")
export class UIPropertiesComponent
{
    canJoin: boolean
    beforeTimed: boolean 
    canLeave: boolean
    freeLeave: boolean
    member: boolean

    timeToQuizStart: string

    controlVisible: boolean
    autocompleteVisible: boolean
    autocutVisible: boolean

    autocompleteLeft: number
    autocutLeft: number

    membershipPrice: float
    autocompletePrice: number
    autocutPrice: number

    constructor()
    {
        this.member = false
        
        this.clear()
    }

    public clear(): void
    {
        this.canJoin = false
        this.beforeTimed = false
        this.canLeave = false
        this.freeLeave = true

        this.controlVisible = true
        this.autocompleteVisible = false
        this.autocutVisible = false   
        this.timeToQuizStart = ""
        this.membershipPrice = 0.0
        this.autocompleteLeft = 0
        this.autocutLeft = 0
        this.autocompletePrice = Number.POSITIVE_INFINITY
        this.autocutPrice = Number.POSITIVE_INFINITY
    }
}