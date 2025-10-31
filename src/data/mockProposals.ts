// Mock data for client proposals management

export interface Proposal {
  id: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar?: string;
  freelancerRating: number;
  freelancerReviews: number;
  jobId: string;
  jobTitle: string;
  proposedRate: string;
  timeframe: string;
  coverLetter: string;
  skills: string[];
  portfolio?: string;
  submittedDate: string;
  status: "pending" | "accepted" | "rejected" | "under_review";
}

export const mockProposals: Proposal[] = [
  {
    id: "1",
    freelancerId: "freelancer_1",
    freelancerName: "Alex Thompson",
    freelancerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    freelancerRating: 4.9,
    freelancerReviews: 47,
    jobId: "1", 
    jobTitle: "AI-Powered Chatbot Development",
    proposedRate: "$6,500",
    timeframe: "10 weeks",
    coverLetter: "I'm excited about this AI chatbot project! I have extensive experience building conversational AI systems using Python, TensorFlow, and natural language processing. I've developed similar chatbots for customer service automation that achieved 85% user satisfaction rates. I'll deliver a fully functional chatbot with sentiment analysis, multi-language support, and seamless integration with your existing systems.",
    skills: ["Python", "TensorFlow", "NLP", "Machine Learning", "Chatbot Development"],
    portfolio: "portfolio-ai-projects.pdf",
    submittedDate: "2024-01-23",
    status: "pending"
  },
  {
    id: "2",
    freelancerId: "freelancer_2", 
    freelancerName: "Sarah Chen",
    freelancerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612bb1c?w=150&h=150&fit=crop&crop=face",
    freelancerRating: 4.8,
    freelancerReviews: 32,
    jobId: "1",
    jobTitle: "AI-Powered Chatbot Development", 
    proposedRate: "$5,800",
    timeframe: "8 weeks",
    coverLetter: "Hello! I specialize in AI and machine learning solutions. For your chatbot project, I'll use state-of-the-art NLP models including BERT and GPT integration. My approach includes thorough testing, performance optimization, and comprehensive documentation. I have a track record of delivering AI projects on time and within budget.",
    skills: ["Python", "BERT", "GPT", "Conversational AI", "Deep Learning"],
    portfolio: "ml-portfolio-2024.pdf",
    submittedDate: "2024-01-22",
    status: "under_review"
  },
  {
    id: "3",
    freelancerId: "freelancer_3",
    freelancerName: "Marcus Johnson",
    freelancerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    freelancerRating: 4.7,
    freelancerReviews: 28,
    jobId: "4",
    jobTitle: "Full-Stack E-commerce Platform",
    proposedRate: "$12,000", 
    timeframe: "14 weeks",
    coverLetter: "I'm a full-stack developer with 6+ years of experience building scalable e-commerce platforms. I'll create a modern, responsive platform using React, Node.js, and MongoDB. The solution will include secure payment processing, inventory management, admin dashboard, and mobile optimization. I follow best practices for security, performance, and SEO.",
    skills: ["React", "Node.js", "MongoDB", "E-commerce", "Payment Integration"],
    portfolio: "ecommerce-portfolio.pdf",
    submittedDate: "2024-01-21",
    status: "accepted"
  },
  {
    id: "4",
    freelancerId: "freelancer_4",
    freelancerName: "Emily Rodriguez",
    freelancerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    freelancerRating: 4.9,
    freelancerReviews: 55,
    jobId: "4",
    jobTitle: "Full-Stack E-commerce Platform",
    proposedRate: "$10,500",
    timeframe: "12 weeks", 
    coverLetter: "I'm passionate about creating exceptional e-commerce experiences. My expertise includes modern JavaScript frameworks, secure payment systems, and performance optimization. I'll deliver a platform that not only meets your requirements but exceeds user expectations with intuitive design and smooth functionality.",
    skills: ["Vue.js", "Express.js", "PostgreSQL", "Stripe", "AWS"],
    submittedDate: "2024-01-20",
    status: "rejected"
  },
  {
    id: "5",
    freelancerId: "freelancer_5", 
    freelancerName: "David Kim",
    freelancerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    freelancerRating: 4.6,
    freelancerReviews: 19,
    jobId: "9",
    jobTitle: "Complete Brand Identity & UI Design",
    proposedRate: "$4,200",
    timeframe: "6 weeks",
    coverLetter: "I'm a brand designer with a passion for creating memorable identities. I'll develop a comprehensive brand package including logo design, color palette, typography, style guide, and UI mockups. My design process is collaborative and iterative, ensuring the final result perfectly captures your brand's essence and appeals to your target audience.", 
    skills: ["Branding", "Logo Design", "UI Design", "Adobe Creative Suite", "Figma"],
    portfolio: "brand-design-portfolio.pdf",
    submittedDate: "2024-01-19",
    status: "pending"
  },
  {
    id: "6",
    freelancerId: "freelancer_6",
    freelancerName: "Lisa Wang",
    freelancerAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face", 
    freelancerRating: 4.8,
    freelancerReviews: 42,
    jobId: "7",
    jobTitle: "React Native Fitness Tracking App",
    proposedRate: "$5,500",
    timeframe: "10 weeks",
    coverLetter: "I specialize in React Native development and have built several fitness and health apps. I'll create an engaging fitness tracking app with real-time workout monitoring, social features, and seamless integration with health APIs. The app will be optimized for both iOS and Android with native performance.",
    skills: ["React Native", "Health APIs", "Redux", "Firebase", "Mobile UI/UX"],
    portfolio: "mobile-apps-portfolio.pdf", 
    submittedDate: "2024-01-18",
    status: "under_review"
  }
];

// Helper functions for proposal management
export const getProposalsByJobId = (jobId: string) => {
  return mockProposals.filter(proposal => proposal.jobId === jobId);
};

export const updateProposalStatus = (proposalId: string, status: Proposal['status']) => {
  const proposal = mockProposals.find(p => p.id === proposalId);
  if (proposal) {
    proposal.status = status;
  }
  return proposal;
};

export const getProposalsByStatus = (status: Proposal['status']) => {
  return mockProposals.filter(proposal => proposal.status === status);
};