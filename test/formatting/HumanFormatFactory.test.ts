import HumanFormatFactory from "../../src/formatting/HumanFormatFactory";
import chai from "chai";
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

        const testInfo = {
            level: "info",
            message: "This is a great test"
        };

        const logString = formatter.template(testInfo);

        expect(logString)
            .to.contain(testInfo.level)
            .to.contain(testInfo.message);
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

        expect(logString)
            .to.contain(testInfo.level)
            .to.contain(testInfo.message)
            .to.contain(testInfo.method);

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

        expect(logString)
            .to.contain(testInfo.level)
            .to.contain(testInfo.message)
            .to.contain(`event: ${testInfo.level}`)
            .to.contain(`path: ${testInfo.path}`)
            .to.contain(`method: ${testInfo.method}`)
            .to.contain(`status: ${testInfo.status}`)
            .to.contain(`duration: ${testInfo.duration}`);

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

        expect(logString)
            .to.not.contain("method")
            .to.not.contain("status");
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

        expect(logString)
            .to.contain(testInfo.level)
            .to.contain(testInfo.message)
            .to.contain(`namespace: ${testNamespace}`)
            .to.contain("created: ");

        expect(actualNumberOfLines).to.equal(expectedNumberOfLines);
    });
});
