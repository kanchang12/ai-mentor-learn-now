
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, PlayCircle, MessageSquare, Clock, Users, Star, Menu, X, ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">
                HowToUseAI.uk
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#video" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2">
                  Start Learning Free
                </Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-gray-800"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-2">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors py-2">Features</a>
                <a href="#video" className="text-gray-300 hover:text-white transition-colors py-2">How it Works</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2">Pricing</a>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors py-2">Login</Link>
                <Link to="/signup" className="py-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Start Learning Free
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Non-linear Design */}
      <section className="relative min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 -right-32 w-[600px] h-[400px] bg-purple-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 right-16 hidden lg:block">
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 transform rotate-6">
            <MessageSquare className="h-8 w-8 text-blue-400 mb-2" />
            <p className="text-white text-sm font-medium">AI Companion</p>
          </div>
        </div>
        
        <div className="absolute bottom-40 left-16 hidden lg:block">
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 transform -rotate-3">
            <Target className="h-8 w-8 text-purple-400 mb-2" />
            <p className="text-white text-sm font-medium">Track Progress</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3">
                <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-gray-200 text-sm font-medium">Free: 30 minutes daily • No credit card required</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Learn AI by
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Doing Real Projects
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed font-light max-w-lg">
                Master AI tools through hands-on YouTube tutorials with your personal AI companion. 
                Get instant help, track progress, and build real skills that matter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold shadow-xl">
                    Start Learning Free
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold border-gray-600 text-white hover:bg-gray-800/50 bg-transparent/50 backdrop-blur-sm">
                  Watch Demo
                  <PlayCircle className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Right Column - Video with Overlapping Elements */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 transform lg:rotate-2">
                <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto hover:bg-blue-700 transition-colors cursor-pointer">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Watch Our Introduction</h3>
                    <p className="text-gray-400 text-sm">
                      Add your YouTube video ID to replace this placeholder
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Overlapping Feature Cards */}
              <div className="absolute -bottom-8 -left-8 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 transform -rotate-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">30+ Tutorials</p>
                    <p className="text-gray-400 text-xs">Step by step guides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Asymmetrical Grid */}
      <section id="features" className="py-32 bg-gray-900 relative">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Everything You Need to Master AI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Learn through practical tutorials with an AI companion that answers your questions in real-time.
            </p>
          </div>

          {/* Non-linear Feature Grid */}
          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Large Feature Card */}
            <div className="lg:col-span-2 lg:row-span-2">
              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30 text-center hover:shadow-xl transition-all duration-300 h-full p-8">
                <CardHeader>
                  <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-white text-3xl font-bold">Video Tutorials</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-lg leading-relaxed mb-6">
                    Step-by-step YouTube tutorials covering everything from ChatGPT to Midjourney and business automation. 
                    Learn by doing real projects that you can add to your portfolio.
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-white font-semibold">30+ Tutorials</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-white font-semibold">6 Categories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Smaller Cards */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center hover:bg-gray-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl font-bold">AI Companion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  Get instant answers and personalized help from your AI companion while watching tutorials.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center hover:bg-gray-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl font-bold">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  Track your learning journey and build a portfolio of AI skills across 6 specialized categories.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Categories - Overlapping Layout */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              6 Learning Paths to Master AI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              From writing to image generation, learn the AI tools that matter most for your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              { title: "General AI Use", desc: "Master ChatGPT, Claude, and essential AI fundamentals", icon: "🤖", color: "blue", link: "/general" },
              { title: "Writing with AI", desc: "Blog posts, emails, and content creation mastery", icon: "✍️", color: "green", link: "/writing" },
              { title: "Image Generation", desc: "Midjourney, DALL-E, and visual AI creation", icon: "🎨", color: "purple", link: "/images" },
              { title: "Business Automation", desc: "Workflow automation and productivity tools", icon: "⚡", color: "yellow", link: "/business" },
              { title: "Data Analysis", desc: "AI-powered analytics and insights", icon: "📊", color: "red", link: "/data" },
              { title: "Website Development", desc: "Build websites with AI assistance", icon: "💻", color: "indigo", link: "/website" }
            ].map((category, index) => (
              <Link key={category.title} to={category.link}>
                <Card className={`bg-gray-800/30 backdrop-blur-sm border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 cursor-pointer group hover:shadow-xl ${index % 2 === 1 ? 'lg:mt-8' : ''}`}>
                  <CardHeader>
                    <div className={`w-20 h-20 bg-${category.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <CardTitle className="text-white text-xl font-bold">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">{category.desc}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Start free, upgrade when you're ready to accelerate your learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 relative hover:shadow-xl transition-all">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl text-white font-bold">Free</CardTitle>
                <div className="text-6xl font-black text-white my-8">
                  £0<span className="text-xl font-normal text-gray-400">/month</span>
                </div>
                <CardDescription className="text-gray-300 text-lg">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-gray-200 text-lg">30 minutes daily access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-gray-200 text-lg">All video tutorials</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-gray-200 text-lg">AI companion chat</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-gray-200 text-lg">Progress tracking</span>
                  </div>
                </div>
                <Link to="/signup" className="block">
                  <Button className="w-full mt-8 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 text-lg py-6 font-semibold" variant="outline">
                    Start Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30 relative shadow-2xl scale-105 hover:scale-110 transition-all">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl">
                  ⭐ Most Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8 pt-12">
                <CardTitle className="text-3xl text-white font-bold">Pro</CardTitle>
                <div className="text-6xl font-black text-white my-8">
                  £19<span className="text-xl font-normal text-gray-400">/month</span>
                </div>
                <CardDescription className="text-gray-300 text-lg">Unlimited learning and growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-white font-semibold text-lg">Unlimited access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-gray-200 text-lg">All video tutorials</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-gray-200 text-lg">Premium AI companion</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-gray-200 text-lg">Priority support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4" />
                    <span className="text-gray-200 text-lg">Early access to new content</span>
                  </div>
                </div>
                <Link to="/signup" className="block">
                  <Button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg py-6 shadow-xl">
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Ready to Master AI?
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light max-w-3xl mx-auto">
            Join thousands of learners building real AI skills through hands-on tutorials.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-8 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all">
              Start Your Free Trial
              <Zap className="ml-3 h-7 w-7" />
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-8 font-light">
            No credit card required • Start learning in under 60 seconds
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-bold text-white mb-6">
                HowToUseAI.uk
              </div>
              <p className="text-gray-400 leading-relaxed">
                Learn AI by doing real projects with expert tutorials and AI assistance.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-white">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-white">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HowToUseAI.uk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
