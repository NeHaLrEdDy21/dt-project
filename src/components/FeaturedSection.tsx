import { Apple, Clock, MapPin, Users } from "lucide-react";
const features = [{
  name: 'Quick Food Listing',
  description: 'List surplus food items quickly with just a few clicks, providing all the necessary details.',
  icon: Apple,
  color: 'bg-foodBrown-100 text-foodBrown-600'
}, {
  name: 'Location-Based Matching',
  description: 'Our smart matching algorithm connects recipients to the nearest donors, minimizing transportation time.',
  icon: MapPin,
  color: 'bg-foodOrange-100 text-foodOrange-600'
}, {
  name: 'Real-time Tracking',
  description: 'Track the status of food donations in real-time, from listing to pickup to delivery.',
  icon: Clock,
  color: 'bg-blue-100 text-blue-600'
}, {
  name: 'Community Building',
  description: 'Join a growing community of donors and beneficiaries working together to reduce food waste.',
  icon: Users,
  color: 'bg-purple-100 text-purple-600'
}];
const stats = [{
  id: 1,
  name: 'Food Donations',
  value: '2,500+'
}, {
  id: 2,
  name: 'Registered Users',
  value: '500+'
}, {
  id: 3,
  name: 'Meals Saved',
  value: '10,000+'
}, {
  id: 4,
  name: 'Cities Covered',
  value: '25+'
}];
const FeaturedSection = () => {
  return <div className="py-16 sm:py-24">
      <div className="food-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            How FoodBridge Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Our platform makes it easy to donate surplus food and connect with those who need it most.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(feature => <div key={feature.name} className="relative">
              <div>
                <div className={`absolute flex h-12 w-12 items-center justify-center rounded-md ${feature.color}`}>
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg font-medium text-gray-900 dark:text-gray-100">{feature.name}</p>
              </div>
              <div className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                {feature.description}
              </div>
            </div>)}
        </div>

        {/* Stats */}
        <div className="mt-24">
          
        </div>
      </div>
    </div>;
};
export default FeaturedSection;