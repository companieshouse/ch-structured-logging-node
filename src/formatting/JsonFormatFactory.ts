import moment from "moment";
import winston from "winston";

class JsonFormatFactory {

    public static create(namespace: string) {

        return winston.format.printf(function (info) {

            const message = {
                created: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                event: info.level,
                namespace: namespace,
                context: info.context,
                ...(info.trace_id && { trace_id: info.trace_id }),
                ...(info.span_id && { span_id: info.span_id }),
                ...(info.trace_flags && { flags: +info.trace_flags }),
                data: {
                    message: info.message,
                    path: info.path,
                    method: info.method,
                    status: info.status,
                    duration: info.duration,
                    ...(info.trace_id && { trace_id: info.trace_id }),
                    ...(info.span_id && { span_id: info.span_id }),
                    ...(info.trace_flags && { flags: +info.trace_flags })
                }
            };

            return JSON.stringify(message);
        });
    }
}

export = JsonFormatFactory;
