import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { sendError } from '../utils/api-response';

export const validateRequest = (schema: ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendError(res, 422, 'VALIDATION_ERROR', 'Invalid request', (error as any).errors);
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendError(res, 422, 'VALIDATION_ERROR', 'Invalid request query', (error as any).errors);
      }
      next(error);
    }
  };
};
