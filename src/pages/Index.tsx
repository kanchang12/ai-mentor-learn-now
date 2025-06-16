
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PlayCircle, 
  Sparkles, 
  Brain, 
  MessageSquare, 
  Image, 
  BarChart3, 
  Menu,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    {
      id: "general",
      title: "General AI Use",
      description: "Master ChatGPT, Claude, and essential AI fundamentals",
      icon: <Brain className="h-8 w-8" />,
      color: "bg-[#6cae75]",
      borderColor: "border-[#6cae75]"
    },
    {
      id: "writing", 
      title: "Writing with AI",
      description: "Blog posts, emails, and content creation mastery",
      icon: <MessageSquare className="h-8 w-8" />,
      color: "bg-[#8b5cf6]",
      borderColor: "border-[#8b5cf6]"
    },
    {
      id: "images",
      title: "Image Generation", 
      description: "Midjourney, DALL-E, and visual AI creation",
      icon: <Image className="h-8 w-8" />,
      color: "bg-[#ffcfdf]",
      borderColor: "border-[#ffcfdf]"
    },
    {
      id: "business",
      title: "Business Automation",
      description: "Workflow automation and productivity tools", 
      icon: <BarChart3 className="h-8 w-8" />,
      color: "bg-[#fef9ed]",
      borderColor: "border-[#fef9ed]"
    },
    {
      id: "data",
      title: "Data Analysis",
      description: "AI-powered analytics and insights",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "bg-[#6cae75]",
      borderColor: "border-[#6cae75]"
    },
    {
      id: "website",
      title: "Website Development",
      description: "Build websites with AI assistance",
      icon: <Sparkles className="h-8 w-8" />,
      color: "bg-[#8b5cf6]",
      borderColor: "border-[#8b5cf6]"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-[Inter]">
      {/* Header */}
      <header className="bg-[#e9ecf1] border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center space-x-3">
              <Brain className="h-10 w-10 text-[#6cae75]" />
              <span className="text-2xl font-bold text-[#22201d]">
                HowToUseAI.uk
              </span>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-[#22201d] hover:text-[#6cae75] font-medium transition-colors">Home</Link>
              <Link to="/dashboard" className="text-[#22201d] hover:text-[#6cae75] font-medium transition-colors">Dashboard</Link>
              <Link to="/general" className="text-[#22201d] hover:text-[#6cae75] font-medium transition-colors">General</Link>
              <Link to="/writing" className="text-[#22201d] hover:text-[#6cae75] font-medium transition-colors">Writing</Link>
              <Link to="/images" className="text-[#22201d] hover:text-[#6cae75] font-medium transition-colors">Images</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 bg-[#22201d] text-white rounded-[20px]"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 bg-[#22201d] rounded-[20px] p-4">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-white hover:text-[#6cae75] transition-colors">Home</Link>
                <Link to="/dashboard" className="text-white hover:text-[#6cae75] transition-colors">Dashboard</Link>
                <Link to="/general" className="text-white hover:text-[#6cae75] transition-colors">General</Link>
                <Link to="/writing" className="text-white hover:text-[#6cae75] transition-colors">Writing</Link>
                <Link to="/images" className="text-white hover:text-[#6cae75] transition-colors">Images</Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#fef9ed] py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-[#22201d] mb-6 leading-tight">
                Learn AI Tools by <span className="text-[#6cae75]">Watching</span> & <span className="text-[#ee4023]">Doing</span>
              </h1>
              
              <h2 className="text-2xl text-[#22201d] mb-8 font-medium">
                Your AI companion + expert video tutorials
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  asChild
                  className="bg-[#ee4023] hover:bg-[#d63a1e] text-white px-8 py-4 text-lg rounded-[60px] font-medium"
                >
                  <Link to="/signup">Start Learning Free</Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  className="border-2 border-[#22201d] text-[#22201d] hover:bg-[#22201d] hover:text-white px-8 py-4 text-lg rounded-[60px] font-medium"
                >
                  <Link to="/dashboard">Watch Demo</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-[#22201d]">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-[#6cae75]" />
                  <span>1,200+ students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-[#ee4023]" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-[#8b5cf6]" />
                  <span>50+ hours content</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white rounded-[40px] shadow-2xl border-0 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-[#6cae75] to-[#8b5cf6] flex items-center justify-center relative">
                    <PlayCircle className="h-24 w-24 text-white hover:scale-110 transition-transform duration-300 cursor-pointer" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-[20px]">
                      <p className="text-sm font-semibold text-[#22201d]">🎬 How AI Learning Works</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-[#ee4023] text-white px-3 py-1 rounded-[20px] text-sm font-medium">
                      LIVE
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#22201d] mb-4">Master AI Tools & Techniques</h2>
            <p className="text-xl text-[#22201d] mb-8">Learn through interactive videos with AI guidance</p>
            
            <Badge className="bg-[#6cae75] text-white px-6 py-2 text-lg rounded-[30px] mb-8">
              🎯 50% off on all courses!
            </Badge>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/${category.id}`}>
                <Card className={`bg-white rounded-[20px] border-2 ${category.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full`}>
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 ${category.color} rounded-[20px] flex items-center justify-center mb-4 text-white`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl text-[#22201d] font-semibold">{category.title}</CardTitle>
                    <CardDescription className="text-[#22201d] opacity-70">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-[#e9ecf1] text-[#22201d]">
                        8-12 videos
                      </Badge>
                      <span className="text-sm text-[#22201d] opacity-70">Beginner friendly</span>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#22201d] text-[#22201d] hover:bg-[#22201d] hover:text-white rounded-[30px] font-medium">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-[#6cae75] py-16 mx-6 rounded-[40px] mb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Learning Path</h2>
            <p className="text-white/90 text-lg">Start free, upgrade when you're ready</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="bg-white rounded-[30px] border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-[#22201d] font-bold">Free</CardTitle>
                <div className="text-4xl font-bold text-[#22201d] mb-2">£0</div>
                <CardDescription className="text-[#22201d]">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#6cae75]" />
                    <span className="text-[#22201d]">30 minutes daily access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#6cae75]" />
                    <span className="text-[#22201d]">Basic AI chat support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#6cae75]" />
                    <span className="text-[#22201d]">Access to 3 categories</span>
                  </div>
                </div>
                <Button 
                  asChild
                  className="w-full border-2 border-[#22201d] bg-transparent text-[#22201d] hover:bg-[#22201d] hover:text-white rounded-[30px] font-medium mt-6"
                >
                  <Link to="/signup">Start Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-white rounded-[30px] border-0 shadow-lg border-2 border-[#ee4023] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#ee4023] text-white px-4 py-1 rounded-[20px]">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-4 pt-8">
                <CardTitle className="text-2xl text-[#22201d] font-bold">Pro</CardTitle>
                <div className="text-4xl font-bold text-[#22201d] mb-2">£19<span className="text-lg">/month</span></div>
                <CardDescription className="text-[#22201d]">Unlimited learning & premium features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#6cae75]" />
                    <span className="text-[#22201d]">Unlimited daily access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#6cae75]" />
                    <span className="text-[#22201d]">Premium AI companion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#6cae75]" />
                    <span className="text-[#22201d]">All 6 categories</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#6cae75]" />
                    <span className="text-[#22201d]">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#6cae75]" />
                    <span className="text-[#22201d]">Voice chat feature</span>
                  </div>
                </div>
                <Button 
                  asChild
                  className="w-full bg-[#ee4023] hover:bg-[#d63a1e] text-white rounded-[30px] font-medium mt-6"
                >
                  <Link to="/signup">Upgrade to Pro</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#fef9ed] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#22201d] mb-4">Ready to Master AI?</h2>
          <p className="text-[#22201d] text-lg mb-8 opacity-80">
            Join thousands learning AI the smart way with personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-[#ee4023] hover:bg-[#d63a1e] text-white px-8 py-4 text-lg font-semibold rounded-[60px]"
            >
              <Link to="/signup">Start Learning Free</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-[#22201d] text-[#22201d] hover:bg-[#22201d] hover:text-white px-8 py-4 text-lg rounded-[60px]"
            >
              <Link to="/login">Already have an account?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#6cae75] py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Brain className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">HowToUseAI.uk</span>
          </div>
          <p className="text-white/90 mb-6">Empowering everyone to master AI through interactive learning</p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-white/70">&copy; 2024 HowToUseAI.uk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
