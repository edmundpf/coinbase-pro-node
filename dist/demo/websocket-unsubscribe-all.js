"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_client_1 = require("./init-client");
const __1 = require("..");
const client = init_client_1.initClient();
const channels = [
    {
        name: __1.WebSocketChannelName.LEVEL2,
        product_ids: ['ETH-USD', 'ETH-EUR'],
    },
    {
        name: __1.WebSocketChannelName.HEARTBEAT,
        product_ids: ['ETH-USD', 'ETH-EUR', 'LTC-USD'],
    },
    {
        name: __1.WebSocketChannelName.TICKER,
        product_ids: ['ETH-BTC', 'ETH-EUR'],
    },
];
client.ws.on(__1.WebSocketEvent.ON_OPEN, () => {
    client.ws.subscribe(channels);
});
client.ws.on(__1.WebSocketEvent.ON_SUBSCRIPTION_UPDATE, subscriptions => {
    const subscriptionCount = subscriptions.channels.length;
    const uniqueProductIds = new Set();
    const productIds = subscriptions.channels.map(subscription => subscription.product_ids);
    productIds.forEach(ids => ids.forEach(id => uniqueProductIds.add(id)));
    console.info(`We have now "${subscriptionCount}" subscriptions for "${uniqueProductIds.size}" different products.`, JSON.stringify(subscriptions, null, 2));
    switch (subscriptionCount) {
        case 0:
            console.info(`No more subscriptions. We will disconnect.`);
            client.ws.disconnect();
            break;
        case 1:
            console.info(`We will unsubscribe from "${__1.WebSocketChannelName.LEVEL2}" channel...`);
            client.ws.unsubscribe(__1.WebSocketChannelName.LEVEL2);
            break;
        case 2:
            console.info(`We will unsubscribe from "${__1.WebSocketChannelName.HEARTBEAT}" channel...`);
            client.ws.unsubscribe(__1.WebSocketChannelName.HEARTBEAT);
            break;
        case 3:
            console.info(`We will unsubscribe from "${__1.WebSocketChannelName.TICKER}" channel...`);
            client.ws.unsubscribe(__1.WebSocketChannelName.TICKER);
            break;
    }
});
client.ws.connect();
//# sourceMappingURL=websocket-unsubscribe-all.js.map