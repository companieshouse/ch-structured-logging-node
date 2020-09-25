import winston from "winston";
declare class JsonFormatFactory {
    static create(namespace: string): winston.Logform.Format;
}
export = JsonFormatFactory;
