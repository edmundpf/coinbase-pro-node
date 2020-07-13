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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketClient = exports.WebSocketEvent = exports.WebSocketResponseType = exports.WebSocketRequestType = exports.WebSocketChannelName = void 0;
const events_1 = require("events");
const reconnecting_websocket_1 = __importDefault(require("reconnecting-websocket"));
const ws_1 = __importDefault(require("ws"));
const __1 = require("..");
var WebSocketChannelName;
(function (WebSocketChannelName) {
    WebSocketChannelName["FULL"] = "full";
    WebSocketChannelName["HEARTBEAT"] = "heartbeat";
    WebSocketChannelName["LEVEL2"] = "level2";
    WebSocketChannelName["MATCHES"] = "matches";
    WebSocketChannelName["STATUS"] = "status";
    WebSocketChannelName["TICKER"] = "ticker";
    WebSocketChannelName["USER"] = "user";
})(WebSocketChannelName = exports.WebSocketChannelName || (exports.WebSocketChannelName = {}));
var WebSocketRequestType;
(function (WebSocketRequestType) {
    WebSocketRequestType["SUBSCRIBE"] = "subscribe";
    WebSocketRequestType["UNSUBSCRIBE"] = "unsubscribe";
})(WebSocketRequestType = exports.WebSocketRequestType || (exports.WebSocketRequestType = {}));
var WebSocketResponseType;
(function (WebSocketResponseType) {
    WebSocketResponseType["ERROR"] = "error";
    WebSocketResponseType["FULL_ACTIVATE"] = "activate";
    WebSocketResponseType["FULL_CHANGE"] = "change";
    WebSocketResponseType["FULL_DONE"] = "done";
    WebSocketResponseType["FULL_MATCH"] = "match";
    WebSocketResponseType["FULL_OPEN"] = "open";
    WebSocketResponseType["FULL_RECEIVED"] = "received";
    WebSocketResponseType["HEARTBEAT"] = "heartbeat";
    WebSocketResponseType["LAST_MATCH"] = "last_match";
    WebSocketResponseType["LEVEL2_SNAPSHOT"] = "snapshot";
    WebSocketResponseType["LEVEL2_UPDATE"] = "l2update";
    WebSocketResponseType["STATUS"] = "status";
    WebSocketResponseType["SUBSCRIPTIONS"] = "subscriptions";
    WebSocketResponseType["TICKER"] = "ticker";
})(WebSocketResponseType = exports.WebSocketResponseType || (exports.WebSocketResponseType = {}));
var WebSocketEvent;
(function (WebSocketEvent) {
    WebSocketEvent["ON_CLOSE"] = "WebSocketEvent.ON_CLOSE";
    WebSocketEvent["ON_ERROR"] = "WebSocketEvent.ON_ERROR";
    WebSocketEvent["ON_MESSAGE"] = "WebSocketEvent.ON_MESSAGE";
    WebSocketEvent["ON_MESSAGE_ERROR"] = "WebSocketEvent.ON_MESSAGE_ERROR";
    WebSocketEvent["ON_MESSAGE_MATCHES"] = "WebSocketEvent.ON_MESSAGE_MATCHES";
    WebSocketEvent["ON_MESSAGE_TICKER"] = "WebSocketEvent.ON_MESSAGE_TICKER";
    WebSocketEvent["ON_OPEN"] = "WebSocketEvent.ON_OPEN";
    WebSocketEvent["ON_SUBSCRIPTION_UPDATE"] = "WebSocketEvent.ON_SUBSCRIPTION_UPDATE";
})(WebSocketEvent = exports.WebSocketEvent || (exports.WebSocketEvent = {}));
class WebSocketClient extends events_1.EventEmitter {
    constructor(baseURL, signRequest) {
        super();
        this.signRequest = signRequest;
        this.baseURL = baseURL;
    }
    connect(reconnectOptions) {
        if (this.socket) {
            throw Error(`You established already a WebSocket connection. Please call "disconnect" first before creating a new one.`);
        }
        const options = this.mergeOptions(reconnectOptions);
        this.socket = new reconnecting_websocket_1.default(this.baseURL, [], options);
        this.socket.onclose = (event) => {
            this.emit(WebSocketEvent.ON_CLOSE, event);
        };
        this.socket.onerror = (event) => {
            this.emit(WebSocketEvent.ON_ERROR, event);
        };
        this.socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            this.emit(WebSocketEvent.ON_MESSAGE, response);
            switch (response.type) {
                case WebSocketResponseType.ERROR:
                    this.emit(WebSocketEvent.ON_MESSAGE_ERROR, response);
                    break;
                case WebSocketResponseType.SUBSCRIPTIONS:
                    this.emit(WebSocketEvent.ON_SUBSCRIPTION_UPDATE, response);
                    break;
                case WebSocketResponseType.TICKER:
                    this.emit(WebSocketEvent.ON_MESSAGE_TICKER, response);
                    break;
                case WebSocketResponseType.FULL_MATCH:
                case WebSocketResponseType.LAST_MATCH:
                    this.emit(WebSocketEvent.ON_MESSAGE_MATCHES, response);
                    break;
            }
        };
        this.socket.onopen = () => {
            this.emit(WebSocketEvent.ON_OPEN);
        };
        return this.socket;
    }
    disconnect(reason = 'Unknown reason') {
        if (this.socket) {
            this.socket.close(WebSocketClient.CLOSE_EVENT_CODE.NORMAL_CLOSURE, reason);
            this.socket = undefined;
        }
    }
    subscribe(channel) {
        this.sendMessage({
            channels: Array.isArray(channel) ? channel : [channel],
            type: WebSocketRequestType.SUBSCRIBE,
        }).finally(() => { });
    }
    unsubscribe(channel) {
        this.sendMessage({
            channels: this.mapChannels(channel),
            type: WebSocketRequestType.UNSUBSCRIBE,
        }).finally(() => { });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.socket) {
                throw new Error(`Failed to send message of type "${message.type}": You need to connect to the WebSocket first.`);
            }
            const signature = yield this.signRequest({
                httpMethod: 'GET',
                payload: '',
                requestPath: `${__1.UserAPI.URL.USERS}/self/verify`,
            });
            Object.assign(message, signature);
            this.socket.send(JSON.stringify(message));
        });
    }
    mergeOptions(reconnectOptions) {
        const defaultOptions = {
            WebSocket: ws_1.default,
            connectionTimeout: 2000,
            debug: false,
            maxReconnectionDelay: 4000,
            maxRetries: Infinity,
            minReconnectionDelay: 1000,
            reconnectionDelayGrowFactor: 1,
        };
        return Object.assign(Object.assign({}, defaultOptions), reconnectOptions);
    }
    mapChannels(input) {
        if (Array.isArray(input)) {
            return input;
        }
        else if (typeof input === 'string') {
            return [
                {
                    name: input,
                    product_ids: [],
                },
            ];
        }
        return [input];
    }
}
exports.WebSocketClient = WebSocketClient;
WebSocketClient.CLOSE_EVENT_CODE = {
    GOING_AWAY: 1001,
    NORMAL_CLOSURE: 1000,
    PROTOCOL_ERROR: 1002,
    UNSUPPORTED_DATA: 1003,
};
//# sourceMappingURL=WebSocketClient.js.map