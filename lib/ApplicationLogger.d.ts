import LogMetaData from "./LogMetaData";
import StructuredLogger from "./StructuredLogger";
declare class ApplicationLogger {
    private readonly logger;
    private readonly metaData;
    constructor(logger: StructuredLogger, metaData: LogMetaData);
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    request(message: string): void;
    error(message: string): void;
}
export = ApplicationLogger;
