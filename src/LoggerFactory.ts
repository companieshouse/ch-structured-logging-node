import * as api from "@opentelemetry/api-logs";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { detectResources, envDetector, hostDetector, processDetector } from "@opentelemetry/resources";
import HumanFormatFactory from "./formatting/HumanFormatFactory";
import JsonFormatFactory from "./formatting/JsonFormatFactory";
import LoggerOptions from "./LoggerOptions";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OpenTelemetryTransportV3 } from "@opentelemetry/winston-transport";
import StructuredLogger from "./StructuredLogger";
import config from "./config";
import logLevels from "./levelConfig";
import winston from "winston";
import BaggageLogRecordProcessor from "./BaggageLogProcessor";

class LoggerFactory {

    private static createTransportOptions(namespace: string) {
        return {
            handleExceptions: true,
            format: config.humanReadable ?
                HumanFormatFactory.create(namespace) :
                JsonFormatFactory.create(namespace)
        };
    }

    public static create(options: LoggerOptions) {

        winston.addColors(logLevels.colours);

        const loggerProvider = new LoggerProvider({
            // Service.name, service.version correlated with logs
            resource: detectResources({
                detectors: [envDetector, processDetector, hostDetector]
            })
        });

        loggerProvider.addLogRecordProcessor(
            new BatchLogRecordProcessor(new OTLPLogExporter())
        );
        loggerProvider.addLogRecordProcessor(new BaggageLogRecordProcessor());

        api.logs.setGlobalLoggerProvider(loggerProvider);

        const transports = [
            new winston.transports.Console(this.createTransportOptions(options.namespace)),
            new OpenTelemetryTransportV3()
        ];

        return winston.createLogger({
            level: config.level,
            levels: logLevels.levels,
            transports: transports,
            exitOnError: false
        }) as StructuredLogger;
    }
}

export = LoggerFactory;
