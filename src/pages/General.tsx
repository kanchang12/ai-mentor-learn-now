
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";

const General = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { trackAffiliateClick } = useUsageTracking('general');

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse("");
    
    setTimeout(() => {
      setResponse("This is a demo response from the AI. In the full version, this would connect to OpenAI's API to provide real AI responses.");
      setIsLoading(false);
    }, 2000);
  };

  const demoContent = (
    <div className="space-y-4">
      <Textarea
        placeholder="Ask AI anything... (e.g., 'Write a professional email', 'Explain quantum computing', 'Help me plan a vacation')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      <Button 
        onClick={handleSubmit}
        disabled={!prompt.trim() || isLoading}
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
        title="ChatGPT Plus"
        description="Get priority access and faster responses with ChatGPT Plus subscription."
        features={[
          "Priority access during peak times",
          "Faster response speeds", 
          "Access to GPT-4",
          "Early access to new features"
        ]}
        ctaText="Upgrade to Plus"
        affiliateUrl="https://chat.openai.com/auth/login"
        commission="$5 per signup"
        rating={4.8}
        onAffiliateClick={trackAffiliateClick}
        service="chatgpt"
      />
    </CategoryPageLayout>
  );
};

export default General;
