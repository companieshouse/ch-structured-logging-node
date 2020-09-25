/// <reference types="qs" />
/// <reference types="express" />
import ApplicationLogger from "./ApplicationLogger";
declare const createLoggerMiddleware: (namespace: string) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>;
declare const createLogger: (namespace: string) => ApplicationLogger;
export { createLoggerMiddleware, createLogger };
