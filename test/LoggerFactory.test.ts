"use strict";

import chai from "chai";
import proxyquire from "proxyquire";
const expect = chai.expect;

describe("LoggerFactory", function () {

    describe("#create", function () {

        const testNamespace = "my-namespace";

        const createHumanConfig = function (level: string) {
            return {
                level: level,
                humanReadable: true
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

        // beforeEach(function () {
        //     logger = createLoggerWithTestConfig({
        //         namespace: testNamespace
        //     });
        // });

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

        it("has selects the human formatter if humanReadable is true", function () {

            const humanLogger = createLoggerWithTestConfig(createHumanConfig("trace"));

            expect(humanLogger._readableState.pipes.format).to.equal("human formatter");
        });
    });
});
