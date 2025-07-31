"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const moment_1 = __importDefault(require("moment"));
const winston_1 = __importDefault(require("winston"));
class JsonFormatFactory {
    static create(namespace) {
        return winston_1.default.format.printf(function (info) {
            console.log("Info: ", info);
            const message = Object.assign(Object.assign(Object.assign(Object.assign({ created: (0, moment_1.default)().format("YYYY-MM-DDTHH:mm:ss.SSSZ"), event: info.level, namespace: namespace, context: info.context }, (info.trace_id && { trace_id: info.trace_id })), (info.span_id && { span_id: info.span_id })), (info.trace_flags && { flags: info.trace_flags })), { data: Object.assign(Object.assign(Object.assign({ message: info.message, path: info.path, method: info.method, status: info.status, duration: info.duration }, (info.trace_id && { trace_id: info.trace_id })), (info.span_id && { span_id: info.span_id })), (info.trace_flags && { flags: info.trace_flags })) });
            console.log("Message: ", JSON.stringify(message));
            return JSON.stringify(message);
        });
    }
}
module.exports = JsonFormatFactory;
//# sourceMappingURL=JsonFormatFactory.js.map