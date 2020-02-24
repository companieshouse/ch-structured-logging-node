"use strict";
class ApplicationLogger {
    constructor(logger, metaData) {
        this.logger = logger;
        this.metaData = metaData;
    }
    trace(message) {
        this.logger.trace(message, this.metaData);
    }
    debug(message) {
        this.logger.debug(message, this.metaData);
    }
    info(message) {
        this.logger.info(message, this.metaData);
    }
    request(message) {
        this.logger.request(message, this.metaData);
    }
    error(message) {
        this.logger.error(message, this.metaData);
    }
}
module.exports = ApplicationLogger;
//# sourceMappingURL=ApplicationLogger.js.map