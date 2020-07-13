import { AxiosInstance } from 'axios';
import { ISO_8601_MS_UTC, UUID_V4 } from '../payload/common';
declare type Nickname = 'default' | string;
export interface Profile {
    active: boolean;
    created_at: ISO_8601_MS_UTC;
    id: UUID_V4;
    is_default: boolean;
    name: Nickname;
    user_id: string;
}
export interface FundTransfer {
    amount: string;
    currency: string;
    from: UUID_V4;
    to: UUID_V4;
}
export declare class ProfileAPI {
    private readonly apiClient;
    static readonly URL: {
        PROFILES: string;
    };
    constructor(apiClient: AxiosInstance);
    listProfiles(): Promise<Profile[]>;
    getProfile(profileId: string): Promise<Profile | null>;
    transferFunds(transfer: FundTransfer): Promise<void>;
}
export {};
