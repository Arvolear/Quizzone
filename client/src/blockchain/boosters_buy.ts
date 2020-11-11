import { UICallback } from "../app/ui_callback"
import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import { Sounds } from "../app/sounds";
import { General } from "../blockchain/general";
import { AppCallback } from "../app/app_callback";

export class BoostersBuy
{
    private static boostersBuy: BoostersBuy

    private static uiCallback: UICallback
    private static sounds: Sounds    

    private constructor(uiCallback: UICallback, sounds: Sounds)
    {
        BoostersBuy.uiCallback = uiCallback
        BoostersBuy.sounds = sounds
    }

    public static getInstance(ui: UICallback): BoostersBuy
    {
        if (BoostersBuy.boostersBuy == null)
        {
            BoostersBuy.boostersBuy = new BoostersBuy(ui, Sounds.getInstance())
        }

        return BoostersBuy.boostersBuy
    }

    public buyBoosters(boostersToBuyValue: number, autocompleteNum: number, autocutNum: number): void
    {
        const sendAutocomplete = executeTask(async () =>
        {
            BoostersBuy.uiCallback.showHourglass()
            BoostersBuy.uiCallback.showCheckMetamask()

            await matic.sendMana(General.myWallet, boostersToBuyValue, true, General.network).then(() => 
            {
                var toSend = "buy_boosters\n" +
                    autocompleteNum + "\n" +
                    autocutNum + "\n" +
                    General.playerWallet

                AppCallback.dappClientSocket.send(toSend)

                BoostersBuy.sounds.playBuyBooster()

                BoostersBuy.uiCallback.hideAllWindows()
                BoostersBuy.uiCallback.showTick(8)                
            }).catch(() => 
            {
                BoostersBuy.uiCallback.hideHourglass()
                BoostersBuy.uiCallback.hideAllWindows()                
            })
        })

        sendAutocomplete.then()
    }
}