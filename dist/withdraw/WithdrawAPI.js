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
exports.WithdrawAPI = void 0;
class WithdrawAPI {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    postCryptoWithdrawal(amount, currency, cryptoAddress, destinationTag) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = WithdrawAPI.URL.WITHDRAWALS.CRYPTO;
            const withdrawal = { amount, crypto_address: cryptoAddress, currency };
            if (destinationTag) {
                withdrawal.destination_tag = destinationTag;
            }
            else {
                withdrawal.no_destination_tag = true;
            }
            const response = yield this.apiClient.post(resource, withdrawal);
            return response.data;
        });
    }
}
exports.WithdrawAPI = WithdrawAPI;
WithdrawAPI.URL = {
    WITHDRAWALS: {
        CRYPTO: '/withdrawals/crypto',
    },
};
//# sourceMappingURL=WithdrawAPI.js.map