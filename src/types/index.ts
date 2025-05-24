export interface FoodItem {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  location: string;
  expiry: string;
  createdAt: string;
}

export interface FoodRequest {
  id: string;
  foodItemId: string;
  requesterId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface FoodDonation {
  id: string;
  foodItemId: string;
  donorId: string;
  status: 'available' | 'reserved' | 'completed';
  createdAt: string;
}