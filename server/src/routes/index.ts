import { Router } from 'express';
import { getFoodListings, createFoodListing, updateFoodListing, deleteFoodListing } from '../controllers/foodController';

const router = Router();

// Food Listings routes
router.get('/listings', getFoodListings);
router.post('/listings', createFoodListing);
router.put('/listings/:id', updateFoodListing);
router.delete('/listings/:id', deleteFoodListing);

// Food Requests routes
router.get('/requests', getFoodListings);
router.post('/requests', createFoodListing);

// Food Donations routes
router.get('/donations', getFoodListings);
router.put('/donations/:id', updateFoodListing);

export const foodRoutes = router;