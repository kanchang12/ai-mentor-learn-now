
import { useState, useEffect } from "react";
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
  Sparkles,
  Mic,
  MicOff,
  Image as ImageIcon,
  Type
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { UsageMeter } from "@/components/UsageMeter";
import { AffiliateCard } from "@/components/AffiliateCard";
import { supabase } from "@/integrations/supabase/client";

const General = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationType, setGenerationType] = useState<'text' | 'image'>('text');
  const [chatMessage, setChatMessage] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { usageMinutes, isLimitReached, loading, trackUsage, trackAffiliateClick, remainingMinutes } = useUsageTracking('general');
  
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message: "Hello! I'm your AI assistant powered by multiple models. I can help with text generation and image creation. What would you like to explore?",
      timestamp: "Just now"
    }
  ]);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
      };

      recognition.start();
    }
  };

  const generateResponse = async () => {
    if (!prompt.trim() || isLimitReached) return;

    setIsGenerating(true);
    setResponse("");
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('replicate-generate', {
        body: { 
          prompt, 
          type: generationType 
        }
      });

      if (error) throw error;

      if (generationType === 'image') {
        setGeneratedImage(data.output[0]);
      } else {
        setResponse(Array.isArray(data.output) ? data.output.join('') : data.output);
      }

      await trackUsage(2);
    } catch (error) {
      console.error('Generation error:', error);
      setResponse("Sorry, there was an error generating the response. Please try again.");
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
        message: "I can help guide you through using various AI tools. Try the demo above, or check out the recommended tools on the right for more advanced features!",
        timestamp: "Just now"
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#22201d]">General AI Assistant</h1>
                  <p className="text-sm text-[#22201d] opacity-70">Powered by Replicate & OpenAI APIs</p>
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
            {/* AI Demo */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#22201d] flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-[#6cae75]" />
                  AI Assistant Demo
                </CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  Try our AI assistant powered by multiple models. Generate text or images!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant={generationType === 'text' ? 'default' : 'outline'}
                    onClick={() => setGenerationType('text')}
                    className={generationType === 'text' ? 'bg-[#6cae75] hover:bg-[#5a9d64]' : ''}
                  >
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button
                    variant={generationType === 'image' ? 'default' : 'outline'}
                    onClick={() => setGenerationType('image')}
                    className={generationType === 'image' ? 'bg-[#6cae75] hover:bg-[#5a9d64]' : ''}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Textarea
                    placeholder={generationType === 'text' 
                      ? "Ask me anything... (e.g., 'Explain quantum computing', 'Write a poem about AI')"
                      : "Describe an image... (e.g., 'A futuristic city at sunset', 'A cute robot playing guitar')"
                    }
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 min-h-[100px] text-[#22201d]"
                    disabled={isLimitReached}
                  />
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={startListening}
                      variant="outline"
                      size="sm"
                      disabled={isListening || isLimitReached}
                      className="border-gray-300"
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button 
                      onClick={generateResponse}
                      disabled={!prompt.trim() || isGenerating || isLimitReached}
                      className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
                    >
                      {isGenerating ? "Generating..." : `Generate ${generationType}`}
                    </Button>
                  </div>
                </div>
                
                {response && generationType === 'text' && (
                  <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
                    <h4 className="font-medium text-[#22201d] mb-2">AI Response:</h4>
                    <p className="text-[#22201d] whitespace-pre-wrap">{response}</p>
                  </div>
                )}

                {generatedImage && generationType === 'image' && (
                  <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
                    <h4 className="font-medium text-[#22201d] mb-2">Generated Image:</h4>
                    <img 
                      src={generatedImage} 
                      alt="Generated" 
                      className="max-w-full h-auto rounded-lg"
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
                      <CardTitle className="text-base text-[#22201d]">AI Guide</CardTitle>
                      <CardDescription className="text-xs text-[#22201d] opacity-70">Get help using AI tools</CardDescription>
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
                      placeholder="Ask about AI tools..."
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
              title="Replicate API"
              description="Access 100+ AI models with one API. Perfect for developers and businesses."
              features={[
                "100+ pre-trained models",
                "Custom model hosting", 
                "Pay-per-use pricing",
                "Enterprise-grade infrastructure"
              ]}
              ctaText="Get Full Access"
              affiliateUrl="https://replicate.com/pricing"
              commission="Revenue share"
              rating={4.8}
              onAffiliateClick={trackAffiliateClick}
              service="replicate"
            />

            <AffiliateCard
              title="OpenAI API"
              description="Access GPT-4, DALL-E, and more powerful AI models for your applications."
              features={[
                "GPT-4 & GPT-3.5 Turbo",
                "DALL-E image generation",
                "Whisper speech-to-text", 
                "Function calling"
              ]}
              ctaText="Start Building"
              affiliateUrl="https://platform.openai.com/signup"
              commission="Usage credits"
              rating={4.9}
              onAffiliateClick={trackAffiliateClick}
              service="openai"
            />

            <Card className="bg-gradient-to-br from-[#6cae75]/10 to-[#5a9d64]/10 border border-[#6cae75]/30 rounded-[20px]">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-[#22201d] mb-2">Need More Time?</h3>
                <p className="text-sm text-[#22201d] opacity-70 mb-3">
                  Upgrade to unlimited daily usage and access premium features.
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

export default General;
