import { UI } from "../app/ui"
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

        UIPropertiesComp.autocompleteVisible ? ui.showAutocomplete() : ui.hideAutocomplete()
        UIPropertiesComp.autocutVisible ? ui.showAutocut() : ui.hideAutocut()     
        
        ui.updateAutocompletePrice()
        ui.updateAutocutPrice()
    }
}