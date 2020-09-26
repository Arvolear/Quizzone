@Component("uiPropertiesComponent")
export class UIPropertiesComponent
{
    autocompleteVisible: boolean
    autocutVisible: boolean

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
        this.autocompletePrice = Number.POSITIVE_INFINITY
        this.autocutPrice = Number.POSITIVE_INFINITY
    }
}