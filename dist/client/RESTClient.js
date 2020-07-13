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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const account_1 = require("../account");
const order_1 = require("../order");
const product_1 = require("../product");
const user_1 = require("../user");
const fee_1 = require("../fee");
const fill_1 = require("../fill");
const querystring_1 = __importDefault(require("querystring"));
const profile_1 = require("../profile");
const axios_retry_1 = __importStar(require("axios-retry"));
const util_1 = __importDefault(require("util"));
const events_1 = require("events");
const ErrorUtil_1 = require("../error/ErrorUtil");
const currency_1 = require("../currency");
const withdraw_1 = require("../withdraw");
const transfer_1 = require("../transfer");
class RESTClient extends events_1.EventEmitter {
    constructor(baseURL, signRequest) {
        super();
        this.signRequest = signRequest;
        this.logger = util_1.default.debuglog('coinbase-pro-node');
        this.httpClient = axios_1.default.create({
            baseURL: baseURL,
            timeout: 5000,
        });
        axios_retry_1.default(this.httpClient, {
            retries: Infinity,
            retryCondition: (error) => {
                return axios_retry_1.isNetworkOrIdempotentRequestError(error) || ErrorUtil_1.inAirPlaneMode(error) || ErrorUtil_1.gotRateLimited(error);
            },
            retryDelay: (retryCount, error) => {
                const errorMessage = ErrorUtil_1.getErrorMessage(error);
                this.logger(`#${retryCount} There was an error querying "${error.config.baseURL}${error.request.path}": ${errorMessage}`);
                return 1000;
            },
        });
        this.httpClient.interceptors.request.use((config) => __awaiter(this, void 0, void 0, function* () {
            const baseURL = String(config.baseURL);
            const url = String(config.url);
            const requestPath = url.replace(baseURL, '');
            const signedRequest = yield this.signRequest({
                httpMethod: String(config.method).toUpperCase(),
                payload: RESTClient.stringifyPayload(config),
                requestPath,
            });
            config.headers = Object.assign(Object.assign({}, config.headers), { 'CB-ACCESS-KEY': signedRequest.key, 'CB-ACCESS-PASSPHRASE': signedRequest.passphrase, 'CB-ACCESS-SIGN': signedRequest.signature, 'CB-ACCESS-TIMESTAMP': signedRequest.timestamp });
            return config;
        }));
        this.account = new account_1.AccountAPI(this.httpClient);
        this.fee = new fee_1.FeeAPI(this.httpClient);
        this.fill = new fill_1.FillAPI(this.httpClient);
        this.order = new order_1.OrderAPI(this.httpClient);
        this.product = new product_1.ProductAPI(this.httpClient, this);
        this.profile = new profile_1.ProfileAPI(this.httpClient);
        this.user = new user_1.UserAPI(this.httpClient);
        this.currency = new currency_1.CurrencyAPI(this.httpClient);
        this.withdraw = new withdraw_1.WithdrawAPI(this.httpClient);
        this.transfer = new transfer_1.TransferAPI(this.httpClient);
    }
    get defaults() {
        return this.httpClient.defaults;
    }
    get interceptors() {
        return this.httpClient.interceptors;
    }
    static stringifyPayload(config) {
        if (config.data) {
            return JSON.stringify(config.data);
        }
        const params = querystring_1.default.stringify(config.params);
        return params ? `?${params}` : '';
    }
}
exports.RESTClient = RESTClient;
//# sourceMappingURL=RESTClient.js.map