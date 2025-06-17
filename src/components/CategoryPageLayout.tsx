
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  MessageSquare,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Zap,
  Play,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { UsageMeter } from "@/components/UsageMeter";

interface CategoryPageLayoutProps {
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  demoTitle: string;
  demoDescription: string;
  demoContent: React.ReactNode;
  children?: React.ReactNode;
}

export const CategoryPageLayout = ({
  category,
  title,
  description,
  icon,
  videoId,
  videoTitle,
  videoDescription,
  demoTitle,
  demoDescription,
  demoContent,
  children
}: CategoryPageLayoutProps) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const { usageMinutes, isLimitReached, loading, trackUsage } = useUsageTracking(category);
  
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message: `Hello! I'm your AI assistant for ${title.toLowerCase()}. I can help you understand the tools, techniques, and best practices. What would you like to learn?`,
      timestamp: "Just now"
    }
  ]);

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      message: chatMessage,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setChatMessage("");

    await trackUsage(1);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai", 
        message: `Great question about ${title.toLowerCase()}! Here's what you should know...`,
        timestamp: "Just now"
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75] hover:bg-[#e9ecf1]">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  {icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#22201d]">{title}</h1>
                  <p className="text-sm text-[#22201d] opacity-70">{description}</p>
                </div>
              </div>
            </div>

            <UsageMeter 
              usageMinutes={usageMinutes} 
              isLimitReached={isLimitReached} 
              loading={loading} 
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Tutorial Video */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#22201d] flex items-center">
                  <Play className="h-5 w-5 mr-2 text-[#6cae75]" />
                  {videoTitle}
                </CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  {videoDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={videoTitle}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            {/* Try It Out Demo */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#22201d] flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-[#6cae75]" />
                  {demoTitle}
                </CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  {demoDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {demoContent}
                
                {isLimitReached && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-4">
                    <p className="text-red-800 text-sm">
                      You've reached your daily limit of 30 minutes. Upgrade for unlimited access!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Chat Interface */}
            <Card className={`bg-white border border-gray-200 rounded-[20px] shadow-lg transition-all duration-300 ${chatMinimized ? 'h-16' : 'h-96'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6cae75] to-[#5a9d64] rounded-lg flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-[#22201d]">AI Assistant</CardTitle>
                      <CardDescription className="text-xs text-[#22201d] opacity-70">Ask questions about {title.toLowerCase()}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatMinimized(!chatMinimized)}
                    className="text-[#22201d] opacity-70 hover:text-[#22201d] hover:bg-[#e9ecf1]"
                  >
                    {chatMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>

              {!chatMinimized && (
                <CardContent className="pt-0 pb-3">
                  <ScrollArea className="h-48 mb-4">
                    <div className="space-y-3">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-start space-x-2 max-w-[80%] ${
                            msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              msg.sender === 'user' 
                                ? 'bg-[#6cae75]' 
                                : 'bg-gradient-to-br from-[#6cae75] to-[#5a9d64]'
                            }`}>
                              {msg.sender === 'user' ? (
                                <User className="h-3 w-3 text-white" />
                              ) : (
                                <Bot className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className={`p-2 rounded-lg text-sm ${
                              msg.sender === 'user'
                                ? 'bg-[#6cae75] text-white'
                                : 'bg-[#e9ecf1] text-[#22201d]'
                            }`}>
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder={`Ask about ${title.toLowerCase()}...`}
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      className="text-sm bg-white border-gray-300 text-[#22201d] placeholder:text-[#22201d] placeholder:opacity-50"
                      disabled={isLimitReached}
                    />
                    <Button size="sm" onClick={sendChatMessage} className="bg-[#6cae75] hover:bg-[#5a9d64]" disabled={isLimitReached}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {children}
            
            {/* Sign Up CTA */}
            <Card className="bg-gradient-to-br from-[#6cae75]/10 to-[#5a9d64]/10 border border-[#6cae75]/30 rounded-[20px]">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-[#22201d] mb-2">Upgrade for More</h3>
                <p className="text-sm text-[#22201d] opacity-70 mb-4">
                  Get unlimited access to all AI tools and premium tutorials.
                </p>
                <Link to="/billing">
                  <Button className="w-full bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                    Upgrade Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
