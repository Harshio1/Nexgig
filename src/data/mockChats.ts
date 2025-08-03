// Mock chat data with realistic conversations between freelancers and clients

export interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  type: "text" | "file" | "image";
  fileUrl?: string;
  fileName?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  jobTitle?: string;
  status: "online" | "offline" | "away";
}

export const freelancerChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612bb1c?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Thanks for the final deliverables. Everything looks perfect!",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    unreadCount: 2,
    jobTitle: "Mobile App UI/UX Design",
    status: "online"
  },
  {
    id: "2", 
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Can we schedule a call to discuss the API integration details?",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    unreadCount: 0,
    jobTitle: "Full-Stack Web Development",
    status: "away"
  },
  {
    id: "3",
    name: "Emily Rodriguez", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    lastMessage: "The data analysis report looks comprehensive. Great work!",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    unreadCount: 1,
    jobTitle: "Python Data Analysis",
    status: "offline"
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", 
    lastMessage: "I've reviewed your proposal. When can we start the project?",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    unreadCount: 0,
    jobTitle: "E-commerce Website",
    status: "online"
  }
];

export const clientChats: Chat[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    lastMessage: "I'll send you the final payment today. Excellent work on the project!",
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    unreadCount: 1,
    jobTitle: "React Developer",
    status: "online"
  },
  {
    id: "2",
    name: "Jessica Martinez",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    lastMessage: "The logo designs are amazing! Could you make one small adjustment?",
    timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
    unreadCount: 0,
    jobTitle: "Brand Designer",
    status: "away"
  },
  {
    id: "3", 
    name: "Robert Kim",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Thanks for the quick turnaround on the content. Very professional!",
    timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
    unreadCount: 2,
    jobTitle: "Content Writer", 
    status: "offline"
  },
  {
    id: "4",
    name: "Linda Davis",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    lastMessage: "I have some feedback on the mobile app wireframes. Available for a call?",
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    unreadCount: 0,
    jobTitle: "UX Designer",
    status: "online"
  }
];

export const freelancerMessages: { [chatId: string]: Message[] } = {
  "1": [
    {
      id: "1",
      content: "Hi! I've reviewed your portfolio and I'm impressed with your mobile app designs. I'd like to discuss a project with you.",
      sender: "other",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      type: "text"
    },
    {
      id: "2",
      content: "Thank you for reaching out! I'd be happy to discuss your project. Could you share more details about your requirements?",
      sender: "user", 
      timestamp: new Date(Date.now() - 169200000),
      type: "text"
    },
    {
      id: "3",
      content: "I need a complete UI/UX redesign for our fitness tracking app. The current design feels outdated and users are complaining about usability issues.",
      sender: "other",
      timestamp: new Date(Date.now() - 165600000),
      type: "text"
    },
    {
      id: "4",
      content: "I understand. I've attached some examples of my previous fitness app designs. The project timeline would be around 6-8 weeks.",
      sender: "user",
      timestamp: new Date(Date.now() - 162000000),
      type: "file",
      fileName: "fitness-app-portfolio.pdf"
    },
    {
      id: "5",
      content: "These look fantastic! Your design style is exactly what we're looking for. Let's proceed with the project.",
      sender: "other",
      timestamp: new Date(Date.now() - 158400000),
      type: "text"
    },
    {
      id: "6", 
      content: "Perfect! I'll start with user research and wireframes. I'll share the initial concepts with you by Friday.",
      sender: "user",
      timestamp: new Date(Date.now() - 154800000),
      type: "text"
    },
    {
      id: "7",
      content: "Thanks for the final deliverables. Everything looks perfect!",
      sender: "other",
      timestamp: new Date(Date.now() - 1800000),
      type: "text"
    }
  ],
  "2": [
    {
      id: "1",
      content: "Hello! I saw your application for our full-stack development project. Your experience with React and Node.js is impressive.",
      sender: "other",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      type: "text"
    },
    {
      id: "2",
      content: "Thank you! I'm very interested in this project. I have 5+ years of experience building scalable web applications.",
      sender: "user",
      timestamp: new Date(Date.now() - 255600000),
      type: "text"
    },
    {
      id: "3",
      content: "Great! We need to integrate with several third-party APIs. Do you have experience with payment gateways and authentication systems?",
      sender: "other",
      timestamp: new Date(Date.now() - 252000000),
      type: "text"
    },
    {
      id: "4",
      content: "Absolutely! I've integrated Stripe, PayPal, and various OAuth providers. I can also implement JWT authentication with refresh tokens.",
      sender: "user",
      timestamp: new Date(Date.now() - 248400000),
      type: "text"
    },
    {
      id: "5",
      content: "Excellent. Can we schedule a call to discuss the API integration details?",
      sender: "other",
      timestamp: new Date(Date.now() - 3600000),
      type: "text"
    }
  ],
  "3": [
    {
      id: "1",
      content: "Hi! I need help with analyzing our customer data to identify trends and patterns. Your data science background looks perfect for this.",
      sender: "other",
      timestamp: new Date(Date.now() - 345600000), // 4 days ago
      type: "text"
    },
    {
      id: "2",
      content: "I'd be happy to help! What type of data are you working with and what specific insights are you looking for?",
      sender: "user",
      timestamp: new Date(Date.now() - 342000000),
      type: "text"
    },
    {
      id: "3",
      content: "We have customer transaction data, demographic information, and product usage metrics. We want to segment customers and predict churn.",
      sender: "other",
      timestamp: new Date(Date.now() - 338400000),
      type: "text"
    },
    {
      id: "4",
      content: "Perfect! I'll use clustering algorithms for segmentation and machine learning models for churn prediction. I can provide detailed visualizations too.",
      sender: "user",
      timestamp: new Date(Date.now() - 334800000),
      type: "text"
    },
    {
      id: "5",
      content: "The data analysis report looks comprehensive. Great work!",
      sender: "other",
      timestamp: new Date(Date.now() - 7200000),
      type: "text"
    }
  ],
  "4": [
    {
      id: "1",
      content: "I reviewed your proposal for our e-commerce website. Your approach seems very thorough.",
      sender: "other",
      timestamp: new Date(Date.now() - 432000000), // 5 days ago
      type: "text"
    },
    {
      id: "2",
      content: "Thank you! I believe in delivering high-quality, scalable solutions. The timeline I proposed includes thorough testing and optimization.",
      sender: "user",
      timestamp: new Date(Date.now() - 428400000),
      type: "text"
    },
    {
      id: "3",
      content: "That's exactly what we need. When can we start the project?",
      sender: "other",
      timestamp: new Date(Date.now() - 86400000),
      type: "text"
    }
  ]
};

