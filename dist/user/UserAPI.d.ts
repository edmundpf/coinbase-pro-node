import { AxiosInstance } from 'axios';
export interface VerifiedUser {
    id: string;
}
export interface TrailingVolume {
    exchange_volume: string;
    product_id: string;
    recorded_at: string;
    volume: string;
}
export declare class UserAPI {
    private readonly apiClient;
    static readonly URL: {
        USERS: string;
    };
    constructor(apiClient: AxiosInstance);
    verifyAuthentication(): Promise<VerifiedUser>;
    getTrailingVolume(): Promise<TrailingVolume[]>;
}
