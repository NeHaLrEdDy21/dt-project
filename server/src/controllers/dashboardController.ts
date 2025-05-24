import { Request, Response } from 'express';
import { FoodDonation } from '../models/FoodDonation';
import { FoodRequest } from '../models/FoodRequest';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const donations = await FoodDonation.find(); // Adjust query as needed
    const requests = await FoodRequest.find(); // Adjust query as needed

    res.json({ donations, requests });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data.' });
  }
};