
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const handleUserClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
      <nav className="food-container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-foodBrown-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-xl font-bold text-foodBrown-700 dark:text-foodBrown-500">
            FoodBridge
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/food-listings" 
            className="text-sm font-medium text-gray-600 hover:text-foodBrown-600 dark:text-gray-300 dark:hover:text-foodBrown-400"
          >
            Browse Food
          </Link>
          <Link 
            to="/list-food" 
            className="text-sm font-medium text-gray-600 hover:text-foodBrown-600 dark:text-gray-300 dark:hover:text-foodBrown-400"
          >
            List Food
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-gray-600 hover:text-foodBrown-600 dark:text-gray-300 dark:hover:text-foodBrown-400"
          >
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div 
              onClick={handleUserClick}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
            >
              <Avatar className="h-8 w-8 border-2 border-foodBrown-200">
                <AvatarFallback className="bg-foodBrown-100 text-foodBrown-700">
                  {user.name ? user.name[0] : user.email[0]}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foodBrown-700 dark:text-foodBrown-300">
                {user.name || user.email.split('@')[0]}
              </span>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="sm" 
                  className="bg-foodBrown-600 hover:bg-foodBrown-700 text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 bg-background border-b">
            <Link 
              to="/food-listings" 
              className="block py-2 px-4 text-base font-medium text-gray-600 hover:bg-foodBrown-50 hover:text-foodBrown-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Food
            </Link>
            <Link 
              to="/list-food" 
              className="block py-2 px-4 text-base font-medium text-gray-600 hover:bg-foodBrown-50 hover:text-foodBrown-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              List Food
            </Link>
            <Link 
              to="/about" 
              className="block py-2 px-4 text-base font-medium text-gray-600 hover:bg-foodBrown-50 hover:text-foodBrown-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            {user ? (
              <div 
                className="block py-2 px-4 text-base font-medium text-gray-600 hover:bg-foodBrown-50 hover:text-foodBrown-600 cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
              >
                Dashboard ({user.name || user.email.split('@')[0]})
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 px-4 text-base font-medium text-gray-600 hover:bg-foodBrown-50 hover:text-foodBrown-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 px-4 text-base font-medium text-gray-600 hover:bg-foodBrown-50 hover:text-foodBrown-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
