import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  MessageCircle, 
  TrendingUp,
  DollarSign,
  Clock,
  Star
} from "lucide-react";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = [
    { label: "Active Jobs", value: "5", icon: TrendingUp, color: "text-primary" },
    { label: "Total Spent", value: "$12,450", icon: DollarSign, color: "text-success" },
    { label: "Active Proposals", value: "23", icon: Users, color: "text-info" },
    { label: "Avg. Response Time", value: "2.4h", icon: Clock, color: "text-warning" }
  ];

  const jobs = [
    {
      id: 1,
      title: "Full-Stack Web Application Development",
      status: "Active",
      budget: "$2,500 - $5,000",
      proposals: 8,
      postedDate: "2024-01-15",
      deadline: "2024-04-15"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      status: "In Progress",
      budget: "$1,200 - $2,000",
      proposals: 12,
      postedDate: "2024-01-10",
      deadline: "2024-03-10"
    },
    {
      id: 3,
      title: "E-commerce Website Development",
      status: "Completed",
      budget: "$3,000 - $7,000",
      proposals: 6,
      postedDate: "2023-12-01",
      deadline: "2024-02-01"
    },
    {
      id: 4,
      title: "Content Writing for Tech Blog",
      status: "Draft",
      budget: "$500 - $1,000",
      proposals: 0,
      postedDate: "2024-01-20",
      deadline: "2024-03-20"
    }
  ];

  const recentMessages = [
    {
      id: 1,
      freelancer: "Sarah Johnson",
      project: "Web Application Development",
      lastMessage: "I've completed the user authentication module...",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      freelancer: "Mike Chen",
      project: "Mobile App Design",
      lastMessage: "Here are the latest wireframes for review",
      time: "5 hours ago",
      unread: false
    },
    {
      id: 3,
      freelancer: "Emma Davis",
      project: "E-commerce Website",
      lastMessage: "The payment integration is now live",
      time: "1 day ago",
      unread: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-primary";
      case "In Progress": return "bg-info";
      case "Completed": return "bg-success";
      case "Draft": return "bg-warning";
      default: return "bg-muted";
    }
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Client Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your projects and track progress
            </p>
          </div>
          <Button className="mt-4 sm:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
              {/* Recent Jobs */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                  <CardDescription>Your latest job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{job.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {job.proposals} proposals • {job.budget}
                          </div>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Messages */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.slice(0, 3).map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-foreground">{message.freelancer}</div>
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

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>All Jobs</CardTitle>
                <CardDescription>Manage your job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="border">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-foreground">{job.title}</h3>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  Budget: {job.budget} • Posted: {job.postedDate}
                                </div>
                                <div className="mt-2 flex items-center space-x-4">
                                  <Badge className={getStatusColor(job.status)}>
                                    {job.status}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {job.proposals} proposals
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>All your conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <Card key={message.id} className="border hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-foreground">{message.freelancer}</div>
                              <div className="text-xs text-muted-foreground">{message.time}</div>
                            </div>
                            <div className="text-sm text-muted-foreground mb-1">{message.project}</div>
                            <div className="text-sm text-foreground">{message.lastMessage}</div>
                          </div>
                          {message.unread && (
                            <div className="ml-4 h-2 w-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <Button variant="outline">Manage Notifications</Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                    <Button variant="outline">Manage Payment Methods</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;