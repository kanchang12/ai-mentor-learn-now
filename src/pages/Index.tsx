
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Star, Users, Clock, TrendingUp, Zap, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            HowToUseAI.uk
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-blue-400">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6">
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-600/30 text-blue-300 border-blue-400/50 mb-6">
                🚀 Learn AI in 2024
              </Badge>
              <h1 className="text-6xl font-black mb-8 leading-tight text-white">
                Master AI
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  By Doing
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Learn ChatGPT, Midjourney, and 20+ AI tools through hands-on projects. 
                Your AI companion guides you every step.
              </p>
              <div className="flex space-x-6">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg">
                    <PlayCircle className="mr-3 h-6 w-6" />
                    Start Free Trial
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-gray-500 text-white hover:bg-gray-800 px-8 py-4 text-lg">
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-6">
              <Card className="bg-gray-900/90 backdrop-blur-xl border-gray-700">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
                    <PlayCircle className="h-16 w-16 text-white cursor-pointer hover:scale-110 transition-transform" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-semibold">How to Master ChatGPT</p>
                      <p className="text-gray-300 text-sm">12:34 • 2.1M views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-900/90 backdrop-blur-xl border-gray-700 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">50K+</p>
                      <p className="text-gray-300">Students</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-gray-900/90 backdrop-blur-xl border-gray-700 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">4.9/5</p>
                      <p className="text-gray-300">Rating</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-white">
              Why Choose
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                HowToUseAI?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-900/90 backdrop-blur-xl border-blue-500/50 p-8">
              <Brain className="h-12 w-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">AI Companion</h3>
              <p className="text-gray-300">Get instant help and explanations while learning. Your personal AI tutor is always there.</p>
            </Card>

            <Card className="bg-gray-900/90 backdrop-blur-xl border-purple-500/50 p-8">
              <Zap className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Hands-On Learning</h3>
              <p className="text-gray-300">Build real projects while learning. No theory-only courses - practice with actual AI tools.</p>
            </Card>

            <Card className="bg-gray-900/90 backdrop-blur-xl border-green-500/50 p-8">
              <TrendingUp className="h-12 w-12 text-green-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Track Progress</h3>
              <p className="text-gray-300">See your learning journey with detailed analytics and achievements to keep you motivated.</p>
            </Card>

            <Card className="bg-gray-900/90 backdrop-blur-xl border-yellow-500/50 p-8">
              <Sparkles className="h-12 w-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Latest AI Tools</h3>
              <p className="text-gray-300">Stay updated with the newest AI tools and techniques. Content updated weekly.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-white">
              <span className="bg-gradient-to-r from-pink-400 to-yellow-500 bg-clip-text text-transparent">
                Master Every AI Tool
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From ChatGPT basics to advanced automation - we cover everything you need to become an AI expert.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/general" className="md:col-span-2">
              <Card className="h-full bg-gray-900/90 backdrop-blur-xl border-blue-500/50 p-8 hover:scale-105 transition-all cursor-pointer">
                <div className="text-6xl mb-6">🤖</div>
                <h3 className="text-2xl font-bold text-white mb-4">General AI</h3>
                <p className="text-gray-300">Master ChatGPT, Claude & AI fundamentals</p>
                <Badge className="mt-4 bg-blue-600 text-white">12 Tutorials</Badge>
              </Card>
            </Link>

            <Link to="/writing">
              <Card className="h-full bg-gray-900/90 backdrop-blur-xl border-green-500/50 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-bold text-white mb-2">Writing</h3>
                <p className="text-gray-300 text-sm">Content creation mastery</p>
                <Badge className="mt-4 bg-green-600 text-white">8 Tutorials</Badge>
              </Card>
            </Link>

            <Link to="/images">
              <Card className="h-full bg-gray-900/90 backdrop-blur-xl border-purple-500/50 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">Images</h3>
                <p className="text-gray-300 text-sm">Midjourney & DALL-E</p>
                <Badge className="mt-4 bg-purple-600 text-white">6 Tutorials</Badge>
              </Card>
            </Link>

            <Link to="/business">
              <Card className="h-full bg-gray-900/90 backdrop-blur-xl border-yellow-500/50 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-bold text-white mb-2">Business</h3>
                <p className="text-gray-300 text-xs">Automation tools</p>
                <Badge className="mt-4 bg-yellow-600 text-white">10 Tutorials</Badge>
              </Card>
            </Link>

            <Link to="/data">
              <Card className="h-full bg-gray-900/90 backdrop-blur-xl border-red-500/50 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-white mb-2">Data</h3>
                <p className="text-gray-300 text-xs">Analytics & insights</p>
                <Badge className="mt-4 bg-red-600 text-white">7 Tutorials</Badge>
              </Card>
            </Link>

            <Link to="/website">
              <Card className="h-full bg-gray-900/90 backdrop-blur-xl border-teal-500/50 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-lg font-bold text-white mb-2">Website</h3>
                <p className="text-gray-300 text-xs">Web development</p>
                <Badge className="mt-4 bg-teal-600 text-white">5 Tutorials</Badge>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-black mb-8 text-white">
            Ready to Become an
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              AI Expert?
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12">
            Join thousands of learners mastering AI through hands-on practice
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-6 text-xl">
              Start Learning Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
                HowToUseAI.uk
              </div>
              <p className="text-gray-400">
                Master AI tools through hands-on learning with your personal AI companion.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Courses</h4>
              <div className="space-y-2 text-gray-400">
                <Link to="/general" className="block hover:text-white">General AI</Link>
                <Link to="/writing" className="block hover:text-white">Writing</Link>
                <Link to="/images" className="block hover:text-white">Images</Link>
                <Link to="/business" className="block hover:text-white">Business</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-gray-400">
                <Link to="/dashboard" className="block hover:text-white">Dashboard</Link>
                <Link to="/billing" className="block hover:text-white">Pricing</Link>
                <a href="#" className="block hover:text-white">Community</a>
                <a href="#" className="block hover:text-white">Support</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white">Twitter</a>
                <a href="#" className="block hover:text-white">YouTube</a>
                <a href="#" className="block hover:text-white">Discord</a>
                <a href="#" className="block hover:text-white">Newsletter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 HowToUseAI.uk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
