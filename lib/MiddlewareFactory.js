"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const getRequestMetaData_1 = __importDefault(require("./getRequestMetaData"));
const on_finished_1 = __importDefault(require("on-finished"));
class MiddlewareFactory {
    static create(logger) {
        const middleware = function (request, response, next) {
            const startTime = Date.now();
            const metaData = (0, getRequestMetaData_1.default)(request);
            logger.request("Start requesting", metaData);
            (0, on_finished_1.default)(response, function () {
                const duration = Date.now() - startTime;
                const finalMetaData = Object.assign(metaData, {
                    status: response.statusCode,
                    duration: duration
                });
                logger.request("End of request", finalMetaData);
            });
            return next();
        };
        return middleware;
    }
}
module.exports = MiddlewareFactory;
//# sourceMappingURL=MiddlewareFactory.js.map