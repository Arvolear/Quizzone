import { General } from "../blockchain/general"

export class ElasticLogger
{
    private static elasticLogger: ElasticLogger

    private static URL = "https://api.dapp-craft.com/dcllog/_doc/"

    private constructor()
    {
    }

    public static getInstance(): ElasticLogger
    {
        if (ElasticLogger.elasticLogger == null)
        {
            ElasticLogger.elasticLogger = new ElasticLogger()
        }

        return ElasticLogger.elasticLogger
    }

    public log(action: string, message: Object)
    {
        const logPromise = executeTask(async () =>
        {
            let data = {}

            data['action'] = action            

            let userInfo = {}

            userInfo['nick'] = General.playerNick
            userInfo['wallet'] = General.playerWallet

            data['user'] = userInfo
            data['data'] = message
            data['time'] = Date.now()

            let response = await fetch(ElasticLogger.URL,
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(data)
                })            

            await response.json()

            log(JSON.stringify(data))
        })

        logPromise.then()
    }
}