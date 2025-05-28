"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const HumanFormatFactory_1 = __importDefault(require("./formatting/HumanFormatFactory"));
const JsonFormatFactory_1 = __importDefault(require("./formatting/JsonFormatFactory"));
const config_1 = __importDefault(require("./config"));
const levelConfig_1 = __importDefault(require("./levelConfig"));
const winston_1 = __importDefault(require("winston"));
const api_logs_1 = __importDefault(require("@opentelemetry/api-logs"));
const exporter_logs_otlp_http_1 = require("@opentelemetry/exporter-logs-otlp-http");
const { envDetector, processDetector, hostDetector, detectResourcesSync } = require('@opentelemetry/resources');
const sdk_logs_1 = require("@opentelemetry/sdk-logs");
const winston_transport_1 = require("@opentelemetry/winston-transport");
class LoggerFactory {
    static createTransportOptions(namespace) {
        return {
            handleExceptions: true,
            format: config_1.default.humanReadable ?
                HumanFormatFactory_1.default.create(namespace) :
                JsonFormatFactory_1.default.create(namespace)
        };
    }
    static create(options) {
        winston_1.default.addColors(levelConfig_1.default.colours);
        if (config_1.default.otelLogEnabled) {
            const loggerProvider = new sdk_logs_1.LoggerProvider({
                // service.name, service.version correlated with logs
                resource: detectResourcesSync({
                    detectors: [envDetector, processDetector, hostDetector],
                }),
            });
            loggerProvider.addLogRecordProcessor(new sdk_logs_1.BatchLogRecordProcessor(new exporter_logs_otlp_http_1.OTLPLogExporter()));
            api_logs_1.default.logs.setGlobalLoggerProvider(loggerProvider);
        }
        const transports = [
            new winston_1.default.transports.Console(this.createTransportOptions(options.namespace)),
            ...(config_1.default.otelLogEnabled ? [new winston_transport_1.OpenTelemetryTransportV3()] : [])
        ];
        return winston_1.default.createLogger({
            level: config_1.default.level,
            levels: levelConfig_1.default.levels,
            transports: transports,
            exitOnError: false
        });
    }
}
module.exports = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map