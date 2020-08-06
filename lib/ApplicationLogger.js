"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const getRequestMetaData_1 = __importDefault(require("./getRequestMetaData"));
const he_1 = require("he");
class ApplicationLogger {
    constructor(logger) {
        this.logger = logger;
    }
    trace(message) {
        this.logger.trace(he_1.encode(message));
    }
    debug(message) {
        this.logger.debug(he_1.encode(message));
    }
    info(message) {
        this.logger.info(he_1.encode(message));
    }
    request(message) {
        this.logger.request(he_1.encode(message));
    }
    error(message) {
        this.logger.error(he_1.encode(message));
    }
    traceRequest(request, message) {
        this.logger.trace(he_1.encode(message), getRequestMetaData_1.default(request));
    }
    debugRequest(request, message) {
        this.logger.debug(he_1.encode(message), getRequestMetaData_1.default(request));
    }
    infoRequest(request, message) {
        this.logger.info(he_1.encode(message), getRequestMetaData_1.default(request));
    }
    requestRequest(request, message) {
        this.logger.request(he_1.encode(message), getRequestMetaData_1.default(request));
    }
    errorRequest(request, message) {
        this.logger.error(he_1.encode(message), getRequestMetaData_1.default(request));
    }
}
module.exports = ApplicationLogger;
//# sourceMappingURL=ApplicationLogger.js.map