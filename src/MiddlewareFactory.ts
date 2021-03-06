import LogMetaData from "./LogMetaData";
import { RequestHandler } from "express";
import StructuredLogger from "./StructuredLogger";
import getRequestMetaData from "./getRequestMetaData";
import onFinished from "on-finished";

class MiddlewareFactory {

    public static create(logger: StructuredLogger) {

        const middleware: RequestHandler = function (request, response, next) {

            const startTime = Date.now();

            const metaData = getRequestMetaData(request);

            logger.request("Start requesting", metaData);

            onFinished(response, function () {

                const duration = Date.now() - startTime;

                const finalMetaData: LogMetaData = Object.assign(metaData, {
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

export = MiddlewareFactory;
