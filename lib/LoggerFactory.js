"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api = __importStar(require("@opentelemetry/api-logs"));
const sdk_logs_1 = require("@opentelemetry/sdk-logs");
const resources_1 = require("@opentelemetry/resources");
const HumanFormatFactory_1 = __importDefault(require("./formatting/HumanFormatFactory"));
const JsonFormatFactory_1 = __importDefault(require("./formatting/JsonFormatFactory"));
const exporter_logs_otlp_http_1 = require("@opentelemetry/exporter-logs-otlp-http");
const winston_transport_1 = require("@opentelemetry/winston-transport");
const config_1 = __importDefault(require("./config"));
const levelConfig_1 = __importDefault(require("./levelConfig"));
const winston_1 = __importDefault(require("winston"));
const instrumentation_winston_1 = require("@opentelemetry/instrumentation-winston");
class LoggerFactory {
    static createTransportOptions(namespace) {
        console.log("config.humanReadable", config_1.default.humanReadable);
        return {
            handleExceptions: true,
            format: config_1.default.humanReadable ?
                HumanFormatFactory_1.default.create(namespace) :
                JsonFormatFactory_1.default.create(namespace)
        };
    }
    static create(options) {
        winston_1.default.addColors(levelConfig_1.default.colours);
        const loggerProvider = new sdk_logs_1.LoggerProvider({
            // Service.name, service.version correlated with logs
            resource: (0, resources_1.detectResources)({
                detectors: [resources_1.envDetector, resources_1.processDetector, resources_1.hostDetector]
            })
        });
        new instrumentation_winston_1.WinstonInstrumentation({
            disableLogSending: true
        });
        loggerProvider.addLogRecordProcessor(new sdk_logs_1.BatchLogRecordProcessor(new exporter_logs_otlp_http_1.OTLPLogExporter()));
        api.logs.setGlobalLoggerProvider(loggerProvider);
        const transports = [
            new winston_1.default.transports.Console(this.createTransportOptions(options.namespace)),
            new winston_transport_1.OpenTelemetryTransportV3()
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