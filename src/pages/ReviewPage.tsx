import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Star, CheckCircle } from "lucide-react";

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock project data (in real app, this would be fetched based on ID)
  const project = {
    id: 1,
    title: "Mobile App UI/UX Design",
    freelancer: {
      name: "Mike Chen",
      avatar: "/placeholder.svg",
      specialization: "UI/UX Designer"
    },
    completedDate: "2024-01-20",
    budget: "$1,800",
    duration: "4 weeks"
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }
    
    // Submit review logic here
    console.log("Review submitted:", { rating, feedback });
    setIsSubmitted(true);
    
    // Redirect after a delay
    setTimeout(() => {
      navigate("/client-dashboard");
    }, 3000);
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "Select a rating";
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md shadow-card animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Thanks for your feedback!
              </h2>
              <p className="text-muted-foreground">
                Your review has been submitted successfully.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm font-medium">{getRatingText(rating)}</div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Redirecting to your dashboard...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              FreelanceNest
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/client-dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          to="/client-dashboard" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Review Form */}
        <Card className="shadow-card animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Rate & Review</CardTitle>
            <CardDescription>
              Share your experience working with {project.freelancer.name}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Project Info */}
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={project.freelancer.avatar} />
                  <AvatarFallback>{project.freelancer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{project.freelancer.name}</h3>
                  <p className="text-muted-foreground">{project.freelancer.specialization}</p>
                </div>
              </div>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground">Project</div>
                  <div className="font-medium text-foreground">{project.title}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Budget</div>
                  <div className="font-medium text-foreground">{project.budget}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium text-foreground">{project.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                  <div className="font-medium text-foreground">{project.completedDate}</div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg font-medium text-foreground mb-4">
                  How would you rate this freelancer?
                </h4>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-all duration-200 hover:scale-110"
                    >
                      <Star
                        className={`h-10 w-10 cursor-pointer transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                
                <p className="text-lg font-medium text-foreground">
                  {getRatingText(hoverRating || rating)}
                </p>
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium text-foreground">
                  Share your experience (optional)
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Tell other clients about your experience working with this freelancer..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Your review will help other clients make informed decisions
                </p>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-8 py-3 text-lg shadow-glow hover:shadow-hover transition-all duration-300"
                  disabled={rating === 0}
                >
                  Submit Review
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewPage;