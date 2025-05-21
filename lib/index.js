"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.createLoggerMiddleware = void 0;
const ApplicationLogger_1 = __importDefault(require("./ApplicationLogger")); // eslint-disable-line @typescript-eslint/no-unused-vars
const LoggerFactory_1 = __importDefault(require("./LoggerFactory"));
const MiddlewareFactory_1 = __importDefault(require("./MiddlewareFactory"));
const createLoggerMiddleware = function (namespace) {
    return MiddlewareFactory_1.default.create(LoggerFactory_1.default.create({
        namespace: namespace
    }));
};
exports.createLoggerMiddleware = createLoggerMiddleware;
const createLogger = function (namespace) {
    return new ApplicationLogger_1.default(LoggerFactory_1.default.create({
        namespace: namespace
    }));
};
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map