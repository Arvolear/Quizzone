import { UICallback } from "../callbacks/ui_callback"
import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import { Sounds } from "../app/sounds";
import { General } from "../blockchain/general";
import { AppCallback } from "../callbacks/app_callback";
import { ElasticLogger } from "../log/elastic_logger";

export class BoostersBuy
{
    private static boostersBuy: BoostersBuy

    private static uiCallback: UICallback
    private static sounds: Sounds    

    private static elasticLogger: ElasticLogger

    private constructor(uiCallback: UICallback)
    {
        BoostersBuy.uiCallback = uiCallback
        BoostersBuy.sounds = Sounds.getInstance()
        BoostersBuy.elasticLogger = ElasticLogger.getInstance()
    }

    public static getInstance(ui: UICallback): BoostersBuy
    {
        if (BoostersBuy.boostersBuy == null)
        {
            BoostersBuy.boostersBuy = new BoostersBuy(ui)
        }

        return BoostersBuy.boostersBuy
    }

    private logBuyBoosters(boostersToBuyValue: number, autocompleteNum: number, autocutNum: number): void
    {
        let message = {}

        message['price_mana'] = boostersToBuyValue
        message['autocomplete_num'] = autocompleteNum
        message['50/50_num'] = autocutNum

        BoostersBuy.elasticLogger.log("buy_boosters", message)
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
                
                this.logBuyBoosters(boostersToBuyValue, autocompleteNum, autocutNum)
            }).catch(() => 
            {
                BoostersBuy.uiCallback.hideHourglass()
                BoostersBuy.uiCallback.hideAllWindows()                
            })
        })

        sendAutocomplete.then()
    }
}