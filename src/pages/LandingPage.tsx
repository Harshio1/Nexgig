import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MessageCircle, TrendingUp, Star, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-freelance.jpg";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Briefcase,
      title: "Post Jobs",
      description: "Create detailed job postings and find the perfect freelancer for your project."
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Communicate seamlessly with clients and freelancers through our built-in messaging system."
    },
    {
      icon: TrendingUp,
      title: "Track Work Progress",
      description: "Monitor project milestones and deliverables with our comprehensive tracking tools."
    }
  ];

  const stats = [
    { icon: Users, number: "50K+", label: "Active Freelancers" },
    { icon: Briefcase, number: "25K+", label: "Jobs Posted" },
    { icon: Star, number: "4.9", label: "Average Rating" },
    { icon: Shield, number: "100%", label: "Secure Payments" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">
                NextGig
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/jobs" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                  Find Work
                </Link>
                <Link to="/auth" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                  Post a Job
                </Link>
                <Link to="/auth" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                  Login
                </Link>
                <Link to="/auth">
                  <Button variant="default" className="ml-4">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              <Link to="/jobs" className="block px-3 py-2 text-foreground hover:text-primary">
                Find Work
              </Link>
              <Link to="/auth" className="block px-3 py-2 text-foreground hover:text-primary">
                Post a Job
              </Link>
              <Link to="/auth" className="block px-3 py-2 text-foreground hover:text-primary">
                Login
              </Link>
              <Link to="/auth" className="block px-3 py-2">
                <Button variant="default" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Freelancing collaboration"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Find Freelancers.
              <span className="block text-primary">Hire Smarter.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Connect with top-tier freelancers and get your projects done efficiently. 
              From web development to creative design, find the perfect match for your next gig.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/auth">
                <Button size="lg" className="px-8 py-4 text-lg shadow-glow hover:shadow-hover transition-all duration-300">
                  Get Started
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Our platform provides all the tools you need to manage your freelance business
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of freelancers and clients who trust NextGig
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/auth">
              <Button size="lg" className="px-8 py-4 text-lg shadow-glow">
                Join as Freelancer
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Hire Freelancers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              NextGig
            </Link>
            <p className="mt-4 text-muted-foreground">
              © 2024 NextGig. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;