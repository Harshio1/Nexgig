import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Search } from "lucide-react";
import { FileUpload } from "./FileUpload";
import { freelancerChats, clientChats, freelancerMessages, clientMessages } from "@/data/mockChats";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  type: "text" | "file" | "image";
  fileUrl?: string;
  fileName?: string;
}

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  jobTitle?: string;
  status: "online" | "offline" | "away";
}

interface ChatInterfaceProps {
  chats: Chat[];
  activeChat?: string;
  onChatSelect: (chatId: string) => void;
  className?: string;
  userType?: "freelancer" | "client";
}

export const ChatInterface = ({ chats, activeChat, onChatSelect, className = "", userType = "freelancer" }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get messages based on user type and active chat
  useEffect(() => {
    if (activeChat) {
      const messageData = userType === "freelancer" ? freelancerMessages : clientMessages;
      setMessages(messageData[activeChat] || []);
    }
  }, [activeChat, userType]);

  const selectedChat = chats.find(chat => chat.id === activeChat);
  
  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (chat.jobTitle && chat.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate realistic response based on user type
      const responses = userType === "freelancer" ? [
        "Thanks for your message! I'll review the requirements and get back to you.",
        "Great! I'm available for a call this week to discuss the project details.",
        "I've uploaded the latest version. Please let me know your feedback!",
        "Perfect! I'll send you the revised proposal by tomorrow."
      ] : [
        "Thanks for the update! The progress looks excellent so far.",
        "I'm impressed with the quality of work. Keep it up!",
        "Could you provide an estimated timeline for completion?",
        "Let's schedule a review meeting to discuss next steps."
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "other",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatChatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 24) {
      return formatTime(date);
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className={`flex h-[600px] bg-background border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Chat List */}
      <div className="w-1/3 border-r border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">Messages</h3>
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="transition-all duration-200 focus:shadow-glow"
          />
        </div>
        
        <ScrollArea className="h-[calc(600px-120px)]">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <Card
                key={chat.id}
                className={`mb-2 cursor-pointer transition-all duration-200 hover:shadow-card ${
                  activeChat === chat.id ? "bg-primary/10 border-primary/30" : ""
                }`}
                onClick={() => onChatSelect(chat.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                        chat.status === "online" ? "bg-green-500" :
                        chat.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground truncate">{chat.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatChatTime(chat.timestamp)}
                        </span>
                      </div>
                      {chat.jobTitle && (
                        <p className="text-xs text-primary mb-1">{chat.jobTitle}</p>
                      )}
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    
                    {chat.unreadCount > 0 && (
                      <Badge variant="default" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-foreground">{selectedChat.name}</h4>
                    {selectedChat.jobTitle && (
                      <p className="text-xs text-primary">{selectedChat.jobTitle}</p>
                    )}
                  </div>
                  <Badge variant="outline" className={`text-xs ${
                    selectedChat.status === "online" ? "text-green-600 border-green-600" :
                    selectedChat.status === "away" ? "text-yellow-600 border-yellow-600" :
                    "text-gray-600 border-gray-600"
                  }`}>
                    {selectedChat.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      // Simulate call functionality
                      alert(`Calling ${selectedChat.name}...`);
                    }}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      // Simulate video call functionality
                      alert(`Starting video call with ${selectedChat.name}...`);
                    }}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] ${message.sender === "user" ? "order-1" : ""}`}>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-border"
                        }`}
                      >
                        {message.type === "text" && (
                          <p className="text-sm">{message.content}</p>
                        )}
                        {message.type === "file" && (
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm">{message.fileName}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-border rounded-lg p-3 max-w-[70%]">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* File Upload */}
            {showFileUpload && (
              <div className="p-4 border-t border-border bg-card/50">
                <FileUpload
                  maxFiles={3}
                  maxSize={10}
                  onFileUpload={(files) => {
                    // Add file message to chat
                    files.forEach((file) => {
                      const fileMessage: Message = {
                        id: Date.now().toString(),
                        content: `Uploaded file: ${file.name}`,
                        sender: "user",
                        timestamp: new Date(),
                        type: "file",
                        fileName: file.name
                      };
                      setMessages(prev => [...prev, fileMessage]);
                    });
                    setShowFileUpload(false);
                  }}
                />
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card/50">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFileUpload(!showFileUpload)}
                  className="shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                
                <Input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 transition-all duration-200 focus:shadow-glow"
                />
                
                <Button variant="ghost" size="sm" className="shrink-0">
                  <Smile className="h-4 w-4" />
                </Button>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="shrink-0 shadow-glow hover:shadow-hover transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};