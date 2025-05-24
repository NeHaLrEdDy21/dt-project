import mongoose from 'mongoose';

const foodListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  expiry: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const FoodListing = mongoose.model('FoodListing', foodListingSchema);