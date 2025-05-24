import mongoose from 'mongoose';

const foodDonationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Ensure this field exists
  foodItemId: { type: String, required: true },
  status: { type: String, enum: ['available', 'reserved', 'completed'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
});

export const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);