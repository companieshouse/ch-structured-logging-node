import JsonFormatFactory from "../../lib/formatting/JsonFormatFactory";
import chai from "chai";
const expect = chai.expect;

describe("#JsonFormatFactory", function () {

    const testNamespace = "my-namespace";

    let formatter: any;

    const getLog = function (testInfo: any) {
        return JSON.parse(formatter.template(testInfo));
    };

    beforeEach(function () {
        formatter = JsonFormatFactory.create(testNamespace);
    });

    it("shows the message passed in", function () {

        const testInfo = {
            level: "info",
            message: "This is a great test"
        };

        const log = getLog(testInfo);

        expect(log.event).to.equal(testInfo.level);
        expect(log.data.message).to.equal(testInfo.message);
    });

    it("prints only possible keys", function () {

        const testInfo = {
            level: "info",
            message: "This is a great test",
            path: "/dog-pictures",
            method: "PATCH",
            status: 200,
            duration: 43
        };

        const log = getLog(testInfo);

        const actualNumKeysWithDataKey = Object.keys(log).length + Object.keys(log.data).length;
        const expectedNumKeysWithDataKey = 9;

        expect(actualNumKeysWithDataKey).to.equal(expectedNumKeysWithDataKey);
        expect(log.created).to.not.equal(undefined);
        expect(log.namespace).to.equal(testNamespace);
        expect(log.event).to.equal(testInfo.level);
        expect(log.data.message).to.equal(testInfo.message);
        expect(log.data.path).to.equal(testInfo.path);
        expect(log.data.method).to.equal(testInfo.method);
        expect(log.data.status).to.equal(testInfo.status);
        expect(log.data.duration).to.equal(testInfo.duration);
    });

    it("doesn't print undefined message keys", function () {

        const testInfo = {
            level: "info",
            message: undefined
        };

        const log = getLog(testInfo);

        expect(log.message).to.not.exist;
    });

    it("doesn't print keys which are not in the spec", function () {

        const testInfo = {
            notAKey: "some value",
            level: "debug"
        };

        const log = getLog(testInfo);

        expect(log.notAKey).to.not.exist;
        expect(log.event).to.exist;
    });

    it("adds a created date and namespace", function () {

        const testInfo = {};

        const log = getLog(testInfo);

        expect(log.created).to.exist;
        expect(log.namespace).to.exist;
    });

    it("prints instrumentation details if trace context is present", function () {
        /* eslint camelcase: ["error", {allow: ["trace_id", "span_id", "trace_flags"]}] */
        const testInfo = {
            level: "info",
            message: "This is a instrumentation test",
            path: "/some/path",
            method: "GET",
            status: 200,
            duration: 43,
            trace_id: "e11e4f6364807e40c333cc8d3d5b9935",
            span_id: "2bb2b212f57cd105",
            trace_flags: "01"
        };

        const log = getLog(testInfo);

        const actualNumKeysWithDataKey = Object.keys(log).length + Object.keys(log.data).length;
        const expectedNumKeysWithDataKey = 15;

        expect(actualNumKeysWithDataKey).to.equal(expectedNumKeysWithDataKey);

        expect(log.trace_id).to.equal(testInfo.trace_id);
        expect(log.span_id).to.equal(testInfo.span_id);
        expect(log.trace_flags).to.equal(testInfo.trace_flags);
        expect(log.data.trace_id).to.equal(testInfo.trace_id);
        expect(log.data.span_id).to.equal(testInfo.span_id);
        expect(log.data.trace_flags).to.equal(testInfo.trace_flags);

    });

    it("doesn't print instrumentation details if trace context is not present", function () {
        const testInfo = {
            level: "info",
            message: "This is a instrumentation test",
            path: "/some/path",
            method: "GET",
            status: 200,
            duration: 43
        };

        const log = getLog(testInfo);

        ["trace_id", "span_id", "trace_flags"].forEach(key => {
            expect(log[key]).to.be.undefined;
            expect(log.data[key]).to.be.undefined;
        });
    });
});
