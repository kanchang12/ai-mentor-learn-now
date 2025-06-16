
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, CheckCircle, ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Business = () => {
  const tutorials = [
    {
      id: 1,
      title: "Zapier Automation Workflows",
      description: "Connect apps and automate repetitive tasks without coding",
      duration: "22 min",
      difficulty: "Beginner",
      completed: false
    },
    {
      id: 2,
      title: "Make.com Advanced Integrations",
      description: "Build complex automation scenarios with visual workflow builder",
      duration: "28 min",
      difficulty: "Intermediate",
      completed: false
    },
    {
      id: 3,
      title: "AI Customer Service Chatbots",
      description: "Create intelligent chatbots that handle customer inquiries 24/7",
      duration: "25 min",
      difficulty: "Advanced",
      completed: false
    },
    {
      id: 4,
      title: "Automated Content Publishing",
      description: "Set up systems to publish content across multiple platforms automatically",
      duration: "20 min",
      difficulty: "Intermediate",
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm border-b border-gray-800">
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
            <div className="w-20 h-20 bg-yellow-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">⚡</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Business Automation</h1>
              <p className="text-xl text-gray-300">Workflow automation and productivity tools</p>
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
              <h2 className="text-2xl font-bold text-white mb-4">Automate Your Business Processes</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Save hours every week by automating repetitive tasks. Learn to build powerful workflows 
                that connect your favorite tools and streamline your business operations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Automation Tutorials</h3>
              <div className="space-y-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                            <Zap className="h-6 w-6 text-white" />
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
                          <Button className="bg-yellow-600 hover:bg-yellow-700">
                            Start Automating
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
                <CardTitle className="text-white">Automation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Completed</span>
                      <span className="text-white">0/4</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Save hours each week with automation
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Automation Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Z</span>
                    </div>
                    <span className="text-gray-300">Zapier</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <span className="text-gray-300">Make.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">N</span>
                    </div>
                    <span className="text-gray-300">n8n</span>
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

export default Business;
