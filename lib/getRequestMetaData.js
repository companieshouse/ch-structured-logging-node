"use strict";
const getRequestMetaData = function (request) {
    return {
        path: request.path,
        method: request.method
    };
};
module.exports = getRequestMetaData;
//# sourceMappingURL=getRequestMetaData.js.map