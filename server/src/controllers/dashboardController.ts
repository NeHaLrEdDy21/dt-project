import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { FoodListing } from '../models/FoodListing';
import { FoodRequest } from '../models/FoodRequest';

export const getDashboardData = async (req: AuthRequest, res: Response) => {
  try {
    // Check authentication
    if (!req.user?.userId) {
      console.log('No user ID found in request');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Debug logs
    console.log('Auth token user:', req.user);
    console.log('Fetching donations for user:', req.user.userId);

    // Get user's donations with debug
    const myDonations = await FoodListing.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    console.log('Food listings query:', { userId: req.user.userId });
    console.log('Found donations count:', myDonations.length);
    console.log('Sample donation:', myDonations[0]);

    // Verify food listing schema
    const foodListingSchema = FoodListing.schema.obj;
    console.log('Food listing schema:', foodListingSchema);

    // Get user's requests with debug
    const myRequests = await FoodRequest.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    console.log('Found requests count:', myRequests.length);

    const stats = {
      totalDonations: myDonations.length,
      totalRequests: myRequests.length
    };

    // Log final response
    const response = {
      myDonations,
      myRequests,
      stats
    };
    console.log('Sending response with data:', JSON.stringify(response, null, 2));

    res.json(response);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};