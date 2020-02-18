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
});
