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
exports.TransferAPI = void 0;
class TransferAPI {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    getTransfers(transferType, profileId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = TransferAPI.URL.TRANSFERS;
            const params = Object.assign(Object.assign({}, pagination), { type: transferType });
            if (profileId) {
                params.profile_id = profileId;
            }
            const response = yield this.apiClient.get(resource, { params });
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
exports.TransferAPI = TransferAPI;
TransferAPI.URL = {
    TRANSFERS: `/transfers`,
};
//# sourceMappingURL=TransferAPI.js.map