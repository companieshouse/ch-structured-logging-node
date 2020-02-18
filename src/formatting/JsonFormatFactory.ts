import winston from "winston";

class JsonFormatFactory {

    static create(namespace: string) {

        return winston.format.printf(function (info) {

            const message = {
                created: (new Date()).toISOString(),
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
