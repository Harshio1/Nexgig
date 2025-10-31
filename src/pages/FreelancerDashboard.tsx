import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Award,
  Eye,
  User
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGetMyProposals, apiGetPublicJobs } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  // Stats DB-backed for new freelancers: all zeros
  const stats = [
    { label: "Active Projects", value: "0", icon: TrendingUp, color: "text-primary" },
    { label: "Total Earnings", value: "$0", icon: DollarSign, color: "text-success" },
    { label: "Success Rate", value: "0%", icon: Star, color: "text-info" },
    { label: "Avg. Response", value: "0h", icon: Clock, color: "text-warning" }
  ];

  // Proposals from real DB, empty for new users
  const { data: proposalsResp } = useQuery({ queryKey: ['my-proposals'], queryFn: apiGetMyProposals });
  const proposals = proposalsResp?.proposals ?? [];

  // Fetch public jobs for freelancers
  const { data: jobsData, error: jobsError, isLoading: jobsLoading } = useQuery({ 
    queryKey: ['public-jobs'], 
    queryFn: apiGetPublicJobs
  });
  const jobs = jobsData?.jobs ?? [];

  useEffect(() => {
    if (jobsError) {
      console.error('Error fetching public jobs:', jobsError);
    }
  }, [jobsError]);

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
              <Button variant="outline" onClick={() => setActiveTab("jobs")}>
                <Search className="mr-2 h-4 w-4" />
                Find Work
              </Button>
              <Link to="/chat">
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{user?.name || user?.email}</span>
              </div>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="proposals">My Proposals</TabsTrigger>
            <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
            <TabsTrigger value="active">Active Jobs</TabsTrigger>
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

            {/* Announcements or onboarding content can go here for new freelancers */}
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
                  {proposals.length === 0 && <div className="text-muted-foreground">You haven’t submitted any proposals yet.</div>}
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
                                    Rate: {proposal.expected_rate} • Status: <Badge className={getStatusColor(proposal.status)}><StatusIcon className="mr-1 h-3 w-3" />{proposal.status}</Badge>
                                  </div>
                                  <div className="mt-2 text-sm text-muted-foreground">Submitted: {proposal.submitted_at ? new Date(proposal.submitted_at).toLocaleDateString() : "—"}</div>
                                  <div className="mt-2 text-sm text-foreground whitespace-pre-wrap">{proposal.cover_letter}</div>
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

          {/* Available Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Available Jobs</CardTitle>
                <CardDescription>Browse jobs posted by clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobsLoading && <div className="text-muted-foreground">Loading jobs...</div>}
                  {!jobsLoading && jobs.length === 0 && <div className="text-muted-foreground">No jobs available at the moment.</div>}
                  {!jobsLoading && jobs.map((job: any) => (
                    <Card key={job.id} className="border">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-foreground">{job.title}</h3>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  Budget: ${job.budget} • Posted: {job.created_at ? new Date(job.created_at).toLocaleDateString() : "—"}
                                </div>
                                <div className="mt-2 text-sm text-foreground whitespace-pre-wrap">
                                  {job.description.substring(0, 150)}{job.description.length > 150 ? "..." : ""}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-0 flex space-x-2">
                            <Link to={`/jobs/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Jobs Tab - not yet assigned/active, so empty for new users */}
          <TabsContent value="active" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Active Jobs</CardTitle>
                <CardDescription>Projects you’re currently working on. (Coming soon)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground">No assigned jobs yet.</div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab - placeholder/zeros for now */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card"><CardContent className="p-6"><div className="text-muted-foreground">No earnings yet.</div></CardContent></Card>
              <Card className="shadow-card"><CardContent className="p-6"><div className="text-muted-foreground">No history yet.</div></CardContent></Card>
              <Card className="shadow-card"><CardContent className="p-6"><div className="text-muted-foreground">No payout data yet.</div></CardContent></Card>
              <Card className="shadow-card"><CardContent className="p-6"><div className="text-muted-foreground">No activity yet.</div></CardContent></Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FreelancerDashboard;