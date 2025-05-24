import { useState } from "react";
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
    const response = await axiosInstance.get("/api/food/listings");
    return response.data;
  },

  // Define FoodItem type if not already defined or import it from the correct module
  updateFoodListing: async (id: string, listing: Partial<{
    title: string;
    description: string;
    category: string;
    quantity: number;
    location: string;
    expiry: string;
  }>) => {
    const response = await axiosInstance.put(`/api/food/listings/${id}`, listing);
    return response.data;
  },

  deleteFoodListing: async (id: string) => {
    const response = await axiosInstance.delete(`/api/food/listings/${id}`);
    return response.data;
  },

  // Food Requests
  createFoodRequest: async (request: { foodItemId: string }) => {
    const response = await axiosInstance.post("/api/food/requests", request);
    return response.data;
  },

  // Dashboard Data
  getDashboardData: async () => {
    const response = await axiosInstance.get("/api/dashboard");
    return response.data;
  },
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Ensure all required fields are included
    const listing = {
      title,
      description,
      category,
      quantity: Number(quantity), // Ensure quantity is a number
      location,
      expiry,
    };

    console.log("Submitting listing:", listing); // Log the payload for debugging

    await axiosInstance.post("/api/food/listings", listing);

    toast({
      title: "Food successfully listed!",
      description: "Your donation has been posted.",
    });

    // Reset form
    setTitle("");
    setCategory("");
    setQuantity("");
    setDescription("");
    setLocation("");
    setExpiry("");

    navigate("/food-listings");
  } catch (error: any) {
    console.error("Error creating food listing:", error);

    const errorMessage =
      error.response?.data?.message || "Failed to create food listing. Please try again.";

    toast({
      title: "Error listing food",
      description: errorMessage,
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

function setCategory(arg0: string) {
  throw new Error('Function not implemented.');
}
function setIsSubmitting(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function toast(arg0: { title: string; description: string; }) {
  throw new Error('Function not implemented.');
}

