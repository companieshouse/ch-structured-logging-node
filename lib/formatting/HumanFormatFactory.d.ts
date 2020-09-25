import winston from "winston";
declare class HumanFormatFactory {
    static create(namespace: string): winston.Logform.Format;
}
export = HumanFormatFactory;
