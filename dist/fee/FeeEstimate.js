"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FeeEstimate {
    constructor(params) {
        this.amount = params.amount;
        this.total = params.total;
        this.effectivePricePerUnit = params.effectivePricePerUnit;
        this.effectiveTotal = params.effectiveTotal;
        this.feeAsset = params.feeAsset;
        this.pricePerUnit = params.pricePerUnit;
        this.totalFee = params.totalFee;
    }
    toJSON() {
        return {
            amount: this.amount.valueOf(),
            effectivePricePerUnit: this.effectivePricePerUnit.valueOf(),
            effectiveTotal: this.effectiveTotal.valueOf(),
            feeAsset: this.feeAsset,
            pricePerUnit: this.pricePerUnit.valueOf(),
            total: this.total.valueOf(),
            totalFee: this.totalFee.valueOf(),
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
exports.FeeEstimate = FeeEstimate;
//# sourceMappingURL=FeeEstimate.js.map