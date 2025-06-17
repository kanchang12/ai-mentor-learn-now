
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useToast } from "@/hooks/use-toast";

const Business = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [automationData, setAutomationData] = useState("");
  const [isTriggering, setIsTriggering] = useState(false);
  const [response, setResponse] = useState("");
  const { trackAffiliateClick } = useUsageTracking('business');
  const { toast } = useToast();

  const triggerAutomation = async () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Make.com webhook URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsTriggering(true);
    setResponse("");
    
    try {
      const requestData = {
        timestamp: new Date().toISOString(),
        data: automationData || "Automation triggered from HowToUseAI.uk",
        source: "howtouseai-business-automation"
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(requestData),
      });

      setResponse("Automation triggered successfully! Check your Make.com scenario for execution details.");
      toast({
        title: "Success",
        description: "Make.com automation has been triggered",
      });
    } catch (error) {
      console.error('Error triggering Make.com automation:', error);
      setResponse("Error triggering automation. Please check your webhook URL.");
      toast({
        title: "Error",
        description: "Failed to trigger automation",
        variant: "destructive",
      });
    } finally {
      setIsTriggering(false);
    }
  };

  const demoContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Make.com Webhook URL</label>
        <Input
          placeholder="https://hook.make.com/..."
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="text-[#22201d]"
        />
        <p className="text-xs text-gray-600">Create a webhook trigger in Make.com and paste the URL here</p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Automation Data (Optional)</label>
        <Textarea
          placeholder="Enter any data to send with the automation trigger..."
          value={automationData}
          onChange={(e) => setAutomationData(e.target.value)}
          className="min-h-[80px] text-[#22201d]"
        />
      </div>
      
      <Button 
        onClick={triggerAutomation}
        disabled={!webhookUrl.trim() || isTriggering}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isTriggering ? "Triggering..." : "Trigger Automation"}
      </Button>
      
      {response && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Status:</h4>
          <p className="text-[#22201d] opacity-80">{response}</p>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="business"
      title="Business Automation"
      description="Automate workflows with AI"
      icon={<Briefcase className="h-5 w-5 text-orange-600" />}
      videoId="5dTK8qZHbhQ"
      videoTitle="Business Automation with Make.com"
      videoDescription="Learn to automate your business processes with Make.com"
      demoTitle="Try Make.com Automation"
      demoDescription="Trigger your Make.com scenarios directly"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Make.com"
        description="Visual automation platform to connect apps and automate workflows without coding."
        features={[
          "1000+ app integrations",
          "Visual workflow builder",
          "Real-time execution",
          "Advanced data processing"
        ]}
        ctaText="Start with Make.com"
        affiliateUrl="https://www.make.com"
        commission="Partner program available"
        rating={4.7}
        onAffiliateClick={trackAffiliateClick}
        service="make"
      />
    </CategoryPageLayout>
  );
};

export default Business;
