import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ChatPage from "./pages/ChatPage";
import ReviewPage from "./pages/ReviewPage";
import CreateJob from "./pages/CreateJob";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ClientJobDetails from "./pages/ClientJobDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/client-dashboard" element={<ProtectedRoute roles={["client"]}><ClientDashboard /></ProtectedRoute>} />
          <Route path="/freelancer-dashboard" element={<ProtectedRoute roles={["freelancer"]}><FreelancerDashboard /></ProtectedRoute>} />
          <Route path="/jobs/new" element={<ProtectedRoute roles={["client"]}><CreateJob /></ProtectedRoute>} />
         
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route path="/client-dashboard/jobs/:id" element={<ProtectedRoute roles={["client"]}><ClientJobDetails /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
