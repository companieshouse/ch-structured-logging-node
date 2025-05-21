import LogMetaData from "./LogMetaData";
import { Request } from "express";
declare const getRequestMetaData: (request: Request) => LogMetaData;
export = getRequestMetaData;
