
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Sparkles, Brain, MessageSquare, Image, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Header */}
      <header className="p-6 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HowToUseAI.uk
            </span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Sparkles className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master AI with Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Personal Guide</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Watch our demo below, then let our intelligent AI guide you step-by-step through learning ChatGPT, Midjourney, and every AI tool you need to succeed.
          </p>
        </div>

        {/* Main Demo Video */}
        <div className="mb-20">
          <Card className="max-w-5xl mx-auto shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors"></div>
                <PlayCircle className="h-24 w-24 text-white group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">🎬 How HowToUseAI Works - Full Demo</p>
                </div>
                <div className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  LIVE
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Your AI Learning Experience
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Interactive guidance for every AI tool and technique
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interactive Chat Guide</h3>
                <p className="text-gray-600">Our AI reads your prompts and guides you to write better, more effective requests</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Image className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Visual Learning</h3>
                <p className="text-gray-600">Watch personalized video tutorials for each AI tool and technique</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-gray-600">Monitor your AI learning journey with detailed progress tracking</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live AI Interface Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Try Our AI Guide Live
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Experience real-time AI guidance in action
          </p>
          <Card className="max-w-5xl mx-auto shadow-2xl border-0">
            <CardContent className="p-0">
              <iframe 
                src="https://howtouseai.uk" 
                className="w-full h-[600px] border-0 rounded-lg"
                title="Live AI Chat Interface Demo"
              />
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Master AI?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands learning AI the smart way with personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Start Learning Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">HowToUseAI.uk</span>
          </div>
          <p className="text-gray-600">&copy; 2024 HowToUseAI.uk. Empowering everyone to master AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
