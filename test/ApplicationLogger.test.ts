import ApplicationLogger from "../src/ApplicationLogger";
import StructuredLogger from "../src/StructuredLogger";
import sinon from "sinon";

describe("ApplicationLogger", function () {

    let applicationLogger: ApplicationLogger;
    let mockStructuredLogger: StructuredLogger;

    beforeEach(function () {
        applicationLogger = new ApplicationLogger(mockStructuredLogger);
    });

    const testMessage = "Test log message";

    describe("#trace", function () {

        it("calls corresponding structured logger method with the message", function () {

            applicationLogger.trace(testMessage);

            expect(mockStructuredLogger.trace)
        });
    });

    describe("#debug", function () {
        //
    });

    describe("#info", function () {
        //
    });

    describe("#request", function () {
        //
    });

    describe("#error", function () {
        //
    });

    describe("#traceRequest", function () {
        //
    });

    describe("#debugRequest", function () {
        //
    });

    describe("#infoRequest", function () {
        //
    });

    describe("#requestRequest", function () {
        //
    });

    describe("#errorRequest", function () {
        //
    });
});
