import { UI } from "../ui/ui"
import { UIPropertiesComponent } from "../components/ui_properties_component"

export class UISystem implements ISystem
{
    update(dt: number)
    {
        this.updateUI()
    }

    updateUI(): void
    {
        let ui = UI.getInstance()

        let uiPropertiesComp = ui.getProperties().getComponent(UIPropertiesComponent)

        uiPropertiesComp.autocompleteVisible ? ui.showAutocompleteButton() : ui.hideAutocomplete()
        uiPropertiesComp.autocutVisible ? ui.showAutocutButton() : ui.hideAutocut()     
        
        ui.setMember(uiPropertiesComp.member)

        ui.updateAutocompleteLeft()
        ui.updateAutocutLeft()
        
        ui.updateAutocompletePrice()
        ui.updateAutocutPrice()

        ui.updateCanJoinTimer()
    }
}