import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Check, X, ArrowUpRight, Save } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [myDonations, setMyDonations] = useState<any[]>([]);
  const [myRequests, setMyRequests] = useState<any[]>([]);
  const [editQuantity, setEditQuantity] = useState<{ [key: string]: string | number }>({});
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Load requests and donations from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donations, requests] = await Promise.all([
          api.getFoodDonations(),
          api.getFoodRequests()
        ]);
        setMyDonations(donations);
        setMyRequests(requests);
      } catch (error) {
        toast({
          title: "Error loading dashboard",
          description: "Failed to fetch your data. Please try again.",
          variant: "destructive"
        });
      }
    };

    fetchData();
  }, []);
  
  // Calculate stats for the overview tab
  const activeDonationsCount = myDonations.filter(d => d.status === 'active').length;
  const pendingRequestsCount = myRequests.filter(r => r.status === 'pending').length;
  const totalFoodSaved = myDonations.reduce((total, donation) => {
    // Only count completed donations
    if (donation.status === 'completed') {
      const quantity = typeof donation.foodItem.quantity === 'string' 
        ? parseFloat(donation.foodItem.quantity) || 0 
        : donation.foodItem.quantity;
      return total + quantity;
    }
    return total;
  }, 0);
  
  // Handler for quantity edit
  const handleQuantityChange = (id: string, value: string) => {
    setEditQuantity(prev => ({ ...prev, [id]: value }));
  };
  
  // Save updated quantity
  const handleSaveQuantity = async (id: string) => {
    const newQuantity = parseFloat(String(editQuantity[id]));
    if (isNaN(newQuantity) || newQuantity < 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid number",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.updateFoodListing(id, { quantity: newQuantity });
      
      setMyDonations(prevDonations => 
        prevDonations.map(donation => {
          if (donation.foodItem.id === id) {
            return {
              ...donation,
              foodItem: {
                ...donation.foodItem,
                quantity: newQuantity
              }
            };
          }
          return donation;
        })
      );

      toast({
        title: "Quantity updated",
        description: "Food quantity has been updated successfully",
      });

      setEditQuantity(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    } catch (error) {
      toast({
        title: "Error updating quantity",
        description: "Failed to update food quantity. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getDashboardData(); // Ensure this API method exists
        setData(response);
      } catch (error: any) {
        console.error("Dashboard data loading error:", error);

        const errorMessage =
          error.response?.data?.message || "Failed to load dashboard data.";

        toast({
          title: "Error loading dashboard",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <div className="food-container">
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your food donations and requests
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/list-food">
                <Button className="bg-foodGreen-600 hover:bg-foodGreen-700 text-white">
                  List New Food
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto md:mx-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="requests">My Requests</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Active Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{activeDonationsCount}</div>
                    <p className="text-sm text-gray-500 mt-2">
                      You have {activeDonationsCount} active food donation {activeDonationsCount === 1 ? 'listing' : 'listings'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Pending Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{pendingRequestsCount}</div>
                    <p className="text-sm text-gray-500 mt-2">
                      You have {pendingRequestsCount} pending food {pendingRequestsCount === 1 ? 'request' : 'requests'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Impact Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalFoodSaved}kg</div>
                    <p className="text-sm text-gray-500 mt-2">
                      Total food saved from waste
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {myDonations.length === 0 && myRequests.length === 0 ? (
                      <li className="text-center text-gray-500">
                        No recent activity. Start by listing food or making a request!
                      </li>
                    ) : (
                      <>
                        {myDonations.map((donation, index) => (
                          <li key={`donation-${index}`} className="border-b pb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">
                                  You {donation.status === 'active' ? 'created' : 'completed'} a food donation
                                </p>
                                <p className="text-xs text-gray-500">{donation.foodItem.title}</p>
                              </div>
                              <span className="text-xs text-gray-500">{donation.listedAt}</span>
                            </div>
                          </li>
                        ))}
                        
                        {myRequests.map((request, index) => (
                          <li key={`request-${index}`} className={index < myRequests.length - 1 ? "border-b pb-4" : ""}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">You requested food</p>
                                <p className="text-xs text-gray-500">{request.foodItem.title}</p>
                              </div>
                              <span className="text-xs text-gray-500">{request.requestedAt}</span>
                            </div>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Donations Tab */}
            <TabsContent value="donations">
              <h2 className="text-xl font-bold mb-4">My Food Donations</h2>
              {myDonations.length > 0 ? (
                <div className="space-y-4">
                  {myDonations.map((donation) => (
                    <Card key={donation.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium mr-2">{donation.foodItem.title}</h3>
                              <Badge 
                                variant={donation.status === "active" ? "default" : "secondary"}
                                className={
                                  donation.status === "active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                                }
                              >
                                {donation.status === "active" ? "Active" : "Completed"}
                              </Badge>
                            </div>
                            
                            {/* Editable quantity */}
                            <div className="flex items-center">
                              <p className="text-sm text-gray-500 mr-2">Quantity:</p>
                              {editQuantity[donation.foodItem.id] !== undefined ? (
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    value={editQuantity[donation.foodItem.id]}
                                    onChange={(e) => handleQuantityChange(donation.foodItem.id, e.target.value)}
                                    className="w-24 mr-2"
                                    min="0"
                                    step="0.1"
                                  />
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleSaveQuantity(donation.foodItem.id)}
                                    className="flex items-center"
                                  >
                                    <Save className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <span className="text-sm mr-2">
                                    {typeof donation.foodItem.quantity === 'number' 
                                      ? donation.foodItem.quantity 
                                      : parseFloat(donation.foodItem.quantity) || 0}
                                  </span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => setEditQuantity({
                                      ...editQuantity,
                                      [donation.foodItem.id]: donation.foodItem.quantity
                                    })}
                                  >
                                    Edit
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{donation.foodItem.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Available until: {donation.foodItem.expiry}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex flex-col items-end">
                            <div className="text-sm font-medium mb-2">
                              {donation.requests} request{donation.requests !== 1 && 's'}
                            </div>
                            <div className="space-x-2">
                              {donation.status === "active" ? (
                                <Button size="sm" variant="outline">
                                  View Requests
                                </Button>
                              ) : (
                                <Button size="sm" variant="secondary" disabled>
                                  Completed
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500 mb-4">You haven't listed any food donations yet</p>
                    <Link to="/list-food">
                      <Button>List Food Item</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Requests Tab */}
            <TabsContent value="requests">
              <h2 className="text-xl font-bold mb-4">My Food Requests</h2>
              {myRequests.length > 0 ? (
                <div className="space-y-4">
                  {myRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium mr-2">{request.foodItem.title}</h3>
                              <Badge
                                className={
                                  request.status === "approved"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                                    : request.status === "rejected"
                                    ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300"
                                }
                              >
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback>{request.foodItem.location[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{request.foodItem.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{request.foodItem.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Requested: {request.requestedAt}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex flex-col items-end">
                            {request.status === "approved" ? (
                              <div className="flex items-center text-green-600 mb-2">
                                <Check className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium">Approved</span>
                              </div>
                            ) : request.status === "rejected" ? (
                              <div className="flex items-center text-red-600 mb-2">
                                <X className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium">Rejected</span>
                              </div>
                            ) : (
                              <div className="text-sm font-medium text-yellow-600 mb-2">
                                Awaiting response
                              </div>
                            )}
                            
                            <Button size="sm" className="flex items-center gap-1">
                              Details
                              <ArrowUpRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500 mb-4">You haven't requested any food items yet</p>
                    <Link to="/food-listings">
                      <Button>Browse Food Listings</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
