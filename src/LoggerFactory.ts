import HumanFormatFactory from "./formatting/HumanFormatFactory";
import JsonFormatFactory from "./formatting/JsonFormatFactory";
import LoggerOptions from "./LoggerOptions";
import StructuredLogger from "./StructuredLogger";
import config from "./config";
import logLevels from "./levelConfig";
import winston from "winston";
import * as api from "@opentelemetry/api-logs";
// It might be one of http, proto, grpc depending on preferred transport
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
const { envDetector, processDetector, hostDetector, detectResourcesSync } = require('@opentelemetry/resources');
import {
  LoggerProvider,
  SimpleLogRecordProcessor
} from "@opentelemetry/sdk-logs";
import { OpenTelemetryTransportV3 } from "@opentelemetry/winston-transport";

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


        // const logExporter = new OTLPLogExporter();
        // const resource: IResource = detectResourcesSync({
        //   // this have to be manually adjusted to match SDK OTEL_NODE_RESOURCE_DETECTORS
        //       detectors: [envDetectorSync, processDetectorSync, hostDetectorSync],
        //     });

        
        const loggerProvider = new LoggerProvider({
          // without resource we don't have proper service.name, service.version correlated with logs
            resource: detectResourcesSync({
          // this have to be manually adjusted to match SDK OTEL_NODE_RESOURCE_DETECTORS
              detectors: [envDetector, processDetector, hostDetector],
            }),
          });

        loggerProvider.addLogRecordProcessor(
          // new BatchLogRecordProcessor(logExporter)
          new SimpleLogRecordProcessor(new OTLPLogExporter())
          // new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
        );
        api.logs.setGlobalLoggerProvider(loggerProvider);

        return winston.createLogger({
            level: config.level,
            levels: logLevels.levels,
            transports: [
              new winston.transports.Console(this.createTransportOptions(options.namespace)),
              new OpenTelemetryTransportV3()
            ],
            exitOnError: false
        }) as StructuredLogger;
    }
}

export = LoggerFactory;
