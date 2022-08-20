import express from 'express';

export interface successResponse {
  status: string;
  statusCode: number,
  data: any,
}
export class ApiResponse {

  static handleSuccess(response: express.Response, payload: successResponse) {
    const {
      status,
      statusCode,
      data,
    } = payload;
    return response.status(statusCode).json({
      statusCode,
      status,
      data,
    });
  }

  static handleError(response: express.Response, payload: any) {
    response.status(payload.statusCode).json(payload);
  }
}
