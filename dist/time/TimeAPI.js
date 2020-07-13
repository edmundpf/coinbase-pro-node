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
exports.TimeAPI = void 0;
const axios_1 = __importDefault(require("axios"));
class TimeAPI {
    static getTime(baseURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${baseURL}${TimeAPI.URL.TIME}`);
            return response.data;
        });
    }
    static getClockSkew(baseURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = yield this.getTime(baseURL);
            const now = Date.now() / 1000;
            return time.epoch - now;
        });
    }
}
exports.TimeAPI = TimeAPI;
TimeAPI.URL = {
    TIME: `/time`,
};
//# sourceMappingURL=TimeAPI.js.map