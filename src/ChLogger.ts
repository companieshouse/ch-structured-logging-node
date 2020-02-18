import { RequestHandler } from 'express';
import MiddlewareFactory from "./MiddlewareFactory";
import LoggerFactory from "./LoggerFactory";
import LoggerOptions from "./LoggerOptions";
import StructuredLogger from "./StructuredLogger";

export class ChLogger {

    logger: StructuredLogger;
    middleware: RequestHandler;

    constructor(options: LoggerOptions) {

        this.logger = LoggerFactory.create(options);
        this.middleware = MiddlewareFactory.create(this.logger);
    }
}
