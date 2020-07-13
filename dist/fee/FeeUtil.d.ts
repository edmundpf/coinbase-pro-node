import { FeeEstimate, OrderSide, OrderType } from '..';
import { FeeTier } from '.';
import { BigSource } from 'big.js';
export declare class FeeUtil {
    static getFeeRate(type: OrderType, feeTier: FeeTier): number;
    static estimateFee(baseAmount: BigSource, counterPrice: BigSource, side: OrderSide, type: OrderType, feeTier: FeeTier, feeAsset: string): FeeEstimate;
}
