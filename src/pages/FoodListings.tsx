import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoodCard, { FoodItem } from "@/components/FoodCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllFoodListings } from "@/utils/foodListingUtils";

// Sample food data for demonstration
const sampleFoodItems: FoodItem[] = [
  {
    id: "1",
    title: "Fresh Vegetables Assortment",
    category: "Vegetables",
    quantity: "5kg assorted vegetables",
    location: "Downtown Community Center",
    expiry: "Today, 8PM",
    distance: "0.5 miles"
  },
  {
    id: "2",
    title: "Packaged Sandwiches",
    category: "Prepared Meal",
    quantity: "12 sandwiches",
    location: "Green Cafe",
    expiry: "Today, 6PM",
    distance: "0.8 miles"
  },
  {
    id: "3",
    title: "Bread and Pastries",
    category: "Bakery",
    quantity: "20+ items",
    location: "Morning Bakery",
    expiry: "Today, 9PM",
    distance: "1.2 miles"
  },
  {
    id: "4",
    title: "Canned Food Assortment",
    category: "Canned Goods",
    quantity: "15 cans",
    location: "Food Bank Storage",
    expiry: "2 weeks",
    distance: "1.5 miles"
  },
  {
    id: "5",
    title: "Fresh Fruit Basket",
    category: "Fruits",
    quantity: "3kg mixed fruits",
    location: "Farmers Market",
    expiry: "Tomorrow, 12PM",
    distance: "2.1 miles"
  },
  {
    id: "6",
    title: "Dairy Products",
    category: "Dairy",
    quantity: "Milk, cheese, yogurt",
    location: "Local Grocery",
    expiry: "3 days",
    distance: "2.4 miles"
  },
  {
    id: "7",
    title: "Rice and Pasta",
    category: "Dry Goods",
    quantity: "5kg rice, 2kg pasta",
    location: "Community Pantry",
    expiry: "6 months",
    distance: "2.7 miles"
  },
  {
    id: "8",
    title: "Cooked Meals",
    category: "Cooked Food",
    quantity: "8 meal portions",
    location: "Restaurant District",
    expiry: "Today, 10PM",
    distance: "3.0 miles"
  },
];

const categories = [
  "All Categories",
  "Vegetables",
  "Fruits",
  "Bakery",
  "Prepared Meal",
  "Cooked Food",
  "Dairy",
  "Canned Goods",
  "Dry Goods"
];

const FoodListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [maxDistance, setMaxDistance] = useState([5]); // in miles
  const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Load all food listings on component mount
  useEffect(() => {
    const foodItems = getAllFoodListings();
    setAllFoodItems(foodItems);
    setFilteredItems(foodItems);
  }, []);

  const handleSearch = () => {
    let results = allFoodItems;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All Categories") {
      results = results.filter(item => 
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by distance
    results = results.filter(item => {
      const itemDistance = parseFloat(item.distance.split(" ")[0]);
      return itemDistance <= maxDistance[0];
    });
    
    setFilteredItems(results);
  };

  const handleRequestFood = (id: string) => {
    const food = allFoodItems.find(item => item.id === id);
    
    if (food) {
      toast({
        title: "Food Request Sent!",
        description: `You've requested ${food.title}. The donor will be notified.`,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <div className="food-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Available Food Listings
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Browse and request available food donations in your area
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search by food name, category, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button
                  onClick={handleSearch}
                  className="bg-foodBrown-600 hover:bg-foodBrown-700 text-white"
                >
                  Search
                </Button>
              </div>
            </div>
            
            {/* Expanded Filter Options */}
            {showFilters && (
              <div className="mt-4 p-4 border rounded-md bg-white dark:bg-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Maximum Distance</Label>
                    <span className="text-sm text-gray-500">
                      {maxDistance[0]} miles
                    </span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    max={10}
                    step={0.5}
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All Categories");
                      setMaxDistance([5]);
                      setFilteredItems(allFoodItems);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Section */}
          <div className="mb-4">
            <p className="text-gray-500 dark:text-gray-400">
              Showing {filteredItems.length} results
            </p>
          </div>
          
          {/* Food Listings Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onRequest={handleRequestFood}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No food listings found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search criteria or check back later for new listings
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FoodListings;
