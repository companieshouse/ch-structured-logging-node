"use strict";
const getRequestMetaData = function (request) {
    return {
        path: request.path,
        method: request.method,
        context: request.headers.context === undefined ? undefined : request.headers.context.toString()
    };
};
module.exports = getRequestMetaData;
//# sourceMappingURL=getRequestMetaData.js.map