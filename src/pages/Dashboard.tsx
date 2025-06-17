
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Image, 
  PenTool, 
  BookOpen, 
  BarChart3, 
  Globe,
  ArrowRight,
  Clock,
  Star,
  Shield
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { VoiceAgent } from "@/components/VoiceAgent";

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const categories = [
    {
      id: "general",
      title: "General AI",
      description: "Chat with AI, generate content, and get instant answers",
      icon: MessageSquare,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-600",
      href: "/general"
    },
    {
      id: "writing",
      title: "Writing",
      description: "Create articles, blogs, and marketing copy with AI",
      icon: PenTool,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-600",
      href: "/writing"
    },
    {
      id: "images",
      title: "Images",
      description: "Generate, edit, and enhance images with AI",
      icon: Image,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-600",
      href: "/images"
    },
    {
      id: "book",
      title: "Write a Book",
      description: "Write complete books with AI-powered assistance",
      icon: BookOpen,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-600",
      href: "/book"
    },
    {
      id: "data",
      title: "Data Analysis",
      description: "Analyze data, create charts, and extract insights",
      icon: BarChart3,
      color: "from-indigo-500/20 to-blue-500/20",
      borderColor: "border-indigo-500/30",
      iconColor: "text-indigo-600",
      href: "/data"
    },
    {
      id: "website",
      title: "Website Builder",
      description: "Build and deploy websites with AI assistance",
      icon: Globe,
      color: "from-teal-500/20 to-cyan-500/20",
      borderColor: "border-teal-500/30",
      iconColor: "text-teal-600",
      href: "/website"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              HowToUseAI.uk
            </Link>
            
            <div className="flex items-center space-x-4">
              {!adminLoading && isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
              <Link to="/settings">
                <Button variant="outline" size="sm">Settings</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#22201d] mb-2">Welcome to your AI Dashboard</h1>
          <p className="text-lg text-[#22201d] opacity-70">
            Choose a category to start exploring AI tools and capabilities
          </p>
        </div>

        {/* Usage Info */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-[#22201d]">Free Daily Access</h3>
                  <p className="text-[#22201d] opacity-70">30 minutes of AI tools per day, resets at midnight</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <Badge variant="secondary">Free Account</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} to={category.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border border-gray-200 rounded-[20px]">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center border ${category.borderColor} mb-4`}>
                      <IconComponent className={`h-6 w-6 ${category.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl text-[#22201d] flex items-center justify-between">
                      {category.title}
                      <ArrowRight className="h-5 w-5 text-[#22201d] opacity-50" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-[#22201d] opacity-70 text-base">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-[#22201d] mb-6">Need Help Getting Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/general">
              <Button size="lg" className="bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                Start with General AI
              </Button>
            </Link>
            <Link to="/billing">
              <Button size="lg" variant="outline" className="rounded-[30px]">
                Upgrade for Unlimited Access
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Voice Agent */}
      <VoiceAgent pageContext="dashboard" />
    </div>
  );
};

export default Dashboard;
