import ApplicationLogger from "./ApplicationLogger"; // eslint-disable-line @typescript-eslint/no-unused-vars
import LoggerFactory from "./LoggerFactory";
import MiddlewareFactory from "./MiddlewareFactory";

const createLoggerMiddleware = function (namespace: string) {

    return MiddlewareFactory.create(
        LoggerFactory.create({
            namespace: namespace
        })
    );
};

const createLogger = function (namespace: string) {

    return new ApplicationLogger(LoggerFactory.create({
        namespace: namespace
    }));
};

export {
    createLoggerMiddleware,
    createLogger
};
