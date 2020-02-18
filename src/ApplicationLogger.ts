import LogMetaData from "./LogMetaData";
import StructuredLogger from "./StructuredLogger";

class ApplicationLogger {

    private logger: StructuredLogger;

    private metaData: LogMetaData;

    constructor(logger: StructuredLogger, metaData: LogMetaData) {

        this.logger = logger;
        this.metaData = metaData;
    }

    trace(message: string) {
        this.logger.trace(message, this.metaData);
    }

    debug(message: string) {
        this.logger.debug(message, this.metaData);
    }

    info(message: string) {
        this.logger.info(message, this.metaData);
    }

    request(message: string) {
        this.logger.request(message, this.metaData);
    }

    endRequest(message: string, finalMetaData: LogMetaData) {
        this.logger.request(message, finalMetaData);
    }

    error(message: string) {
        this.logger.error(message, this.metaData);
    }
}

export = ApplicationLogger;
