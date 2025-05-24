import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import FoodListings from "./pages/FoodListings";
import ListFood from "./pages/ListFood";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import { api, testBackendConnection } from "./utils/api";

const queryClient = new QueryClient();

function App() {
  const [backendStatus, setBackendStatus] = useState<string>("Checking...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const result = await testBackendConnection();
        setBackendStatus(result.message);
      } catch (error) {
        setBackendStatus("Failed to connect to backend");
      }
    };

    checkBackend();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/food-listings" element={<FoodListings />} />
            <Route path="/list-food" element={<ListFood />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                <div className="min-h-screen flex flex-col bg-[#f8f4e8]">
                  <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <LoginForm />
                  </div>
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="min-h-screen flex flex-col bg-[#f8f4e8]">
                  <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <RegisterForm />
                  </div>
                </div>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <div className="App">
          <h1>Edible Bridge System</h1>
          <div className="backend-status">Backend Status: {backendStatus}</div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
