import * as EthConnect from '../../node_modules/eth-connect/esm'
import { abi as abiBuy } from '../../../ethereum/contracts/abi_opensea_buy'
import { abi as abiToken } from '../../../ethereum/contracts/abi_opensea_token'
import { getProvider } from '@decentraland/web3-provider'
import { delay } from '../../node_modules/@dcl/l2-utils/utils/index'
import { UICallback } from '../callbacks/ui_callback'
import { UIPropertiesComponent } from '../components/ui_properties_component'
import { General } from './general'
import { ElasticLogger } from '../log/elastic_logger'

export class Membership
{
    private static membership: Membership

    private static CONTRACT_BUY = "0xb6480a1AEaDa32e42CB9eeDF904F03d82a1A0d92" // opensea
    private static CONTRACT_TOKEN = "0xd997fe65D5f4259840A220E39b1E9A33b645459b" // opensea
    private static TOKEN_ID = 42 // opensea

    private static uiCallback: UICallback
    private static elasticLogger: ElasticLogger

    private constructor(ui: UICallback)
    {
        Membership.uiCallback = ui
        Membership.elasticLogger = ElasticLogger.getInstance()

        this.configurePlayerData()
    }

    public static getInstance(ui: UICallback): Membership
    {
        if (Membership.membership == null)
        {
            Membership.membership = new Membership(ui)
        }

        return Membership.membership
    }

    private configurePlayerData(): void
    {
        const playerDataPromise = executeTask(async () =>
        {
            while (General.playerWallet == null)
            {
                await delay(100)
            }
        })        

        playerDataPromise.then(() => 
        {
            this.checkMembership()
        })
    }

    public checkMembership(): void
    {
        const membershipPromise = executeTask(async () =>
        {
            const provider = await getProvider()
            const requestManager = new EthConnect.RequestManager(provider)
            const factory = new EthConnect.ContractFactory(requestManager, abiToken)
            const contract = (await factory.at(Membership.CONTRACT_TOKEN)) as any
            const amount = await contract.balanceOf(General.playerWallet, Membership.TOKEN_ID) as number

            if (amount > 0)
            {
                UICallback.properties.getComponent(UIPropertiesComponent).member = true
            }
            else
            {
                UICallback.properties.getComponent(UIPropertiesComponent).member = false
            }
        })

        membershipPromise.then()
    }

    private logBuyMembership(membershipPrice: number, receipt: string)
    {
        let message = {}

        message['membership_price'] = membershipPrice
        message['tx_id'] = receipt

        Membership.elasticLogger.log("buy_membership", message)
    }

    public buyMembership(): void
    {
        const buyMembershipPromise = executeTask(async () =>
        {
            const provider = await getProvider()
            const requestManager = new EthConnect.RequestManager(provider)
            const factory = new EthConnect.ContractFactory(requestManager, abiBuy)
            const contractBuy = (await factory.at(Membership.CONTRACT_BUY)) as any
            const prices = await contractBuy.getPrices([Membership.TOKEN_ID]);
            const price = prices[0];

            try
            {
                let res = await contractBuy.buyNFTForETH(Membership.TOKEN_ID, 1, [],
                    {
                        from: General.playerWallet,
                        value: price
                    })

                let receipt = null

                while (receipt == null)
                {
                    await delay(2000)
                    receipt = await requestManager.eth_getTransactionReceipt(res.toString())
                }

                await delay(5000)

                UICallback.properties.getComponent(UIPropertiesComponent).member = true
                Membership.uiCallback.showTick(8)

                this.logBuyMembership(price, receipt)
            }
            catch (exception)
            {
                log(exception.toString())

                Membership.uiCallback.hideCheckMetamask()
                Membership.uiCallback.hideHourglass()
            }
        })

        buyMembershipPromise.then()
    }

    public getMemberShipPrice(): Promise<string>
    {
        const balancePromise = executeTask(async () =>
        {
            const provider = await getProvider()
            const requestManager = new EthConnect.RequestManager(provider)
            const factory = new EthConnect.ContractFactory(requestManager, abiBuy)
            const contractBuy = (await factory.at(Membership.CONTRACT_BUY)) as any            
            const prices = await contractBuy.getPrices([Membership.TOKEN_ID]);
            const price = prices[0];
        
            let priceStr = EthConnect.fromWei(price.toNumber(), "ether").toString()            

            return priceStr
        })

        return balancePromise
    }
}