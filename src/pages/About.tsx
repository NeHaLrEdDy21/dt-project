
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foodBrown-600 mb-8">About FoodBridge</h1>
          
          <div className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-foodBrown-700 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              FoodBridge is dedicated to reducing food waste and addressing hunger by connecting food donors 
              with beneficiaries through an efficient digital platform. We believe that every person deserves 
              access to nutritious food and that surplus food should nourish people, not landfills.
            </p>
            <p className="text-gray-700">
              By leveraging technology, we aim to create a systematic ecosystem where surplus food reaches 
              those who need it most, fostering generosity, responsibility, and environmental consciousness 
              throughout our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-foodBrown-600 mb-3">For Donors</h2>
              <p className="text-gray-700">
                FoodBridge makes it easy for restaurants, hotels, event organizers, and individuals to donate 
                surplus food. Our platform allows you to quickly list available food with details on quantity, 
                type, and pickup timing. Your generous contributions help reduce waste and support those in need.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-foodOrange-500 mb-3">For Beneficiaries</h2>
              <p className="text-gray-700">
                Charitable organizations, community kitchens, and individuals in need can browse available 
                food listings or request specific items. Our smart matching algorithms connect recipients with 
                nearby donors, minimizing transportation time and costs for perishable goods.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-foodBrown-700 mb-4">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-foodBrown-500 mb-2">10,000+</div>
                <div className="text-gray-600">Meals Shared</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-foodBrown-500 mb-2">500+</div>
                <div className="text-gray-600">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-foodBrown-500 mb-2">300+</div>
                <div className="text-gray-600">Beneficiaries</div>
              </div>
            </div>
            <p className="text-gray-700">
              Join our growing community and be part of the solution to food waste and hunger. 
              Together, we can make a significant difference in our communities and environment.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
