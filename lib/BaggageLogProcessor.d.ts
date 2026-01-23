import { LogRecordProcessor } from "@opentelemetry/sdk-logs";
declare class BaggageLogRecordProcessor implements LogRecordProcessor {
    onEmit(logRecord: any): void;
    shutdown(): Promise<void>;
    forceFlush(): Promise<void>;
}
export = BaggageLogRecordProcessor;
