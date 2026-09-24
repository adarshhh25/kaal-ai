import { guidanceRepository } from '../repositories/guidance.repository';
import { aiService } from './ai.service';
import { AppError } from '../utils/app-error';
import { Prisma } from '@prisma/client';

export const guidanceService = {
  async generateGuidance(userId: string, question: string) {
    // Call AI Service
    const aiResponse = await aiService.generateGuidance(question);

    // Save to Database
    const guidance = await guidanceRepository.createGuidance({
      question,
      response: aiResponse as Prisma.InputJsonValue,
      user: { connect: { id: userId } }
    });

    return guidance;
  },

  async getGuidanceHistory(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      guidanceRepository.findGuidanceByUserId(userId, skip, limit),
      guidanceRepository.countGuidanceByUserId(userId)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  },

  async getGuidanceById(userId: string, id: string) {
    const guidance = await guidanceRepository.findGuidanceByIdAndUserId(id, userId);
    
    if (!guidance) {
      throw new AppError('Guidance not found', 404);
    }
    
    return guidance;
  },

  async deleteGuidance(userId: string, id: string) {
    const result = await guidanceRepository.deleteGuidanceByIdAndUserId(id, userId);
    
    if (result.count === 0) {
      throw new AppError('Guidance not found or not authorized to delete', 404);
    }
    
    return { message: 'Guidance deleted successfully' };
  }
};
