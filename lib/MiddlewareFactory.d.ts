import { RequestHandler } from "express";
import StructuredLogger from "./StructuredLogger";
declare class MiddlewareFactory {
    static create(logger: StructuredLogger): RequestHandler<import("express-serve-static-core").ParamsDictionary>;
}
export = MiddlewareFactory;
