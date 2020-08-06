import { Request } from "express";
import StructuredLogger from "./StructuredLogger";
import getRequestMetaData from "./getRequestMetaData";
import { encode } from "he";

class ApplicationLogger {

    private readonly logger: StructuredLogger;

    constructor(logger: StructuredLogger) {
        this.logger = logger;
    }

    public trace(message: string) {
        this.logger.trace(encode(message));
    }

    public debug(message: string) {
        this.logger.debug(encode(message));
    }

    public info(message: string) {
        this.logger.info(encode(message));
    }

    public request(message: string) {
        this.logger.request(encode(message));
    }

    public error(message: string) {
        this.logger.error(encode(message));
    }

    public traceRequest(request: Request, message: string) {
        this.logger.trace(encode(message), getRequestMetaData(request));
    }

    public debugRequest(request: Request, message: string) {
        this.logger.debug(encode(message), getRequestMetaData(request));
    }

    public infoRequest(request: Request, message: string) {
        this.logger.info(encode(message), getRequestMetaData(request));
    }

    public requestRequest(request: Request, message: string) {
        this.logger.request(encode(message), getRequestMetaData(request));
    }

    public errorRequest(request: Request, message: string) {
        this.logger.error(encode(message), getRequestMetaData(request));
    }
}

export = ApplicationLogger;
