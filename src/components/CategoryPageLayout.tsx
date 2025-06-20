import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { UsageMeter } from "./UsageMeter";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { AffiliateCard } from "./AffiliateCard";
import { VoiceAgent } from "./VoiceAgent";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CategoryPageLayoutProps {
  category: string;
  children?: React.ReactNode;
  affiliateCards?: Array<{
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    service: string;
    features?: string[];
  }>;
  // Allow additional props that pages might pass
  [key: string]: any;
}

export const CategoryPageLayout = ({ category, children, affiliateCards, ...props }: CategoryPageLayoutProps) => {
  const { getPageContent } = useContent();
  const { 
    usageMinutes, 
    isLimitReached, 
    loading: usageLoading, 
    hasUnlimitedAccess, 
    trackUsage, 
    trackAffiliateClick 
  } = useUsageTracking(category);
  const { toast } = useToast();
  
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const content = getPageContent(category);

  // Function to call the appropriate AI service using the unified ai-services function
  const callAIService = async (prompt: string) => {
    try {
      let serviceName = '';
      let requestBody: any = { prompt };
      
      switch (category) {
        case 'general':
          serviceName = 'perplexity-chat';
          requestBody = { message: prompt };
          break;
        case 'writing':
          serviceName = 'perplexity-writing';
          requestBody = { prompt, writingType: 'general' };
          break;
        case 'images':
          serviceName = 'leonardo-generate';
          requestBody = { prompt };
          break;
        case 'data':
          serviceName = 'claude-analyze';
          requestBody = { prompt };
          break;
        default:
          serviceName = 'perplexity-chat';
          requestBody = { message: prompt };
      }

      console.log(`Calling AI service: ${serviceName} with:`, requestBody);

      const { data, error } = await supabase.functions.invoke(serviceName, {
        body: requestBody
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('AI service response:', data);
      
      // Handle different response formats
      if (category === 'images' && data?.generationId) {
        return `Image generation started! Generation ID: ${data.generationId}. ${data.message || 'Please check back in a moment for your generated image.'}`;
      }
      
      return data?.response || data?.result || data?.message || 'AI response received successfully';
    } catch (error) {
      console.error('AI service error:', error);
      
      // Provide helpful error messages based on the error
      if (error.message?.includes('not configured')) {
        return `${category} AI service is not configured yet. Please go to the Admin panel and add your API keys for the services to work properly.`;
      }
      
      return `AI service for ${category} is currently being set up. Please add your API keys in the Admin panel, or contact support if the issue persists.`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasUnlimitedAccess && isLimitReached) {
      toast({
        title: "Daily Limit Reached",
        description: "You've reached your 30-minute daily limit. Upgrade to Pro for unlimited access!",
        variant: "destructive",
      });
      return;
    }

    if (!input.trim()) return;

    setIsLoading(true);

    try {
      const aiResponse = await callAIService(input);
      setResponse(aiResponse);
      
      // Track usage time (simulate 1 minute per request for demo)
      const usedMinutes = 1;
      await trackUsage(usedMinutes);
      
    } catch (error) {
      console.error('Error processing request:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <UsageMeter 
              usageMinutes={usageMinutes} 
              isLimitReached={isLimitReached} 
              loading={usageLoading}
              hasUnlimitedAccess={hasUnlimitedAccess}
            />
          </div>
          <h1 className="text-3xl font-black text-[#22201d]">{content.title}</h1>
          <p className="text-[#22201d] opacity-70 mt-2">{content.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Video Section */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 rounded-[20px] overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    src={content.videoUrl}
                    title={content.videoTitle}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#22201d] mb-2">{content.videoTitle}</h3>
                  <p className="text-[#22201d] opacity-70">{content.videoDescription}</p>
                </div>
              </CardContent>
            </Card>

            {/* Voice Agent */}
            <VoiceAgent pageContext={category} />
          </div>

          {/* AI Chat Section */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 rounded-[20px]">
              <CardHeader>
                <CardTitle className="text-[#22201d]">AI Assistant</CardTitle>
                <CardDescription>Ask questions and get instant help with {category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    placeholder={`Ask me anything about ${category}...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[100px] resize-none border-gray-200 focus:border-[#6cae75] focus:ring-[#6cae75]"
                    disabled={!hasUnlimitedAccess && isLimitReached}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || (!hasUnlimitedAccess && isLimitReached)} 
                    className="w-full bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {!hasUnlimitedAccess && isLimitReached ? 'Upgrade to Continue' : 'Send Message'}
                      </>
                    )}
                  </Button>
                </form>

                {!hasUnlimitedAccess && isLimitReached && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">
                      You've reached your daily 30-minute limit. 
                      <Link to="/billing" className="underline font-medium ml-1">
                        Upgrade to Pro
                      </Link> for unlimited access!
                    </p>
                  </div>
                )}

                {response && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-[#22201d] text-sm whitespace-pre-wrap">{response}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Custom children content */}
            {children}
          </div>
        </div>

        {/* Affiliate Cards */}
        {affiliateCards && affiliateCards.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#22201d] mb-8 text-center">Recommended Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {affiliateCards.map((card, index) => (
                <AffiliateCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  features={card.features || []}
                  ctaText={card.buttonText}
                  affiliateUrl={card.buttonUrl}
                  service={card.service}
                  onAffiliateClick={() => trackAffiliateClick(card.service)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
