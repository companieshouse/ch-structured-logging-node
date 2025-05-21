import LoggerOptions from "./LoggerOptions";
import StructuredLogger from "./StructuredLogger";
declare class LoggerFactory {
    private static createTransportOptions;
    static create(options: LoggerOptions): StructuredLogger;
}
export = LoggerFactory;
