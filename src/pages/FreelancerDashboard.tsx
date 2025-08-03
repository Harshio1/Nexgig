import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  MessageCircle, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Award
} from "lucide-react";

const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = [
    { label: "Active Projects", value: "3", icon: TrendingUp, color: "text-primary" },
    { label: "Total Earnings", value: "$8,750", icon: DollarSign, color: "text-success" },
    { label: "Success Rate", value: "94%", icon: Star, color: "text-info" },
    { label: "Avg. Response", value: "1.2h", icon: Clock, color: "text-warning" }
  ];

  const proposals = [
    {
      id: 1,
      title: "Full-Stack Web Application Development",
      client: "TechCorp Inc.",
      proposedRate: "$3,500",
      status: "Pending",
      submittedDate: "2024-01-20",
      responseTime: "2 days"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: "StartupXYZ",
      proposedRate: "$1,800",
      status: "Accepted",
      submittedDate: "2024-01-18",
      responseTime: "1 day"
    },
    {
      id: 3,
      title: "E-commerce Website Development",
      client: "RetailMart",
      proposedRate: "$4,200",
      status: "Rejected",
      submittedDate: "2024-01-15",
      responseTime: "3 days"
    },
    {
      id: 4,
      title: "Content Writing for Tech Blog",
      client: "TechBlog Pro",
      proposedRate: "$800",
      status: "Under Review",
      submittedDate: "2024-01-22",
      responseTime: "Pending"
    }
  ];

  const activeJobs = [
    {
      id: 1,
      title: "Mobile App UI/UX Design",
      client: "StartupXYZ",
      budget: "$1,800",
      deadline: "2024-02-28",
      progress: 75,
      status: "In Progress"
    },
    {
      id: 2,
      title: "Brand Identity Design",
      client: "Creative Agency",
      budget: "$1,200",
      deadline: "2024-02-15",
      progress: 90,
      status: "Almost Complete"
    },
    {
      id: 3,
      title: "Python Data Analysis",
      client: "DataCorp",
      budget: "$900",
      deadline: "2024-02-10",
      progress: 60,
      status: "In Progress"
    }
  ];

  const earnings = {
    thisMonth: "$2,450",
    lastMonth: "$3,100",
    thisYear: "$8,750",
    pending: "$1,800"
  };

  const recentMessages = [
    {
      id: 1,
      client: "StartupXYZ",
      project: "Mobile App Design",
      lastMessage: "Great progress on the wireframes!",
      time: "1 hour ago",
      unread: true
    },
    {
      id: 2,
      client: "Creative Agency",
      project: "Brand Identity",
      lastMessage: "Can we schedule a call to discuss revisions?",
      time: "3 hours ago",
      unread: false
    },
    {
      id: 3,
      client: "DataCorp",
      project: "Data Analysis",
      lastMessage: "The preliminary results look excellent",
      time: "1 day ago",
      unread: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-warning";
      case "Under Review": return "bg-info";
      case "Accepted": return "bg-success";
      case "Rejected": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending": return AlertCircle;
      case "Under Review": return Clock;
      case "Accepted": return CheckCircle;
      case "Rejected": return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              NextGig
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/jobs">
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Find Work
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </Link>
              <Button variant="default">Profile</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Freelancer Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Track your projects, proposals, and earnings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="proposals">My Proposals</TabsTrigger>
            <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Active Projects */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Your current work in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeJobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-foreground">{job.title}</div>
                          <div className="text-sm text-muted-foreground">{job.progress}%</div>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{job.client}</span>
                          <span>Due: {job.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Messages */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest client communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.slice(0, 3).map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-foreground">{message.client}</div>
                            <div className="text-xs text-muted-foreground">{message.time}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{message.project}</div>
                          <div className="text-sm text-foreground mt-1">{message.lastMessage}</div>
                        </div>
                        {message.unread && (
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>My Proposals</CardTitle>
                <CardDescription>Track your submitted proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals.map((proposal) => {
                    const StatusIcon = getStatusIcon(proposal.status);
                    return (
                      <Card key={proposal.id} className="border">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium text-foreground">{proposal.title}</h3>
                                  <div className="mt-1 text-sm text-muted-foreground">
                                    Client: {proposal.client} • Rate: {proposal.proposedRate}
                                  </div>
                                  <div className="mt-2 flex items-center space-x-4">
                                    <Badge className={getStatusColor(proposal.status)}>
                                      <StatusIcon className="mr-1 h-3 w-3" />
                                      {proposal.status}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      Submitted: {proposal.submittedDate}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Active Jobs</CardTitle>
                <CardDescription>Projects you're currently working on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeJobs.map((job) => (
                    <Card key={job.id} className="border">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-foreground">{job.title}</h3>
                            <div className="text-sm text-muted-foreground">
                              {job.client} • {job.budget} • Due: {job.deadline}
                            </div>
                          </div>
                          <Badge variant="secondary">{job.status}</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-3" />
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message Client
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-success" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold text-foreground">{earnings.thisMonth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-info" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Last Month</p>
                      <p className="text-2xl font-bold text-foreground">{earnings.lastMonth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">This Year</p>
                      <p className="text-2xl font-bold text-foreground">{earnings.thisYear}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-warning" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-foreground">{earnings.pending}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Earnings History */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>Your payment history and upcoming payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { project: "Mobile App UI/UX Design", client: "StartupXYZ", amount: "$1,800", date: "Jan 15, 2024", status: "Completed" },
                    { project: "Brand Identity Design", client: "Creative Agency", amount: "$1,200", date: "Jan 10, 2024", status: "Completed" },
                    { project: "Python Data Analysis", client: "DataCorp", amount: "$900", date: "Jan 5, 2024", status: "In Progress" },
                    { project: "E-commerce Website", client: "RetailMart", amount: "$4,200", date: "Dec 28, 2023", status: "Completed" },
                    { project: "Content Writing", client: "TechBlog Pro", amount: "$650", date: "Dec 20, 2023", status: "Completed" }
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{payment.project}</div>
                        <div className="text-sm text-muted-foreground">Client: {payment.client}</div>
                        <div className="text-sm text-muted-foreground">Date: {payment.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg text-accent">{payment.amount}</div>
                        <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default FreelancerDashboard;