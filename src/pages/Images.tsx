
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, CheckCircle, ArrowLeft, Image } from "lucide-react";
import { Link } from "react-router-dom";

const Images = () => {
  const tutorials = [
    {
      id: 1,
      title: "Midjourney Mastery",
      description: "Create stunning images with advanced Midjourney prompting techniques",
      duration: "25 min",
      difficulty: "Beginner",
      completed: false
    },
    {
      id: 2,
      title: "DALL-E 3 Professional Usage",
      description: "Generate high-quality images for business and creative projects",
      duration: "20 min",
      difficulty: "Intermediate",
      completed: false
    },
    {
      id: 3,
      title: "Stable Diffusion Setup",
      description: "Install and configure Stable Diffusion for unlimited image generation",
      duration: "30 min",
      difficulty: "Advanced",
      completed: false
    },
    {
      id: 4,
      title: "Image Editing with AI",
      description: "Enhance and modify images using AI-powered editing tools",
      duration: "18 min",
      difficulty: "Intermediate",
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-b border-gray-800">
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
            <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🎨</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Image Generation</h1>
              <p className="text-xl text-gray-300">Midjourney, DALL-E, and visual AI creation</p>
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
              <h2 className="text-2xl font-bold text-white mb-4">Create Stunning Visuals with AI</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Master the art of AI image generation. Learn to create professional-quality images, artwork, 
                and designs using cutting-edge AI tools. From concept to creation, become a visual AI expert.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Image Generation Tutorials</h3>
              <div className="space-y-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                            <Image className="h-6 w-6 text-white" />
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
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Start Creating
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
                <CardTitle className="text-white">Creation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Completed</span>
                      <span className="text-white">0/4</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Build your AI art portfolio
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI Art Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <span className="text-gray-300">Midjourney</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">D</span>
                    </div>
                    <span className="text-gray-300">DALL-E 3</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <span className="text-gray-300">Stable Diffusion</span>
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

export default Images;
