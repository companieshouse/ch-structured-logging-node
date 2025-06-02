import { Console } from "winston/lib/winston/transports";
import { OpenTelemetryTransportV3 } from "@opentelemetry/winston-transport";
import chai from "chai";
import proxyquire from "proxyquire";
const expect = chai.expect;

describe("LoggerFactory", function () {

    describe("#create", function () {

        const testNamespace = "my-namespace";

        const createHumanConfig = function (level: string, otelLogEnabled?: boolean) {
            return {
                level: level,
                humanReadable: true,
                otelLogEnabled
            };
        };

        const createLoggerWithTestConfig = function (config: { level: string, humanReadable: boolean }) {

            const LoggerFactory = proxyquire("../src/LoggerFactory", {
                "./config": config,
                "./formatting/HumanFormatFactory": {
                    create: () => ({ template: () => "human formatter" })
                },
                "./formatting/JsonFormatFactory": function () {
                    return { template: () => "json formatter" };
                }
            });

            return LoggerFactory.create({
                namespace: testNamespace
            });
        };

        it("has the log level supplied to it", function () {

            const traceConfig = createHumanConfig("trace");
            const traceLogger = createLoggerWithTestConfig(traceConfig);

            const debugConfig = createHumanConfig("debug");
            const debugLogger = createLoggerWithTestConfig(debugConfig);

            const infoConfig = createHumanConfig("info");
            const infoLogger = createLoggerWithTestConfig(infoConfig);

            const requestConfig = createHumanConfig("request");
            const requestLogger = createLoggerWithTestConfig(requestConfig);

            const errorConfig = createHumanConfig("error");
            const errorLogger = createLoggerWithTestConfig(errorConfig);

            expect(traceLogger.level).to.equal("trace");
            expect(debugLogger.level).to.equal("debug");
            expect(errorLogger.level).to.equal("error");
            expect(infoLogger.level).to.equal("info");
            expect(requestLogger.level).to.equal("request");
        });

        it("selects the human formatter if humanReadable is true", function () {

            const humanLogger = createLoggerWithTestConfig(createHumanConfig("trace"));

            expect(humanLogger._readableState.pipes.format.template()).to.equal("human formatter");
        });

        it("has open telemetry transport attached if otel flag is passed", function () {
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
