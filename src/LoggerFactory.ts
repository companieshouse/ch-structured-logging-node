"use strict";

import config from "./config";
import winston from "winston";
import logLevels from "./levelConfig";
import LoggerOptions from "./LoggerOptions";
import StructuredLogger from "./StructuredLogger";
import HumanFormatFactory from "./formatting/HumanFormatFactory";
import JsonFormatFactory from "./formatting/JsonFormatFactory";

class LoggerFactory {

    private static createTransportOptions(namespace: string) {
        return {
            handleExceptions: true,
            format: config.humanReadable ?
                HumanFormatFactory.create(namespace) :
                JsonFormatFactory.create(namespace)
        };
    };

    static create(options: LoggerOptions) {

        winston.addColors(logLevels.colours);

        return winston.createLogger({
            level: config.level,
            levels: logLevels.levels,
            transports: [new winston.transports.Console(this.createTransportOptions(options.namespace))],
            exitOnError: false
        }) as StructuredLogger;
    }
}

export = LoggerFactory;
