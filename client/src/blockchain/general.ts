import * as matic from '../../node_modules/@dcl/l2-utils/matic/index'
import * as EthConnect from '../../node_modules/eth-connect/esm'
import { getProvider } from '@decentraland/web3-provider'
import { getUserData } from '@decentraland/Identity'

export class General
{
    private static general: General

    public static playerWallet
    public static playerNick
    public static myWallet = "0xEd498E75d471C3b874461a87Bb7146453CC8175A"
    public static network = "mainnet"
    // public static network = "goerli"

    private constructor()
    {
        const playerDataPromise = executeTask(async () =>
        {
            let data = await getUserData()
            General.playerWallet = data.publicKey;
            General.playerNick = data.displayName
        })

        playerDataPromise.then()
    }

    public static getInstance(): General
    {
        if (General.general == null)
        {
            General.general = new General()
        }

        return General.general
    }

    public getMainBalance(): Promise<string>
    {
        const balancePromise = executeTask(async () =>
        {
            const provider = await getProvider()
            const requestManager = new EthConnect.RequestManager(provider)
            const blockNum = await requestManager.eth_blockNumber()
            const playerBalance = await requestManager.eth_getBalance(General.playerWallet, blockNum)

            let playerBalanceStr = EthConnect.fromWei(playerBalance.toNumber(), "ether").toString()

            return playerBalanceStr
        })

        return balancePromise
    }

    public getMaticBalance(): Promise<{ l1: number, l2: number }>
    {
        const balancePromise = executeTask(async () =>
        {
            return await matic.balance(General.playerWallet, General.network)
        })

        return balancePromise
    }
}