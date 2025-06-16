
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PlayCircle, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle, 
  ArrowLeft,
  User,
  Bot,
  Minimize2,
  Maximize2
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { categoryId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message: "Hello! I'm your AI companion. I can help you understand the concepts in this video. What would you like to know?",
      timestamp: "Just now"
    }
  ]);

  // Mock data - in real app this would come from props/context
  const categoryData = {
    general: {
      title: "General AI Use",
      description: "Master ChatGPT, Claude, and essential AI fundamentals",
      icon: "🤖",
      videos: [
        {
          id: "abc123",
          title: "ChatGPT Fundamentals: From Beginner to Power User",
          duration: "15:30",
          description: "Learn the essential ChatGPT prompting techniques that will transform how you work with AI.",
          completed: true
        },
        {
          id: "def456", 
          title: "Claude vs ChatGPT: Which AI Should You Use?",
          duration: "12:45",
          description: "A comprehensive comparison to help you choose the right AI tool for your needs.",
          completed: false
        },
        {
          id: "ghi789",
          title: "Advanced AI Prompting Strategies",
          duration: "18:20",
          description: "Master advanced techniques to get better results from any AI model.",
          completed: false
        }
      ]
    },
    writing: {
      title: "Writing with AI",
      description: "Blog posts, emails, and content creation mastery", 
      icon: "✍️",
      videos: [
        {
          id: "wrt123",
          title: "AI Blog Writing Masterclass",
          duration: "22:15",
          description: "Create compelling blog posts that rank well and engage readers.",
          completed: true
        },
        {
          id: "wrt456",
          title: "Email Marketing with ChatGPT",
          duration: "16:30",
          description: "Write high-converting emails that get opened and clicked.",
          completed: false
        }
      ]
    }
  };

  const currentCategory = categoryData[categoryId as keyof typeof categoryData] || categoryData.general;
  const currentVideo = currentCategory.videos[selectedVideo];

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      message: chatMessage,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setChatMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai", 
        message: "That's a great question! Based on the video content you're watching, here are some key points to consider...",
        timestamp: "Just now"
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentCategory.icon} {currentCategory.title}
                </h1>
                <p className="text-sm text-gray-500">{currentCategory.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">18 minutes left</span>
              </div>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.id}`}
                    title={currentVideo.title}
                    className="w-full h-full rounded-t-lg"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{currentVideo.duration}</Badge>
                    <div className="flex items-center space-x-2">
                      {currentVideo.completed && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentVideo.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{currentVideo.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask AI
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Video {selectedVideo + 1} of {currentCategory.videos.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Category Progress</span>
                    <span className="font-medium">33% complete</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Videos</CardTitle>
                <CardDescription>
                  {currentCategory.videos.length} videos in this category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentCategory.videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedVideo === index 
                          ? 'border-blue-200 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedVideo(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          video.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {video.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <PlayCircle className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-500">{video.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Chat Interface */}
            <Card className={`transition-all duration-300 ${chatMinimized ? 'h-16' : 'h-96'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">AI Companion</CardTitle>
                      <CardDescription className="text-xs">Ask questions about this video</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatMinimized(!chatMinimized)}
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
                                ? 'bg-blue-500' 
                                : 'bg-gradient-to-br from-blue-500 to-purple-600'
                            }`}>
                              {msg.sender === 'user' ? (
                                <User className="h-3 w-3 text-white" />
                              ) : (
                                <Bot className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className={`p-2 rounded-lg text-sm ${
                              msg.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
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
                      placeholder="Ask about this video..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="text-sm"
                    />
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
