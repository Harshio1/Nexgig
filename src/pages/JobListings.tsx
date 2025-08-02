import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, DollarSign, Clock, MapPin, Star } from "lucide-react";

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Full-Stack Web Application Development",
      budget: "$2,500 - $5,000",
      description: "Looking for an experienced developer to build a modern web application using React and Node.js...",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      client: {
        name: "TechCorp Inc.",
        rating: 4.8,
        reviews: 23,
        location: "San Francisco, CA"
      },
      postedTime: "2 hours ago",
      proposals: 8,
      timeframe: "1-3 months"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      budget: "$1,200 - $2,000",
      description: "Need a talented designer to create modern, user-friendly mobile app interfaces...",
      skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
      client: {
        name: "StartupXYZ",
        rating: 4.6,
        reviews: 15,
        location: "New York, NY"
      },
      postedTime: "4 hours ago",
      proposals: 12,
      timeframe: "2-4 weeks"
    },
    {
      id: 3,
      title: "E-commerce Website Development",
      budget: "$3,000 - $7,000",
      description: "Build a complete e-commerce platform with payment integration and admin panel...",
      skills: ["Shopify", "PHP", "MySQL", "Payment Gateway"],
      client: {
        name: "RetailMart",
        rating: 4.9,
        reviews: 41,
        location: "Los Angeles, CA"
      },
      postedTime: "6 hours ago",
      proposals: 6,
      timeframe: "1-2 months"
    },
    {
      id: 4,
      title: "Content Writing for Tech Blog",
      budget: "$500 - $1,000",
      description: "Looking for a technical writer to create engaging blog posts about emerging technologies...",
      skills: ["Content Writing", "SEO", "Tech Writing", "Research"],
      client: {
        name: "TechBlog Pro",
        rating: 4.7,
        reviews: 19,
        location: "Remote"
      },
      postedTime: "1 day ago",
      proposals: 15,
      timeframe: "Ongoing"
    },
    {
      id: 5,
      title: "Brand Identity & Logo Design",
      budget: "$800 - $1,500",
      description: "Create a complete brand identity package including logo, color palette, and style guide...",
      skills: ["Logo Design", "Branding", "Adobe Illustrator", "Style Guide"],
      client: {
        name: "Creative Agency",
        rating: 4.5,
        reviews: 8,
        location: "Chicago, IL"
      },
      postedTime: "2 days ago",
      proposals: 22,
      timeframe: "2-3 weeks"
    },
    {
      id: 6,
      title: "Python Data Analysis Script",
      budget: "$600 - $1,200",
      description: "Develop Python scripts for automated data analysis and reporting from CSV files...",
      skills: ["Python", "Pandas", "Data Analysis", "Automation"],
      client: {
        name: "DataCorp",
        rating: 4.8,
        reviews: 31,
        location: "Boston, MA"
      },
      postedTime: "3 days ago",
      proposals: 9,
      timeframe: "1-2 weeks"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = !skillFilter || job.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );

    return matchesSearch && matchesSkill;
  });

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
              <Link to="/freelancer-dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline">Messages</Button>
              </Link>
              <Button variant="default">Profile</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Find Your Next Project</h1>
          <p className="mt-2 text-muted-foreground">
            Browse through {jobs.length} available opportunities
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Skill category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Skills</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Budgets</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-3000">$1,000 - $3,000</SelectItem>
                  <SelectItem value="3000+">$3,000+</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">
                      <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" />
                        {job.budget}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {job.timeframe}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.client.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{job.postedTime}</div>
                    <div className="text-sm text-muted-foreground">
                      {job.proposals} proposal{job.proposals !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {job.description}
                </CardDescription>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium text-foreground">{job.client.name}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {job.client.rating} ({job.client.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/jobs/${job.id}`}>
                    <Button className="w-full sm:w-auto">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobListings;