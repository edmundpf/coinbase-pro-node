"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class RequestSigner {
    static signRequest(auth, setup, clockSkew) {
        const timestamp = Date.now() / 1000 + clockSkew;
        const what = `${timestamp}${setup.httpMethod}${setup.requestPath}${setup.payload}`;
        const key = Buffer.from(auth.apiSecret, 'base64');
        const hmac = crypto_1.default.createHmac('sha256', key);
        const signature = hmac.update(what).digest('base64');
        return {
            key: auth.apiKey,
            passphrase: auth.passphrase,
            signature,
            timestamp,
        };
    }
}
exports.RequestSigner = RequestSigner;
//# sourceMappingURL=RequestSigner.js.map