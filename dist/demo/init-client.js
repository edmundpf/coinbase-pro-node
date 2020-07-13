"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initClient = void 0;
const __1 = require("..");
require('dotenv').config();
function initClient() {
    if (process.env.USE_SANDBOX === 'true') {
        console.info("Using Coinbase Pro's public sandbox with API key...");
        return new __1.CoinbasePro({
            apiKey: process.env.COINBASE_PRO_SANDBOX_API_KEY,
            apiSecret: process.env.COINBASE_PRO_SANDBOX_API_SECRET,
            passphrase: process.env.COINBASE_PRO_SANDBOX_PASSPHRASE,
            useSandbox: true,
        });
    }
    else if (process.env.USE_SANDBOX === 'false') {
        console.info("Using Coinbase Pro's production environment with API key...");
        return new __1.CoinbasePro({
            apiKey: process.env.COINBASE_PRO_API_KEY,
            apiSecret: process.env.COINBASE_PRO_API_SECRET,
            passphrase: process.env.COINBASE_PRO_PASSPHRASE,
            useSandbox: false,
        });
    }
    console.info("Using Coinbase Pro's production environment without API key...");
    return new __1.CoinbasePro();
}
exports.initClient = initClient;
//# sourceMappingURL=init-client.js.map