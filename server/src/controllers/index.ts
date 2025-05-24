import { Request, Response } from 'express';
import { FoodListing } from '../models/FoodListing';

export const getFoodListings = async (req: Request, res: Response) => {
  try {
    const listings = await FoodListing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createFoodListing = async (req: Request, res: Response) => {
  try {
    const listing = new FoodListing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateFoodListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await FoodListing.findByIdAndUpdate(id, req.body, { new: true });
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteFoodListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await FoodListing.findByIdAndDelete(id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};