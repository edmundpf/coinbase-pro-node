"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_client_1 = require("./init-client");
const __1 = require("..");
const client = init_client_1.initClient();
const channel = {
    name: __1.WebSocketChannelName.TICKER,
    product_ids: ['BTC-USD', 'ETH-EUR'],
};
client.ws.on(__1.WebSocketEvent.ON_OPEN, () => {
    client.ws.subscribe([channel]);
});
client.ws.on(__1.WebSocketEvent.ON_SUBSCRIPTION_UPDATE, subscriptions => {
    if (subscriptions.channels.length === 0) {
        client.ws.disconnect();
    }
});
client.ws.on(__1.WebSocketEvent.ON_MESSAGE_TICKER, tickerMessage => {
    console.info(`Received message of type "${tickerMessage.type}".`, tickerMessage);
    client.ws.unsubscribe([
        {
            name: __1.WebSocketChannelName.TICKER,
            product_ids: [tickerMessage.product_id],
        },
    ]);
});
client.ws.connect({ debug: true });
//# sourceMappingURL=websocket-ticker.js.map