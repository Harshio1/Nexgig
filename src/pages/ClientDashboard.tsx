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
  Star,
  User
} from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGetClientOverview, apiGetMyJobs, apiEditJob, apiDeleteJob } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  const { data: overview } = useQuery({ queryKey: ['client-overview'], queryFn: apiGetClientOverview });
  const { data: myJobs } = useQuery({ queryKey: ['my-jobs'], queryFn: apiGetMyJobs });

  const qc = useQueryClient();
  const { toast } = useToast();
  const [editingJob, setEditingJob] = useState<any|null>(null);
  const [showDelete, setShowDelete] = useState<number|null>(null);
  const [editForm, setEditForm] = useState({ title: '', budget: '', description: '' });

  const editMutation = useMutation({
    mutationFn: ({ id, title, budget, description }: any) => apiEditJob(id, { title, budget: Number(budget), description }),
    onSuccess: () => {
      toast({ title: 'Job updated' });
      setEditingJob(null);
      qc.invalidateQueries({ queryKey: ['my-jobs'] });
    },
    onError: () => toast({ title: 'Failed to update job', variant: 'destructive' })
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiDeleteJob(id),
    onSuccess: () => {
      toast({title: 'Job deleted'});
      setShowDelete(null);
      qc.invalidateQueries({ queryKey: ['my-jobs'] });
    },
    onError: () => toast({ title: 'Failed to delete job', variant: 'destructive' })
  });

  const stats = [
    { label: "Active Jobs", value: String(overview?.stats.activeJobs ?? 0), icon: TrendingUp, color: "text-primary" },
    { label: "Total Spent", value: `$${(overview?.stats.totalSpent ?? 0).toLocaleString()}`, icon: DollarSign, color: "text-success" },
    { label: "Active Proposals", value: String(overview?.stats.activeProposals ?? 0), icon: Users, color: "text-info" },
    { label: "Avg. Response Time", value: `${overview?.stats.avgResponseHours ?? 0}h`, icon: Clock, color: "text-warning" }
  ];

  const jobs = (myJobs?.jobs ?? []).map((j: any) => ({
    id: j.id,
    title: j.title,
    status: "Active",
    budget: `$${j.budget.toLocaleString()}`,
    proposals: j.proposal_count || 0,
    postedDate: j.created_at ? new Date(j.created_at).toISOString().slice(0,10) : '',
    deadline: ''
  }));

  const recentMessages = (overview?.recentMessages ?? []).map((m: any, idx: number) => ({
    id: idx + 1,
    freelancer: `Chat #${m.chatId}`,
    project: '',
    lastMessage: m.lastMessage ?? '',
    time: m.time ? new Date(m.time).toLocaleString() : '',
    unread: false
  }));

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
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{user?.name || user?.email}</span>
              </div>
              
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
          <Link to="/jobs/new">
            <Button className="mt-4 sm:mt-0">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            
            
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
                                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                                  <span className="text-sm text-muted-foreground">{job.proposals} proposals</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-0 flex space-x-2">
                            <Link to={`/client-dashboard/jobs/${job.id}`}><Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4" />View</Button></Link>
                            <Button variant="outline" size="sm" onClick={() => { setEditingJob(job); setEditForm({ title: job.title, budget: String(job.budget).replace(/\$/g, '').replace(/,/g, ''), description: '' }); }}><Edit className="mr-2 h-4 w-4" />Edit</Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => setShowDelete(job.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Edit Dialog */}
            <Dialog open={!!editingJob} onOpenChange={() => setEditingJob(null)}>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Job</DialogTitle></DialogHeader>
                <form onSubmit={e => { e.preventDefault(); editMutation.mutate({ id: editingJob.id, ...editForm }); }} className="space-y-4">
                  <div><Label htmlFor="title">Title</Label><Input id="title" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} required /></div>
                  <div><Label htmlFor="budget">Budget</Label><Input id="budget" value={editForm.budget} type="number" min={0} onChange={e => setEditForm(f => ({ ...f, budget: e.target.value }))} required /></div>
                  <div><Label htmlFor="description">Description</Label><Textarea id="description" value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} required /></div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" type="button" onClick={() => setEditingJob(null)}>Cancel</Button>
                    <Button type="submit" disabled={editMutation.isPending}>{editMutation.isPending ? 'Saving...' : 'Save'}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            {/* Delete Confirmation */}
            <Dialog open={!!showDelete} onOpenChange={() => setShowDelete(null)}>
              <DialogContent>
                <DialogHeader><DialogTitle>Delete Job</DialogTitle></DialogHeader>
                <div>Are you sure you want to delete this job? This action cannot be undone.</div>
                <div className="flex gap-2 justify-end mt-4">
                  <Button variant="outline" type="button" onClick={() => setShowDelete(null)}>Cancel</Button>
                  <Button variant="destructive" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(showDelete!)}>{deleteMutation.isPending ? 'Deleting...' : 'Delete'}</Button>
                </div>
              </DialogContent>
            </Dialog>
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