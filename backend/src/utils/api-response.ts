import { Response } from 'express';

export const sendSuccess = <T>(res: Response, statusCode: number, data: T) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: any
) => {
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details,
    },
  });
};
