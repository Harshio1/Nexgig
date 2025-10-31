import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Calendar, User, DollarSign, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentFormProps {
  amount: number;
  description: string;
  onPaymentSuccess?: (paymentData: PaymentData) => void;
  className?: string;
}

interface PaymentData {
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId: string;
}

export const PaymentForm = ({ amount, description, onPaymentSuccess, className = "" }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Basic validation
    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
        toast({
          title: "Error",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      const paymentData: PaymentData = {
        amount,
        currency: "USD",
        paymentMethod,
        transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
      };

      toast({
        title: "Payment Successful",
        description: `Payment of $${amount} has been processed successfully`,
      });

      onPaymentSuccess?.(paymentData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.substr(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + "/" + cleaned.substr(2, 2);
    }
    return cleaned;
  };

  return (
    <Card className={`shadow-elegant ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lock className="h-5 w-5 text-primary" />
          Secure Payment
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Complete your payment securely. All transactions are encrypted.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="p-4 bg-card/50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-foreground">Payment Summary</span>
            <Badge variant="default" className="bg-primary">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground flex items-center gap-1">
              <DollarSign className="h-5 w-5" />
              {amount.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Payment Method</Label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Button
              type="button"
              variant={paymentMethod === "card" ? "default" : "outline"}
              className={`p-4 h-auto flex flex-col items-center gap-2 ${
                paymentMethod === "card" ? "shadow-glow" : ""
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <CreditCard className="h-6 w-6" />
              <span className="text-xs">Card</span>
            </Button>
            <Button
              type="button"
              variant={paymentMethod === "paypal" ? "default" : "outline"}
              className={`p-4 h-auto flex flex-col items-center gap-2 ${
                paymentMethod === "paypal" ? "shadow-glow" : ""
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              <div className="h-6 w-6 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
                PP
              </div>
              <span className="text-xs">PayPal</span>
            </Button>
            <Button
              type="button"
              variant={paymentMethod === "stripe" ? "default" : "outline"}
              className={`p-4 h-auto flex flex-col items-center gap-2 ${
                paymentMethod === "stripe" ? "shadow-glow" : ""
              }`}
              onClick={() => setPaymentMethod("stripe")}
            >
              <div className="h-6 w-6 bg-purple-600 rounded text-white flex items-center justify-center text-xs font-bold">
                S
              </div>
              <span className="text-xs">Stripe</span>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentMethod === "card" && (
            <>
              {/* Card Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                      className="pl-10 transition-all duration-200 focus:shadow-glow"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-foreground">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                        className="pl-10 transition-all duration-200 focus:shadow-glow"
                        maxLength={5}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").substr(0, 4))}
                      className="transition-all duration-200 focus:shadow-glow"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-foreground">Cardholder Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value)}
                      className="pl-10 transition-all duration-200 focus:shadow-glow"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Billing Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Billing Information</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="transition-all duration-200 focus:shadow-glow"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-foreground">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="transition-all duration-200 focus:shadow-glow"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-foreground">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="transition-all duration-200 focus:shadow-glow"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-foreground">Country</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="transition-all duration-200 focus:shadow-glow">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {paymentMethod === "paypal" && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-muted-foreground mb-4">
                You'll be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          )}

          {paymentMethod === "stripe" && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💳</div>
              <p className="text-muted-foreground mb-4">
                You'll be redirected to Stripe Checkout to complete your payment securely.
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 text-lg shadow-glow hover:shadow-hover transition-all duration-300"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                Processing Payment...
              </div>
            ) : (
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Pay ${amount.toFixed(2)}
              </div>
            )}
          </Button>
        </form>

        {/* Security Notice */}
        <div className="text-center text-xs text-muted-foreground">
          <Lock className="w-3 h-3 inline mr-1" />
          Your payment information is encrypted and secure
        </div>
      </CardContent>
    </Card>
  );
};