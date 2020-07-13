import { AxiosInstance } from 'axios';
export interface FeeTier {
    maker_fee_rate: string;
    taker_fee_rate: string;
    usd_volume: string | null;
}
export declare class FeeAPI {
    private readonly apiClient;
    static readonly URL: {
        FEES: string;
    };
    constructor(apiClient: AxiosInstance);
    getCurrentFees(): Promise<FeeTier>;
}
