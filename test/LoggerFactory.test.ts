import { Console } from "winston/lib/winston/transports";
import HumanFormatFactory from "../src/formatting/HumanFormatFactory";
import JsonFormatFactory from "../src/formatting/JsonFormatFactory";
import { OpenTelemetryTransportV3 } from "@opentelemetry/winston-transport";
import { expect } from "chai";
import sinon from "sinon";


describe("LoggerFactory", function () {
    // eslint-disable-next-line no-invalid-this
    this.timeout(8000);
    let LoggerFactory: any;

    describe("#create", function () {

        let humanFormatStub: sinon.SinonStub;
        let jsonFormatStub: sinon.SinonStub;
        const OLD_ENV = process.env;

        beforeEach(() => {
            process.env.LOG_LEVEL = "trace";
            process.env.HUMAN_LOG = "1";
            process.env.OTEL_LOG_ENABLED = "false";

            humanFormatStub = sinon.stub(HumanFormatFactory, "create").returns("humanFormat" as any);
            jsonFormatStub = sinon.stub(JsonFormatFactory, "create").returns("jsonFormat" as any);


        });

        afterEach(() => {
            humanFormatStub.restore();
            jsonFormatStub.restore();

            process.env = OLD_ENV;
            delete require.cache[require.resolve("../src/config")];
            delete require.cache[require.resolve("../src/LoggerFactory")];
        });


        const testNamespace = "my-namespace";

        const createHumanConfig = function (level: string, otelLogEnabled?: boolean) {
            return {
                level: level,
                humanReadable: true,
                otelLogEnabled
            };
        };

        const createLoggerWithTestConfig = function (config: { level: string, humanReadable: boolean }) {
            LoggerFactory = require("../src/LoggerFactory");

            return LoggerFactory.create({
                namespace: testNamespace
            });
        };

        describe("log level configuration", function () {

            it("has the log level 'trace' supplied to it", function () {
                process.env.LOG_LEVEL = "trace";
                const traceConfig = createHumanConfig("trace");
                const traceLogger = createLoggerWithTestConfig(traceConfig);

                expect(traceLogger.level).to.equal("trace");
            });

            it("has the log level 'debug' supplied to it", function () {
                process.env.LOG_LEVEL = "debug";
                const debugConfig = createHumanConfig("debug");
                const debugLogger = createLoggerWithTestConfig(debugConfig);

                expect(debugLogger.level).to.equal("debug");
            });

            it("has the log level 'info' supplied to it", function () {
                process.env.LOG_LEVEL = "info";
                const infoConfig = createHumanConfig("info");
                const infoLogger = createLoggerWithTestConfig(infoConfig);

                expect(infoLogger.level).to.equal("info");
            });

            it("has the log level 'request' supplied to it", function () {
                process.env.LOG_LEVEL = "request";
                const requestConfig = createHumanConfig("request");
                const requestLogger = createLoggerWithTestConfig(requestConfig);

                expect(requestLogger.level).to.equal("request");
            });

            it("has the log level 'error' supplied to it", function () {
                process.env.LOG_LEVEL = "error";
                const errorConfig = createHumanConfig("error");
                const errorLogger = createLoggerWithTestConfig(errorConfig);

                expect(errorLogger.level).to.equal("error");
            });
        });

        it("selects the human formatter if humanReadable is true", function () {

            const humanLogger = createLoggerWithTestConfig(createHumanConfig("trace"));

            expect(humanLogger._readableState.pipes.format).to.equal("humanFormat");
        });

        it("has open telemetry transport attached if otel flag is passed", function () {
            process.env.OTEL_LOG_ENABLED = "true";
            const humanLogger = createLoggerWithTestConfig(createHumanConfig("trace", true));

            expect(humanLogger._readableState.pipes).to.have.lengthOf(2);
            expect(humanLogger._readableState.pipes[0]).to.be.an.instanceof(Console);
            expect(humanLogger._readableState.pipes[1]).to.be.an.instanceof(OpenTelemetryTransportV3);
        });

        it("has no open telemetry transport attached if otel flag is not passed", function () {
            const humanLogger = createLoggerWithTestConfig(createHumanConfig("trace", false));

            expect(humanLogger._readableState.pipes.name).to.equal("console");
        });

    });
});