export const clientMessages: { [chatId: string]: Message[] } = {
  "1": [
    {
      id: "1",
      content: "Hello! I'm excited to work on your React project. I have extensive experience with modern React patterns and TypeScript.",
      sender: "other",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      type: "text"
    },
    {
      id: "2",
      content: "That's great to hear! Could you share some examples of your recent work?",
      sender: "user",
      timestamp: new Date(Date.now() - 169200000),
      type: "text"
    },
    {
      id: "3",
      content: "Absolutely! I've attached my portfolio showcasing React applications I've built recently, including a dashboard with real-time data.",
      sender: "other",
      timestamp: new Date(Date.now() - 165600000),
      type: "file",
      fileName: "react-portfolio-2024.pdf"
    },
    {
      id: "4",
      content: "Impressive work! Your coding style and attention to detail is exactly what we're looking for. Let's move forward.",
      sender: "user",
      timestamp: new Date(Date.now() - 162000000),
      type: "text"
    },
    {
      id: "5",
      content: "Thank you! I'll start with the project setup and send you daily progress updates. Estimated completion is 3 weeks.",
      sender: "other",
      timestamp: new Date(Date.now() - 158400000),
      type: "text"
    },
    {
      id: "6",
      content: "Perfect! I appreciate the regular updates. Looking forward to seeing the progress.",
      sender: "user",
      timestamp: new Date(Date.now() - 154800000),
      type: "text"
    },
    {
      id: "7",
      content: "I'll send you the final payment today. Excellent work on the project!",
      sender: "user",
      timestamp: new Date(Date.now() - 900000),
      type: "text"
    }
  ],
  "2": [
    {
      id: "1",
      content: "Hi! I'm passionate about creating memorable brand identities. I'd love to work on your logo design project.",
      sender: "other",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      type: "text"
    },
    {
      id: "2",
      content: "Great! We're a tech startup looking for a modern, clean logo that represents innovation and reliability.",
      sender: "user",
      timestamp: new Date(Date.now() - 255600000),
      type: "text"
    },
    {
      id: "3",
      content: "I understand perfectly. I'll create several concepts that balance modern aesthetics with professional credibility. Here are some initial sketches.",
      sender: "other",
      timestamp: new Date(Date.now() - 252000000),
      type: "image"
    },
    {
      id: "4",
      content: "The logo designs are amazing! Could you make one small adjustment to the color scheme?",
      sender: "user",
      timestamp: new Date(Date.now() - 2700000),
      type: "text"
    }
  ],
  "3": [
    {
      id: "1",
      content: "I specialize in creating engaging, SEO-optimized content for tech companies. I'm interested in your content writing project.",
      sender: "other",
      timestamp: new Date(Date.now() - 345600000), // 4 days ago
      type: "text"
    },
    {
      id: "2",
      content: "Perfect! We need blog posts about emerging technologies, written for a developer audience but accessible to business stakeholders.",
      sender: "user",
      timestamp: new Date(Date.now() - 342000000),
      type: "text"
    },
    {
      id: "3",
      content: "I have experience writing technical content that bridges the gap between technical and business audiences. I'll deliver well-researched, engaging articles.",
      sender: "other",
      timestamp: new Date(Date.now() - 338400000),
      type: "text"
    },
    {
      id: "4",
      content: "Excellent! I've attached our content guidelines and the first set of topics.",
      sender: "user",
      timestamp: new Date(Date.now() - 334800000),
      type: "file",
      fileName: "content-guidelines.pdf"
    },
    {
      id: "5",
      content: "Thanks for the quick turnaround on the content. Very professional!",
      sender: "user",
      timestamp: new Date(Date.now() - 5400000),
      type: "text"
    }
  ],
  "4": [
    {
      id: "1",
      content: "Hi! I'm a UX designer with 8+ years of experience creating intuitive mobile experiences. I'd love to help with your app redesign.",
      sender: "other",
      timestamp: new Date(Date.now() - 432000000), // 5 days ago
      type: "text"
    },
    {
      id: "2",
      content: "Wonderful! We need someone who can improve our user engagement and reduce the bounce rate on our mobile app.",
      sender: "user",
      timestamp: new Date(Date.now() - 428400000),
      type: "text"
    },
    {
      id: "3",
      content: "I'll conduct user research and usability testing to identify pain points, then create wireframes and prototypes for the improved experience.",
      sender: "other",
      timestamp: new Date(Date.now() - 424800000),
      type: "text"
    },
    {
      id: "4",
      content: "I have some feedback on the mobile app wireframes. Available for a call?",
      sender: "user",
      timestamp: new Date(Date.now() - 10800000),
      type: "text"
    }
  ]
};