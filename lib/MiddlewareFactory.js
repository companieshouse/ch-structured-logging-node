"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ApplicationLogger_1 = __importDefault(require("./ApplicationLogger"));
const on_finished_1 = __importDefault(require("on-finished"));
class MiddlewareFactory {
    static create(logger) {
        const middleware = function (request, response, next) {
            const startTime = Date.now();
            const metaData = {
                path: request.path,
                method: request.method
            };
            const applicationLogger = new ApplicationLogger_1.default(logger, metaData);
            logger.request("Start requesting", metaData);
            request.logger = applicationLogger;
            on_finished_1.default(response, function () {
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