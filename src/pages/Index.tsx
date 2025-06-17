import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  PlayCircle, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  Brain,
  Rocket,
  LogOut
} from "lucide-react";

const Index = () => {
  const { user, signOut } = useAuth();

  const categories = [
    {
      id: "general",
      title: "General AI",
      description: "Master ChatGPT, Claude, and essential AI tools for everyday productivity",
      icon: "🤖",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
      videos: 12,
      duration: "4.5 hours",
      level: "Beginner"
    },
    {
      id: "writing",
      title: "AI Writing",
      description: "Transform your writing with AI assistance for blogs, marketing, and content",
      icon: "✍️",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50",
      videos: 8,
      duration: "3.2 hours",
      level: "Beginner"
    },
    {
      id: "images",
      title: "AI Images",
      description: "Create stunning visuals with Midjourney, DALL-E, and image generation",
      icon: "🎨",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      videos: 10,
      duration: "3.8 hours",
      level: "Intermediate"
    },
    {
      id: "business",
      title: "Business Automation",
      description: "Automate workflows, enhance productivity, and scale your business with AI",
      icon: "⚡",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
      videos: 15,
      duration: "5.5 hours",
      level: "Advanced"
    },
    {
      id: "data",
      title: "Data Analysis",
      description: "Analyze data, create insights, and make data-driven decisions",
      icon: "📊",
      color: "from-indigo-500/20 to-blue-500/20",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-700",
      bgColor: "bg-indigo-50",
      videos: 9,
      duration: "4.1 hours",
      level: "Intermediate"
    },
    {
      id: "website",
      title: "Website Building",
      description: "Build websites and web applications using AI-powered tools",
      icon: "🌐",
      color: "from-teal-500/20 to-cyan-500/20",
      borderColor: "border-teal-500/30",
      textColor: "text-teal-700",
      bgColor: "bg-teal-50",
      videos: 7,
      duration: "3.5 hours",
      level: "Advanced"
    }
  ];

  const features = [
    {
      icon: <PlayCircle className="h-6 w-6" />,
      title: "Expert-Led Tutorials",
      description: "Learn from AI professionals with real-world experience"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Companion Chat",
      description: "Get instant help and answers from your personal AI assistant"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Practical Projects",
      description: "Build real projects that you can use in your work or business"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey and celebrate achievements"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                HowToUseAI.uk
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">Welcome, {user.email}</span>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={signOut}
                    className="text-gray-700 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6">
                      Start Learning
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-full blur-3xl transform -rotate-12 scale-150"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 px-4 py-2 text-sm font-medium">
              <Zap className="h-4 w-4 mr-2" />
              Master AI in 30 minutes daily
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master AI Tools That Will
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
              Transform Your Life
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Learn ChatGPT, Midjourney, and cutting-edge AI tools through expert tutorials. 
            Get your AI companion and 30 minutes daily access completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to={user ? "/dashboard" : "/auth"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Rocket className="h-5 w-5 mr-2" />
                {user ? "Go to Dashboard" : "Start Free Today"}
              </Button>
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              No credit card required
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
              <div className="text-gray-600">Expert Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">10k+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-gray-600">AI Assistant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your AI Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master specific AI tools and techniques with our comprehensive video tutorials and hands-on projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} to={user ? `/${category.id}` : "/auth"}>
                <Card className={`group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 ${category.borderColor} bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl transform translate-x-8 -translate-y-8"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 ${category.bgColor} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        {category.icon}
                      </div>
                      <Badge className={`${category.textColor} bg-white/80 border-0 font-semibold`}>
                        {category.level}
                      </Badge>
                    </div>
                    <CardTitle className={`text-xl font-bold ${category.textColor} group-hover:scale-105 transition-transform duration-300`}>
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-700 leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        {category.videos} videos
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {category.duration}
                      </div>
                    </div>
                    <Button 
                      className={`w-full ${category.textColor} bg-white/90 hover:bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 font-semibold`}
                    >
                      Start Learning
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose HowToUseAI.uk?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most comprehensive AI learning platform designed for real-world success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Master AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of learners who are already transforming their careers with AI. 
            Start your journey today with 30 minutes of free daily access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Sparkles className="h-5 w-5 mr-2" />
                {user ? "Go to Dashboard" : "Get Started Free"}
              </Button>
            </Link>
            <div className="flex items-center text-blue-100">
              <CheckCircle className="h-5 w-5 mr-2" />
              Free forever • No credit card needed
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold">HowToUseAI.uk</div>
          </div>
          <p className="text-gray-400 mb-8">
            Empowering everyone to master AI tools for a better future
          </p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">
              © 2024 HowToUseAI.uk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
