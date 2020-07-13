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
var AccountType;
(function (AccountType) {
    AccountType["FIAT"] = "fiat";
    AccountType["WALLET"] = "wallet";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
class AccountAPI {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    getAccount(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${AccountAPI.URL.ACCOUNTS}/${accountId}`;
            const response = yield this.apiClient.get(resource);
            return response.data;
        });
    }
    getAccountHistory(accountId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${AccountAPI.URL.ACCOUNTS}/${accountId}/ledger`;
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
    getHolds(accountId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${AccountAPI.URL.ACCOUNTS}/${accountId}/holds`;
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
    listAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = AccountAPI.URL.ACCOUNTS;
            const response = yield this.apiClient.get(resource);
            return response.data;
        });
    }
    listCoinbaseAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = AccountAPI.URL.COINBASE_ACCOUNT;
            const response = yield this.apiClient.get(resource);
            return response.data;
        });
    }
}
exports.AccountAPI = AccountAPI;
AccountAPI.URL = {
    ACCOUNTS: `/accounts`,
    COINBASE_ACCOUNT: `/coinbase-accounts`,
};
//# sourceMappingURL=AccountAPI.js.map