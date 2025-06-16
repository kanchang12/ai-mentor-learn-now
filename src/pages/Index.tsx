
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

      {/* Hero Section - Non-linear overlapping design */}
      <section className="relative min-h-screen">
        {/* Background gradient blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl"></div>

        {/* Main hero content - positioned absolutely for non-linear layout */}
        <div className="absolute top-32 left-12 max-w-2xl z-20">
          <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30 mb-6">
            🚀 Learn AI in 2024
          </Badge>
          <h1 className="text-7xl font-black mb-8 leading-tight">
            Master AI
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              By Doing
            </span>
          </h1>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
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
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating video player - positioned to overlap */}
        <div className="absolute top-20 right-20 w-96 h-64 z-30">
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/40"></div>
                <PlayCircle className="h-16 w-16 text-white z-10 cursor-pointer hover:scale-110 transition-transform" />
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white font-semibold">How to Master ChatGPT</p>
                  <p className="text-gray-300 text-sm">12:34 • 2.1M views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating stats cards - overlapping design */}
        <div className="absolute bottom-32 left-20 z-30">
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">50K+</p>
                <p className="text-gray-400">Students Learning</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="absolute bottom-48 right-32 z-30">
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.9/5</p>
                <p className="text-gray-400">Student Rating</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features section - diagonal overlapping layout */}
      <section className="relative py-32 -mt-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section title positioned off-center */}
          <div className="mb-20 ml-20">
            <h2 className="text-5xl font-black mb-6">
              Why Choose
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                HowToUseAI?
              </span>
            </h2>
          </div>

          {/* Features in overlapping grid */}
          <div className="relative">
            {/* Feature 1 - top left */}
            <div className="absolute top-0 left-0 w-80 z-20">
              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-blue-600/30 p-8">
                <Brain className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">AI Companion</h3>
                <p className="text-gray-300">Get instant help and explanations while learning. Your personal AI tutor is always there.</p>
              </Card>
            </div>

            {/* Feature 2 - center right, overlapping */}
            <div className="absolute top-16 right-20 w-80 z-30">
              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border-purple-600/30 p-8">
                <Zap className="h-12 w-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Hands-On Learning</h3>
                <p className="text-gray-300">Build real projects while learning. No theory-only courses - practice with actual AI tools.</p>
              </Card>
            </div>

            {/* Feature 3 - bottom left, overlapping */}
            <div className="absolute top-32 left-40 w-80 z-25">
              <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-xl border-green-600/30 p-8">
                <TrendingUp className="h-12 w-12 text-green-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Track Progress</h3>
                <p className="text-gray-300">See your learning journey with detailed analytics and achievements to keep you motivated.</p>
              </Card>
            </div>

            {/* Feature 4 - far right */}
            <div className="absolute top-48 right-0 w-80 z-20">
              <Card className="bg-gradient-to-br from-yellow-600/20 to-red-600/20 backdrop-blur-xl border-yellow-600/30 p-8">
                <Sparkles className="h-12 w-12 text-yellow-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Latest AI Tools</h3>
                <p className="text-gray-300">Stay updated with the newest AI tools and techniques. Content updated weekly.</p>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Spacer for overlapping content */}
        <div className="h-96"></div>
      </section>

      {/* Categories preview - asymmetric layout */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-yellow-500 bg-clip-text text-transparent">
                Master Every AI Tool
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From ChatGPT basics to advanced automation - we cover everything you need to become an AI expert.
            </p>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-12 gap-6 h-96">
            <Link to="/general" className="col-span-4 row-span-2">
              <Card className="h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-blue-600/30 p-8 hover:scale-105 transition-all cursor-pointer">
                <div className="text-6xl mb-6">🤖</div>
                <h3 className="text-2xl font-bold text-white mb-4">General AI</h3>
                <p className="text-gray-300">Master ChatGPT, Claude & AI fundamentals</p>
                <Badge className="mt-4 bg-blue-600 text-white">12 Tutorials</Badge>
              </Card>
            </Link>

            <Link to="/writing" className="col-span-4">
              <Card className="h-full bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-xl border-green-600/30 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-bold text-white mb-2">Writing</h3>
                <p className="text-gray-300 text-sm">Content creation mastery</p>
              </Card>
            </Link>

            <Link to="/images" className="col-span-4">
              <Card className="h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border-purple-600/30 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">Images</h3>
                <p className="text-gray-300 text-sm">Midjourney & DALL-E</p>
              </Card>
            </Link>

            <Link to="/business" className="col-span-3">
              <Card className="h-full bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-xl border-yellow-600/30 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-bold text-white mb-2">Business</h3>
                <p className="text-gray-300 text-xs">Automation</p>
              </Card>
            </Link>

            <Link to="/data" className="col-span-3">
              <Card className="h-full bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-xl border-red-600/30 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-white mb-2">Data</h3>
                <p className="text-gray-300 text-xs">Analytics</p>
              </Card>
            </Link>

            <Link to="/website" className="col-span-2">
              <Card className="h-full bg-gradient-to-br from-teal-600/20 to-blue-600/20 backdrop-blur-xl border-teal-600/30 p-6 hover:scale-105 transition-all cursor-pointer">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-lg font-bold text-white mb-2">Web</h3>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - overlapping design */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-black mb-8">
            Ready to Become an
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              AI Expert?
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12">
            Join thousands of learners mastering AI through hands-on practice
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-6 text-xl">
                Start Learning Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating testimonial card */}
        <div className="absolute bottom-10 right-10 max-w-sm z-20">
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700 p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <div>
                <p className="text-white font-semibold">Sarah Chen</p>
                <p className="text-gray-400 text-sm">Marketing Director</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm italic">
              "Transformed my workflow completely. Now I use AI for everything - from content creation to data analysis."
            </p>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </Card>
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
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HowToUseAI.uk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
