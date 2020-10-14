import { UICallback } from '../app/ui_callback'
import { SceneCallback } from '../app/scene_callback'
import { DappClientSocket } from "../app/dapp_client_socket"
import { UIPropertiesComponent } from "../components/ui_properties_component"
import { UIStartUp } from "./ui_start_up"
import { UICheckMetamask } from "./ui_check_metamask"
import { UITopUp } from "./ui_top_up"
import { UIBottom } from "./ui_bottom"
import { UIAutocomplete } from "./ui_autocomplete"
import { UIAutocut } from './ui_autocut'
import { UIMember } from './ui_member'

export class UI extends UICallback
{
    private static sceneCallback: SceneCallback

    private static ui: UI

    private static uiCheckMetamask: UICheckMetamask
    private static uiStartUp: UIStartUp
    private static uiBottom: UIBottom
    private static uiTopUp: UITopUp
    private static uiMember: UIMember
    private static uiAutocomplete: UIAutocomplete
    private static uiAutocut: UIAutocut

    private constructor()
    {
        super()

        UI.canvas = new UICanvas()        

        this.configureProperties()
    }

    public static setClientSocket(dappClientSocket: DappClientSocket): void
    {
        UICallback.dappClientSocket = dappClientSocket
    }

    public static setSceneCallback(sceneCallback: SceneCallback)
    {
        UI.sceneCallback = sceneCallback
    }

    private static configInitialDisplay(): void
    {
        UI.uiMember = new UIMember(UI.ui)
        UI.uiCheckMetamask = new UICheckMetamask(UI.ui)
        UI.uiStartUp = new UIStartUp(UI.ui)
        UI.uiBottom = new UIBottom(UI.ui)
        UI.uiTopUp = new UITopUp(UI.ui)        
        UI.uiAutocomplete = new UIAutocomplete(UI.ui)
        UI.uiAutocut = new UIAutocut(UI.ui)
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
        UICallback.properties = new Entity()

        UICallback.properties.addComponent(new UIPropertiesComponent())

        engine.addEntity(UICallback.properties)
    }

    public showTopUp(): void
    {
        UI.ui.hideAllWindows()
        UI.uiTopUp.reopen()
    }

    public hideTopUp(): void
    {
        UI.uiBottom.hideHourglass()
        UI.uiCheckMetamask.close()
        UI.uiTopUp.close()
    }

    public showMember(): void
    {
        UI.ui.hideAllWindows()
        UI.uiMember.reopen()
    }

    public hideMember(): void
    {
        UI.uiBottom.hideHourglass()
        UI.uiCheckMetamask.close()
        UI.uiMember.close()
    }

    public showCheckMetamask(): void
    {
        UI.ui.hideAllWindows()
        UI.uiBottom.showHourglass()
        UI.uiCheckMetamask.reopen()
    }

    public hideCheckMetamask(): void
    {
        UI.uiCheckMetamask.close()
        UI.uiStartUp.close()
        UI.uiTopUp.close()
    }

    public showStartUp(): void
    {
        UI.ui.hideAllWindows()
        UI.uiStartUp.reopen()
    }

    public hideStartUp(): void
    {
        UI.uiBottom.hideHourglass()
        UI.uiStartUp.close()
    }

    public showAutocompleteButton(): void
    {
        UI.uiBottom.showAutocompleteButton()
    }

    public showAutocompleteWindow(): void
    {
        UI.ui.hideAllWindows()
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

    public showAutocutButton(): void
    {
        UI.uiBottom.showAutocutButton()
    }

    public showAutocutWindow(): void
    {
        UI.ui.hideAllWindows()
        UI.uiAutocut.reopen()
    }

    public hideAutocutWindow(): void
    {
        UI.uiAutocut.close()
    }

    public hideAutocut(): void
    {
        UI.uiBottom.hideAutocutButton()
        UI.uiAutocut.close()
    }

    public showHourglass(): void
    {
        UI.uiBottom.showHourglass()
    }

    public hideHourglass(): void
    {
        UI.uiBottom.hideHourglass()
    }

    public showTick(time: number): void
    {
        UI.uiBottom.showTick(time)
    }

    public setMember(member: boolean): void
    {
        UI.sceneCallback.setMember(member)
    }

    public hideAllWindows(): void
    {
        UI.uiCheckMetamask.close()
        UI.uiStartUp.close()
        UI.uiTopUp.close()
        UI.uiMember.close()
        UI.uiAutocomplete.close()
        UI.uiAutocut.close()
    }

    public showUniversalError(message: string): void
    {
        UI.ui.hideAllWindows()
        UI.uiTopUp.showUniversalError(message)
    }

    public showNotEnoughFundsError(): void
    {
        UI.ui.hideAllWindows()
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

    public updateAutocutLeft(): void
    {
        UI.uiAutocut.updateAutocutLeft()
    }

    public updateCanJoinTimer(): void
    {
        if (!UI.properties.getComponent(UIPropertiesComponent).canJoin)
        {
            UI.ui.hideStartUp()
        }
        
        UI.uiStartUp.updateTimer()
    }    

    public getProperties(): Entity
    {
        return UI.properties
    }
}