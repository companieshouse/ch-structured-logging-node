declare const LogRecordProcessor: any;
declare class BaggageLogRecordProcessor extends LogRecordProcessor {
    onEmit(logRecord: any): void;
    shutdown(): Promise<void>;
    forceFlush(): Promise<void>;
}
export = BaggageLogRecordProcessor;
