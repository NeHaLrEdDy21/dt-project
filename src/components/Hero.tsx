
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f4e8] to-white dark:from-gray-900 dark:to-gray-900 z-0" />
      
      <div className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 food-container z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#f5e1c5] text-[#8b5a2b] mb-4">
                Join the movement
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl">
                <span className="block">Connect Food Donors</span>
                <span className="block text-[#8b5a2b]">With Those In Need</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Our platform connects food donors with beneficiaries, reducing waste and fighting hunger.
                Join our community to share surplus food and make a meaningful impact.
              </p>
              <div className="mt-10 sm:mt-12">
                <div className="sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/register">
                      <Button
                        size="lg"
                        className="w-full bg-[#8b5a2b] hover:bg-[#6d4726] text-white"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/food-listings">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-[#a67c52] text-[#8b5a2b] hover:bg-[#f5e1c5]"
                      >
                        Browse Food
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full h-64 sm:h-72 md:h-96 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1546793665-c74683f339c1" 
                  alt="Healthy food bowl with vegetables" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#8b5a2b]/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-medium text-lg drop-shadow-md">
                    Share food, spread joy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
