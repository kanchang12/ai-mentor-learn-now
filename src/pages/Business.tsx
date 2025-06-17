
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Briefcase, 
  Workflow, 
  Bot, 
  Mail,
  Calendar,
  FileText,
  Zap,
  Play,
  Clock,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const Business = () => {
  const tutorials = [
    {
      id: 1,
      title: "Email Automation with AI",
      description: "Set up intelligent email sequences and responses using AI",
      duration: "14 min",
      level: "Beginner",
      videoId: "QH2-TGUlwu4",
      views: "32.1K"
    },
    {
      id: 2,
      title: "Zapier + AI Workflows",
      description: "Create powerful automation workflows connecting apps with AI",
      duration: "18 min",
      level: "Intermediate",
      videoId: "nKIu9yen5nc",
      views: "28.7K"
    },
    {
      id: 3,
      title: "Customer Service Chatbots",
      description: "Build intelligent chatbots for customer support automation",
      duration: "22 min",
      level: "Advanced",
      videoId: "dQw4w9WgXcQ",
      views: "19.5K"
    },
    {
      id: 4,
      title: "AI Document Processing",
      description: "Automate invoice processing, contract analysis, and more",
      duration: "16 min",
      level: "Intermediate",
      videoId: "BqpJvey-aqs",
      views: "24.3K"
    },
    {
      id: 5,
      title: "Sales Pipeline Automation",
      description: "Use AI to qualify leads and automate follow-ups",
      duration: "20 min",
      level: "Advanced",
      videoId: "dQw4w9WgXcQ",
      views: "15.9K"
    },
    {
      id: 6,
      title: "Calendar & Scheduling AI",
      description: "Intelligent meeting scheduling and calendar management",
      duration: "12 min",
      level: "Beginner",
      videoId: "ZZ5LpwO-An4",
      views: "27.8K"
    }
  ];

  const features = [
    {
      icon: Mail,
      title: "Email Automation",
      description: "Smart email campaigns and responses"
    },
    {
      icon: Calendar,
      title: "Scheduling",
      description: "AI-powered calendar management"
    },
    {
      icon: Bot,
      title: "Chatbots",
      description: "Intelligent customer service automation"
    },
    {
      icon: FileText,
      title: "Document Processing",
      description: "Automated document analysis and processing"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#22201d]" />
              <span className="text-[#22201d] font-medium">Back to Dashboard</span>
            </Link>
            <Link to="/" className="text-2xl font-bold text-blue-600">
              HowToUseAI.uk
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
              <Briefcase className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-[#22201d] mb-4">Business Automation</h1>
          <p className="text-xl text-[#22201d] opacity-70 max-w-3xl mx-auto">
            Streamline your business processes with AI-powered automation tools and workflows
          </p>
        </div>

        {/* Tutorial Videos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#22201d] mb-8">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="bg-white border border-gray-200 rounded-[20px] hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-t-[20px] relative overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                      title={tutorial.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/70 text-white hover:bg-black/80">
                      <Play className="h-3 w-3 mr-1" />
                      {tutorial.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90">
                      {tutorial.level}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#22201d] mb-2">{tutorial.title}</h3>
                  <p className="text-[#22201d] opacity-70 mb-4">{tutorial.description}</p>
                  <div className="flex items-center justify-between text-sm text-[#22201d] opacity-50">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {tutorial.views} views
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#22201d] mb-8">Automation Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-white border border-gray-200 rounded-[20px] text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-500/30 mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-[#22201d] mb-2">{feature.title}</h3>
                    <p className="text-[#22201d] opacity-70">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 rounded-[20px]">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <Workflow className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-[#22201d]">Workflow Automation Builder</CardTitle>
              <CardDescription className="text-[#22201d] opacity-70">
                Create your first automated workflow with our interactive builder
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" className="bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                <Zap className="h-5 w-5 mr-2" />
                Build Workflow
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#22201d] mb-4">Ready to Automate Your Business?</h2>
          <p className="text-xl text-[#22201d] opacity-70 mb-8">
            Start with simple automations and scale up to complex AI-powered workflows
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/general">
              <Button size="lg" className="bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                Start Learning
              </Button>
            </Link>
            <Link to="/billing">
              <Button size="lg" variant="outline" className="rounded-[30px]">
                Upgrade for Full Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
