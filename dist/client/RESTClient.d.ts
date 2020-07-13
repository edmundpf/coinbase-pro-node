/// <reference types="node" />
import { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AccountAPI } from '../account';
import { RequestSetup, SignedRequest } from '../auth/RequestSigner';
import { OrderAPI } from '../order';
import { Candle, CandleGranularity, ProductAPI, ProductEvent } from '../product';
import { UserAPI } from '../user';
import { FeeAPI } from '../fee';
import { FillAPI } from '../fill';
import { ProfileAPI } from '../profile';
import { EventEmitter } from 'events';
import { CurrencyAPI } from '../currency';
import { WithdrawAPI } from '../withdraw';
import { TransferAPI } from '../transfer';
export interface RESTClient {
    on(event: ProductEvent.NEW_CANDLE, listener: (productId: string, granularity: CandleGranularity, candle: Candle) => void): this;
}
export declare class RESTClient extends EventEmitter {
    private readonly signRequest;
    get defaults(): AxiosRequestConfig;
    get interceptors(): {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    readonly account: AccountAPI;
    readonly fee: FeeAPI;
    readonly fill: FillAPI;
    readonly order: OrderAPI;
    readonly product: ProductAPI;
    readonly profile: ProfileAPI;
    readonly user: UserAPI;
    readonly currency: CurrencyAPI;
    readonly withdraw: WithdrawAPI;
    readonly transfer: TransferAPI;
    private readonly httpClient;
    private readonly logger;
    constructor(baseURL: string, signRequest: (setup: RequestSetup) => Promise<SignedRequest>);
    static stringifyPayload(config: AxiosRequestConfig): string;
}
