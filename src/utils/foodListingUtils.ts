import { FoodItem } from "@/components/FoodCard";

// Sample food data for demonstration
export const sampleFoodItems: FoodItem[] = [
  {
    id: "1",
    title: "Fresh Vegetables Assortment",
    category: "Vegetables",
    quantity: 5, // Changed to number (kg)
    location: "Downtown Community Center",
    expiry: "Today, 8PM",
    distance: "0.5 miles",
    description: "Assorted fresh vegetables including carrots, potatoes, and greens."
  },
  {
    id: "2",
    title: "Packaged Sandwiches",
    category: "Prepared Meal",
    quantity: 12, // Number of sandwiches
    location: "Green Cafe",
    expiry: "Today, 6PM",
    distance: "0.8 miles",
    description: "Variety of vegetarian and non-vegetarian sandwiches."
  },
  {
    id: "3",
    title: "Bread and Pastries",
    category: "Bakery",
    quantity: 20, // Number of items
    location: "Morning Bakery",
    expiry: "Today, 9PM",
    distance: "1.2 miles",
    description: "Assorted bread loaves, rolls, and pastries."
  },
  {
    id: "4",
    title: "Canned Food Assortment",
    category: "Canned Goods",
    quantity: 15, // Number of cans
    location: "Food Bank Storage",
    expiry: "2 weeks",
    distance: "1.5 miles",
    description: "Various canned goods including beans, vegetables, and fruits."
  },
  {
    id: "5",
    title: "Fresh Fruit Basket",
    category: "Fruits",
    quantity: 3, // Changed to number (kg)
    location: "Farmers Market",
    expiry: "Tomorrow, 12PM",
    distance: "2.1 miles",
    description: "Fresh seasonal fruits including apples, oranges, and berries."
  },
  {
    id: "6",
    title: "Dairy Products",
    category: "Dairy",
    quantity: 8, // Number of items
    location: "Local Grocery",
    expiry: "3 days",
    distance: "2.4 miles",
    description: "Various dairy products close to expiry date but still good."
  },
  {
    id: "7",
    title: "Rice and Pasta",
    category: "Dry Goods",
    quantity: 7, // Changed to number (kg - combined)
    location: "Community Pantry",
    expiry: "6 months",
    distance: "2.7 miles",
    description: "Bulk rice and various pasta shapes."
  },
  {
    id: "8",
    title: "Cooked Meals",
    category: "Cooked Food",
    quantity: 8, // Number of portions
    location: "Restaurant District",
    expiry: "Today, 10PM",
    distance: "3.0 miles",
    description: "Freshly prepared meals from local restaurant surplus."
  },
];

// Keys for local storage
const FOOD_LISTINGS_KEY = 'foodListings';
const FOOD_REQUESTS_KEY = 'foodRequests';
const FOOD_DONATIONS_KEY = 'foodDonations';

// Get all food listings (sample + user-created)
export const getAllFoodListings = (): FoodItem[] => {
  try {
    const storedListings = localStorage.getItem(FOOD_LISTINGS_KEY);
    const userListings = storedListings ? JSON.parse(storedListings) : [];
    
    // Combine sample items with user-created listings
    return [...sampleFoodItems, ...userListings];
  } catch (error) {
    console.error('Error retrieving food listings:', error);
    return [...sampleFoodItems];
  }
};

// Get only user-created food listings
export const getUserFoodListings = (): FoodItem[] => {
  try {
    const storedListings = localStorage.getItem(FOOD_LISTINGS_KEY);
    return storedListings ? JSON.parse(storedListings) : [];
  } catch (error) {
    console.error('Error retrieving user food listings:', error);
    return [];
  }
};

// Add a new food listing (donation)
export const addFoodListing = (foodItem: Omit<FoodItem, 'id'>): FoodItem => {
  try {
    const currentListings = getUserFoodListings();
    const newId = `user-${Date.now()}`;
    
    // Convert quantity to number if it's a string
    const quantityNum = typeof foodItem.quantity === 'string' 
      ? parseFloat(foodItem.quantity) || 0 
      : foodItem.quantity;
    
    const newFoodItem: FoodItem = {
      id: newId,
      ...foodItem,
      quantity: quantityNum
    };
    
    localStorage.setItem(
      FOOD_LISTINGS_KEY, 
      JSON.stringify([...currentListings, newFoodItem])
    );
    
    // Also save to donations
    saveFoodDonation(newFoodItem);
    
    return newFoodItem;
  } catch (error) {
    console.error('Error adding food listing:', error);
    throw error;
  }
};

