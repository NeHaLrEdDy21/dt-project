import mongoose from 'mongoose';

const foodListingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
    index: true
  },
  title: {
    type: String,
    required: false,
    default: 'Untitled'
  },
  description: { 
    type: String, 
    required: false,
    default: '' 
  },
  category: { 
    type: String, 
    required: false,
    default: 'Uncategorized' 
  },
  quantity: { 
    type: Number, 
    required: false,
    default: 0 
  },
  location: { 
    type: String, 
    required: false,
    default: 'Location not specified' 
  },
  expiry: { 
    type: String, 
    required: false,
    default: 'Not specified' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const FoodListing = mongoose.model('FoodListing', foodListingSchema);