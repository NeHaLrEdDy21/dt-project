import mongoose from 'mongoose';

const foodRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Ensure this field exists
  foodItemId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export const FoodRequest = mongoose.model('FoodRequest', foodRequestSchema);