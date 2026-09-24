import { z } from 'zod';
import { userRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken } from '../utils/jwt';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { AppError } from '../utils/app-error';

type RegisterDto = z.infer<typeof registerSchema>;
type LoginDto = z.infer<typeof loginSchema>;

export const authService = {
  async register(data: RegisterDto) {
    const existingUser = await userRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new AppError('Email already in use', 409);
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await userRepository.createUser({
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword,
    });

    const token = generateAccessToken(user.id);
    const { passwordHash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  },

  async login(data: LoginDto) {
    const user = await userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await comparePassword(data.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateAccessToken(user.id);
    const { passwordHash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  },

  async getMe(userId: string) {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};
