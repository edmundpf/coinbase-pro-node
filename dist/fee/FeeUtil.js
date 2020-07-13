"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const big_js_1 = __importDefault(require("big.js"));
class FeeUtil {
    static getFeeRate(type, feeTier) {
        if (type === __1.OrderType.MARKET) {
            return parseFloat(feeTier.taker_fee_rate);
        }
        return parseFloat(feeTier.maker_fee_rate);
    }
    static estimateFee(baseAmount, counterPrice, side, type, feeTier, feeAsset) {
        const amount = new big_js_1.default(baseAmount);
        const pricePerUnit = new big_js_1.default(counterPrice);
        const subTotal = amount.mul(pricePerUnit);
        const feeRate = FeeUtil.getFeeRate(type, feeTier);
        const totalFee = subTotal.mul(new big_js_1.default(feeRate));
        const effectiveTotal = side === __1.OrderSide.BUY ? subTotal.plus(totalFee) : subTotal.minus(totalFee);
        const effectivePricePerUnit = effectiveTotal.div(amount);
        return new __1.FeeEstimate({
            amount,
            effectivePricePerUnit,
            effectiveTotal,
            feeAsset,
            pricePerUnit,
            total: subTotal,
            totalFee,
        });
    }
}
exports.FeeUtil = FeeUtil;
//# sourceMappingURL=FeeUtil.js.map