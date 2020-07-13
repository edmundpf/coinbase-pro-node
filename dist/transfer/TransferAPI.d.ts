import { AxiosInstance } from 'axios';
import { Pagination } from '../payload/common';
export declare type TransferInformation = {
    account_id: string;
    amount: string;
    canceled_at?: string;
    completed_at?: string;
    created_at: string;
    details: {
        coinbase_account_id?: string;
        coinbase_payment_method_id?: string;
        coinbase_transaction_id?: string;
        coinbase_withdrawal_id?: string;
        crypto_address?: string;
        crypto_transaction_hash?: string;
        crypto_transaction_id?: string;
        destination_tag: string;
        destination_tag_name?: string;
        sent_to_address?: string;
    };
    id: string;
    processed_at?: string;
    type: string;
    user_id: string;
    user_nonce?: string;
};
export declare class TransferAPI {
    private readonly apiClient;
    static readonly URL: {
        TRANSFERS: string;
    };
    constructor(apiClient: AxiosInstance);
    getTransfers(transferType: string, profileId?: string, pagination?: Pagination): Promise<{
        data: TransferInformation[];
        pagination: {
            after?: string;
            before?: string;
        };
    }>;
}
