"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const HumanFormatFactory_1 = __importDefault(require("./formatting/HumanFormatFactory"));
const JsonFormatFactory_1 = __importDefault(require("./formatting/JsonFormatFactory"));
const config_1 = __importDefault(require("./config"));
const levelConfig_1 = __importDefault(require("./levelConfig"));
const winston_1 = __importDefault(require("winston"));
class LoggerFactory {
    static createTransportOptions(namespace) {
        return {
            handleExceptions: true,
            format: config_1.default.humanReadable ?
                HumanFormatFactory_1.default.create(namespace) :
                JsonFormatFactory_1.default.create(namespace)
        };
    }
    static create(options) {
        winston_1.default.addColors(levelConfig_1.default.colours);
        return winston_1.default.createLogger({
            level: config_1.default.level,
            levels: levelConfig_1.default.levels,
            transports: [new winston_1.default.transports.Console(this.createTransportOptions(options.namespace))],
            exitOnError: false
        });
    }
}
module.exports = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map