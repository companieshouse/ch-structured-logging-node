import LogMetaData from "./LogMetaData";
import StructuredLogger from "./StructuredLogger";

class ApplicationLogger {

    private readonly logger: StructuredLogger;

    private readonly metaData: LogMetaData;

    constructor(logger: StructuredLogger, metaData: LogMetaData) {

        this.logger = logger;
        this.metaData = metaData;
    }

    public trace(message: string) {
        this.logger.trace(message, this.metaData);
    }

    public debug(message: string) {
        this.logger.debug(message, this.metaData);
    }

    public info(message: string) {
        this.logger.info(message, this.metaData);
    }

    public request(message: string) {
        this.logger.request(message, this.metaData);
    }

    endRequest(message: string, finalMetaData: LogMetaData) {
        this.logger.request(message, finalMetaData);
    }

    public error(message: string) {
        this.logger.error(message, this.metaData);
    }
}

export = ApplicationLogger;
