import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGetJobById, apiGetJobProposals, apiAcceptProposal, apiRejectProposal } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign, Calendar, User, FileText, Clock, Tag, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ClientJobDetails = () => {
  const { id } = useParams();
  const jobId = Number(id);
  const isValidJobId = !isNaN(jobId) && Number.isFinite(jobId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: jobData, isLoading: jobLoading } = useQuery({
    queryKey: ["job", jobId, "client"],
    queryFn: () => apiGetJobById(jobId),
    enabled: isValidJobId,
  });
  
  const { data: proposalsData, isLoading: proposalsLoading } = useQuery({
    queryKey: ["job", jobId, "proposals"],
    queryFn: () => apiGetJobProposals(jobId),
    enabled: isValidJobId,
  });
  
  const job = jobData?.job;
  const proposals = proposalsData?.proposals || [];

  // Accept proposal mutation
  const { mutate: acceptProposal, isPending: isAccepting } = useMutation({
    mutationFn: apiAcceptProposal,
    onSuccess: (_, proposalId) => {
      toast({ title: "Proposal accepted" });
      // Update the local cache
      queryClient.setQueryData(["job", jobId, "proposals"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          proposals: oldData.proposals.map((p: any) => 
            p.id === proposalId ? { ...p, status: "accepted" } : p
          )
        };
      });
    },
    onError: () => {
      toast({ 
        title: "Failed to accept proposal", 
        description: "Please try again",
        variant: "destructive" 
      });
    }
  });

  // Reject proposal mutation
  const { mutate: rejectProposal, isPending: isRejecting } = useMutation({
    mutationFn: apiRejectProposal,
    onSuccess: (_, proposalId) => {
      toast({ title: "Proposal rejected" });
      // Update the local cache
      queryClient.setQueryData(["job", jobId, "proposals"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          proposals: oldData.proposals.map((p: any) => 
            p.id === proposalId ? { ...p, status: "rejected" } : p
          )
        };
      });
    },
    onError: () => {
      toast({ 
        title: "Failed to reject proposal", 
        description: "Please try again",
        variant: "destructive" 
      });
    }
  });

  if (jobLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading job…</div>
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="shadow-card p-8 text-center">
          <CardTitle className="mb-2">Job not found</CardTitle>
          <div className="mt-6">
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          </div>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/client-dashboard" className="text-2xl font-bold text-primary">Client Dashboard</Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate(-1)}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <div className="text-muted-foreground mt-1 flex items-center gap-4">
                  <span className="flex items-center"><DollarSign className="mr-1 h-4 w-4" />${Number(job.budget).toLocaleString()}</span>
                  <span className="flex items-center"><Calendar className="mr-1 h-4 w-4" />{job.created_at ? new Date(job.created_at).toLocaleDateString() : ""}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none whitespace-pre-wrap">{job.description}</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Proposals ({proposals.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {proposalsLoading ? (
                  <div className="text-muted-foreground">Loading proposals...</div>
                ) : proposals.length === 0 ? (
                  <div className="text-muted-foreground">No proposals yet.</div>
                ) : (
                  <div className="space-y-4">
                    {proposals.map((proposal: any) => (
                      <Card key={proposal.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{proposal.freelancer_name || "Freelancer"}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Tag className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Rate: {proposal.expected_rate || "Not specified"}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Timeline: {proposal.timeline || "Not specified"}</span>
                              </div>
                            </div>
                            <Badge variant={
                              proposal.status === "accepted" ? "default" : 
                              proposal.status === "rejected" ? "destructive" : 
                              "secondary"
                            }>
                              {proposal.status === "accepted" ? "Accepted" : 
                               proposal.status === "rejected" ? "Rejected" : 
                               "Pending"}
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">Cover Letter</span>
                            </div>
                            <p className="text-sm mt-1 text-muted-foreground whitespace-pre-wrap">
                              {proposal.cover_letter || "No cover letter provided."}
                            </p>
                          </div>
                          {proposal.additional_details && (
                            <div className="mt-3">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Additional Details</span>
                              </div>
                              <p className="text-sm mt-1 text-muted-foreground whitespace-pre-wrap">
                                {proposal.additional_details}
                              </p>
                            </div>
                          )}
                          {(!proposal.status || proposal.status === "pending") && (
                            <div className="flex gap-2 mt-4">
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => acceptProposal(proposal.id)}
                                disabled={isAccepting || isRejecting}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => rejectProposal(proposal.id)}
                                disabled={isAccepting || isRejecting}
                              >
                                <X className="mr-2 h-4 w-4" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientJobDetails;
