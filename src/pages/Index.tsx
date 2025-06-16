
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            HowToUseAI.uk
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Start Learning</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Learn AI with Your Personal Guide
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Watch our demo, then let our AI guide you step-by-step through learning ChatGPT, Midjourney, and other AI tools.
          </p>
        </div>

        {/* Video Demo Section */}
        <div className="mb-20">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center relative">
                <PlayCircle className="h-20 w-20 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors" />
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded">
                  <p className="text-sm font-medium">Demo: How HowToUseAI Works</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Interface Preview */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your AI Guide in Action
          </h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <iframe 
                src="https://howtouseai.uk" 
                className="w-full h-96 border-0 rounded-lg"
                title="AI Chat Interface Demo"
              />
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let our AI guide you through your AI learning journey
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">&copy; 2024 HowToUseAI.uk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
