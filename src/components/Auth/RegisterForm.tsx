
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("donor");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation - in a real app you'd have server-side validation
      if (name && email && password) {
        // Store user info in localStorage (just for demo purposes)
        localStorage.setItem('user', JSON.stringify({ name, email, role: accountType }));
        
        toast({
          title: "Account created successfully",
          description: `Welcome to FoodBridge as a ${accountType}!`,
        });
        
        // Redirect to dashboard after registration
        navigate('/dashboard');
      } else {
        toast({
          title: "Registration failed",
          description: "Please fill out all required fields",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Join FoodBridge as a donor or beneficiary to start making a difference
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Password must be at least 8 characters long
            </p>
          </div>
          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup 
              defaultValue="donor" 
              value={accountType} 
              onValueChange={setAccountType} 
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="donor" id="donor" />
                <Label htmlFor="donor" className="font-normal cursor-pointer">
                  Food Donor
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beneficiary" id="beneficiary" />
                <Label htmlFor="beneficiary" className="font-normal cursor-pointer">
                  Beneficiary
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-foodGreen-600 hover:bg-foodGreen-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-foodGreen-600 hover:text-foodGreen-700 dark:text-foodGreen-500 dark:hover:text-foodGreen-400"
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
