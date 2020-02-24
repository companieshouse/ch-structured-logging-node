import LoggerOptions from "./LoggerOptions";
import { RequestHandler } from "express";
import StructuredLogger from "./StructuredLogger";
declare class ChStructuredLogging {
    readonly logger: StructuredLogger;
    readonly middleware: RequestHandler;
    constructor(options: LoggerOptions);
}
export = ChStructuredLogging;
