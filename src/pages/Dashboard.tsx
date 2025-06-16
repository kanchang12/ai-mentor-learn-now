
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle, Star, TrendingUp, MessageSquare, User, Settings, LogOut, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [timeRemaining, setTimeRemaining] = useState(23); // 23 minutes remaining today
  const [isFreeTier, setIsFreeTier] = useState(true);

  const categories = [
    {
      id: "general",
      title: "General AI Use",
      description: "Master ChatGPT, Claude, and essential AI fundamentals",
      icon: "🤖",
      videos: 12,
      progress: 25,
      color: "bg-blue-500"
    },
    {
      id: "writing",
      title: "Writing with AI", 
      description: "Blog posts, emails, and content creation mastery",
      icon: "✍️",
      videos: 8,
      progress: 60,
      color: "bg-green-500"
    },
    {
      id: "image",
      title: "Image Generation",
      description: "Midjourney, DALL-E, and visual AI creation",
      icon: "🎨", 
      videos: 10,
      progress: 10,
      color: "bg-purple-500"
    },
    {
      id: "business",
      title: "Business Automation",
      description: "Workflow automation and productivity tools",
      icon: "⚡",
      videos: 15,
      progress: 0,
      color: "bg-orange-500"
    },
    {
      id: "data",
      title: "Data Analysis", 
      description: "AI-powered analytics and insights",
      icon: "📊",
      videos: 9,
      progress: 5,
      color: "bg-indigo-500"
    },
    {
      id: "web",
      title: "Website Development",
      description: "Build websites with AI assistance", 
      icon: "💻",
      videos: 11,
      progress: 0,
      color: "bg-teal-500"
    }
  ];

  const recentActivity = [
    { title: "Email Marketing with ChatGPT", category: "Writing", completedAt: "2 hours ago" },
    { title: "Midjourney Basics", category: "Image Generation", completedAt: "Yesterday" },
    { title: "AI Productivity Workflows", category: "Business", completedAt: "3 days ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              HowToUseAI.uk
            </Link>

            <div className="flex items-center space-x-4">
              {/* Usage Timer for Free Users */}
              {isFreeTier && (
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {timeRemaining} minutes left today
                  </span>
                </div>
              )}

              {/* Upgrade Button for Free Users */}
              {isFreeTier && (
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              )}

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Ready to continue your AI learning journey? Pick up where you left off.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <PlayCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Videos Watched</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                  <p className="text-2xl font-bold text-gray-900">7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <Star className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Skill Points</p>
                  <p className="text-2xl font-bold text-gray-900">245</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <MessageSquare className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Chats</p>
                  <p className="text-2xl font-bold text-gray-900">34</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Categories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <Link key={category.id} to={`/category/${category.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl">{category.icon}</div>
                        <Badge variant="secondary">{category.videos} videos</Badge>
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{category.progress}%</span>
                        </div>
                        <Progress value={category.progress} className="h-2" />
                      </div>
                      <Button className="w-full mt-4" variant="outline">
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
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <PlayCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.category} • {activity.completedAt}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Prompt for Free Users */}
            {isFreeTier && (
              <Card className="border-gradient-to-r border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <div className="flex items-center">
                    <Crown className="h-5 w-5 text-blue-600 mr-2" />
                    <CardTitle className="text-lg">Upgrade to Pro</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Get unlimited access to all videos and premium AI features.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      Unlimited daily access
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      Premium AI companion
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Upgrade for £19/month
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
