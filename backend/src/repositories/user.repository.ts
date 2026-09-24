import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

export const userRepository = {
  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
};
