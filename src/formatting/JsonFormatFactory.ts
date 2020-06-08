import winston from "winston";
import moment = require('moment');

class JsonFormatFactory {

    public static create(namespace: string) {

        return winston.format.printf(function (info) {

            const message = {
                created: moment().format(),
                event: info.level,
                namespace: namespace,
                data: {
                    message: info.message,
                    path: info.path,
                    method: info.method,
                    status: info.status,
                    duration: info.duration
                }
            };

            return JSON.stringify(message);
        });
    }
}

export = JsonFormatFactory;
