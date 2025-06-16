
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  ArrowLeft, 
  Code,
  MessageSquare,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2
} from "lucide-react";
import { Link } from "react-router-dom";

const Website = () => {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message: "Hello! I'm your AI companion for website development. I can help you understand web development tools and techniques using AI. What would you like to learn about?",
      timestamp: "Just now"
    }
  ]);

  const tutorials = [
    {
      id: 1,
      title: "No-Code Website Building",
      description: "Create professional websites using AI-powered no-code platforms",
      duration: "30 min",
      difficulty: "Beginner",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "AI Code Generation",
      description: "Generate HTML, CSS, and JavaScript code using AI assistants",
      duration: "25 min",
      difficulty: "Intermediate",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "WordPress AI Plugins",
      description: "Enhance WordPress sites with AI-powered plugins and features",
      duration: "22 min",
      difficulty: "Beginner",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 4,
      title: "Advanced Web Development",
      description: "Build complex web applications with AI coding assistance",
      duration: "40 min",
      difficulty: "Advanced",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const currentVideo = tutorials[selectedVideo];

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      message: chatMessage,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setChatMessage("");

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai", 
        message: "That's a great question about web development! Here are some key techniques you can apply...",
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
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                  <span className="text-2xl">💻</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#22201d]">Website Development</h1>
                  <p className="text-sm text-[#22201d] opacity-70">Build websites with AI assistance</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-[#e9ecf1] rounded-lg px-3 py-2">
                <Clock className="h-4 w-4 text-[#22201d]" />
                <span className="text-sm font-medium text-[#22201d]">18 minutes left</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 rounded-t-[20px] flex items-center justify-center relative overflow-hidden">
                  <iframe
                    src={currentVideo.videoUrl}
                    title={currentVideo.title}
                    className="w-full h-full absolute inset-0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute bottom-4 left-4 z-10 bg-black/60 rounded-lg px-3 py-1">
                    <p className="text-white font-semibold text-sm">{currentVideo.title}</p>
                    <p className="text-gray-200 text-xs">{currentVideo.duration}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-[#e9ecf1] text-[#22201d]">
                      {currentVideo.duration}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${currentVideo.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : currentVideo.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {currentVideo.difficulty}
                      </Badge>
                      {currentVideo.completed && (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-[#22201d] mb-2">
                    {currentVideo.title}
                  </h2>
                  <p className="text-[#22201d] opacity-70 mb-4">{currentVideo.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button className="bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                      <Button variant="outline" className="border-gray-300 text-[#22201d] hover:bg-[#e9ecf1] rounded-[30px]">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask AI
                      </Button>
                    </div>
                    <div className="text-sm text-[#22201d] opacity-70">
                      Video {selectedVideo + 1} of {tutorials.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-[#22201d]">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#22201d] opacity-70">Website Development Progress</span>
                    <span className="font-medium text-[#22201d]">0% complete</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video List */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-[#22201d]">Development Tutorials</CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  {tutorials.length} videos in this category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tutorials.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedVideo === index 
                          ? 'border-[#6cae75] bg-[#6cae75]/10' 
                          : 'border-gray-200 hover:border-[#6cae75] hover:bg-[#e9ecf1]'
                      }`}
                      onClick={() => setSelectedVideo(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          video.completed ? 'bg-[#6cae75]' : 'bg-gray-200'
                        }`}>
                          {video.completed ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : (
                            <PlayCircle className="h-4 w-4 text-[#22201d]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#22201d] truncate">
                            {video.title}
                          </p>
                          <p className="text-xs text-[#22201d] opacity-70">{video.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                      <CardTitle className="text-base text-[#22201d]">AI Development Companion</CardTitle>
                      <CardDescription className="text-xs text-[#22201d] opacity-70">Ask questions about web development</CardDescription>
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
                      placeholder="Ask about web development..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="text-sm bg-white border-gray-300 text-[#22201d] placeholder:text-[#22201d] placeholder:opacity-50"
                    />
                    <Button size="sm" onClick={sendMessage} className="bg-[#6cae75] hover:bg-[#5a9d64]">
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

export default Website;
