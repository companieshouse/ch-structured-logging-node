import LogMetaData from "../LogMetaData";
import moment from "moment";
import winston from "winston";

class HumanFormatFactory {

    public static create(namespace: string) {

        const colorizer = winston.format.colorize();

        return winston.format.printf(function (info) {

            /* eslint camelcase: ["error", {allow: ["trace_id", "span_id", "trace_flags"]}] */
            const messageInfo: LogMetaData = {
                created: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                namespace: namespace,
                event: info.level,
                context: info.context as string,
                path: info.path as string,
                method: info.method as string,
                status: info.status as number,
                duration: info.duration as number,
                trace_id: info.trace_id,
                span_id: info.span_id,
                trace_flags: info.trace_flags
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
