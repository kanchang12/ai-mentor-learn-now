
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Image, 
  PenTool, 
  Briefcase, 
  BarChart3, 
  Globe,
  ArrowRight,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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
      id: "business",
      title: "Business Automation",
      description: "Automate workflows and streamline business processes",
      icon: Briefcase,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-600",
      href: "/business"
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
            <div className="text-2xl font-bold text-blue-600">
              HowToUseAI.uk
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-[#6cae75] hover:bg-[#5a9d64] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Main Video */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-[#22201d] mb-6">
            Learn AI Tools That Actually Work
          </h1>
          <p className="text-xl text-[#22201d] opacity-70 mb-12 max-w-3xl mx-auto">
            Master the most powerful AI tools with step-by-step tutorials and hands-on practice
          </p>
          
          {/* Main Hero Video */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-lg">
              <div className="aspect-video relative">
                <iframe
                  src="https://www.youtube.com/embed/QH2-TGUlwu4"
                  title="How to Use AI - Complete Guide"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-[#22201d] mb-2">
                  Complete AI Mastery Course
                </h3>
                <p className="text-[#22201d] opacity-70">
                  Everything you need to know about AI tools in one comprehensive guide
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#22201d] text-center mb-12">
            Choose Your AI Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.id} to={category.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border border-gray-200 rounded-[20px]">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center border ${category.borderColor} mb-4`}>
                        <IconComponent className={`h-8 w-8 ${category.iconColor}`} />
                      </div>
                      <CardTitle className="text-xl text-[#22201d] flex items-center justify-between">
                        {category.title}
                        <ArrowRight className="h-5 w-5 text-[#22201d] opacity-50" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-[#22201d] opacity-70 text-base mb-4">
                        {category.description}
                      </CardDescription>
                      <Button size="sm" variant="outline" className="w-full">
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-[#6cae75]/10 to-[#5a9d64]/10 rounded-[20px] p-12">
          <h2 className="text-3xl font-bold text-[#22201d] mb-4">
            Ready to Master AI?
          </h2>
          <p className="text-xl text-[#22201d] opacity-70 mb-8">
            Join thousands learning practical AI skills every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="rounded-[30px]">
                Login to Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
