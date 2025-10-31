import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Building, CheckCircle, XCircle } from "lucide-react";
import { apiLogin, apiRegister, setAuthToken } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<"freelancer" | "client">("freelancer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    company: ""
  });
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  // Password validation requirements
  const PASSWORD_REQUIREMENTS = [
    { id: "length", label: "At least 8 characters", regex: /^.{8,}$/ },
    { id: "lowercase", label: "One lowercase letter", regex: /[a-z]/ },
    { id: "uppercase", label: "One uppercase letter", regex: /[A-Z]/ },
    { id: "number", label: "One number", regex: /[0-9]/ },
    { id: "special", label: "One special character", regex: /[^a-zA-Z0-9]/ },
  ];

  // Validate password in real-time
  const validatePassword = (password: string) => {
    if (password) {
      const errors = PASSWORD_REQUIREMENTS
        .filter(req => !req.regex.test(password))
        .map(req => req.label);
      setPasswordErrors(errors);
    } else {
      setPasswordErrors([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate password in real-time for signup
    if (name === "password") {
      validatePassword(value);
      if (value) {
        setShowPasswordRequirements(true);
      }
    }
  };

  // Check if a requirement is met
  const isRequirementMet = (id: string) => {
    return !passwordErrors.includes(PASSWORD_REQUIREMENTS.find(req => req.id === id)?.label || "");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const res = await apiLogin({ email: formData.email, password: formData.password, role });
      const userRole = (res.user.role as "freelancer" | "client") || "freelancer";
      setAuthToken(res.token);
      navigate(userRole === "freelancer" ? "/freelancer-dashboard" : "/client-dashboard");
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please check your credentials.";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // Password validation
    const errors = PASSWORD_REQUIREMENTS
      .filter(req => !req.regex.test(formData.password))
      .map(req => req.label);
    
    if (errors.length > 0) {
      toast({
        title: "Password Requirements Not Met",
        description: "Please ensure your password meets all requirements",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      await apiRegister({ email: formData.email, password: formData.password, name, role });
      const res = await apiLogin({ email: formData.email, password: formData.password, role });
      setAuthToken(res.token);
      const userRole = (res.user.role as "freelancer" | "client") || "freelancer";
      navigate(userRole === "freelancer" ? "/freelancer-dashboard" : "/client-dashboard");
    } catch (error: any) {
      // Handle the new error response for existing email with different role
      if (error.message && error.message.includes("You can sign up for")) {
        toast({
          title: "Email Already Registered",
          description: error.message,
          variant: "destructive",
        });
      } else {
        const errorMessage = error.message || "Signup failed. Please try again.";
        toast({
          title: "Signup Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Back to home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold text-primary">
            NextGig
          </Link>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        {/* Role Selector */}
        <Card className="shadow-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">I want to join as</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole("freelancer")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  role === "freelancer"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <User className="h-8 w-8 mx-auto mb-2" />
                <div className="font-medium">Freelancer</div>
                <div className="text-sm text-muted-foreground">Find work & get hired</div>
              </button>
              <button
                onClick={() => setRole("client")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  role === "client"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Building className="h-8 w-8 mx-auto mb-2" />
                <div className="font-medium">Client</div>
                <div className="text-sm text-muted-foreground">Post jobs & hire talent</div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Auth Forms */}
        <Card className="shadow-card">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your credentials to access your {role} dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-primary"
                    />
                    {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                      <p className="text-sm text-red-500">Please enter a valid email address</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-primary"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login as {role === "freelancer" ? "Freelancer" : "Client"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Join NextGig as a {role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {role === "client" && (
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                      <p className="text-sm text-red-500">Please enter a valid email address</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      onFocus={() => setShowPasswordRequirements(true)}
                    />
                    
                    {/* Password requirements */}
                    {showPasswordRequirements && (
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Sign up as {role === "freelancer" ? "Freelancer" : "Client"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default AuthPage;