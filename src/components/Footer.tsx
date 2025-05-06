
import { Link } from "react-router-dom";
import { Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="food-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-foodBrown-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-foodBrown-700 dark:text-foodBrown-500">
                FoodBridge
              </span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              Connecting food donors with beneficiaries to reduce food waste and address hunger.
              Join our community and make a difference today.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-foodOrange-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-foodOrange-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-foodOrange-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/food-listings" className="text-base text-gray-600 dark:text-gray-400 hover:text-foodBrown-600 dark:hover:text-foodBrown-400">
                  Browse Food
                </Link>
              </li>
              <li>
                <Link to="/list-food" className="text-base text-gray-600 dark:text-gray-400 hover:text-foodBrown-600 dark:hover:text-foodBrown-400">
                  List Food
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-base text-gray-600 dark:text-gray-400 hover:text-foodBrown-600 dark:hover:text-foodBrown-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Account
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/login" className="text-base text-gray-600 dark:text-gray-400 hover:text-foodBrown-600 dark:hover:text-foodBrown-400">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-base text-gray-600 dark:text-gray-400 hover:text-foodBrown-600 dark:hover:text-foodBrown-400">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-base text-gray-600 dark:text-gray-400 hover:text-foodBrown-600 dark:hover:text-foodBrown-400">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} FoodBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
