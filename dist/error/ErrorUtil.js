"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function inAirPlaneMode(error) {
    return error.code === 'ECONNABORTED';
}
exports.inAirPlaneMode = inAirPlaneMode;
function gotRateLimited(error) {
    var _a;
    return ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 429;
}
exports.gotRateLimited = gotRateLimited;
function getErrorMessage(error) {
    var _a;
    return ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message) || error.message;
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=ErrorUtil.js.map