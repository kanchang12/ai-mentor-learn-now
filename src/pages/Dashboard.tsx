
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle, Star, TrendingUp, MessageSquare, User, Settings, LogOut, Crown, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [timeRemaining, setTimeRemaining] = useState(23);
  const [isFreeTier, setIsFreeTier] = useState(true);

  const categories = [
    {
      id: "general",
      title: "General AI Use",
      description: "Master ChatGPT, Claude, and essential AI fundamentals",
      icon: "🤖",
      videos: 12,
      progress: 8,
      gradient: "from-blue-500/20 to-purple-500/20",
      border: "border-blue-500/30"
    },
    {
      id: "writing",
      title: "Writing with AI", 
      description: "Blog posts, emails, and content creation mastery",
      icon: "✍️",
      videos: 8,
      progress: 100,
      gradient: "from-green-500/20 to-blue-500/20",
      border: "border-green-500/30"
    },
    {
      id: "images",
      title: "Image Generation",
      description: "Midjourney, DALL-E, and visual AI creation",
      icon: "🎨", 
      videos: 10,
      progress: 10,
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30"
    },
    {
      id: "business",
      title: "Business Automation",
      description: "Workflow automation and productivity tools",
      icon: "⚡",
      videos: 15,
      progress: 0,
      gradient: "from-yellow-500/20 to-orange-500/20",
      border: "border-yellow-500/30"
    },
    {
      id: "data",
      title: "Data Analysis", 
      description: "AI-powered analytics and insights",
      icon: "📊",
      videos: 9,
      progress: 11,
      gradient: "from-red-500/20 to-pink-500/20",
      border: "border-red-500/30"
    },
    {
      id: "website",
      title: "Website Development",
      description: "Build websites with AI assistance", 
      icon: "💻",
      videos: 11,
      progress: 0,
      gradient: "from-teal-500/20 to-blue-500/20",
      border: "border-teal-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-[#6cae75]">
              HowToUseAI.uk
            </Link>

            <div className="flex items-center space-x-4">
              {isFreeTier && (
                <div className="flex items-center space-x-2 bg-[#e9ecf1] rounded-lg px-3 py-2">
                  <Clock className="h-4 w-4 text-[#22201d]" />
                  <span className="text-sm font-medium text-[#22201d]">
                    {timeRemaining} minutes left today
                  </span>
                </div>
              )}

              {isFreeTier && (
                <Link to="/billing">
                  <Button className="bg-[#ee4023] hover:bg-[#d63a1e] text-white rounded-[30px]">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </Link>
              )}

              <div className="flex items-center space-x-2">
                <Link to="/settings">
                  <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75] hover:bg-[#e9ecf1]">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75] hover:bg-[#e9ecf1]">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-[#22201d] mb-4">
            Welcome back! 👋
          </h1>
          <p className="text-xl text-[#22201d] opacity-70">
            Ready to continue your AI learning journey?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mr-4">
                  <PlayCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#22201d] opacity-70">Videos Watched</p>
                  <p className="text-3xl font-bold text-[#22201d]">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#22201d] opacity-70">Learning Streak</p>
                  <p className="text-3xl font-bold text-[#22201d]">7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#22201d] opacity-70">Skill Points</p>
                  <p className="text-3xl font-bold text-[#22201d]">245</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center mr-4">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#22201d] opacity-70">AI Chats</p>
                  <p className="text-3xl font-bold text-[#22201d]">34</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-[#22201d] mb-8">Learning Categories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <Link key={category.id} to={`/${category.id}`}>
                  <Card className={`bg-white border border-gray-200 rounded-[20px] shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-4xl">{category.icon}</div>
                        <Badge variant="secondary" className="bg-[#e9ecf1] text-[#22201d]">
                          {category.videos} videos
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-[#22201d]">{category.title}</CardTitle>
                      <CardDescription className="text-[#22201d] opacity-70">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#22201d] opacity-70">Progress</span>
                          <span className="font-medium text-[#22201d]">{category.progress}%</span>
                        </div>
                        <Progress value={category.progress} className="h-2" />
                      </div>
                      <Button className="w-full mt-6 bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                        Continue Learning
                        <PlayCircle className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upgrade Card */}
            {isFreeTier && (
              <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
                <CardHeader>
                  <div className="flex items-center">
                    <Crown className="h-6 w-6 text-[#6cae75] mr-3" />
                    <CardTitle className="text-xl text-[#22201d]">Upgrade to Pro</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#22201d] opacity-70">
                    Get unlimited access to all videos and premium AI features.
                  </p>
                  <ul className="text-sm space-y-2 text-[#22201d] opacity-70">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#6cae75] rounded-full mr-3"></div>
                      Unlimited daily access
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#6cae75] rounded-full mr-3"></div>
                      Premium AI companion
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#6cae75] rounded-full mr-3"></div>
                      Priority support
                    </li>
                  </ul>
                  <Link to="/billing">
                    <Button className="w-full bg-[#ee4023] hover:bg-[#d63a1e] text-white rounded-[30px]">
                      Upgrade for £19/month
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Progress Overview */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#22201d]">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#22201d] opacity-70">Completed Tutorials</span>
                      <span className="text-[#22201d]">1/65</span>
                    </div>
                    <Progress value={2} className="h-2" />
                  </div>
                  <div className="text-sm text-[#22201d] opacity-70">
                    Keep learning to unlock more advanced features!
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
