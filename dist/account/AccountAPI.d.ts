import { AxiosInstance } from 'axios';
import { Pagination } from '../payload/common';
export interface Account {
    available: string;
    balance: string;
    currency: string;
    hold: string;
    id: string;
    profile_id: string;
}
export interface AccountHistory {
    amount: string;
    balance: string;
    created_at: string;
    details: AccountHistoryDetails;
    id: string;
    type: string;
}
export interface AccountHistoryDetails {
    order_id: string;
    product_id: string;
    trade_id: string;
}
export interface Hold {
    account_id: string;
    amount: string;
    created_at: string;
    id: string;
    ref: string;
    type: string;
    updated_at: string;
}
export declare enum AccountType {
    FIAT = "fiat",
    WALLET = "wallet"
}
export interface CoinbaseAccount {
    active: boolean;
    available_on_consumer?: true;
    balance: string;
    currency: string;
    destination_tag_name?: string;
    destination_tag_regex?: string;
    hold_balance?: string;
    hold_currency?: string;
    id: string;
    name: string;
    primary: boolean;
    sepa_deposit_information?: SEPADepositInformation;
    type: AccountType;
    wire_deposit_information?: WireDepositInformation;
}
export interface WireDepositInformation {
    account_address: string;
    account_name: string;
    account_number: string;
    bank_address: string;
    bank_country: {
        code: string;
        name: string;
    };
    bank_name: string;
    reference: string;
    routing_number: string;
}
export interface SEPADepositInformation {
    account_address: string;
    account_name: string;
    bank_address: string;
    bank_country: {
        code: string;
        name: string;
    };
    bank_name: string;
    iban: string;
    reference: string;
    swift: string;
}
export declare class AccountAPI {
    private readonly apiClient;
    static readonly URL: {
        ACCOUNTS: string;
        COINBASE_ACCOUNT: string;
    };
    constructor(apiClient: AxiosInstance);
    getAccount(accountId: string): Promise<Account>;
    getAccountHistory(accountId: string, pagination?: Pagination): Promise<{
        data: AccountHistory[];
        pagination: {
            after?: string;
            before?: string;
        };
    }>;
    getHolds(accountId: string, pagination?: Pagination): Promise<{
        data: Hold[];
        pagination: {
            after?: string;
            before?: string;
        };
    }>;
    listAccounts(): Promise<Account[]>;
    listCoinbaseAccounts(): Promise<CoinbaseAccount[]>;
}
