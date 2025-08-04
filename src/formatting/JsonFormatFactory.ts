import moment from "moment";
import winston from "winston";

class JsonFormatFactory {

    public static create(namespace: string) {

        return winston.format.printf(function (info) {

            /* eslint camelcase: ["error", {allow: ["trace_id", "span_id", "trace_flags"]}] */
            const message = {
                created: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                event: info.level,
                namespace: namespace,
                context: info.context,
                trace_id: info.trace_id,
                span_id: info.span_id,
                ...info.trace_flags && { flags: Number(info.trace_flags) },
                data: {
                    message: info.message,
                    path: info.path,
                    method: info.method,
                    status: info.status,
                    duration: info.duration,
                    trace_id: info.trace_id,
                    span_id: info.span_id,
                    ...info.trace_flags && { flags: Number(info.trace_flags) }
                }
            };

            return JSON.stringify(message);
        });
    }
}

export = JsonFormatFactory;
