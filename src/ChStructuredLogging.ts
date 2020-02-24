import LoggerFactory from "./LoggerFactory";
import LoggerOptions from "./LoggerOptions";
import MiddlewareFactory from "./MiddlewareFactory";
import { RequestHandler } from "express";
import StructuredLogger from "./StructuredLogger";

class ChStructuredLogging {

    public readonly logger: StructuredLogger;

    public readonly middleware: RequestHandler;

    public constructor(options: LoggerOptions) {

        this.logger = LoggerFactory.create(options);
        this.middleware = MiddlewareFactory.create(this.logger);
    }
}

export = ChStructuredLogging;
