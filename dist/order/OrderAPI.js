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
exports.OrderAPI = exports.OrderStatus = exports.SelfTradePrevention = exports.CancelOrderPeriod = exports.TimeInForce = exports.OrderType = void 0;
var OrderType;
(function (OrderType) {
    OrderType["LIMIT"] = "limit";
    OrderType["MARKET"] = "market";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var TimeInForce;
(function (TimeInForce) {
    TimeInForce["FILL_OR_KILL"] = "FOK";
    TimeInForce["GOOD_TILL_CANCELED"] = "GTC";
    TimeInForce["GOOD_TILL_TIME"] = "GTT";
    TimeInForce["IMMEDIATE_OR_CANCEL"] = "IOC";
})(TimeInForce = exports.TimeInForce || (exports.TimeInForce = {}));
var CancelOrderPeriod;
(function (CancelOrderPeriod) {
    CancelOrderPeriod["ONE_DAY"] = "day";
    CancelOrderPeriod["ONE_HOUR"] = "hour";
    CancelOrderPeriod["ONE_MINUTE"] = "min";
})(CancelOrderPeriod = exports.CancelOrderPeriod || (exports.CancelOrderPeriod = {}));
var SelfTradePrevention;
(function (SelfTradePrevention) {
    SelfTradePrevention["CANCEL_BOTH"] = "cb";
    SelfTradePrevention["CANCEL_NEWEST"] = "cn";
    SelfTradePrevention["CANCEL_OLDEST"] = "co";
    SelfTradePrevention["DECREMENT_AND_CANCEL"] = "dc";
})(SelfTradePrevention = exports.SelfTradePrevention || (exports.SelfTradePrevention = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["ACTIVE"] = "active";
    OrderStatus["DONE"] = "done";
    OrderStatus["OPEN"] = "open";
    OrderStatus["PENDING"] = "pending";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
class OrderAPI {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    cancelOpenOrders(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = OrderAPI.URL.ORDERS;
            const response = yield this.apiClient.delete(resource, {
                params: productId ? { product_id: productId } : {},
            });
            return response.data;
        });
    }
    getOpenOrders(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = OrderAPI.URL.ORDERS;
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
    getOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${OrderAPI.URL.ORDERS}/${orderId}`;
            try {
                const response = yield this.apiClient.get(resource);
                return response.data;
            }
            catch (error) {
                if (error.response.status === 404) {
                    return null;
                }
                throw error;
            }
        });
    }
    placeOrder(newOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = OrderAPI.URL.ORDERS;
            const response = yield this.apiClient.post(resource, newOrder);
            return response.data;
        });
    }
}
exports.OrderAPI = OrderAPI;
OrderAPI.URL = {
    ORDERS: `/orders`,
};
//# sourceMappingURL=OrderAPI.js.map