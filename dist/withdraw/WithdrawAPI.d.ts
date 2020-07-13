import { AxiosInstance } from 'axios';
export interface CryptoWithdrawal {
    amount: number;
    currency: string;
    id: string;
}
export declare class WithdrawAPI {
    private readonly apiClient;
    static readonly URL: {
        WITHDRAWALS: {
            CRYPTO: string;
        };
    };
    constructor(apiClient: AxiosInstance);
    postCryptoWithdrawal(amount: number, currency: string, cryptoAddress: string, destinationTag?: string): Promise<CryptoWithdrawal>;
}
