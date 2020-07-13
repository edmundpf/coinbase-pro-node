"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleBucketUtil = void 0;
const MAXIMUM_HISTORIC_DATA_POINTS = 300;
class CandleBucketUtil {
    static getMinPrice(candles, property = 'close') {
        const values = candles.map(candle => candle[property]);
        return Math.min(...values);
    }
    static getMaxPrice(candles, property = 'close') {
        const values = candles.map(candle => candle[property]);
        return Math.max(...values);
    }
    static addUnitMillis(openTime, granularity, amount) {
        const granularityInMs = granularity * 1000;
        const units = amount * granularityInMs;
        return new Date(openTime).getTime() + units;
    }
    static addUnitISO(openTime, granularity, amount) {
        const nextTimestamp = CandleBucketUtil.addUnitMillis(openTime, granularity, amount);
        return new Date(nextTimestamp).toISOString();
    }
    static removeUnitMillis(openTime, granularity, amount) {
        const granularityInMs = granularity * 1000;
        const units = amount * granularityInMs;
        return new Date(openTime).getTime() - units;
    }
    static removeUnitISO(openTime, granularity, amount) {
        const nextTimestamp = CandleBucketUtil.removeUnitMillis(openTime, granularity, amount);
        return new Date(nextTimestamp).toISOString();
    }
    static getIntervals() {
        return [60, 300, 900, 3600, 21600, 86400];
    }
    static mapInterval(intervals, interval) {
        return intervals.reduce((previous, current) => {
            return Math.abs(current - interval) < Math.abs(previous - interval) ? current : previous;
        });
    }
    static mapGranularity(candleSizeInMillis) {
        return this.mapInterval(CandleBucketUtil.getIntervals(), candleSizeInMillis);
    }
    static expectedBuckets(fromInMillis, toInMillis, candleSizeInMillis) {
        const timeSpanInMillis = toInMillis - fromInMillis;
        return timeSpanInMillis / candleSizeInMillis;
    }
    static getBucketsInMillis(fromInMillis, toInMillis, candleSizeInMillis) {
        const bucketsInMillis = [];
        const batch = MAXIMUM_HISTORIC_DATA_POINTS * candleSizeInMillis;
        let current = fromInMillis;
        bucketsInMillis.push(current);
        current = current + batch;
        while (current < toInMillis) {
            bucketsInMillis.push(current - 1);
            bucketsInMillis.push(current);
            current = current + batch;
        }
        bucketsInMillis.push(toInMillis);
        return bucketsInMillis;
    }
    static getBucketsInISO(bucketsInMillis) {
        const bucketsInISO = [];
        for (let i = 0; i < bucketsInMillis.length - 1; i += 2) {
            const start = new Date(bucketsInMillis[i]).toISOString();
            const stop = new Date(bucketsInMillis[i + 1]).toISOString();
            bucketsInISO.push({
                start,
                stop,
            });
        }
        return bucketsInISO;
    }
}
exports.CandleBucketUtil = CandleBucketUtil;
//# sourceMappingURL=CandleBucketUtil.js.map