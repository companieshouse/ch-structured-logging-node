"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const winston_1 = __importDefault(require("winston"));
const moment = require("moment");
class JsonFormatFactory {
    static create(namespace) {
        return winston_1.default.format.printf(function (info) {
            const message = {
                created: moment().format(),
                event: info.level,
                namespace: namespace,
                data: {
                    message: info.message,
                    path: info.path,
                    method: info.method,
                    status: info.status,
                    duration: info.duration
                }
            };
            return JSON.stringify(message);
        });
    }
}
module.exports = JsonFormatFactory;
//# sourceMappingURL=JsonFormatFactory.js.map