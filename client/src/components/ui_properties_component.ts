@Component("uiPropertiesComponent")
export class UIPropertiesComponent
{
    autocompleteVisible: boolean
    autocutVisible: boolean

    autocompleteLeft: number
    autocutLeft: number

    autocompletePrice: number
    autocutPrice: number

    constructor()
    {
        this.clear()
    }

    public clear(): void
    {
        this.autocompleteVisible = false
        this.autocutVisible = false
        this.autocompleteLeft = 0
        this.autocutLeft = 0
        this.autocompletePrice = Number.POSITIVE_INFINITY
        this.autocutPrice = Number.POSITIVE_INFINITY
    }
}