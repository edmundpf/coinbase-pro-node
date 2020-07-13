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
const init_client_1 = require("./init-client");
const __1 = require("..");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = 'BTC-USD';
        const granularity = __1.CandleGranularity.ONE_MINUTE;
        const client = init_client_1.initClient();
        client.rest.on(__1.ProductEvent.NEW_CANDLE, (productId, granularity, candle) => {
            console.info('Recent candle', productId, granularity, candle.openTimeInISO);
        });
        const candles = yield client.rest.product.getCandles(productId, {
            granularity,
        });
        const latestCandle = candles[candles.length - 1];
        const latestOpen = latestCandle.openTimeInISO;
        console.info('Initial candle', productId, granularity, latestOpen);
        client.rest.product.watchCandles(productId, granularity, latestOpen);
    });
}
main().catch(console.error);
//# sourceMappingURL=rest-watch-candles.js.map