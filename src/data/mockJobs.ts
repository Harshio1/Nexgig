// Mock data for jobs across various domains
export const mockJobs = [
  // AI/ML Projects
  {
    id: 1,
    title: "AI-Powered Chatbot Development",
    budget: "$5,000 - $8,000",
    description: "Develop an intelligent chatbot using natural language processing for customer service automation...",
    skills: ["Python", "TensorFlow", "NLP", "Machine Learning"],
    client: { name: "TechFlow AI", rating: 4.9, reviews: 34, location: "San Francisco, CA" },
    postedTime: "2 hours ago",
    proposals: 12,
    timeframe: "2-3 months",
    category: "AI/ML"
  },
  {
    id: 2,
    title: "Computer Vision Image Recognition System",
    budget: "$7,000 - $12,000",
    description: "Build a computer vision system for automated quality control in manufacturing...",
    skills: ["OpenCV", "PyTorch", "Computer Vision", "Deep Learning"],
    client: { name: "ManufactureTech", rating: 4.8, reviews: 28, location: "Detroit, MI" },
    postedTime: "4 hours ago",
    proposals: 8,
    timeframe: "3-4 months",
    category: "AI/ML"
  },
  {
    id: 3,
    title: "Predictive Analytics Dashboard",
    budget: "$4,500 - $7,500",
    description: "Create a machine learning model for sales forecasting with interactive dashboard...",
    skills: ["Python", "Scikit-learn", "Tableau", "Data Science"],
    client: { name: "RetailAnalytics Pro", rating: 4.7, reviews: 19, location: "New York, NY" },
    postedTime: "6 hours ago",
    proposals: 15,
    timeframe: "2-3 months",
    category: "AI/ML"
  },
  
  // Web Development Projects
  {
    id: 4,
    title: "Full-Stack E-commerce Platform",
    budget: "$8,000 - $15,000",
    description: "Build a complete e-commerce platform with React frontend and Node.js backend...",
    skills: ["React", "Node.js", "MongoDB", "Stripe API"],
    client: { name: "ShopMaster Inc", rating: 4.9, reviews: 45, location: "Seattle, WA" },
    postedTime: "1 hour ago",
    proposals: 23,
    timeframe: "3-4 months",
    category: "Web Development"
  },
  {
    id: 5,
    title: "Progressive Web App for Food Delivery",
    budget: "$6,000 - $10,000",
    description: "Develop a PWA for food delivery with real-time tracking and payment integration...",
    skills: ["Vue.js", "PWA", "Firebase", "Google Maps API"],
    client: { name: "FoodieExpress", rating: 4.6, reviews: 22, location: "Los Angeles, CA" },
    postedTime: "3 hours ago",
    proposals: 18,
    timeframe: "2-3 months",
    category: "Web Development"
  },
  {
    id: 6,
    title: "SaaS Dashboard with Analytics",
    budget: "$5,500 - $9,000",
    description: "Create a comprehensive SaaS dashboard with advanced analytics and reporting...",
    skills: ["Angular", "Chart.js", "PostgreSQL", "AWS"],
    client: { name: "CloudMetrics", rating: 4.8, reviews: 31, location: "Austin, TX" },
    postedTime: "5 hours ago",
    proposals: 14,
    timeframe: "2-3 months",
    category: "Web Development"
  },

  // Mobile Development Projects
  {
    id: 7,
    title: "React Native Fitness Tracking App",
    budget: "$4,000 - $7,000",
    description: "Build a cross-platform fitness app with workout tracking and social features...",
    skills: ["React Native", "Firebase", "Health APIs", "Redux"],
    client: { name: "FitTrack Solutions", rating: 4.7, reviews: 16, location: "Miami, FL" },
    postedTime: "2 hours ago",
    proposals: 11,
    timeframe: "2-3 months",
    category: "Mobile Development"
  },
  {
    id: 8,
    title: "Flutter E-learning Mobile App",
    budget: "$6,500 - $11,000",
    description: "Develop an e-learning platform with video streaming and progress tracking...",
    skills: ["Flutter", "Dart", "Video Streaming", "SQLite"],
    client: { name: "EduTech Pro", rating: 4.9, reviews: 38, location: "Boston, MA" },
    postedTime: "4 hours ago",
    proposals: 19,
    timeframe: "3-4 months",
    category: "Mobile Development"
  },

  // UI/UX Design Projects
  {
    id: 9,
    title: "Complete Brand Identity & UI Design",
    budget: "$3,000 - $5,500",
    description: "Design a complete brand identity including logo, website UI, and mobile app design...",
    skills: ["Figma", "Adobe Creative Suite", "Branding", "UI/UX"],
    client: { name: "StartupBrand Co", rating: 4.8, reviews: 24, location: "Denver, CO" },
    postedTime: "1 hour ago",
    proposals: 32,
    timeframe: "1-2 months",
    category: "Design"
  },
  {
    id: 10,
    title: "SaaS Platform Redesign",
    budget: "$4,500 - $8,000",
    description: "Redesign an existing SaaS platform to improve user experience and conversion rates...",
    skills: ["UX Research", "Wireframing", "Prototyping", "User Testing"],
    client: { name: "CloudSoft Inc", rating: 4.6, reviews: 29, location: "Portland, OR" },
    postedTime: "3 hours ago",
    proposals: 21,
    timeframe: "2-3 months",
    category: "Design"
  },

  // Data Science Projects
  {
    id: 11,
    title: "Financial Data Analysis & Modeling",
    budget: "$5,000 - $9,000",
    description: "Analyze financial market data and build predictive models for investment strategies...",
    skills: ["Python", "Pandas", "Financial Modeling", "Quantitative Analysis"],
    client: { name: "InvestTech Analytics", rating: 4.9, reviews: 41, location: "Chicago, IL" },
    postedTime: "2 hours ago",
    proposals: 9,
    timeframe: "2-3 months",
    category: "Data Science"
  },
  {
    id: 12,
    title: "Customer Segmentation Analysis",
    budget: "$3,500 - $6,000",
    description: "Perform customer segmentation analysis using clustering algorithms and visualization...",
    skills: ["R", "Clustering", "Data Visualization", "Statistical Analysis"],
    client: { name: "MarketInsights", rating: 4.7, reviews: 18, location: "Atlanta, GA" },
    postedTime: "5 hours ago",
    proposals: 13,
    timeframe: "1-2 months",
    category: "Data Science"
  },

  // Blockchain Projects
  {
    id: 13,
    title: "DeFi Protocol Smart Contracts",
    budget: "$10,000 - $18,000",
    description: "Develop smart contracts for a decentralized finance protocol with yield farming features...",
    skills: ["Solidity", "Web3", "Smart Contracts", "DeFi"],
    client: { name: "CryptoFi Labs", rating: 4.8, reviews: 15, location: "Remote" },
    postedTime: "1 hour ago",
    proposals: 7,
    timeframe: "3-4 months",
    category: "Blockchain"
  },
  {
    id: 14,
    title: "NFT Marketplace Development",
    budget: "$8,000 - $14,000",
    description: "Build a complete NFT marketplace with minting, trading, and auction features...",
    skills: ["Ethereum", "IPFS", "React", "Smart Contracts"],
    client: { name: "ArtChain", rating: 4.6, reviews: 12, location: "Remote" },
    postedTime: "6 hours ago",
    proposals: 16,
    timeframe: "2-4 months",
    category: "Blockchain"
  },

  // DevOps Projects
  {
    id: 15,
    title: "CI/CD Pipeline Setup and Optimization",
    budget: "$3,000 - $5,000",
    description: "Set up automated deployment pipelines and infrastructure monitoring for microservices...",
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    client: { name: "DevOps Solutions", rating: 4.9, reviews: 33, location: "San Jose, CA" },
    postedTime: "4 hours ago",
    proposals: 8,
    timeframe: "1-2 months",
    category: "DevOps"
  },

  // Content & Marketing Projects
  {
    id: 16,
    title: "Technical Blog Content Strategy",
    budget: "$2,000 - $4,000",
    description: "Create comprehensive content strategy and write technical blog posts for developer audience...",
    skills: ["Technical Writing", "SEO", "Content Strategy", "Developer Marketing"],
    client: { name: "TechBlog Network", rating: 4.7, reviews: 26, location: "Remote" },
    postedTime: "3 hours ago",
    proposals: 24,
    timeframe: "2-3 months",
    category: "Content & Marketing"
  },
  {
    id: 17,
    title: "Digital Marketing Campaign for SaaS",
    budget: "$4,000 - $7,000",
    description: "Plan and execute digital marketing campaigns for B2B SaaS product launch...",
    skills: ["Digital Marketing", "Google Ads", "LinkedIn Marketing", "Analytics"],
    client: { name: "SaaS Growth", rating: 4.8, reviews: 21, location: "Nashville, TN" },
    postedTime: "2 hours ago",
    proposals: 28,
    timeframe: "2-3 months",
    category: "Content & Marketing"
  },

  // Game Development Projects
  {
    id: 18,
    title: "2D Mobile Game Development",
    budget: "$5,000 - $9,000",
    description: "Develop an engaging 2D mobile game with multiplayer features and in-app purchases...",
    skills: ["Unity", "C#", "Game Design", "Mobile Gaming"],
    client: { name: "GameStudio Inc", rating: 4.6, reviews: 14, location: "San Diego, CA" },
    postedTime: "5 hours ago",
    proposals: 17,
    timeframe: "3-4 months",
    category: "Game Development"
  },
  {
    id: 19,
    title: "VR Training Simulation",
    budget: "$12,000 - $20,000",
    description: "Create an immersive VR training simulation for industrial safety procedures...",
    skills: ["Unity", "VR Development", "3D Modeling", "C#"],
    client: { name: "Industrial VR", rating: 4.9, reviews: 8, location: "Houston, TX" },
    postedTime: "1 hour ago",
    proposals: 5,
    timeframe: "4-6 months",
    category: "Game Development"
  },

  // Cybersecurity Projects
  {
    id: 20,
    title: "Security Audit and Penetration Testing",
    budget: "$6,000 - $10,000",
    description: "Perform comprehensive security audit and penetration testing for web applications...",
    skills: ["Penetration Testing", "Security Audit", "Vulnerability Assessment", "OWASP"],
    client: { name: "SecureWeb Corp", rating: 4.8, reviews: 19, location: "Washington, DC" },
    postedTime: "3 hours ago",
    proposals: 6,
    timeframe: "1-2 months",
    category: "Cybersecurity"
  },

  // Additional diverse projects to reach 100+
  {
    id: 21,
    title: "IoT Dashboard for Smart Home",
    budget: "$4,500 - $7,500",
    description: "Build a comprehensive IoT dashboard for managing smart home devices and energy consumption...",
    skills: ["IoT", "React", "MQTT", "Time Series DB"],
    client: { name: "SmartHome Tech", rating: 4.7, reviews: 23, location: "Phoenix, AZ" },
    postedTime: "2 hours ago",
    proposals: 12,
    timeframe: "2-3 months",
    category: "IoT"
  },
  {
    id: 22,
    title: "Microservices Architecture Migration",
    budget: "$8,000 - $15,000",
    description: "Migrate monolithic application to microservices architecture using containers...",
    skills: ["Microservices", "Docker", "API Gateway", "Service Mesh"],
    client: { name: "Enterprise Solutions", rating: 4.9, reviews: 42, location: "Charlotte, NC" },
    postedTime: "4 hours ago",
    proposals: 9,
    timeframe: "3-4 months",
    category: "Backend Development"
  },
  {
    id: 23,
    title: "Augmented Reality Shopping App",
    budget: "$7,000 - $12,000",
    description: "Develop AR mobile app allowing customers to visualize furniture in their homes...",
    skills: ["ARKit", "ARCore", "3D Modeling", "Swift"],
    client: { name: "FurnitureAR", rating: 4.6, reviews: 17, location: "Orlando, FL" },
    postedTime: "1 hour ago",
    proposals: 14,
    timeframe: "3-4 months",
    category: "AR/VR"
  },
  {
    id: 24,
    title: "Supply Chain Management System",
    budget: "$10,000 - $18,000",
    description: "Build comprehensive supply chain management system with real-time tracking...",
    skills: ["Java", "Spring Boot", "Logistics", "Database Design"],
    client: { name: "LogiTech Systems", rating: 4.8, reviews: 35, location: "Memphis, TN" },
    postedTime: "6 hours ago",
    proposals: 11,
    timeframe: "4-5 months",
    category: "Enterprise Software"
  },
  {
    id: 25,
    title: "Cryptocurrency Trading Bot",
    budget: "$5,500 - $9,500",
    description: "Develop automated trading bot with multiple exchange support and risk management...",
    skills: ["Python", "Trading APIs", "Algorithmic Trading", "Risk Management"],
    client: { name: "CryptoTrade Pro", rating: 4.7, reviews: 20, location: "Remote" },
    postedTime: "3 hours ago",
    proposals: 18,
    timeframe: "2-3 months",
    category: "FinTech"
  }
  // Continue with more projects to reach 100+...
];

// Helper function to get jobs by category
export const getJobsByCategory = (category: string) => {
  return mockJobs.filter(job => job.category === category);
};

// Helper function to search jobs
export const searchJobs = (query: string, skillFilter?: string, budgetFilter?: string) => {
  return mockJobs.filter(job => {
    const matchesQuery = !query || 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()));
    
    const matchesSkill = !skillFilter || 
      job.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
    
    const matchesBudget = !budgetFilter || true; // Add budget filtering logic as needed
    
    return matchesQuery && matchesSkill && matchesBudget;
  });
};

// Get all unique categories
export const getCategories = () => {
  const categories = [...new Set(mockJobs.map(job => job.category))];
  return categories;
};

// Get all unique skills
export const getSkills = () => {
  const skills = [...new Set(mockJobs.flatMap(job => job.skills))];
  return skills.sort();
};