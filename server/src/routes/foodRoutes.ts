import { Router } from 'express';
import { getFoodDonations, getFoodRequests } from '../controllers/foodController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/donations', authMiddleware, getFoodDonations);
router.get('/requests', authMiddleware, getFoodRequests);

export const foodRoutes = router;