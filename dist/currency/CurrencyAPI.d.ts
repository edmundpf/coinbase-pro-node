import { AxiosInstance } from 'axios';
export interface Currency {
    details: CurrencyDetail;
    id: string;
    max_precision: string;
    min_size: string;
    name: string;
    status: string;
}
export interface CurrencyDetail {
    crypto_address_link: string;
    crypto_transaction_link: string;
    min_withdrawal_amount: number;
    network_confirmations: number;
    processing_time_seconds: number;
    push_payment_methods: string[];
    sort_order: number;
    symbol: string;
    type: string;
}
export declare class CurrencyAPI {
    private readonly apiClient;
    static readonly URL: {
        CURRENCIES: string;
    };
    constructor(apiClient: AxiosInstance);
    listCurrencies(): Promise<Currency[]>;
}
