import { Request, Response } from 'express';
import { FoodDonation } from '../models/FoodDonation';
import { FoodRequest } from '../models/FoodRequest';
import { FoodListing } from '../models/FoodListing';
import type { AuthRequest } from '../middleware/auth';

export const getFoodListings = async (req: Request, res: Response) => {
  try {
    const listings = await FoodListing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    console.error('Error in getFoodListings:', error);
    res.status(500).json({ error: 'Failed to fetch food listings' });
  }
};

export const createFoodListing = async (req: Request, res: Response) => {
  try {
    const { title, description, category, quantity, location, expiry } = req.body;

    // Validate required fields
    if (!title || !description || !category || !quantity || !location || !expiry) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a valid positive number." });
    }

    const listing = new FoodListing({
      title,
      description,
      category,
      quantity,
      location,
      expiry,
      createdAt: new Date(),
    });

    const savedListing = await listing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    console.error("Error creating food listing:", error);
    res.status(500).json({ message: "Failed to create food listing." });
  }
};

export const updateFoodListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await FoodListing.findByIdAndUpdate(id, req.body, { new: true });
    if (!listing) {
      return res.status(404).json({ error: 'Food listing not found' });
    }
    res.json(listing);
  } catch (error) {
    console.error('Error in updateFoodListing:', error);
    res.status(500).json({ error: 'Failed to update food listing' });
  }
};

export const deleteFoodListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await FoodListing.findByIdAndDelete(id);
    if (!listing) {
      return res.status(404).json({ error: 'Food listing not found' });
    }
    res.json({ message: 'Food listing deleted successfully' });
  } catch (error) {
    console.error('Error in deleteFoodListing:', error);
    res.status(500).json({ error: 'Failed to delete food listing' });
  }
};

export const getFoodRequests = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const requests = await FoodRequest.find({ userId: req.user.userId }); // Adjust query as needed
    res.json(requests);
  } catch (error) {
    console.error('Error fetching food requests:', error);
    res.status(500).json({ message: 'Failed to fetch food requests.' });
  }
};

export const getFoodDonations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const donations = await FoodDonation.find({ userId: req.user.userId }); // Adjust query as needed
    res.json(donations);
  } catch (error) {
    console.error('Error fetching food donations:', error);
    res.status(500).json({ message: 'Failed to fetch food donations.' });
  }
};

export const createFoodRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { foodItemId, quantity = 1 } = req.body;
    
    // Only validate foodItemId
    if (!foodItemId) {
      return res.status(400).json({ message: "Food item ID is required" });
    }

    // Check if food item exists
    const foodItem = await FoodListing.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Create request with minimal required fields
    const foodRequest = new FoodRequest({
      foodItemId,
      userId: req.user?.userId, // Optional
      status: 'pending',
      quantity,
      requestedAt: new Date()
    });

    console.log('Creating food request:', foodRequest);

    const savedRequest = await foodRequest.save();
    
    res.status(201).json({
      message: "Food request created successfully",
      request: savedRequest
    });
  } catch (error) {
    console.error("Error creating food request:", error);
    res.status(500).json({ message: "Failed to create food request" });
  }
};