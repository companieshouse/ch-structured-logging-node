"use strict";
const config = {
    level: process.env.LOG_LEVEL === undefined ? "info" : process.env.LOG_LEVEL.toLowerCase(),
    humanReadable: process.env.HUMAN_LOG === undefined ?
        false :
        process.env.HUMAN_LOG === "1",
    otelLogEnabled: process.env.OTEL_LOG_ENABLED === "true"
};
module.exports = config;
//# sourceMappingURL=config.js.map