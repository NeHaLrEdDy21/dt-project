import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getDashboardData); // Protect the route with authentication

export const dashboardRoutes = router;