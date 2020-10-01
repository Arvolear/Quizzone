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

        let UIPropertiesComp = ui.getProperties().getComponent(UIPropertiesComponent)

        UIPropertiesComp.autocompleteVisible ? ui.showAutocompleteButton() : ui.hideAutocomplete()
        // UIPropertiesComp.autocutVisible ? ui.showAutocut() : ui.hideAutocut()     
        
        ui.updateAutocompleteLeft()
        
        ui.updateAutocompletePrice()
        ui.updateAutocutPrice()
    }
}