// Types for requests and donations
export interface FoodRequest {
  id: string;
  foodItem: FoodItem;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export interface FoodDonation {
  id: string;
  foodItem: FoodItem;
  status: 'active' | 'completed';
  listedAt: string;
  requests: number;
}

// Save a food request
export const saveFoodRequest = (foodItem: FoodItem): FoodRequest => {
  try {
    const currentRequests = getFoodRequests();
    const newRequestId = `req-${Date.now()}`;
    
    const newRequest: FoodRequest = {
      id: newRequestId,
      foodItem,
      status: 'pending',
      requestedAt: new Date().toLocaleString()
    };
    
    localStorage.setItem(
      FOOD_REQUESTS_KEY,
      JSON.stringify([...currentRequests, newRequest])
    );
    
    return newRequest;
  } catch (error) {
    console.error('Error saving food request:', error);
    throw error;
  }
};

// Get all food requests
export const getFoodRequests = (): FoodRequest[] => {
  try {
    const storedRequests = localStorage.getItem(FOOD_REQUESTS_KEY);
    return storedRequests ? JSON.parse(storedRequests) : [];
  } catch (error) {
    console.error('Error retrieving food requests:', error);
    return [];
  }
};

// Save a food donation
export const saveFoodDonation = (foodItem: FoodItem): FoodDonation => {
  try {
    const currentDonations = getFoodDonations();
    const newDonationId = `don-${Date.now()}`;
    
    const newDonation: FoodDonation = {
      id: newDonationId,
      foodItem,
      status: 'active',
      listedAt: new Date().toLocaleString(),
      requests: 0
    };
    
    localStorage.setItem(
      FOOD_DONATIONS_KEY,
      JSON.stringify([...currentDonations, newDonation])
    );
    
    return newDonation;
  } catch (error) {
    console.error('Error saving food donation:', error);
    throw error;
  }
};

// Get all food donations
export const getFoodDonations = (): FoodDonation[] => {
  try {
    const storedDonations = localStorage.getItem(FOOD_DONATIONS_KEY);
    return storedDonations ? JSON.parse(storedDonations) : [];
  } catch (error) {
    console.error('Error retrieving food donations:', error);
    return [];
  }
};

// Update food quantity
export const updateFoodQuantity = (id: string, quantity: number): boolean => {
  try {
    // Update in listings
    const listings = getAllFoodListings();
    const listingIndex = listings.findIndex(item => item.id === id);
    
    if (listingIndex >= 0) {
      listings[listingIndex].quantity = quantity;
      
      // If it's a user listing, update the stored listings
      const userListings = getUserFoodListings();
      const userIndex = userListings.findIndex(item => item.id === id);
      
      if (userIndex >= 0) {
        userListings[userIndex].quantity = quantity;
        localStorage.setItem(FOOD_LISTINGS_KEY, JSON.stringify(userListings));
      }
    }
    
    // Update in donations
    const donations = getFoodDonations();
    const donationIndex = donations.findIndex(item => item.foodItem.id === id);
    
    if (donationIndex >= 0) {
      donations[donationIndex].foodItem.quantity = quantity;
      localStorage.setItem(FOOD_DONATIONS_KEY, JSON.stringify(donations));
    }
    
    return true;
  } catch (error) {
    console.error('Error updating food quantity:', error);
    return false;
  }
};

// Transform backend data to FoodItem format
export const transformFoodData = (backendData: any): FoodItem => {
  if (!backendData) {
    throw new Error('Invalid backend data');
  }

  return {
    id: backendData._id || backendData.id, // Handle both ID formats
    title: backendData.title || 'Untitled',
    category: backendData.category || 'Uncategorized',
    quantity: backendData.quantity || '0',
    location: backendData.location || 'Location unknown',
    expiry: backendData.expiry || 'Not specified',
    distance: backendData.distance || 'N/A',
    description: backendData.description || '',
    createdAt: backendData.createdAt || new Date().toISOString(),
  };
};
