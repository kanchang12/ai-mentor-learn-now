
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  MessageSquare,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Image as ImageIcon,
  Sparkles,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { UsageMeter } from "@/components/UsageMeter";
import { AffiliateCard } from "@/components/AffiliateCard";
import { supabase } from "@/integrations/supabase/client";

const Images = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const { usageMinutes, isLimitReached, loading, trackUsage, trackAffiliateClick } = useUsageTracking('images');
  
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message: "Hello! I'm your AI companion for image generation. I can help you understand Midjourney, DALL-E, Stability AI and other AI art tools. What would you like to create?",
      timestamp: "Just now"
    }
  ]);

  const generateImage = async () => {
    if (!prompt.trim() || isLimitReached) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('stability-generate', {
        body: { prompt }
      });

      if (error) throw error;

      setGeneratedImage(data.output[0]);
      await trackUsage(3); // Image generation takes more time
    } catch (error) {
      console.error('Image generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      message: chatMessage,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setChatMessage("");

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai", 
        message: "That's a great question about AI image generation! Here are some key techniques and tips you should know...",
        timestamp: "Just now"
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75] hover:bg-[#e9ecf1]">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#22201d]">Image Generation</h1>
                  <p className="text-sm text-[#22201d] opacity-70">Powered by Stability AI & DALL-E</p>
                </div>
              </div>
            </div>

            <UsageMeter 
              usageMinutes={usageMinutes} 
              isLimitReached={isLimitReached} 
              loading={loading} 
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Demo Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Generation Demo */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#22201d] flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-[#6cae75]" />
                  AI Image Generator
                </CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  Create stunning images using Stability AI's advanced models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Describe your image... (e.g., 'A futuristic city at sunset with flying cars', 'Portrait of a wise old wizard')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 min-h-[100px] text-[#22201d]"
                    disabled={isLimitReached}
                  />
                  <div className="flex flex-col justify-end">
                    <Button 
                      onClick={generateImage}
                      disabled={!prompt.trim() || isGenerating || isLimitReached}
                      className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
                    >
                      {isGenerating ? "Generating..." : "Generate Image"}
                    </Button>
                  </div>
                </div>
                
                {generatedImage && (
                  <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[#22201d]">Generated Image:</h4>
                      <Button
                        onClick={downloadImage}
                        variant="outline"
                        size="sm"
                        className="border-gray-300"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <img 
                      src={generatedImage} 
                      alt="Generated" 
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {isLimitReached && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                      You've reached your daily limit of 30 minutes. Upgrade for unlimited access!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Chat Interface */}
            <Card className={`bg-white border border-gray-200 rounded-[20px] shadow-lg transition-all duration-300 ${chatMinimized ? 'h-16' : 'h-96'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6cae75] to-[#5a9d64] rounded-lg flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-[#22201d]">AI Art Assistant</CardTitle>
                      <CardDescription className="text-xs text-[#22201d] opacity-70">Ask questions about AI image generation</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatMinimized(!chatMinimized)}
                    className="text-[#22201d] opacity-70 hover:text-[#22201d] hover:bg-[#e9ecf1]"
                  >
                    {chatMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>

              {!chatMinimized && (
                <CardContent className="pt-0 pb-3">
                  <ScrollArea className="h-48 mb-4">
                    <div className="space-y-3">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-start space-x-2 max-w-[80%] ${
                            msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              msg.sender === 'user' 
                                ? 'bg-[#6cae75]' 
                                : 'bg-gradient-to-br from-[#6cae75] to-[#5a9d64]'
                            }`}>
                              {msg.sender === 'user' ? (
                                <User className="h-3 w-3 text-white" />
                              ) : (
                                <Bot className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className={`p-2 rounded-lg text-sm ${
                              msg.sender === 'user'
                                ? 'bg-[#6cae75] text-white'
                                : 'bg-[#e9ecf1] text-[#22201d]'
                            }`}>
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about AI image generation..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      className="text-sm bg-white border-gray-300 text-[#22201d] placeholder:text-[#22201d] placeholder:opacity-50"
                    />
                    <Button size="sm" onClick={sendChatMessage} className="bg-[#6cae75] hover:bg-[#5a9d64]">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar with Affiliate Tools */}
          <div className="space-y-6">
            <AffiliateCard
              title="Stability AI"
              description="Professional AI image generation with SDXL and advanced models."
              features={[
                "SDXL & SD3 models",
                "Commercial usage rights",
                "API access included",
                "High-resolution outputs"
              ]}
              ctaText="Get API Access"
              affiliateUrl="https://platform.stability.ai/pricing"
              commission="Revenue share"
              rating={4.7}
              onAffiliateClick={trackAffiliateClick}
              service="stability"
            />

            <AffiliateCard
              title="Midjourney"
              description="The most popular AI art generator with stunning artistic capabilities."
              features={[
                "Best-in-class image quality",
                "Artistic style variations",
                "Community features",
                "Commercial licensing"
              ]}
              ctaText="Subscribe Now"
              affiliateUrl="https://www.midjourney.com/account/"
              commission="Referral bonus"
              rating={4.9}
              onAffiliateClick={trackAffiliateClick}
              service="midjourney"
            />

            <Card className="bg-gradient-to-br from-[#6cae75]/10 to-[#5a9d64]/10 border border-[#6cae75]/30 rounded-[20px]">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-[#22201d] mb-2">Upgrade for More</h3>
                <p className="text-sm text-[#22201d] opacity-70 mb-3">
                  Get unlimited generations and access to premium models.
                </p>
                <Button className="w-full bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
