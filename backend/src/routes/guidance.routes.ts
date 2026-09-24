import { Router } from 'express';
import { guidanceController } from '../controllers/guidance.controller';
import { validateRequest, validateQuery } from '../middleware/validation.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import { createGuidanceSchema, getGuidanceQuerySchema } from '../validators/guidance.validator';
import rateLimit from 'express-rate-limit';

const router = Router();

const guidanceLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many guidance requests, please try again later.',
});

router.use(requireAuth);

router.post('/', guidanceLimiter, validateRequest(createGuidanceSchema), guidanceController.create);
router.get('/', validateQuery(getGuidanceQuerySchema), guidanceController.getAll);
router.get('/:id', guidanceController.getOne);
router.delete('/:id', guidanceController.delete);

export default router;
