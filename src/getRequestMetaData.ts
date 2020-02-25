import LogMetaData from "./LogMetaData";
import { Request } from "express";

const getRequestMetaData = function (request: Request): LogMetaData {

    return {
        path: request.path,
        method: request.method
    };
};

export = getRequestMetaData;
