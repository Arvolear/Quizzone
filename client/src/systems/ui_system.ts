import { UI } from "../ui/ui"
import { UIPropertiesComponent } from "../components/ui_properties_component"

export class UISystem implements ISystem
{
    ui: UI

    constructor()
    {
        this.ui = UI.getInstance()
    }

    update(dt: number)
    {
        this.updateUI()
    }

    updateUI(): void
    {        
        let uiPropertiesComp = this.ui.getProperties().getComponent(UIPropertiesComponent)

        uiPropertiesComp.autocompleteVisible ? this.ui.showAutocompleteButton() : this.ui.hideAutocomplete()
        uiPropertiesComp.autocutVisible ? this.ui.showAutocutButton() : this.ui.hideAutocut()

        this.ui.setMember(uiPropertiesComp.member)

        this.ui.updateAutocompleteLeft()
        this.ui.updateAutocutLeft()

        this.ui.updateAutocompletePrice()
        this.ui.updateAutocutPrice()

        this.ui.updateCanJoinTimer()
    }
}