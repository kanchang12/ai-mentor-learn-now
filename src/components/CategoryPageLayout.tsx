
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
      let requestBody: any = {};
      
      // Map categories to service names and prepare request bodies
      switch (category) {
        case 'general':
          serviceName = 'perplexity-chat';
          requestBody = { service: serviceName, message: prompt };
          break;
        case 'writing':
          serviceName = 'perplexity-writing';
          requestBody = { service: serviceName, prompt, writingType: 'general' };
          break;
        case 'images':
          serviceName = 'leonardo-generate';
          requestBody = { service: serviceName, prompt };
          break;
        case 'data':
          serviceName = 'claude-analyze';
          requestBody = { service: serviceName, prompt };
          break;
        default:
          serviceName = 'perplexity-chat';
          requestBody = { service: serviceName, message: prompt };
      }

      console.log(`Calling AI service: ${serviceName} with request:`, requestBody);

      const { data, error } = await supabase.functions.invoke('ai-services', {
        body: requestBody
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Service call failed');
      }

      console.log('AI service response:', data);
      
      // Handle different response formats
      if (data?.error) {
        throw new Error(data.error);
      }
      
      if (category === 'images' && data?.generationId) {
        return data.response || `Image generation started! Generation ID: ${data.generationId}. ${data.message || 'Please check back in a moment for your generated image.'}`;
      }
      
      return data?.response || data?.result || data?.message || 'AI response received successfully';
      
    } catch (error) {
      console.error('AI service error:', error);
      
      // Provide specific error messages
      const errorMessage = error.message || 'Unknown error occurred';
      
      if (errorMessage.includes('not configured')) {
        return `The ${category} AI service requires API keys to be configured. Please contact your administrator to set up the necessary API keys in the Admin panel.`;
      }
      
      if (errorMessage.includes('Database error') || errorMessage.includes('not found')) {
        return `The ${category} AI service is not properly configured. Please ensure API keys are set in the Admin panel.`;
      }
      
      return `Error with ${category} AI service: ${errorMessage}. Please try again or contact support.`;
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
      const aiResponse = await callAIService(input.trim());
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
      setResponse("Sorry, there was an error processing your request. Please try again.");
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
