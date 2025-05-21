"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const getRequestMetaData_1 = __importDefault(require("./getRequestMetaData"));
class ApplicationLogger {
    constructor(logger) {
        this.logger = logger;
    }
    trace(message) {
        this.logger.trace(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
    info(message) {
        this.logger.info(message);
    }
    request(message) {
        this.logger.request(message);
    }
    error(message) {
        this.logger.error(message);
    }
    traceRequest(request, message) {
        this.logger.trace(message, (0, getRequestMetaData_1.default)(request));
    }
    debugRequest(request, message) {
        this.logger.debug(message, (0, getRequestMetaData_1.default)(request));
    }
    infoRequest(request, message) {
        this.logger.info(message, (0, getRequestMetaData_1.default)(request));
    }
    requestRequest(request, message) {
        this.logger.request(message, (0, getRequestMetaData_1.default)(request));
    }
    errorRequest(request, message) {
        this.logger.error(message, (0, getRequestMetaData_1.default)(request));
    }
}
module.exports = ApplicationLogger;
//# sourceMappingURL=ApplicationLogger.js.map