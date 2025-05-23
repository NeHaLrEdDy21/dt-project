
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation - in a real app you'd do proper authentication
      if (email && password) {
        // Extract name from email for display (just for demo purposes)
        const name = email.split('@')[0];
        
        // Store user info in localStorage (just for demo purposes)
        localStorage.setItem('user', JSON.stringify({ email, name, role: 'donor' }));
        
        toast({
          title: "Logged in successfully",
          description: "Welcome back to FoodBridge!",
        });
        
        // Redirect to dashboard after login
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Please check your email and password",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-[#d3c4a9] bg-white">
      <CardHeader className="border-b border-[#f0e6d6]">
        <CardTitle className="text-2xl font-bold text-[#6d4726]">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#d3c4a9] focus-visible:ring-[#8b5a2b]"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#8b5a2b] hover:text-[#6d4726]"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-[#d3c4a9] focus-visible:ring-[#8b5a2b]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-[#f0e6d6] pt-6">
          <Button
            type="submit"
            className="w-full bg-[#8b5a2b] hover:bg-[#6d4726] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
          <div className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#8b5a2b] hover:text-[#6d4726]"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
