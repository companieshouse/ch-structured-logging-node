import chai, { expect } from "chai";
import sinon, { SinonSandbox, SinonStubbedInstance } from "sinon";

import ApplicationLogger from "../src/ApplicationLogger";
import LogMetaData from "../src/LogMetaData";
import MiddlewareFactory from "../src/MiddlewareFactory";
import metaData from "../src/LogMetaData";

const proxyquire = require("proxyquire").noCallThru();

describe("MiddlewareFactory", function () {

    let sandbox: SinonSandbox;

    const mockLogMetaData: SinonStubbedInstance<LogMetaData> = sinon.stub(metaData);
    const mockApplicationLogger: SinonStubbedInstance<ApplicationLogger> = sinon.createStubInstance(ApplicationLogger);


    let middlewareFactory: MiddlewareFactory;

    const requireMiddlewareFactory = function () {

        const client = proxyquire("../src/MiddlewareFactory", {
            "./src/LogMetaData": mockLogMetaData
        });

        return client;
    };

    beforeEach(function () {

        sandbox = sinon.createSandbox();

        middlewareFactory = new (requireMiddlewareFactory())();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("#create", function () {
        it("Happy path", function () {

            MiddlewareFactory.create(mockApplicationLogger);
        });

    });
});
