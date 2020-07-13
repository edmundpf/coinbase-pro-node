"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_client_1 = require("./init-client");
const __1 = require("..");
const client = init_client_1.initClient();
const channel = {
    name: __1.WebSocketChannelName.USER,
    product_ids: ['BTC-USD'],
};
client.ws.on(__1.WebSocketEvent.ON_MESSAGE, message => {
    console.info(`Received message of type "${message.type}".`, message);
});
client.ws.on(__1.WebSocketEvent.ON_MESSAGE_ERROR, errorMessage => {
    throw new Error(`${errorMessage.message}: ${errorMessage.reason}`);
});
client.ws.on(__1.WebSocketEvent.ON_OPEN, () => {
    client.ws.subscribe(channel);
});
client.ws.connect();
//# sourceMappingURL=websocket-user.js.map