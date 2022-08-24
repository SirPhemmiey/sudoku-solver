"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static handleSuccess(response, payload) {
        const { status, statusCode, data, } = payload;
        return response.status(statusCode).json({
            statusCode,
            status,
            data,
        });
    }
    static handleError(response, payload) {
        response.status(payload.statusCode).json(payload);
    }
}
exports.ApiResponse = ApiResponse;
