import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token in every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Test backend connection
export const testBackendConnection = async () => {
  try {
    const response = await axiosInstance.get("/api/test");
    return response.data;
  } catch (error) {
    console.error("Backend connection failed:", error);
    throw error;
  }
};

export const api = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await axiosInstance.post("/api/auth/register", userData);
    return response.data;
  },
  login: async (credentials: { email: string; password: string }) => {
    const response = await axiosInstance.post("/api/auth/login", credentials);
    return response.data;
  },
  createFoodListing: async (listing: {
    title: string;
    description: string;
    category: string;
    quantity: number;
    location: string;
    expiry: string;
  }) => {
    const response = await axiosInstance.post("/api/food/listings", listing);
    return response.data;
  },

  // Food Listings
  getFoodListings: async () => {
    try {
      const response = await axiosInstance.get("/api/food/listings");
      console.log('API Response:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Error in getFoodListings:', error);
      throw error;
    }
  },

  updateFoodListing: async (
    id: string,
    listing: Partial<{
      title: string;
      description: string;
      category: string;
      quantity: number;
      location: string;
      expiry: string;
    }>
  ) => {
    const response = await axiosInstance.put(`/api/food/listings/${id}`, listing);
    return response.data;
  },

  deleteFoodListing: async (id: string) => {
    const response = await axiosInstance.delete(`/api/food/listings/${id}`);
    return response.data;
  },

  // Food Requests
  createFoodRequest: async (data: { foodItemId: string }) => {
    try {
      console.log('Creating food request with data:', data);
      
      // Create request with default values
      const requestData = {
        foodItemId: data.foodItemId,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        quantity: 1 // Default quantity
      };

      console.log('Sending request payload:', requestData);
      const response = await axiosInstance.post("/api/food/requests", requestData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating food request:', error.response?.data || error);
      throw error;
    }
  },

  // Dashboard Data
  getDashboardData: async () => {
    try {
      const response = await axiosInstance.get('/api/dashboard');
      console.log('API Response:', response.data); // Debug log
      
      // Transform the data if needed
      const transformedData = {
        myDonations: response.data.myDonations.map((donation: any) => ({
          id: donation._id || donation.id,
          foodItem: {
            id: donation._id || donation.id,
            title: donation.title,
            quantity: donation.quantity,
            location: donation.location,
            expiry: donation.expiry,
            status: donation.status,
            description: donation.description
          },
          status: donation.status,
          requests: donation.requests || 0,
          listedAt: donation.createdAt || new Date().toISOString()
        })),
        myRequests: response.data.myRequests || [],
        stats: response.data.stats || {
          totalDonations: response.data.myDonations?.length || 0,
          totalRequests: response.data.myRequests?.length || 0
        }
      };

      return transformedData;
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error.response?.data || error);
      throw error;
    }
  },
};

// Example handleSubmit function
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: any, navigate: any, toast: any) => {
  e.preventDefault();

  try {
    // Ensure all required fields are included
    const listing = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      quantity: formData.quantity, // Keep quantity as a string
      location: formData.location,
      expiry: formData.expiry,
    };

    // Validate that quantity is a valid positive number
    const quantityAsNumber = Number(listing.quantity);
    if (isNaN(quantityAsNumber) || quantityAsNumber <= 0) {
      throw new Error("Quantity must be a valid positive number.");
    }

    if (!listing.title || !listing.description || !listing.category || !listing.quantity || !listing.location || !listing.expiry) {
      throw new Error("All fields are required.");
    }

    console.log("Submitting listing:", listing); // Log the payload for debugging

    await api.createFoodListing({
      ...listing,
      quantity: quantityAsNumber, // Convert quantity to a number before sending to the backend
    });

    toast({
      title: "Food successfully listed!",
      description: "Your donation has been posted.",
    });

    // Reset form
    formData.setTitle("");
    formData.setCategory("");
    formData.setQuantity("");
    formData.setDescription("");
    formData.setLocation("");
    formData.setExpiry("");

    navigate("/food-listings");
  } catch (error: any) {
    console.error("Error creating food listing:", error);

    const errorMessage =
      error.response?.data?.message || error.message || "Failed to create food listing. Please try again.";

    toast({
      title: "Error listing food",
      description: errorMessage,
      variant: "destructive",
    });
  }
};

const handleRequestFood = async (foodItemId: string) => {
  try {
    console.log("Requesting food with ID:", foodItemId); // Debugging log
    await api.createFoodRequest({ foodItemId });

    toast({
      title: "Request sent!",
      description: "Your request has been submitted successfully.",
    });
  } catch (error: any) {
    console.error("Error requesting food:", error);

    toast({
      title: "Error requesting food",
      description: error.response?.data?.message || "Failed to request food. Please try again.",
      variant: "destructive",
    });
  }
};

