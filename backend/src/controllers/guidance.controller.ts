import { Request, Response, NextFunction } from 'express';
import { guidanceService } from '../services/guidance.service';
import { sendSuccess } from '../utils/api-response';

export const guidanceController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { question } = req.body;
      const result = await guidanceService.generateGuidance(userId, question);
      sendSuccess(res, 201, result);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      
      const { data, pagination } = await guidanceService.getGuidanceHistory(userId, page, limit);
      
      res.status(200).json({
        success: true,
        data,
        pagination
      });
    } catch (error) {
      next(error);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;
      const result = await guidanceService.getGuidanceById(userId, id);
      sendSuccess(res, 200, result);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;
      const result = await guidanceService.deleteGuidance(userId, id);
      sendSuccess(res, 200, result);
    } catch (error) {
      next(error);
    }
  }
};
