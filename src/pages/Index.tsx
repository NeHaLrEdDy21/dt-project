import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const Index = () => {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <FeaturedSection />
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="food-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
                Making food donations simple and efficient for everyone
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foodBrown-600 text-white mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  List Surplus Food
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Quickly list your surplus food with details like quantity, type, and pickup timing.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foodBrown-600 text-white mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Match with Recipients
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Our system matches donors with nearby recipients to minimize transport time.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foodBrown-600 text-white mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Coordinate & Deliver
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Communicate through our platform to coordinate pickup and delivery details.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/register">
                <Button className="bg-foodBrown-600 hover:bg-foodBrown-700 text-white">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="food-container">
            <div className="bg-foodBrown-600 dark:bg-foodBrown-700 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-16">
                <div className="lg:w-0 lg:flex-1">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Ready to make a difference?
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg text-foodBrown-100">
                    Join our community today and help bridge the gap between food waste and hunger.
                    Every donation makes a difference.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register?type=donor">
                      <Button size="lg" className="w-full sm:w-auto bg-white text-foodBrown-600 hover:bg-foodBrown-50 hover:text-foodBrown-700">
                        Become a Donor
                      </Button>
                    </Link>
                    <Link to="/register?type=beneficiary">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto border-white hover:bg-foodBrown-700 text-white">
                        Register as Beneficiary
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Index;