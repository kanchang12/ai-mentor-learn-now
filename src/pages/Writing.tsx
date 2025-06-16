
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, CheckCircle, ArrowLeft, PenTool } from "lucide-react";
import { Link } from "react-router-dom";

const Writing = () => {
  const tutorials = [
    {
      id: 1,
      title: "Blog Post Writing with AI",
      description: "Create engaging blog posts using AI assistance and optimization techniques",
      duration: "20 min",
      difficulty: "Beginner",
      completed: false
    },
    {
      id: 2,
      title: "Email Marketing Campaigns",
      description: "Craft compelling email sequences that convert using AI copywriting",
      duration: "18 min",
      difficulty: "Intermediate",
      completed: false
    },
    {
      id: 3,
      title: "Social Media Content Creation",
      description: "Generate viral social media posts across all platforms",
      duration: "15 min",
      difficulty: "Beginner",
      completed: false
    },
    {
      id: 4,
      title: "Technical Documentation",
      description: "Write clear technical docs and user manuals with AI help",
      duration: "22 min",
      difficulty: "Advanced",
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">✍️</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Writing with AI</h1>
              <p className="text-xl text-gray-300">Blog posts, emails, and content creation mastery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Master AI-Powered Writing</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Transform your writing with AI assistance. Learn to create compelling content faster and more effectively 
                than ever before. From blog posts to marketing copy, discover the secrets of AI-enhanced writing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Writing Tutorials</h3>
              <div className="space-y-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                            <PenTool className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-lg">{tutorial.title}</h4>
                            <p className="text-gray-300 mb-2">{tutorial.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {tutorial.duration}
                              </div>
                              <span className="bg-gray-700 px-2 py-1 rounded text-xs">{tutorial.difficulty}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {tutorial.completed && (
                            <CheckCircle className="h-6 w-6 text-green-400" />
                          )}
                          <Button className="bg-green-600 hover:bg-green-700">
                            Start Writing
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Writing Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Completed</span>
                      <span className="text-white">0/4</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Build your writing portfolio as you learn
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Writing Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <span className="text-gray-300">ChatGPT</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">J</span>
                    </div>
                    <span className="text-gray-300">Jasper AI</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-gray-300">Grammarly</span>
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

export default Writing;
