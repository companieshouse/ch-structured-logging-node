import LogMetaData from "../LogMetaData";
import winston from "winston";
import moment = require('moment');

class HumanFormatFactory {

    public static create(namespace: string) {

        const colorizer = winston.format.colorize();

        return winston.format.printf(function (info) {

            const messageInfo: LogMetaData = {
                created: moment().format(),
                namespace: namespace,
                event: info.level,
                path: info.path,
                method: info.method,
                status: info.status,
                duration: info.duration
            };

            const keys = Object.keys(messageInfo).sort();

            let message = colorizer.colorize(info.level, `${messageInfo.created} ${messageInfo.event}: ${info.message}`);

            keys.forEach(function (key) {
                if (messageInfo[key] !== undefined) {
                    message += `\n  -> ${key}: ${messageInfo[key]}`;
                }
            });

            return message;
        });
    }
}

export = HumanFormatFactory;
