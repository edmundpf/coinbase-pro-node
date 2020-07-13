"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CandleBucketUtil_1 = require("./CandleBucketUtil");
var CandleGranularity;
(function (CandleGranularity) {
    CandleGranularity[CandleGranularity["ONE_MINUTE"] = 60] = "ONE_MINUTE";
    CandleGranularity[CandleGranularity["FIVE_MINUTES"] = 300] = "FIVE_MINUTES";
    CandleGranularity[CandleGranularity["FIFTEEN_MINUTES"] = 900] = "FIFTEEN_MINUTES";
    CandleGranularity[CandleGranularity["ONE_HOUR"] = 3600] = "ONE_HOUR";
    CandleGranularity[CandleGranularity["SIX_HOURS"] = 21600] = "SIX_HOURS";
    CandleGranularity[CandleGranularity["ONE_DAY"] = 86400] = "ONE_DAY";
})(CandleGranularity = exports.CandleGranularity || (exports.CandleGranularity = {}));
var OrderBookLevel;
(function (OrderBookLevel) {
    OrderBookLevel[OrderBookLevel["ONLY_BEST_BID_AND_ASK"] = 1] = "ONLY_BEST_BID_AND_ASK";
    OrderBookLevel[OrderBookLevel["TOP_50_BIDS_AND_ASKS"] = 2] = "TOP_50_BIDS_AND_ASKS";
    OrderBookLevel[OrderBookLevel["FULL_ORDER_BOOK"] = 3] = "FULL_ORDER_BOOK";
})(OrderBookLevel = exports.OrderBookLevel || (exports.OrderBookLevel = {}));
var ProductEvent;
(function (ProductEvent) {
    ProductEvent["NEW_CANDLE"] = "ProductEvent.NEW_CANDLE";
})(ProductEvent = exports.ProductEvent || (exports.ProductEvent = {}));
class ProductAPI {
    constructor(apiClient, restClient) {
        this.apiClient = apiClient;
        this.restClient = restClient;
        this.watchCandlesConfig = {};
    }
    getCandles(productId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${ProductAPI.URL.PRODUCTS}/${productId}/candles`;
            const candleSizeInMillis = params.granularity * 1000;
            const potentialParams = params;
            let rawCandles = [];
            if (potentialParams.start && potentialParams.end) {
                const fromInMillis = new Date(potentialParams.start).getTime();
                const toInMillis = new Date(potentialParams.end).getTime();
                const bucketsInMillis = CandleBucketUtil_1.CandleBucketUtil.getBucketsInMillis(fromInMillis, toInMillis, candleSizeInMillis);
                const bucketsInISO = CandleBucketUtil_1.CandleBucketUtil.getBucketsInISO(bucketsInMillis);
                for (let index = 0; index < bucketsInISO.length; index++) {
                    const bucket = bucketsInISO[index];
                    const response = yield this.apiClient.get(resource, {
                        params: {
                            end: bucket.stop,
                            granularity: params.granularity,
                            start: bucket.start,
                        },
                    });
                    rawCandles.push(...response.data);
                }
            }
            else {
                const response = yield this.apiClient.get(resource, { params });
                rawCandles = response.data;
            }
            return rawCandles
                .map(candle => this.mapCandle(candle, candleSizeInMillis, productId))
                .sort((a, b) => a.openTimeInMillis - b.openTimeInMillis);
        });
    }
    watchCandles(productId, granularity, lastCandleTime) {
        this.watchCandlesConfig[productId] = this.watchCandlesConfig[productId] || {};
        if (this.watchCandlesConfig[productId][granularity]) {
            throw new Error(`You are already watching "${productId}" with an interval of "${granularity}" seconds. Please clear this interval before creating a new one.`);
        }
        else {
            const expectedISO = CandleBucketUtil_1.CandleBucketUtil.addUnitISO(lastCandleTime, granularity, 1);
            const intervalId = this.startCandleInterval(productId, granularity);
            this.watchCandlesConfig[productId][granularity] = {
                expectedISO,
                intervalId,
            };
        }
    }
    unwatchCandles(productId, granularity) {
        const intervalId = this.watchCandlesConfig[productId][granularity].intervalId;
        clearInterval(intervalId);
        delete this.watchCandlesConfig[productId][granularity];
        if (Object.values(this.watchCandlesConfig[productId]).length === 0) {
            delete this.watchCandlesConfig[productId];
        }
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = ProductAPI.URL.PRODUCTS;
            const response = yield this.apiClient.get(resource);
            return response.data;
        });
    }
    getTrades(productId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${ProductAPI.URL.PRODUCTS}/${productId}/trades`;
            const response = yield this.apiClient.get(resource, { params: pagination });
            return {
                data: response.data,
                pagination: {
                    after: response.headers['cb-after'],
                    before: response.headers['cb-before'],
                },
            };
        });
    }
    getProductOrderBook(productId, params = { level: OrderBookLevel.ONLY_BEST_BID_AND_ASK }) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${ProductAPI.URL.PRODUCTS}/${productId}/book`;
            let response;
            switch (params.level) {
                case OrderBookLevel.TOP_50_BIDS_AND_ASKS:
                    response = yield this.apiClient.get(resource, { params });
                    break;
                case OrderBookLevel.FULL_ORDER_BOOK:
                    response = yield this.apiClient.get(resource, { params });
                    break;
                default:
                    response = yield this.apiClient.get(resource, { params });
            }
            return response.data;
        });
    }
    getProductStats(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${ProductAPI.URL.PRODUCTS}/${productId}/stats`;
            const response = yield this.apiClient.get(resource);
            return response.data;
        });
    }
    getProductTicker(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${ProductAPI.URL.PRODUCTS}/${productId}/ticker`;
            const response = yield this.apiClient.get(resource);
            return response.data;
        });
    }
    mapCandle(payload, sizeInMillis, productId) {
        const [time, low, high, open, close, volume] = payload;
        const [base, counter] = productId.split('-');
        const openTimeInMillis = time * 1000;
        return {
            base,
            close,
            counter,
            high,
            low,
            open,
            openTimeInISO: new Date(openTimeInMillis).toISOString(),
            openTimeInMillis,
            productId: productId,
            sizeInMillis,
            volume,
        };
    }
    emitCandle(productId, granularity, candle) {
        this.restClient.emit(ProductEvent.NEW_CANDLE, productId, granularity, candle);
        const nextOpenTime = CandleBucketUtil_1.CandleBucketUtil.addUnitISO(candle.openTimeInMillis, granularity, 1);
        this.watchCandlesConfig[productId][granularity].expectedISO = nextOpenTime;
    }
    checkNewCandles(productId, granularity) {
        return __awaiter(this, void 0, void 0, function* () {
            const expectedTimestampISO = this.watchCandlesConfig[productId][granularity].expectedISO;
            const candles = yield this.getCandles(productId, {
                granularity,
                start: expectedTimestampISO,
            });
            const matches = candles.filter(candle => candle.openTimeInISO === expectedTimestampISO);
            if (matches.length > 0) {
                const matchedCandle = matches[0];
                this.emitCandle(productId, granularity, matchedCandle);
            }
        });
    }
    startCandleInterval(productId, granularity) {
        const updateInterval = CandleGranularity.ONE_MINUTE * 1000;
        return global.setInterval(() => __awaiter(this, void 0, void 0, function* () {
            yield this.checkNewCandles(productId, granularity);
        }), updateInterval);
    }
}
exports.ProductAPI = ProductAPI;
ProductAPI.URL = {
    PRODUCTS: `/products`,
};
//# sourceMappingURL=ProductAPI.js.map