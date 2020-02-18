import ApplicationLogger from "./ApplicationLogger";
import LogMetaData from "./LogMetaData";
import { RequestHandler } from "express";
import StructuredLogger from "./StructuredLogger";
import onFinished from "on-finished";

class MiddlewareFactory {

    public static create(logger: StructuredLogger) {

        const middleware: RequestHandler = function (request, response, next) {

            const startTime = Date.now();

            const metaData: LogMetaData = {
                path: request.path,
                method: request.method
            };

            const applicationLogger = new ApplicationLogger(logger, metaData);

            applicationLogger.request("Start request");

            request.logger = applicationLogger;

            onFinished(response, function () {

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

export = MiddlewareFactory;
