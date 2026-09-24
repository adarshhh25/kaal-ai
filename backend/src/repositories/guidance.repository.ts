import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

export const guidanceRepository = {
  async createGuidance(data: Prisma.GuidanceCreateInput) {
    return prisma.guidance.create({ data });
  },

  async findGuidanceByUserId(userId: string, skip: number, take: number) {
    return prisma.guidance.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  },

  async countGuidanceByUserId(userId: string) {
    return prisma.guidance.count({
      where: { userId }
    });
  },

  async findGuidanceByIdAndUserId(id: string, userId: string) {
    return prisma.guidance.findFirst({
      where: { id, userId }
    });
  },

  async deleteGuidanceByIdAndUserId(id: string, userId: string) {
    return prisma.guidance.deleteMany({
      where: { id, userId }
    });
  }
};
