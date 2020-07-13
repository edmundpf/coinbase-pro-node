import { Candle, CandleGranularity } from '.';
import { ISO_8601_MS_UTC } from '..';
export interface CandleBatchBucket {
    start: ISO_8601_MS_UTC;
    stop: ISO_8601_MS_UTC;
}
export declare class CandleBucketUtil {
    static getMinPrice(candles: Candle[], property?: 'close' | 'high' | 'low' | 'open'): number;
    static getMaxPrice(candles: Candle[], property?: 'close' | 'high' | 'low' | 'open'): number;
    static addUnitMillis(openTime: number | string, granularity: CandleGranularity, amount: number): number;
    static addUnitISO(openTime: number | string, granularity: CandleGranularity, amount: number): ISO_8601_MS_UTC;
    static removeUnitMillis(openTime: number | string, granularity: CandleGranularity, amount: number): number;
    static removeUnitISO(openTime: number | string, granularity: CandleGranularity, amount: number): ISO_8601_MS_UTC;
    static getIntervals(): number[];
    static mapInterval(intervals: number[], interval: number): number;
    static mapGranularity(candleSizeInMillis: number): CandleGranularity;
    static expectedBuckets(fromInMillis: number, toInMillis: number, candleSizeInMillis: CandleGranularity): number;
    static getBucketsInMillis(fromInMillis: number, toInMillis: number, candleSizeInMillis: number): number[];
    static getBucketsInISO(bucketsInMillis: number[]): CandleBatchBucket[];
}
