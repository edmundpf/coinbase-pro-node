import { AxiosInstance } from 'axios';
import { ISO_8601_MS_UTC, OrderSide, Pagination } from '../payload/common';
import { RESTClient } from '..';
export interface Product {
    base_currency: string;
    base_increment: string;
    base_max_size: string;
    base_min_size: string;
    cancel_only: boolean;
    display_name: string;
    id: string;
    limit_only: boolean;
    margin_enabled: boolean;
    max_market_funds: string;
    min_market_funds: string;
    post_only: boolean;
    quote_currency: string;
    quote_increment: string;
    status: string;
    status_message: string;
}
export interface ProductTicker {
    ask: string;
    bid: string;
    price: string;
    size: string;
    time: string;
    trade_id: number;
    volume: string;
}
export interface ProductStats {
    high: string;
    last: string;
    low: string;
    open: string;
    volume: string;
    volume_30day: string;
}
export interface Trade {
    price: string;
    side: OrderSide;
    size: string;
    time: ISO_8601_MS_UTC;
    trade_id: number;
}
export declare enum CandleGranularity {
    ONE_MINUTE = 60,
    FIVE_MINUTES = 300,
    FIFTEEN_MINUTES = 900,
    ONE_HOUR = 3600,
    SIX_HOURS = 21600,
    ONE_DAY = 86400
}
export interface BaseHistoricRateRequest {
    granularity: CandleGranularity;
}
export interface HistoricRateRequestWithTimeSpan extends BaseHistoricRateRequest {
    end: ISO_8601_MS_UTC;
    start: ISO_8601_MS_UTC;
}
export declare type HistoricRateRequest = BaseHistoricRateRequest | HistoricRateRequestWithTimeSpan;
export declare enum OrderBookLevel {
    ONLY_BEST_BID_AND_ASK = 1,
    TOP_50_BIDS_AND_ASKS = 2,
    FULL_ORDER_BOOK = 3
}
declare type ActiveOrderPrice = string;
declare type OrderSumSize = string;
declare type NumberOfOrders = string;
declare type OrderId = string;
declare type AggregatedOrder = [ActiveOrderPrice, OrderSumSize, NumberOfOrders];
declare type NonAggregatedOrder = [ActiveOrderPrice, OrderSumSize, OrderId];
declare type SequenceNumber = number;
export interface OrderBookLevel1 {
    asks: AggregatedOrder[];
    bids: AggregatedOrder[];
    sequence: SequenceNumber;
}
export interface OrderBookLevel2 {
    asks: AggregatedOrder[];
    bids: AggregatedOrder[];
    sequence: SequenceNumber;
}
export interface OrderBookLevel3 {
    asks: NonAggregatedOrder[];
    bids: NonAggregatedOrder[];
    sequence: SequenceNumber;
}
export declare type OrderBook = OrderBookLevel1 | OrderBookLevel2 | OrderBookLevel3;
export interface OrderBookRequestParameters {
    level: OrderBookLevel;
}
declare type Close = number;
declare type High = number;
declare type Low = number;
declare type Open = number;
declare type Volume = number;
export interface Candle {
    base: string;
    close: Close;
    counter: string;
    high: High;
    low: Low;
    open: Open;
    openTimeInISO: ISO_8601_MS_UTC;
    openTimeInMillis: number;
    productId: string;
    sizeInMillis: number;
    volume: Volume;
}
export declare enum ProductEvent {
    NEW_CANDLE = "ProductEvent.NEW_CANDLE"
}
export declare class ProductAPI {
    private readonly apiClient;
    private readonly restClient;
    static readonly URL: {
        PRODUCTS: string;
    };
    private watchCandlesConfig;
    constructor(apiClient: AxiosInstance, restClient: RESTClient);
    getCandles(productId: string, params: HistoricRateRequest): Promise<Candle[]>;
    watchCandles(productId: string, granularity: CandleGranularity, lastCandleTime: ISO_8601_MS_UTC): void;
    unwatchCandles(productId: string, granularity: CandleGranularity): void;
    getProducts(): Promise<Product[]>;
    getTrades(productId: string, pagination?: Pagination): Promise<{
        data: Trade[];
        pagination: {
            after?: string;
            before?: string;
        };
    }>;
    getProductOrderBook(productId: string, params?: {
        level: OrderBookLevel.ONLY_BEST_BID_AND_ASK;
    }): Promise<OrderBookLevel1>;
    getProductOrderBook(productId: string, params?: {
        level: OrderBookLevel.TOP_50_BIDS_AND_ASKS;
    }): Promise<OrderBookLevel2>;
    getProductOrderBook(productId: string, params?: {
        level: OrderBookLevel.FULL_ORDER_BOOK;
    }): Promise<OrderBookLevel3>;
    getProductStats(productId: string): Promise<ProductStats>;
    getProductTicker(productId: string): Promise<ProductTicker>;
    private mapCandle;
    private emitCandle;
    private checkNewCandles;
    private startCandleInterval;
}
export {};
