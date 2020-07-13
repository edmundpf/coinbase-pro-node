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
const RESTClient_1 = require("./client/RESTClient");
const WebSocketClient_1 = require("./client/WebSocketClient");
const TimeAPI_1 = require("./time/TimeAPI");
const RequestSigner_1 = require("./auth/RequestSigner");
class CoinbasePro {
    constructor(auth = {
        apiKey: '',
        apiSecret: '',
        passphrase: '',
        useSandbox: false,
    }) {
        this.url = auth.useSandbox === true ? CoinbasePro.SETUP.SANDBOX : CoinbasePro.SETUP.PRODUCTION;
        const signRequest = (setup) => __awaiter(this, void 0, void 0, function* () {
            const baseURL = this.url.REST;
            const clockSkew = yield TimeAPI_1.TimeAPI.getClockSkew(baseURL);
            return RequestSigner_1.RequestSigner.signRequest(auth, setup, clockSkew);
        });
        this.rest = new RESTClient_1.RESTClient(this.url.REST, signRequest);
        this.ws = new WebSocketClient_1.WebSocketClient(this.url.WebSocket, signRequest);
    }
}
exports.CoinbasePro = CoinbasePro;
CoinbasePro.SETUP = {
    PRODUCTION: {
        REST: 'https://api.pro.coinbase.com',
        WebSocket: 'wss://ws-feed.pro.coinbase.com',
    },
    SANDBOX: {
        REST: 'https://api-public.sandbox.pro.coinbase.com',
        WebSocket: 'wss://ws-feed-public.sandbox.pro.coinbase.com',
    },
};
//# sourceMappingURL=CoinbasePro.js.map