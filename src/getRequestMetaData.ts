import LogMetaData from "./LogMetaData";
import { Request } from "express";

const getRequestMetaData = function (request: Request): LogMetaData {

    return {
        path: request.path,
        method: request.method,
        context: request.headers.context === undefined ? undefined : request.headers.context.toString()
    };
};

export = getRequestMetaData;
