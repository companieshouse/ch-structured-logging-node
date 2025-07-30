import moment from "moment";
import winston from "winston";
const { trace } = require('@opentelemetry/api');

class JsonFormatFactory {

    public static create(namespace: string) {

        return winston.format.printf(function (info) {

            const span = trace.getSpan(trace.context.active());

            console.log("Span is : ", span);

            const traceContext = span ? span.spanContext() : {};

            console.log("Trace context is : ", traceContext);

            const traceId = traceContext?.traceId || 'N/A';
            const spanId = traceContext?.spanId || 'N/A';

            console.log("Trace id : ", traceId);
            console.log('Span id: ', spanId);

            const message = {
                created: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                event: info.level,
                namespace: namespace,
                context: info.context,
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
