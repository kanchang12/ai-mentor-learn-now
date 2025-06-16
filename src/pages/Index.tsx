
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Sparkles, Brain, MessageSquare, Image, BarChart3, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                HowToUseAI.uk
              </span>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
              <Link to="/general" className="text-gray-700 hover:text-blue-600 font-medium">General</Link>
              <Link to="/writing" className="text-gray-700 hover:text-blue-600 font-medium">Writing</Link>
              <Link to="/images" className="text-gray-700 hover:text-blue-600 font-medium">Images</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 bg-gray-900 text-white rounded"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 bg-gray-900 rounded p-4">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-white hover:text-blue-300">Home</Link>
                <Link to="/dashboard" className="text-white hover:text-blue-300">Dashboard</Link>
                <Link to="/general" className="text-white hover:text-blue-300">General</Link>
                <Link to="/writing" className="text-white hover:text-blue-300">Writing</Link>
                <Link to="/images" className="text-white hover:text-blue-300">Images</Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <img 
              src="/placeholder.svg" 
              alt="AI Learning Header" 
              className="mx-auto max-w-lg h-32 object-contain"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <strong>Master AI with Your Personal Guide</strong>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-700 mb-8">
            AI Learning Made <span className="text-red-500">Simple & Effective</span>
          </h2>
          
          <Button 
            asChild
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-xl rounded-full"
          >
            <Link to="/signup">Start Learning - Get 20% Off</Link>
          </Button>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-gradient-to-br from-gray-100 to-blue-100 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="shadow-2xl border-0 overflow-hidden">
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
      </section>

      {/* Features Section */}
      <section className="bg-yellow-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 text-white px-6 py-3 rounded">
                  <h3 className="text-2xl font-bold">AI</h3>
                </div>
                <img src="/placeholder.svg" alt="AI Icon" className="h-12 w-12" />
                <div className="bg-green-500 text-white px-6 py-3 rounded">
                  <h3 className="text-2xl font-bold">Learning</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-700 mb-4">Master AI Tools & Techniques</h2>
            <h3 className="text-5xl font-black text-gray-900">Learn & <span className="text-red-500">Excel</span></h3>
            <Button 
              asChild
              className="mt-8 border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full"
            >
              <Link to="/signup">50% off on all courses!</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="/placeholder.svg" 
                  alt="ChatGPT Learning" 
                  className="w-full h-64 object-cover"
                />
              </CardContent>
            </Card>
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="/placeholder.svg" 
                    alt="Midjourney Training" 
                    className="w-full h-32 object-cover"
                  />
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="/placeholder.svg" 
                    alt="AI Tools" 
                    className="w-full h-32 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="bg-blue-100 py-16 rounded-3xl mx-6 mb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-700 mb-4">Interactive AI Guide</h2>
            <p className="text-gray-600 mb-8">
              Experience our AI reading your prompts and guiding you to write better requests
            </p>
            <Button 
              asChild
              className="border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-2 rounded-full text-sm"
            >
              <Link to="/dashboard">Try Interactive Guide!</Link>
            </Button>
          </div>
          
          <Card className="bg-purple-200 border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <iframe 
                src="https://howtouseai.uk" 
                className="w-full h-96 border-0"
                title="Live AI Chat Interface Demo"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-700 mb-4">Fresh Learning & <span className="text-red-500">Fresh Results</span></h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white rounded-3xl border-0 shadow-lg p-6 text-center">
              <div className="mb-4">
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Interactive Chat Guide</h3>
              <p className="text-gray-600 text-sm mb-4">Our AI reads your prompts and guides you to write better requests</p>
              <Button 
                asChild
                size="sm"
                className="border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white rounded-full"
              >
                <Link to="/general">Try Now</Link>
              </Button>
            </Card>

            <Card className="bg-white rounded-3xl border-0 shadow-lg p-6 text-center">
              <div className="mb-4">
                <Image className="h-12 w-12 text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Visual Learning</h3>
              <p className="text-gray-600 text-sm mb-4">Watch personalized video tutorials for each AI tool</p>
              <Button 
                asChild
                size="sm"
                className="border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white rounded-full"
              >
                <Link to="/images">Learn Visually</Link>
              </Button>
            </Card>

            <Card className="bg-white rounded-3xl border-0 shadow-lg p-6 text-center">
              <div className="mb-4">
                <BarChart3 className="h-12 w-12 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-600 text-sm mb-4">Monitor your AI learning journey with detailed tracking</p>
              <Button 
                asChild
                size="sm"
                className="border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white rounded-full"
              >
                <Link to="/dashboard">Track Progress</Link>
              </Button>
            </Card>

            <Card className="bg-white rounded-3xl border-0 shadow-lg p-6 text-center">
              <div className="mb-4">
                <Sparkles className="h-12 w-12 text-yellow-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">AI Mastery</h3>
              <p className="text-gray-600 text-sm mb-4">Master ChatGPT, Midjourney, and every AI tool you need</p>
              <Button 
                asChild
                size="sm"
                className="border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white rounded-full"
              >
                <Link to="/signup">Start Mastering</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 py-16 mx-6 rounded-3xl mb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Master AI?</h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands learning AI the smart way with personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/signup">Start Learning Free</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <Link to="/login">Already have an account?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
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
