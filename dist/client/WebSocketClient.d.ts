/// <reference types="node" />
import { EventEmitter } from 'events';
import ReconnectingWebSocket, { Event, ErrorEvent, Options, CloseEvent } from 'reconnecting-websocket';
import { RequestSetup, SignedRequest } from '../auth/RequestSigner';
import { OrderSide, ISO_8601_MS_UTC, UUID_V4 } from '..';
export interface WebSocketChannel {
    name: WebSocketChannelName;
    product_ids: string[];
}
export declare enum WebSocketChannelName {
    FULL = "full",
    HEARTBEAT = "heartbeat",
    LEVEL2 = "level2",
    MATCHES = "matches",
    STATUS = "status",
    TICKER = "ticker",
    USER = "user"
}
export interface WebSocketRequest {
    channels: WebSocketChannel[] | string[];
    type: WebSocketRequestType;
}
export declare enum WebSocketRequestType {
    SUBSCRIBE = "subscribe",
    UNSUBSCRIBE = "unsubscribe"
}
export declare enum WebSocketResponseType {
    ERROR = "error",
    FULL_ACTIVATE = "activate",
    FULL_CHANGE = "change",
    FULL_DONE = "done",
    FULL_MATCH = "match",
    FULL_OPEN = "open",
    FULL_RECEIVED = "received",
    HEARTBEAT = "heartbeat",
    LAST_MATCH = "last_match",
    LEVEL2_SNAPSHOT = "snapshot",
    LEVEL2_UPDATE = "l2update",
    STATUS = "status",
    SUBSCRIPTIONS = "subscriptions",
    TICKER = "ticker"
}
export declare type WebSocketResponse = {
    type: WebSocketResponseType;
} & WebSocketMessage;
declare type WebSocketMessage = Record<string, string | number | boolean> | WebSocketTickerMessage | WebSocketMatchMessage | WebSocketErrorMessage;
export declare type WebSocketErrorMessage = {
    message: string;
    reason: string;
    type: WebSocketResponseType.ERROR;
};
export declare type WebSocketMatchMessage = {
    maker_order_id: UUID_V4;
    price: string;
    product_id: string;
    sequence: number;
    side: OrderSide;
    size: string;
    taker_order_id: UUID_V4;
    time: ISO_8601_MS_UTC;
    trade_id: number;
    type: WebSocketResponseType.FULL_MATCH;
};
export declare type WebSocketTickerMessage = {
    best_ask: string;
    best_bid: string;
    high_24h: string;
    last_size: string;
    low_24h: string;
    open_24h: string;
    price: string;
    product_id: string;
    sequence: number;
    side: OrderSide;
    time: ISO_8601_MS_UTC;
    trade_id: number;
    type: WebSocketResponseType.TICKER;
    volume_24h: string;
    volume_30d: string;
};
export declare type WebSocketLastMatchMessage = Omit<WebSocketMatchMessage, 'type'> & {
    type: WebSocketResponseType.LAST_MATCH;
};
export declare type WebSocketSubscription = {
    channels: WebSocketChannel[];
    type: WebSocketResponseType.SUBSCRIPTIONS;
};
export declare enum WebSocketEvent {
    ON_CLOSE = "WebSocketEvent.ON_CLOSE",
    ON_ERROR = "WebSocketEvent.ON_ERROR",
    ON_MESSAGE = "WebSocketEvent.ON_MESSAGE",
    ON_MESSAGE_ERROR = "WebSocketEvent.ON_MESSAGE_ERROR",
    ON_MESSAGE_MATCHES = "WebSocketEvent.ON_MESSAGE_MATCHES",
    ON_MESSAGE_TICKER = "WebSocketEvent.ON_MESSAGE_TICKER",
    ON_OPEN = "WebSocketEvent.ON_OPEN",
    ON_SUBSCRIPTION_UPDATE = "WebSocketEvent.ON_SUBSCRIPTION_UPDATE"
}
export interface WebSocketClient {
    on(event: WebSocketEvent.ON_CLOSE, listener: (event: CloseEvent) => void): this;
    on(event: WebSocketEvent.ON_ERROR, listener: (event: ErrorEvent) => void): this;
    on(event: WebSocketEvent.ON_MESSAGE, listener: (response: WebSocketResponse) => void): this;
    on(event: WebSocketEvent.ON_MESSAGE_ERROR, listener: (errorMessage: WebSocketErrorMessage) => void): this;
    on(event: WebSocketEvent.ON_MESSAGE_MATCHES, listener: (matchMessage: WebSocketLastMatchMessage | WebSocketMatchMessage) => void): this;
    on(event: WebSocketEvent.ON_MESSAGE_TICKER, listener: (tickerMessage: WebSocketTickerMessage) => void): this;
    on(event: WebSocketEvent.ON_SUBSCRIPTION_UPDATE, listener: (subscriptions: WebSocketSubscription) => void): this;
    on(event: WebSocketEvent.ON_OPEN, listener: (event: Event) => void): this;
}
export declare class WebSocketClient extends EventEmitter {
    private readonly signRequest;
    static CLOSE_EVENT_CODE: {
        GOING_AWAY: number;
        NORMAL_CLOSURE: number;
        PROTOCOL_ERROR: number;
        UNSUPPORTED_DATA: number;
    };
    private readonly baseURL;
    private socket;
    constructor(baseURL: string, signRequest: (setup: RequestSetup) => Promise<SignedRequest>);
    connect(reconnectOptions?: Options): ReconnectingWebSocket;
    disconnect(reason?: string): void;
    subscribe(channel: WebSocketChannel | WebSocketChannel[]): void;
    unsubscribe(channel: WebSocketChannelName | WebSocketChannel | WebSocketChannel[]): void;
    sendMessage(message: WebSocketRequest): Promise<void>;
    private mergeOptions;
    private mapChannels;
}
export {};
