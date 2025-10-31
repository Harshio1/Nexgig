import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign, Clock, MapPin, Star, ArrowLeft, Briefcase, Calendar, Send } from "lucide-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { apiGetJobById, apiPostProposal } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const JobDetails = () => {
  const { id } = useParams();
  const jobId = Number(id);
  const isValidJobId = !isNaN(jobId) && Number.isFinite(jobId);
  const [proposalData, setProposalData] = useState({ coverLetter: "", expectedRate: "", timeline: "", additionalDetails: "" });

  const { data, isLoading } = useQuery({ queryKey: ["job", jobId], queryFn: () => apiGetJobById(jobId), enabled: isValidJobId });
  const job = data?.job;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProposalData({ ...proposalData, [e.target.name]: e.target.value });
  };
  
  const { mutate: submitProposal, isPending: isSubmitting } = useMutation({
    mutationFn: (data: { coverLetter: string, expectedRate: string, timeline: string, additionalDetails: string }) => 
      apiPostProposal(jobId, data),
    onSuccess: () => {
      toast({ title: "Proposal submitted successfully" });
      // Reset form
      setProposalData({ coverLetter: "", expectedRate: "", timeline: "", additionalDetails: "" });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
    },
    onError: (error) => {
      toast({ 
        title: "Failed to submit proposal", 
        description: error.message || "Please try again",
        variant: "destructive" 
      });
    }
  });

  const handleSubmitProposal = (e: React.FormEvent) => { 
    e.preventDefault(); 
    submitProposal(proposalData);
  };

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-muted-foreground">Loading job…</div></div>;
  if (!job) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="shadow-card p-8 text-center">
        <CardTitle className="mb-2">Job not found</CardTitle>
        <CardDescription>The job you’re looking for doesn’t exist or was removed.</CardDescription>
        <div className="mt-6"><Link to="/jobs"><Button variant="outline">Back to Jobs</Button></Link></div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">FreelanceNest</Link>
            <div className="flex items-center space-x-4">
              <Link to="/jobs"><Button variant="outline">Back to Jobs</Button></Link>
              <Link to="/freelancer-dashboard"><Button variant="outline">Dashboard</Button></Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/jobs" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Back to Job Listings</Link>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{job.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center"><DollarSign className="mr-1 h-4 w-4" />${Number(job.budget).toLocaleString()}</div>
                  <div className="flex items-center"><Clock className="mr-1 h-4 w-4" />{job.created_at ? new Date(job.created_at).toLocaleString() : ""}</div>
                  <div className="flex items-center"><Briefcase className="mr-1 h-4 w-4" />Fixed Price</div>
                  <div className="flex items-center"><Calendar className="mr-1 h-4 w-4" />Posted {job.created_at ? new Date(job.created_at).toLocaleDateString() : ""}</div>
                </div>
              </CardHeader>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap leading-relaxed">{job.description}</div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle>Project Details</CardTitle></CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div><div className="text-sm text-muted-foreground">Project Type</div><div className="font-medium">Fixed Price</div></div>
                  <div><div className="text-sm text-muted-foreground">Experience Level</div><div className="font-medium">—</div></div>
                  <div><div className="text-sm text-muted-foreground">Proposals</div><div className="font-medium">—</div></div>
                  <div><div className="text-sm text-muted-foreground">Location</div><div className="font-medium flex items-center"><MapPin className="mr-1 h-4 w-4" />Remote</div></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle>About the Client</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12"><AvatarImage src={'/placeholder.svg'} /><AvatarFallback>C</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">Client</div>
                    <div className="flex items-center text-sm text-muted-foreground"><Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />4.8 (— reviews)</div>
                    <div className="text-sm text-muted-foreground">Member since —</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Total Spent</span><span className="text-sm font-medium">—</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Jobs Posted</span><span className="text-sm font-medium">—</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Hire Rate</span><span className="text-sm font-medium">—</span></div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Submit a Proposal</CardTitle>
                <CardDescription>Stand out with a compelling proposal</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProposal} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea id="coverLetter" name="coverLetter" placeholder="Describe your approach to this project..." value={proposalData.coverLetter} onChange={handleInputChange} className="min-h-[120px]" required />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor="expectedRate">Your Rate</Label><Input id="expectedRate" name="expectedRate" placeholder="$3,000" value={proposalData.expectedRate} onChange={handleInputChange} required /></div>
                    <div className="space-y-2"><Label htmlFor="timeline">Timeline</Label><Input id="timeline" name="timeline" placeholder="6 weeks" value={proposalData.timeline} onChange={handleInputChange} required /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="additionalDetails">Additional Details</Label><Textarea id="additionalDetails" name="additionalDetails" placeholder="Any questions or additional information..." value={proposalData.additionalDetails} onChange={handleInputChange} className="min-h-[80px]" /></div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : <><Send className="mr-2 h-4 w-4" />Submit Proposal</>}</Button>
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

