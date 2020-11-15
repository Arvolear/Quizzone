import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import { UICallback } from "../callbacks/ui_callback"
import { General } from '../blockchain/general'

export class MaticTopUp
{
    private static maticTopUp: MaticTopUp

    private static uiCallback: UICallback

    private constructor(ui: UICallback)
    {
        MaticTopUp.uiCallback = ui
    }

    public static getInstance(ui: UICallback): MaticTopUp
    {
        if (MaticTopUp.maticTopUp == null)
        {
            MaticTopUp.maticTopUp = new MaticTopUp(ui)
        }

        return MaticTopUp.maticTopUp
    }

    public transferToMatic(balance: number, amount: number): void
    {
        if (isNaN(amount) || amount <= 0)
        {
            MaticTopUp.uiCallback.showUniversalError("Wrong input")
            return
        }

        if (amount > balance)
        {
            MaticTopUp.uiCallback.showUniversalError("Not enough funds")
            return
        }

        const topUp = executeTask(async () =>
        {
            if (General.playerWallet != null)
            {
                MaticTopUp.uiCallback.showCheckMetamask()

                await matic.depositMana(amount, General.network).then(() => 
                {
                    MaticTopUp.uiCallback.showTick(16)
                }).catch(() => 
                {
                    MaticTopUp.uiCallback.hideHourglass()
                    MaticTopUp.uiCallback.hideAllWindows()
                })
            }
        })

        topUp.then()
    }
}