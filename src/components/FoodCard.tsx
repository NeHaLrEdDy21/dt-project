import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/api"; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { saveFoodRequest } from "@/utils/foodListingUtils";

export type FoodItem = {
  id?: string;      // Frontend ID
  _id?: string;     // Backend ID
  title: string;
  category: string;
  quantity: string | number;
  location: string;
  expiry: string;
  distance?: string;
  image?: string;
  description?: string;
  createdAt?: string;
};

interface FoodCardProps {
  food: FoodItem;
  onRequest: (id: string) => void;
}

const FoodCard = ({ food, onRequest }: FoodCardProps) => {
  // Validate props
  if (!food || (!food.id && !food._id)) {
    console.error('FoodCard: Invalid food item data', food);
    return null;
  }

  const {
    id,
    _id,
    title,
    category,
    quantity,
    location,
    expiry,
    distance = 'N/A', // Provide default value
    image,
    description,
  } = food;

  const itemId = id || _id; // Use either id or _id

  const { toast } = useToast();

  const handleRequest = async () => {
    try {
      const response = await api.createFoodRequest({
        foodItemId: itemId || undefined
      });

      console.log('Request response:', response);

      toast({
        title: "Request sent",
        description: "Your food request has been submitted successfully.",
        variant: "success",
      });

      if (onRequest) {
        onRequest(itemId);
      }
    } catch (error: any) {
      console.error("Error requesting food:", error);
      
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit request",
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'fruits':
      case 'vegetables':
        return 'bg-[#e9f0e6] text-[#5a7d2a] hover:bg-[#d8e6d1]';
      case 'prepared meal':
      case 'cooked food':
        return 'bg-[#f5e1c5] text-[#8b5a2b] hover:bg-[#edd6b4]';
      case 'bakery':
      case 'bread':
        return 'bg-[#f3e9d9] text-[#b38b4d] hover:bg-[#e9dbbc]';
      case 'dairy':
        return 'bg-[#e8f0f2] text-[#5b7f96] hover:bg-[#d4e5ea]';
      case 'canned goods':
        return 'bg-[#e9e9e9] text-[#6c6c6c] hover:bg-[#dddddd]';
      default:
        return 'bg-[#e8e3ed] text-[#7d5d8a] hover:bg-[#dcd3e3]';
    }
  };
  
  // Food image collection
  const foodImages = [
    "https://images.unsplash.com/photo-1546793665-c74683f339c1", // Healthy vegetable salad
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445", // Food pantry with fruits
    "https://images.unsplash.com/photo-1490818387583-1baba5e638af", // Fruit basket
    "https://images.unsplash.com/photo-1498579687545-d5a4fffb0a9e", // Fresh vegetables
    "https://images.unsplash.com/photo-1627485937980-221c88ac04f9", // Bread
    "https://images.unsplash.com/photo-1559847844-5315695dadae", // Dairy products
  ];
  
  // Get a random food image if none is provided
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * foodImages.length);
    return foodImages[randomIndex];
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <div className="aspect-w-16 aspect-h-9 relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <img 
            src={getRandomImage()}
            alt={category}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={getCategoryColor(category)}>{category}</Badge>
        </div>
        <CardDescription>Quantity: {quantity}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location} • {distance} away</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>Available until: {expiry}</span>
          </div>
        </div>
        {description && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleRequest} // Remove the parameter here
          className="w-full bg-[#8b5a2b] hover:bg-[#6d4726] text-white"
        >
          Request Food
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
