
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const General = () => {
  const tutorials = [
    {
      id: 1,
      title: "ChatGPT Fundamentals",
      description: "Master the basics of ChatGPT prompting and conversation techniques",
      duration: "15 min",
      difficulty: "Beginner",
      completed: false
    },
    {
      id: 2,
      title: "Claude vs ChatGPT Comparison",
      description: "Learn when to use Claude vs ChatGPT for different tasks",
      duration: "12 min",
      difficulty: "Beginner",
      completed: false
    },
    {
      id: 3,
      title: "Advanced Prompt Engineering",
      description: "Create powerful prompts that get better AI responses",
      duration: "25 min",
      difficulty: "Intermediate",
      completed: false
    },
    {
      id: 4,
      title: "AI Ethics and Best Practices",
      description: "Understand responsible AI usage and limitations",
      duration: "18 min",
      difficulty: "Beginner",
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-gray-800">
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
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">General AI Use</h1>
              <p className="text-xl text-gray-300">Master ChatGPT, Claude, and essential AI fundamentals</p>
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
              <h2 className="text-2xl font-bold text-white mb-4">Course Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                This comprehensive course covers the fundamentals of AI usage, focusing on popular tools like ChatGPT and Claude. 
                You'll learn effective prompting techniques, understand AI limitations, and discover best practices for integrating 
                AI into your daily workflow.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Tutorial Lessons</h3>
              <div className="space-y-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <PlayCircle className="h-6 w-6 text-white" />
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
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Start Tutorial
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
                <CardTitle className="text-white">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Completed</span>
                      <span className="text-white">0/4</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Complete all tutorials to earn your certificate
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Tools You'll Learn</CardTitle>
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
                      <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <span className="text-gray-300">Claude</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-gray-300">Google Gemini</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">
                  Stuck on a tutorial? Ask your AI companion for instant help and guidance.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Ask AI Companion
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
