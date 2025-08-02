import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X, MapPin, Clock, DollarSign } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

export interface SearchFilters {
  query: string;
  skills: string[];
  budget: [number, number];
  location: string;
  jobType: string;
  experienceLevel: string;
  duration: string;
}

const skillOptions = [
  "React", "JavaScript", "TypeScript", "Node.js", "Python", "Java",
  "UI/UX Design", "Graphic Design", "Web Design", "Mobile App Development",
  "SEO", "Content Writing", "Digital Marketing", "WordPress", "Shopify"
];

const locationOptions = [
  "Remote", "United States", "Canada", "United Kingdom", "Germany", 
  "Australia", "India", "Brazil", "France", "Netherlands"
];

export const SearchFilters = ({ onSearch, className = "" }: SearchFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    skills: [],
    budget: [0, 10000],
    location: "",
    jobType: "",
    experienceLevel: "",
    duration: "",
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const addSkill = (skill: string) => {
    if (!filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      skills: [],
      budget: [0, 10000],
      location: "",
      jobType: "",
      experienceLevel: "",
      duration: "",
    });
  };

  return (
    <Card className={`shadow-card ${className}`}>
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for jobs, skills, or companies..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className="pl-10 pr-24 h-12 text-base transition-all duration-200 focus:shadow-glow"
          />
          <Button 
            onClick={handleSearch}
            className="absolute right-2 top-2 h-8 px-4 shadow-glow"
          >
            Search
          </Button>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
          {(filters.skills.length > 0 || filters.location || filters.jobType) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {/* Applied Filters */}
        {(filters.skills.length > 0 || filters.location || filters.jobType) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => removeSkill(skill)}
                />
              </Badge>
            ))}
            {filters.location && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {filters.location}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => setFilters(prev => ({ ...prev, location: "" }))}
                />
              </Badge>
            )}
            {filters.jobType && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {filters.jobType}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => setFilters(prev => ({ ...prev, jobType: "" }))}
                />
              </Badge>
            )}
          </div>
        )}

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t border-border animate-fade-in">
            {/* Skills */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skillOptions.filter(skill => !filters.skills.includes(skill)).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">
                Budget Range: ${filters.budget[0]} - ${filters.budget[1]}
              </Label>
              <div className="flex items-center gap-4">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={filters.budget}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, budget: value as [number, number] }))}
                  max={10000}
                  step={100}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Location, Job Type, Experience */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Location</Label>
                <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-glow">
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Job Type</Label>
                <Select value={filters.jobType} onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-glow">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Experience</Label>
                <Select value={filters.experienceLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, experienceLevel: value }))}>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-glow">
                    <SelectValue placeholder="Any level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Apply Filters Button */}
            <Button 
              onClick={handleSearch}
              className="w-full shadow-glow hover:shadow-hover transition-all duration-300"
            >
              Apply Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};