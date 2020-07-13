export declare type ISO_8601_MS_UTC = string;
export declare type UUID_V4 = string;
export declare const MAXIMUM_PAGINATION_LIMIT = 100;
export declare enum OrderSide {
    BUY = "buy",
    SELL = "sell"
}
export interface Pagination {
    after?: string;
    before?: string;
    limit: number;
}
