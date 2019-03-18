"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NODE_ENV = process.env.NODE_ENV;
var isProduction = NODE_ENV === "production";
function errorMiddleware(error, request, response, next) {
    if (error.status) {
        return response.status(error.status).json({
            title: isProduction ? "error" : error.message,
            content: isProduction ? "error" : error.message,
            statusCode: error.status
        });
    }
    return response.status(500).json({
        title: "error",
        content: "error",
        statusCode: 500
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map