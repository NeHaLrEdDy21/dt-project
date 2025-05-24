import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, Info, AlertCircle } from "lucide-react";
import { api } from '@/utils/api';

const foodCategories = [
  "Vegetables",
  "Fruits",
  "Bakery",
  "Prepared Meal",
  "Cooked Food",
  "Dairy",
  "Canned Goods",
  "Dry Goods",
  "Other"
];

const ListFood = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [expiry, setExpiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Unauthorized',
          description: 'Please log in to list food.',
          variant: 'destructive',
        });
        return;
      }

      // Validate that quantity is a valid positive number
      const quantityAsNumber = Number(quantity);
      if (isNaN(quantityAsNumber) || quantityAsNumber <= 0) {
        toast({
          title: 'Invalid Quantity',
          description: 'Quantity must be a valid positive number.',
          variant: 'destructive',
        });
        return;
      }
      await api.createFoodListing({
        title,
        description,
        category,
        quantity: quantityAsNumber, // Pass as number
        location,
        expiry,
      });

      toast({
        title: 'Food successfully listed!',
        description: 'Your donation has been posted.',
      });
      // Reset form
      setTitle('');
      setCategory('');
      setQuantity(''); // Reset quantity to empty string
      setDescription('');
      setLocation('');
      setExpiry('');
      setExpiry('');

      navigate('/food-listings');
    } catch (error) {
      console.error('Food listing error:', error);
      toast({
        title: 'Error listing food',
        description: error.response?.data?.message || 'Failed to create food listing. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate a random distance (for demonstration purposes)
  const generateRandomDistance = (): string => {
    const distance = (Math.random() * 5).toFixed(1);
    return `${distance} miles`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <div className="food-container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              List Surplus Food
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Share your surplus food with those in need by listing it on our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form Column */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Food Title</Label>
                      <Input
                        id="title"
                        placeholder="E.g. Fresh Vegetables Assortment"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={category}
                          onValueChange={setCategory}
                          required
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {foodCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number" // Ensure the input only accepts numbers
                          placeholder="E.g. 5 (in kg or portions)"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)} // Keep quantity as string for state
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide more details about the food, condition, etc."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          className="pl-10"
                          placeholder="E.g. 123 Main St, City"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Available Until</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="expiry"
                          className="pl-10"
                          placeholder="E.g. Today 8PM or 3 days"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-foodBrown-600 hover:bg-foodBrown-700 text-white"
                    >
                      {isSubmitting ? "Listing Food..." : "List Food Donation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Info Column */}
            <div>
              <div className="space-y-4">
                <Card className="bg-foodBrown-50 dark:bg-foodBrown-900/20 border-foodBrown-200 dark:border-foodBrown-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-foodBrown-600 dark:text-foodBrown-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          Listing Guidelines
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc pl-4">
                          <li>Be specific about the food items and quantities</li>
                          <li>Include pickup time windows when possible</li>
                          <li>Only list food that is still safe to consume</li>
                          <li>Mention any allergens or dietary considerations</li>
                          <li>Provide accurate location details for pickup</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          Food Safety
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Only donate food that you would feel comfortable eating yourself.
                          Ensure proper storage and handling before donation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Your Impact
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Every food donation helps reduce waste and feed those in need in your community.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Food saved:</span>
                      <span className="font-medium text-gray-900 dark:text-white">0 kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Donations made:</span>
                      <span className="font-medium text-gray-900 dark:text-white">0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">People helped:</span>
                      <span className="font-medium text-gray-900 dark:text-white">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListFood;
