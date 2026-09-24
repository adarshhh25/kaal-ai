import { z } from 'zod';

export const createGuidanceSchema = z.object({
  question: z.string().trim().min(3, 'Question must be at least 3 characters').max(2000, 'Question must not exceed 2000 characters'),
});

export const getGuidanceQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional().default(1),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default(10),
});
