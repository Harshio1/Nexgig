import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Search,
  Phone,
  Video,
  Star,
  MessageCircle
} from "lucide-react";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Mock chat data
  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      role: "Client",
      jobTitle: "Full-Stack Web Development",
      lastMessage: "I've completed the user authentication module. Can you review it?",
      time: "2 hours ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "/placeholder.svg",
      role: "Freelancer",
      jobTitle: "Mobile App UI/UX Design",
      lastMessage: "Here are the latest wireframes for your review",
      time: "5 hours ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "/placeholder.svg",
      role: "Client",
      jobTitle: "E-commerce Website",
      lastMessage: "The payment integration is now live and working perfectly",
      time: "1 day ago",
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: "David Wilson",
      avatar: "/placeholder.svg",
      role: "Freelancer",
      jobTitle: "Content Writing",
      lastMessage: "I'll have the first draft ready by tomorrow",
      time: "2 days ago",
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi! Thanks for accepting the project. I'm excited to work with you.",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you! I'm looking forward to it. I've reviewed the requirements and have a few questions.",
      time: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "Of course! Feel free to ask anything. I want to make sure we're aligned before you start.",
      time: "10:35 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Perfect. For the user authentication, do you prefer OAuth integration or a custom solution?",
      time: "10:37 AM",
      isOwn: true
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content: "OAuth would be great! Google and GitHub integration would cover most of our users.",
      time: "10:40 AM",
      isOwn: false
    },
    {
      id: 6,
      sender: "You",
      content: "Excellent choice. I'll implement both Google and GitHub OAuth. Should have the first iteration ready by Friday.",
      time: "10:42 AM",
      isOwn: true
    },
    {
      id: 7,
      sender: "Sarah Johnson",
      content: "I've completed the user authentication module. Can you review it?",
      time: "2:15 PM",
      isOwn: false
    }
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add message logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (time: string) => {
    // In a real app, you'd format the timestamp properly
    return time;
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
              <Link to="/freelancer-dashboard">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r border-border bg-card flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedChat === chat.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-foreground truncate">{chat.name}</div>
                      <div className="text-xs text-muted-foreground">{chat.time}</div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {chat.role}
                      </Badge>
                      {chat.unread > 0 && (
                        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground mt-1 truncate">
                      {chat.jobTitle}
                    </div>
                    
                    <div className="text-sm text-foreground mt-1 truncate">
                      {chat.lastMessage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChatData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChatData.avatar} />
                        <AvatarFallback>{selectedChatData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedChatData.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{selectedChatData.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedChatData.jobTitle} • {selectedChatData.online ? "Online" : "Offline"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-2" : "order-1"}`}>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className={`text-xs text-muted-foreground mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
                        {formatTime(message.time)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" type="button">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            // No chat selected
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a chat from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;