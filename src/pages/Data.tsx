
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BarChart3, 
  Database, 
  TrendingUp, 
  FileSpreadsheet,
  Brain,
  Zap,
  Play,
  Clock,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const Data = () => {
  const tutorials = [
    {
      id: 1,
      title: "Excel Data Analysis with AI",
      description: "Transform spreadsheets into insights using AI-powered analysis tools",
      duration: "12 min",
      level: "Beginner",
      videoId: "8MNb_nw5dQo",
      views: "24.5K"
    },
    {
      id: 2,
      title: "Google Sheets + AI Integration",
      description: "Automate calculations and generate reports with AI in Google Sheets",
      duration: "15 min",
      level: "Intermediate",
      videoId: "5dTK8qZHbhQ",
      views: "18.2K"
    },
    {
      id: 3,
      title: "Power BI with AI Insights",
      description: "Create dynamic dashboards and AI-powered visualizations",
      duration: "18 min",
      level: "Advanced",
      videoId: "dUFIj8JGz0A",
      views: "31.7K"
    },
    {
      id: 4,
      title: "SQL Database Analysis",
      description: "Use AI to write complex SQL queries and analyze large datasets",
      duration: "22 min",
      level: "Advanced",
      videoId: "HXV3zeQKqGY",
      views: "15.8K"
    },
    {
      id: 5,
      title: "Data Visualization with Tableau",
      description: "Build interactive dashboards and AI-enhanced visualizations",
      duration: "16 min",
      level: "Intermediate",
      videoId: "jbkSRLYSojo",
      views: "22.1K"
    },
    {
      id: 6,
      title: "Python Data Science Basics",
      description: "Learn pandas, matplotlib, and AI-assisted data analysis",
      duration: "25 min",
      level: "Advanced",
      videoId: "r-uOLxNrNk8",
      views: "28.3K"
    }
  ];

  const features = [
    {
      icon: Database,
      title: "Database Integration",
      description: "Connect to SQL, NoSQL, and cloud databases"
    },
    {
      icon: BarChart3,
      title: "Smart Visualizations",
      description: "AI-generated charts and interactive dashboards"
    },
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "Machine learning models for forecasting"
    },
    {
      icon: FileSpreadsheet,
      title: "Excel & Sheets",
      description: "Advanced spreadsheet automation"
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
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
              <BarChart3 className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-[#22201d] mb-4">Data Analysis with AI</h1>
          <p className="text-xl text-[#22201d] opacity-70 max-w-3xl mx-auto">
            Transform raw data into actionable insights with AI-powered analysis tools and visualization techniques
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
          <h2 className="text-3xl font-bold text-[#22201d] mb-8">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-white border border-gray-200 rounded-[20px] text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30 mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-indigo-600" />
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
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 rounded-[20px]">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                  <TrendingUp className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-[#22201d]">Interactive Data Analysis Demo</CardTitle>
              <CardDescription className="text-[#22201d] opacity-70">
                Try our AI-powered data analysis tool with sample datasets
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" className="bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                <Zap className="h-5 w-5 mr-2" />
                Launch Demo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#22201d] mb-4">Ready to Master Data Analysis?</h2>
          <p className="text-xl text-[#22201d] opacity-70 mb-8">
            Start with our beginner tutorials and work your way up to advanced AI-powered analytics
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

export default Data;
