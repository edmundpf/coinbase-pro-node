import { AxiosInstance } from 'axios';
import { ISO_8601_MS_UTC, OrderSide, Pagination } from '../payload';
export declare enum OrderType {
    LIMIT = "limit",
    MARKET = "market"
}
export declare enum TimeInForce {
    FILL_OR_KILL = "FOK",
    GOOD_TILL_CANCELED = "GTC",
    GOOD_TILL_TIME = "GTT",
    IMMEDIATE_OR_CANCEL = "IOC"
}
export declare enum CancelOrderPeriod {
    ONE_DAY = "day",
    ONE_HOUR = "hour",
    ONE_MINUTE = "min"
}
export declare enum SelfTradePrevention {
    CANCEL_BOTH = "cb",
    CANCEL_NEWEST = "cn",
    CANCEL_OLDEST = "co",
    DECREMENT_AND_CANCEL = "dc"
}
declare type BaseOrder = {
    client_oid?: string;
    product_id: string;
    side: OrderSide;
    stop?: 'loss' | 'entry';
    stop_price?: string;
    stp?: SelfTradePrevention;
};
declare type BasePlacedOrder = {
    created_at: string;
    executed_value: string;
    fill_fees: string;
    filled_size: string;
    id: string;
    post_only: false;
    price: string;
    product_id: string;
    settled: boolean;
    side: OrderSide;
    size: string;
    status: OrderStatus;
    time_in_force: TimeInForce;
    type: OrderType;
};
export declare type NewOrder = LimitOrder | AutoCancelLimitOrder | PostOnlyLimitOrder | MarketOrder;
export declare type AutoCancelLimitOrder = LimitOrder & {
    cancel_after: CancelOrderPeriod;
    time_in_force: TimeInForce.GOOD_TILL_TIME;
};
export declare type PostOnlyLimitOrder = LimitOrder & {
    post_only: boolean;
    time_in_force: TimeInForce.GOOD_TILL_CANCELED | TimeInForce.GOOD_TILL_TIME;
};
export declare type LimitOrder = BaseOrder & {
    price: string;
    size: string;
    time_in_force?: TimeInForce;
    type: OrderType.LIMIT;
};
export declare type MarketOrder = BaseOrder & {
    type: OrderType.MARKET;
} & ({
    size: string;
} | {
    funds: string;
});
export declare enum OrderStatus {
    ACTIVE = "active",
    DONE = "done",
    OPEN = "open",
    PENDING = "pending"
}
export declare type PendingOrder = BasePlacedOrder & {
    status: OrderStatus.PENDING;
    stp: SelfTradePrevention;
};
export declare type FilledOrder = BasePlacedOrder & {
    done_at: ISO_8601_MS_UTC;
    done_reason: 'filled';
    profile_id: string;
    status: OrderStatus.DONE;
};
export declare type Order = PendingOrder | FilledOrder;
export declare class OrderAPI {
    private readonly apiClient;
    static readonly URL: {
        ORDERS: string;
    };
    constructor(apiClient: AxiosInstance);
    cancelOpenOrders(productId?: string): Promise<string[]>;
    getOpenOrders(pagination?: Pagination): Promise<{
        data: Order[];
        pagination: {
            after?: string;
            before?: string;
        };
    }>;
    getOrder(orderId: string): Promise<Order | null>;
    placeOrder(newOrder: NewOrder): Promise<Order>;
}
export {};
