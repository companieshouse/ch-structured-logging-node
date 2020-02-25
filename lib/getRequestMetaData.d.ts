import LogMetaData from "./LogMetaData";
import { Request } from "express";
declare const getRequestMetaData: (request: Request<import("express-serve-static-core").ParamsDictionary>) => LogMetaData;
export = getRequestMetaData;
