import '../../node_modules/@dcl/l2-utils/matic/index'
import { DappClientSocket } from "../app/dapp_client_socket"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { UIStartUp } from "./ui_start_up"
import { UICheckMetamask } from "./ui_check_metamask"
import { UITopUp } from "./ui_top_up"
import { UIBottom } from "./ui_bottom"
import { UIAutocomplete } from "./ui_autocomplete"

export class UI 
{
    private static ui: UI

    public static properties: Entity
    public static canvas: UICanvas      

    private static uiCheckMetamask: UICheckMetamask
    private static uiStartUp: UIStartUp
    private static uiBottom: UIBottom
    private static uiTopUp: UITopUp
    private static uiAutocomplete: UIAutocomplete

    private constructor()
    {
        UI.canvas = new UICanvas()

        this.configureProperties()        
    }

    public static setClientSocket(dappClientSocket: DappClientSocket): void
    {        
        UIStartUp.setClientSocket(dappClientSocket)
        UIAutocomplete.setClientSocket(dappClientSocket)
    }

    private static configInitialDisplay(): void
    {
        UI.uiCheckMetamask = new UICheckMetamask(UI.ui)
        UI.uiStartUp = new UIStartUp(UI.ui)
        UI.uiBottom = new UIBottom(UI.ui)
        UI.uiTopUp = new UITopUp(UI.ui)
        UI.uiAutocomplete = new UIAutocomplete(UI.ui)
    }

    public static getInstance(): UI
    {
        if (UI.ui == null)
        {
            UI.ui = new UI()
            UI.configInitialDisplay()
        }

        return UI.ui;
    }

    private configureProperties(): void
    {
        UI.properties = new Entity()

        UI.properties.addComponent(new UIPropertiesComponent())

        engine.addEntity(UI.properties)
    }    

    public showTopUp(): void
    {
        UI.uiTopUp.reopen()
    }

    public hideTopUp(): void
    {
        UI.uiBottom.hideHourglass()
        UI.uiCheckMetamask.close()
        UI.uiTopUp.close()
    }

    public showCheckMetamask(): void
    {
        UI.uiCheckMetamask.reopen()
        UI.uiStartUp.close()
        UI.uiTopUp.close()
    }

    public hideCheckMetamask(): void
    {
       UI.uiCheckMetamask.close()
    }

    public showStartUp(): void
    {
        UI.uiStartUp.reopen()
    }

    public hideStartUp(): void
    {
        UI.uiAutocomplete.close()
    }

    public showAutocomplete(): void
    {                
        UI.uiBottom.showAutocompleteButton()
        UI.uiAutocomplete.reopen() 
    }

    public hideAutocompleteWindow(): void
    {
        UI.uiAutocomplete.close()
    }

    public hideAutocomplete(): void
    {
        UI.uiBottom.hideAutocompleteButton()
        UI.uiAutocomplete.close()
    }

    public showHourglass(): void
    {
        UI.uiBottom.showHourglass()
    }

    public showTick(time: number): void
    {
        UI.uiBottom.showTick(time)
    }

    public hideAllWindows(): void
    {
        UI.uiCheckMetamask.close()
        UI.uiStartUp.close()        
        UI.uiTopUp.close()
        UI.uiAutocomplete.close()
    }

    public showUniversalError(message: string): void
    {
        UI.uiTopUp.showUniversalError(message)
    }

    public showNotEnoughFundsError(): void
    {        
        UI.uiStartUp.showNotEnoughFundsError()
    }

    public updateAutocompletePrice(): void
    {
        UI.uiStartUp.updateAutocompletePrice()
    }

    public updateAutocutPrice(): void
    {
        UI.uiStartUp.updateAutocutPrice()
    }

    public updateAutocompleteLeft(): void
    {
        UI.uiAutocomplete.updateAutocompleteLeft()
    }

    public getProperties(): Entity
    {
        return UI.properties
    }
}