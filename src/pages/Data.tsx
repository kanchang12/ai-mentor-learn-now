
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, CheckCircle, ArrowLeft, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Data = () => {
  const tutorials = [
    {
      id: 1,
      title: "ChatGPT Data Analysis",
      description: "Analyze datasets and create insights using ChatGPT's advanced features",
      duration: "24 min",
      difficulty: "Beginner",
      completed: false
    },
    {
      id: 2,
      title: "Google Sheets AI Functions",
      description: "Use AI-powered formulas and functions for data manipulation",
      duration: "18 min",
      difficulty: "Intermediate",
      completed: false
    },
    {
      id: 3,
      title: "Python Data Science with AI",
      description: "Combine Python programming with AI for advanced analytics",
      duration: "35 min",
      difficulty: "Advanced",
      completed: false
    },
    {
      id: 4,
      title: "Automated Report Generation",
      description: "Create dynamic reports that update automatically with new data",
      duration: "26 min",
      difficulty: "Intermediate",
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 backdrop-blur-sm border-b border-gray-800">
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
            <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Data Analysis</h1>
              <p className="text-xl text-gray-300">AI-powered analytics and insights</p>
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
              <h2 className="text-2xl font-bold text-white mb-4">Unlock Data Insights with AI</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Transform raw data into actionable insights using AI-powered analytics tools. 
                Learn to analyze, visualize, and interpret data without complex technical knowledge.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Data Analysis Tutorials</h3>
              <div className="space-y-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-6 w-6 text-white" />
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
                          <Button className="bg-red-600 hover:bg-red-700">
                            Start Analysis
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
                <CardTitle className="text-white">Analysis Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Completed</span>
                      <span className="text-white">0/4</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Become a data-driven decision maker
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Data Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-gray-300">Google Sheets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-gray-300">Python</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    <span className="text-gray-300">Tableau</span>
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

export default Data;
