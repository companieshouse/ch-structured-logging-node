"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const LoggerFactory_1 = __importDefault(require("./LoggerFactory"));
const MiddlewareFactory_1 = __importDefault(require("./MiddlewareFactory"));
class ChStructuredLogging {
    constructor(options) {
        this.logger = LoggerFactory_1.default.create(options);
        this.middleware = MiddlewareFactory_1.default.create(this.logger);
    }
}
module.exports = ChStructuredLogging;
//# sourceMappingURL=ChStructuredLogging.js.map