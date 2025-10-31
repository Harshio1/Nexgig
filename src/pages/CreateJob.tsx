import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiCreateJob } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateJob = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => apiCreateJob({ title, budget: Number(budget), description }),
    onSuccess: () => {
      toast({ title: "Job posted", description: "Your job has been published successfully." });
      navigate("/client-dashboard");
    },
    onError: () => {
      toast({ title: "Failed to post job", description: "Please try again.", variant: "destructive" });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/client-dashboard" className="text-2xl font-bold text-primary">
                
                  
                  Client
               
              </Link>
            </div>
            <Link to="/" className="text-2xl font-bold text-primary">
              NextGig
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/client-dashboard">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Client Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Post a New Job</CardTitle>
            <CardDescription>Describe your project and set a budget</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (number)</Label>
                <Input id="budget" type="number"  value={budget} onChange={(e) => setBudget(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" className="min-h-[160px]" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="flex justify-end gap-2">
                <Link to="/client-dashboard">
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isPending}>{isPending ? 'Posting…' : 'Post Job'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateJob;


