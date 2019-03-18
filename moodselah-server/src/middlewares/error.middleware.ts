import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
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

export default errorMiddleware;
