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
var Liquidity;
(function (Liquidity) {
    Liquidity["MAKER"] = "M";
    Liquidity["TAKER"] = "T";
})(Liquidity = exports.Liquidity || (exports.Liquidity = {}));
class FillAPI {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    getFillsByOrderId(orderId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = FillAPI.URL.FILLS;
            const response = yield this.apiClient.get(resource, { params: Object.assign({ order_id: orderId }, pagination) });
            return {
                data: response.data,
                pagination: {
                    after: response.headers['cb-after'],
                    before: response.headers['cb-before'],
                },
            };
        });
    }
    getFillsByProductId(productId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = FillAPI.URL.FILLS;
            const response = yield this.apiClient.get(resource, { params: Object.assign({ product_id: productId }, pagination) });
            return {
                data: response.data,
                pagination: {
                    after: response.headers['cb-after'],
                    before: response.headers['cb-before'],
                },
            };
        });
    }
}
exports.FillAPI = FillAPI;
FillAPI.URL = {
    FILLS: `/fills`,
};
//# sourceMappingURL=FillAPI.js.map