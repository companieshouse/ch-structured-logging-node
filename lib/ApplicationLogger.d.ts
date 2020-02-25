import { Request } from "express";
import StructuredLogger from "./StructuredLogger";
declare class ApplicationLogger {
    private readonly logger;
    constructor(logger: StructuredLogger);
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    request(message: string): void;
    error(message: string): void;
    traceRequest(request: Request, message: string): void;
    debugRequest(request: Request, message: string): void;
    infoRequest(request: Request, message: string): void;
    requestRequest(request: Request, message: string): void;
    errorRequest(request: Request, message: string): void;
}
export = ApplicationLogger;
