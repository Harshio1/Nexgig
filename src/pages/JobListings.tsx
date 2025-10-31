import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, DollarSign, Clock, MapPin, Star } from "lucide-react";
import { SearchFilters } from "@/components/SearchFilters";
import { apiGetPublicJobs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const JobListings = () => {
  const { data } = useQuery({ queryKey: ['public-jobs'], queryFn: apiGetPublicJobs });
  const jobs = data?.jobs ?? [];
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const handleSearch = (filters: any) => {
    const query = (filters.query || '').toLowerCase();
    const results = jobs.filter((j: any) => (j.title?.toLowerCase().includes(query) || j.description?.toLowerCase().includes(query)));
    setFilteredJobs(results);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

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
            Browse through {jobs.length}+ available opportunities across various domains
          </p>
        </div>

        {/* Advanced Search Filters */}
        <SearchFilters onSearch={handleSearch} className="mb-8" />

        {/* Job Cards */}
        <div className="space-y-6">
          {currentJobs.map((job: any) => (
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
                        {job.created_at ? new Date(job.created_at).toLocaleDateString() : '—'}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.client?.location ?? 'Remote'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{job.created_at ? new Date(job.created_at).toLocaleString() : ''}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {job.description}
                </CardDescription>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {(job.skills || []).map((skill: string, index: number) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;