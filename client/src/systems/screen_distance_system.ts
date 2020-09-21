import { CentralScreenComponent } from "../components/central_screen_component"
import { DappClientSocket } from "../app/dapp_client_socket"

export class ScreenDistanceSystem
{
    private dappClientSocket: DappClientSocket

    private centralScreenMain: IEntity    

    private static CONNECTION_DISTANCE: number = 20

    constructor(dappClientSocket: DappClientSocket)
    {
        this.dappClientSocket = dappClientSocket

        this.centralScreenMain = engine.getComponentGroup(CentralScreenComponent).entities[0]
    }

    private distanceXYZ(left: Vector3, right: Vector3): float
    {
        var a = left.z - right.z
        var b = left.x - right.x
        var c = left.y - right.y

        return Math.sqrt(a * a + b * b + c * c)
    }

    update(dt: number)
    {
        let dist = this.distanceXYZ(this.centralScreenMain.getComponent(Transform).position, Camera.instance.position)

        if (dist < ScreenDistanceSystem.CONNECTION_DISTANCE)
        {
            this.dappClientSocket.connect()
        }
        else
        {
            this.dappClientSocket.close(DappClientSocket.getDistanceCode())
        }
    }
}