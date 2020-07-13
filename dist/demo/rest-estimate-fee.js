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
        const client = init_client_1.initClient();
        const base = 'BTC';
        const counter = 'USD';
        const candles = yield client.rest.product.getCandles(`${base}-${counter}`, {
            granularity: __1.CandleGranularity.ONE_HOUR,
        });
        const lastClosingPrice = candles[candles.length - 1].close;
        const feeTier = yield client.rest.fee.getCurrentFees();
        const amount = 1;
        const estimatedFee = __1.FeeUtil.estimateFee(amount, lastClosingPrice, __1.OrderSide.BUY, __1.OrderType.LIMIT, feeTier, counter);
        console.info(`Buying "${amount} ${base}" would cost around "${estimatedFee.effectivePricePerUnit} ${counter}".`);
    });
}
main().catch(console.error);
//# sourceMappingURL=rest-estimate-fee.js.map