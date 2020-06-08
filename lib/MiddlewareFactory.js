"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const getRequestMetaData_1 = __importDefault(require("./getRequestMetaData"));
const on_finished_1 = __importDefault(require("on-finished"));
const moment = require("moment");
class MiddlewareFactory {
    static create(logger) {
        const middleware = function (request, response, next) {
            const startTime = moment().format();
            const metaData = getRequestMetaData_1.default(request);
            logger.request("Start requesting", metaData);
            on_finished_1.default(response, function () {
                const duration = moment().format();
                -startTime;
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