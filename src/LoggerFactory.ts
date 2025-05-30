import HumanFormatFactory from "./formatting/HumanFormatFactory";
import JsonFormatFactory from "./formatting/JsonFormatFactory";
import LoggerOptions from "./LoggerOptions";
import StructuredLogger from "./StructuredLogger";
import config from "./config";
import logLevels from "./levelConfig";
import winston from "winston";
import * as api from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { LoggerProvider, BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { OpenTelemetryTransportV3 } from "@opentelemetry/winston-transport";
const { envDetector, processDetector, hostDetector, detectResourcesSync } = require('@opentelemetry/resources');

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

    console.log('config.otelLogEnabled', config.otelLogEnabled);


    if (config.otelLogEnabled) {
      const loggerProvider = new LoggerProvider({
        // service.name, service.version correlated with logs
        resource: detectResourcesSync({
          detectors: [envDetector, processDetector, hostDetector],
        }),
      });

      loggerProvider.addLogRecordProcessor(
        new BatchLogRecordProcessor(new OTLPLogExporter())
      );
      api.logs.setGlobalLoggerProvider(loggerProvider);
    }

    const transports = [
      new winston.transports.Console(this.createTransportOptions(options.namespace)),
      ...(config.otelLogEnabled ? [new OpenTelemetryTransportV3()] : [])
    ];

    console.log('transports', transports);
    

    return winston.createLogger({
      level: config.level,
      levels: logLevels.levels,
      transports: transports,
      exitOnError: false
    }) as StructuredLogger;
  }
}

export = LoggerFactory;
