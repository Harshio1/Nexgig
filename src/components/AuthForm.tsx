import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Mail, Lock, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "freelancer" | "client";

interface AuthFormProps {
  onAuthSuccess?: (user: { email: string; role: UserRole }) => void;
}

// Password validation requirements
const PASSWORD_REQUIREMENTS = [
  { id: "length", label: "At least 8 characters", regex: /^.{8,}$/ },
  { id: "lowercase", label: "One lowercase letter", regex: /[a-z]/ },
  { id: "uppercase", label: "One uppercase letter", regex: /[A-Z]/ },
  { id: "number", label: "One number", regex: /[0-9]/ },
  { id: "special", label: "One special character", regex: /[^a-zA-Z0-9]/ },
];

export const AuthForm = ({ onAuthSuccess }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>("freelancer");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const { toast } = useToast();

  // Validate password in real-time
  useEffect(() => {
    if (formData.password) {
      const errors = PASSWORD_REQUIREMENTS
        .filter(req => !req.regex.test(formData.password))
        .map(req => req.label);
      setPasswordErrors(errors);
    } else {
      setPasswordErrors([]);
    }
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Basic validation
    if (!formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Password validation
    if (!isLogin) {
      const errors = PASSWORD_REQUIREMENTS
        .filter(req => !req.regex.test(formData.password))
        .map(req => req.label);
      
      if (errors.length > 0) {
        toast({
          title: "Password Requirements Not Met",
          description: "Please ensure your password meets all requirements",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: isLogin ? "Welcome back!" : "Account created successfully!",
      });
      
      // Simulate successful auth
      onAuthSuccess?.({ email: formData.email, role });
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Show password requirements when user starts typing password
    if (field === "password" && value) {
      setShowPasswordRequirements(true);
    }
  };

  // Check if a requirement is met
  const isRequirementMet = (id: string) => {
    return !passwordErrors.includes(PASSWORD_REQUIREMENTS.find(req => req.id === id)?.label || "");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Welcome to NextGig
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={isLogin ? "login" : "signup"} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="login" 
                onClick={() => setIsLogin(true)}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                onClick={() => setIsLogin(false)}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-foreground mb-3 block">
              I want to {isLogin ? "sign in" : "join"} as a:
            </Label>
            <div className="flex gap-3">
              <Badge
                variant={role === "freelancer" ? "default" : "outline"}
                className={`cursor-pointer p-3 flex-1 justify-center transition-all duration-200 ${
                  role === "freelancer" 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => setRole("freelancer")}
              >
                <User className="w-4 h-4 mr-2" />
                Freelancer
              </Badge>
              <Badge
                variant={role === "client" ? "default" : "outline"}
                className={`cursor-pointer p-3 flex-1 justify-center transition-all duration-200 ${
                  role === "client" 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => setRole("client")}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Client
              </Badge>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="transition-all duration-200 focus:shadow-glow"
                    required={!isLogin}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="transition-all duration-200 focus:shadow-glow"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!isLogin && role === "client" && (
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">Company (Optional)</Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="transition-all duration-200 focus:shadow-glow"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 transition-all duration-200 focus:shadow-glow"
                  required
                />
              </div>
              {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                <p className="text-sm text-red-500">Please enter a valid email address</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 transition-all duration-200 focus:shadow-glow"
                  required
                  onFocus={() => setShowPasswordRequirements(true)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              
              {/* Password requirements */}
              {!isLogin && showPasswordRequirements && (
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium text-foreground mb-2">Password must contain:</p>
                  <ul className="space-y-1">
                    {PASSWORD_REQUIREMENTS.map((req) => (
                      <li key={req.id} className="flex items-center text-sm">
                        {isRequirementMet(req.id) ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={isRequirementMet(req.id) ? "text-green-600" : "text-red-600"}>
                          {req.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 transition-all duration-200 focus:shadow-glow"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full shadow-glow hover:shadow-hover transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <Button variant="link" className="text-primary hover:text-primary/80">
                Forgot your password?
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};