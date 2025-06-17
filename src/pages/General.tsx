
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useToast } from "@/hooks/use-toast";

const General = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { trackAffiliateClick } = useUsageTracking('general');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "Error", 
        description: "Please enter your Perplexity API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setResponse("");
    
    try {
      const apiResponse = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'Be precise and concise.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`API request failed: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error calling Perplexity API:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Perplexity API Key</label>
        <Textarea
          placeholder="Enter your Perplexity API key..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="min-h-[60px] text-[#22201d]"
          type="password"
        />
      </div>
      
      <Textarea
        placeholder="Ask AI anything... (e.g., 'Write a professional email', 'Explain quantum computing', 'Help me plan a vacation')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      <Button 
        onClick={handleSubmit}
        disabled={!prompt.trim() || !apiKey.trim() || isLoading}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isLoading ? "AI is thinking..." : "Ask AI"}
      </Button>
      
      {response && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">AI Response:</h4>
          <p className="text-[#22201d] opacity-80">{response}</p>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="general"
      title="General AI Chat"
      description="Your AI assistant for any task"
      icon={<MessageSquare className="h-5 w-5 text-blue-600" />}
      videoId="QH2-TGUlwu4"
      videoTitle="Master ChatGPT in 15 Minutes"
      videoDescription="Learn how to write perfect prompts and get amazing results from AI"
      demoTitle="Try AI Chat"
      demoDescription="Ask AI anything and get instant intelligent responses"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Perplexity Pro"
        description="Get access to Claude-3, GPT-4, and real-time web search capabilities."
        features={[
          "Access to Claude-3 and GPT-4",
          "Real-time web search",
          "Unlimited usage",
          "Priority support"
        ]}
        ctaText="Get Perplexity Pro"
        affiliateUrl="https://www.perplexity.ai/pro"
        commission="Commission available"
        rating={4.8}
        onAffiliateClick={trackAffiliateClick}
        service="perplexity"
      />
    </CategoryPageLayout>
  );
};

export default General;
