import Big from 'big.js';
export interface FeeEstimatePayload {
    amount: Big;
    effectivePricePerUnit: Big;
    effectiveTotal: Big;
    feeAsset: string;
    pricePerUnit: Big;
    total: Big;
    totalFee: Big;
}
export interface FeeEstimateJSON {
    amount: string;
    effectivePricePerUnit: string;
    effectiveTotal: string;
    feeAsset: string;
    pricePerUnit: string;
    total: string;
    totalFee: string;
}
export declare class FeeEstimate {
    readonly amount: Big;
    readonly effectivePricePerUnit: Big;
    readonly effectiveTotal: Big;
    readonly feeAsset: string;
    readonly pricePerUnit: Big;
    readonly totalFee: Big;
    readonly total: Big;
    constructor(params: FeeEstimatePayload);
    toJSON(): FeeEstimateJSON;
    toString(): string;
}
