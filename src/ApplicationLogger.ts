import { Request } from "express";
import StructuredLogger from "./StructuredLogger";
import getRequestMetaData from "./getRequestMetaData";

class ApplicationLogger {

    private readonly logger: StructuredLogger;

    constructor(logger: StructuredLogger) {
        this.logger = logger;
    }

    public trace(message: string) {
        this.logger.trace(message);
    }

    public debug(message: string) {
        this.logger.debug(message);
    }

    public info(message: string) {
        this.logger.info(message);
    }

    public request(message: string) {
        this.logger.request(message);
    }

    public error(message: string) {
        this.logger.error(message);
    }

    public traceRequest(request: Request, message: string) {
        this.logger.trace(message, getRequestMetaData(request));
    }

    public debugRequest(request: Request, message: string) {
        this.logger.debug(message, getRequestMetaData(request));
    }

    public infoRequest(request: Request, message: string) {
        this.logger.info(message, getRequestMetaData(request));
    }

    public requestRequest(request: Request, message: string) {
        this.logger.request(message, getRequestMetaData(request));
    }

    public errorRequest(request: Request, message: string) {
        this.logger.error(message, getRequestMetaData(request));
    }
}

export = ApplicationLogger;
