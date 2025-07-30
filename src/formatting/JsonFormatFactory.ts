import moment from "moment";
import winston from "winston";

class JsonFormatFactory {

    public static create(namespace: string) {

        return winston.format.printf(function (info) {
            console.log("Info: ", info);
            
            const message = {
                created: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                event: info.level,
                namespace: namespace,
                context: info.context,
                trace_id: info.trace_id,
                span_id: info.span_id,
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
