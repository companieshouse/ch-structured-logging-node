import HumanFormatFactory from "../../src/formatting/HumanFormatFactory";
import MockDate from "mockdate";
import chai from "chai";
import moment from "moment";
import winston from "winston";
const expect = chai.expect;

describe("#HumanFormatFactory", function () {

    const testNamespace = "my-namespace";

    winston.addColors({
        request: "cyan"
    });

    let formatter: any;

    beforeEach(function () {
        formatter = HumanFormatFactory.create(testNamespace);
    });

    it("shows the message passed in", function () {
        const date = moment("2020-06-09T06:01:43.758+01:00");

        MockDate.set(date.toDate());

        const testInfo = {
            level: "info",
            message: "This is a great test"
        };

        const logString = formatter.template(testInfo);

        expect(logString).to.contain(date.format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
        expect(logString).to.contain(testInfo.level);
        expect(logString).to.contain(testInfo.message);
        MockDate.reset();
    });

    it("has the correct number of lines", function () {

        const testInfo = {
            level: "info",
            message: "This is a better test",
            method: "GET"
        };

        const logString = formatter.template(testInfo);

        const expectedNumberOfLines = 5;
        const actualNumberOfLines = logString.split("\n").length;

        expect(logString).to.contain(testInfo.level);
        expect(logString).to.contain(testInfo.message);
        expect(logString).to.contain(testInfo.method);
        expect(actualNumberOfLines).to.equal(expectedNumberOfLines);
    });

    it("shows the correct colour", function () {

        const ansiCyan = "\u001b[36m";

        const testInfo = {
            level: "request"
        };

        const logString = formatter.template(testInfo);

        expect(logString).contains(ansiCyan);
    });

    it("prints defined messageInfo keys", function () {

        const testInfo = {
            level: "info",
            message: "This is a great test",
            path: "/dog-pictures",
            method: "PATCH",
            status: 200,
            duration: 43
        };

        const logString = formatter.template(testInfo);

        const expectedNumberOfLines = 8;
        const actualNumberOfLines = logString.split("\n").length;

        expect(logString).to.contain(testInfo.level);
        expect(logString).to.contain(testInfo.message);
        expect(logString).to.contain(`event: ${testInfo.level}`);
        expect(logString).to.contain(`path: ${testInfo.path}`);
        expect(logString).to.contain(`method: ${testInfo.method}`);
        expect(logString).to.contain(`status: ${testInfo.status}`);
        expect(logString).to.contain(`duration: ${testInfo.duration}`);
        expect(actualNumberOfLines).to.equal(expectedNumberOfLines);
    });

    it("doesn't print undefined messageInfo keys", function () {

        const testInfo = {
            level: "request",
            method: undefined,
            status: undefined
        };

        const logString = formatter.template(testInfo);

        const expectedNumberOfLines = 4;
        const actualNumberOfLines = logString.split("\n").length;

        expect(actualNumberOfLines).to.equal(expectedNumberOfLines);
        expect(logString).to.not.contain("method");
        expect(logString).to.not.contain("status");
    });

    it("doesn't print keys which are not in the spec", function () {

        const testInfo = {
            level: "info",
            message: "This is a great test",
            luke: "suggested this test"
        };

        const logString = formatter.template(testInfo);

        expect(logString).to.not.contain("luke");
    });

    it("adds a created date and namespace", function () {

        const testInfo = {
            level: "info",
            message: "This is a great test"
        };

        const logString = formatter.template(testInfo);

        const expectedNumberOfLines = 4;
        const actualNumberOfLines = logString.split("\n").length;

        expect(logString).to.contain(testInfo.level);
        expect(logString).to.contain(testInfo.message);
        expect(logString).to.contain(`namespace: ${testNamespace}`);
        expect(logString).to.contain("created: ");
        expect(actualNumberOfLines).to.equal(expectedNumberOfLines);
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

        const logString = formatter.template(testInfo);

        expect(logString).to.contain(`trace_id: ${testInfo.trace_id}`);
        expect(logString).to.contain(`span_id: ${testInfo.span_id}`);
        expect(logString).to.contain(`flags: ${Number(testInfo.trace_flags)}`);
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

        const logString = formatter.template(testInfo);

        ['trace_id', 'span_id', 'flags'].forEach(label => {
            expect(logString).to.not.contain(label);
        });
    });
});
