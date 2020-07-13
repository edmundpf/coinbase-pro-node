import { AxiosInstance } from 'axios';
import { ISO_8601_MS_UTC, UUID_V4, OrderSide, Pagination } from '../payload/common';
export declare enum Liquidity {
    MAKER = "M",
    TAKER = "T"
}
export interface Fill {
    created_at: ISO_8601_MS_UTC;
    fee: string;
    liquidity: Liquidity;
    order_id: UUID_V4;
    price: string;
    product_id: string;
    profile_id: UUID_V4;
    settled: boolean;
    side: OrderSide;
    size: string;
    trade_id: number;
    usd_volume: string;
    user_id: string;
}
export declare class FillAPI {
    private readonly apiClient;
    static readonly URL: {
        FILLS: string;
    };
    constructor(apiClient: AxiosInstance);
    getFillsByOrderId(orderId: string, pagination?: Pagination): Promise<{
        data: Fill[];
        pagination: {
            after?: string;
            before?: string;
        };
    }>;
    getFillsByProductId(productId: string, pagination?: Pagination): Promise<{
        data: Fill[];
        pagination: {
            after?: string;
            before?: string;
        };
    }>;
}
