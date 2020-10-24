import { UIPropertiesComponent } from "../components/ui_properties_component"
import { UICallback } from "../app/ui_callback"

export class UISystem implements ISystem
{
    uiCallback: UICallback

    constructor(UICallback: UICallback)
    {
        this.uiCallback = UICallback
    }

    update(dt: number)
    {
        this.updateUI()
    }

    updateUI(): void
    {        
        let uiPropertiesComp = UICallback.properties.getComponent(UIPropertiesComponent)

        uiPropertiesComp.autocompleteVisible ? this.uiCallback.showAutocompleteButton() : this.uiCallback.hideAutocomplete()
        uiPropertiesComp.autocutVisible ? this.uiCallback.showAutocutButton() : this.uiCallback.hideAutocut()
        
        uiPropertiesComp.controlVisible ? this.uiCallback.showControlButtons() : this.uiCallback.hideControlButtons()        

        uiPropertiesComp.canLeave ? this.uiCallback.showLeaveButton() : this.uiCallback.hideLeave()
        

        this.uiCallback.setMember(uiPropertiesComp.member)

        this.uiCallback.updateAutocompleteLeft()
        this.uiCallback.updateAutocutLeft()

        this.uiCallback.updateAutocompletePrice()
        this.uiCallback.updateAutocutPrice()

        this.uiCallback.updateLeaveMessage()

        this.uiCallback.updateCanJoinTimer()
    }
}