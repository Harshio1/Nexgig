import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DollarSign, 
  Clock, 
  MapPin, 
  Star, 
  ArrowLeft, 
  Briefcase, 
  Calendar,
  Send
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const [proposalData, setProposalData] = useState({
    coverLetter: "",
    expectedRate: "",
    timeline: "",
    additionalQuestions: ""
  });

  // Mock job data (in real app, this would be fetched based on ID)
  const job = {
    id: 1,
    title: "Full-Stack Web Application Development",
    budget: "$2,500 - $5,000",
    description: `We are looking for an experienced full-stack developer to build a modern web application for our growing business. The project involves creating a comprehensive platform that will serve as the backbone for our operations.

**Key Requirements:**
- Build a responsive web application using React and Node.js
- Implement user authentication and authorization
- Create a robust API with proper documentation
- Integrate with third-party payment systems
- Develop an admin dashboard for content management
- Ensure mobile responsiveness and cross-browser compatibility
- Write comprehensive tests and documentation

**What We're Looking For:**
- 3+ years of experience with React and Node.js
- Strong understanding of database design (MongoDB preferred)
- Experience with modern development tools and practices
- Knowledge of cloud deployment (AWS, Heroku, etc.)
- Excellent communication skills
- Portfolio showcasing similar projects

**Project Timeline:**
The project should be completed within 2-3 months, with regular milestone deliveries.

**Additional Notes:**
We value quality over speed and are looking for a long-term partnership. This project has potential for ongoing work and maintenance contracts.`,
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "REST API"],
    client: {
      name: "TechCorp Inc.",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 23,
      location: "San Francisco, CA",
      memberSince: "2019",
      totalSpent: "$45,000+",
      jobsPosted: 18,
      hireRate: "85%"
    },
    postedTime: "2 hours ago",
    proposals: 8,
    timeframe: "1-3 months",
    projectType: "Fixed Price",
    experienceLevel: "Intermediate"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProposalData({
      ...proposalData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle proposal submission
    console.log("Proposal submitted:", proposalData);
    // Show success message or redirect
  };

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
              <Link to="/jobs">
                <Button variant="outline">Back to Jobs</Button>
              </Link>
              <Link to="/freelancer-dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/jobs" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Job Listings
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{job.title}</CardTitle>
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
                    <Briefcase className="mr-1 h-4 w-4" />
                    {job.projectType}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Posted {job.postedTime}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Project Type</div>
                    <div className="font-medium">{job.projectType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Experience Level</div>
                    <div className="font-medium">{job.experienceLevel}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Proposals</div>
                    <div className="font-medium">{job.proposals} submitted</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.client.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={job.client.avatar} />
                    <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{job.client.name}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {job.client.rating} ({job.client.reviews} reviews)
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Member since {job.client.memberSince}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Spent</span>
                    <span className="text-sm font-medium">{job.client.totalSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Jobs Posted</span>
                    <span className="text-sm font-medium">{job.client.jobsPosted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hire Rate</span>
                    <span className="text-sm font-medium">{job.client.hireRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Proposal */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Submit a Proposal</CardTitle>
                <CardDescription>
                  Stand out with a compelling proposal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProposal} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      placeholder="Describe your approach to this project..."
                      value={proposalData.coverLetter}
                      onChange={handleInputChange}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expectedRate">Your Rate</Label>
                      <Input
                        id="expectedRate"
                        name="expectedRate"
                        placeholder="$3,000"
                        value={proposalData.expectedRate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Input
                        id="timeline"
                        name="timeline"
                        placeholder="6 weeks"
                        value={proposalData.timeline}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalQuestions">Additional Details</Label>
                    <Textarea
                      id="additionalQuestions"
                      name="additionalQuestions"
                      placeholder="Any questions or additional information..."
                      value={proposalData.additionalQuestions}
                      onChange={handleInputChange}
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Proposal
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;