import mongoose from 'mongoose';

const foodRequestSchema = new mongoose.Schema({
  foodItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodListing',
    required: true // Keep this required
  },
  userId: {
    type: String,
    required: false // Make userId optional
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

export const FoodRequest = mongoose.model('FoodRequest', foodRequestSchema);