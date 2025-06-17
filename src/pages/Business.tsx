
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";

const Business = () => {
  const [automationType, setAutomationType] = useState("");
  const [businessProcess, setBusinessProcess] = useState("");
  const [automationPlan, setAutomationPlan] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { trackAffiliateClick } = useUsageTracking('business');

  const generateAutomation = async () => {
    if (!automationType || !businessProcess.trim()) return;
    
    setIsGenerating(true);
    setAutomationPlan("");
    
    setTimeout(() => {
      setAutomationPlan(`Here's an automation plan for ${businessProcess} using ${automationType}. This demo shows how you can streamline your business processes with AI automation tools.`);
      setIsGenerating(false);
    }, 3000);
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={automationType} onValueChange={setAutomationType}>
        <SelectTrigger>
          <SelectValue placeholder="What type of automation?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="email-automation">Email Automation</SelectItem>
          <SelectItem value="workflow-automation">Workflow Automation</SelectItem>
          <SelectItem value="customer-service">Customer Service</SelectItem>
          <SelectItem value="data-processing">Data Processing</SelectItem>
          <SelectItem value="social-media">Social Media</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Describe your business process..."
        value={businessProcess}
        onChange={(e) => setBusinessProcess(e.target.value)}
        className="text-[#22201d]"
      />
      
      <Button 
        onClick={generateAutomation}
        disabled={!automationType || !businessProcess.trim() || isGenerating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isGenerating ? "Creating Plan..." : "Generate Automation Plan"}
      </Button>
      
      {automationPlan && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Automation Plan:</h4>
          <p className="text-[#22201d] opacity-80">{automationPlan}</p>
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
      videoTitle="Business Automation with AI"
      videoDescription="Learn to automate your business processes with AI tools"
      demoTitle="Try Automation Planner"
      demoDescription="Get a custom automation plan for your business"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Zapier"
        description="Connect and automate thousands of apps with powerful workflow automation."
        features={[
          "5000+ app integrations",
          "Multi-step workflows",
          "AI-powered automation",
          "Team collaboration"
        ]}
        ctaText="Start Free"
        affiliateUrl="https://zapier.com"
        commission="$50 per signup"
        rating={4.6}
        onAffiliateClick={trackAffiliateClick}
        service="zapier"
      />
    </CategoryPageLayout>
  );
};

export default Business;
