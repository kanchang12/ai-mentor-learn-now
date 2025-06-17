
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useToast } from "@/hooks/use-toast";

const Website = () => {
  const [websiteType, setWebsiteType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState("");
  const { trackAffiliateClick } = useUsageTracking('website');
  const { toast } = useToast();

  const createWebsite = async () => {
    if (!websiteType || !businessName.trim()) {
      toast({
        title: "Error",
        description: "Please select website type and enter business name",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    setResult("");
    
    // Create Wix website URL with parameters
    const wixUrl = `https://www.wix.com/website/templates/${websiteType}?business=${encodeURIComponent(businessName)}&description=${encodeURIComponent(description)}`;
    
    // Open Wix in new tab
    window.open(wixUrl, '_blank');
    
    setTimeout(() => {
      setResult(`Wix website builder has been opened for creating a ${websiteType} website for "${businessName}". Complete your website setup in the new tab.`);
      setIsCreating(false);
    }, 2000);
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={websiteType} onValueChange={setWebsiteType}>
        <SelectTrigger>
          <SelectValue placeholder="What type of website?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="business">Business Website</SelectItem>
          <SelectItem value="portfolio">Portfolio</SelectItem>
          <SelectItem value="ecommerce">E-commerce Store</SelectItem>
          <SelectItem value="blog">Blog</SelectItem>
          <SelectItem value="restaurant">Restaurant</SelectItem>
          <SelectItem value="creative">Creative/Agency</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Enter your business/project name..."
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        className="text-[#22201d]"
      />
      
      <Textarea
        placeholder="Describe your website goals and requirements..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[80px] text-[#22201d]"
      />
      
      <Button 
        onClick={createWebsite}
        disabled={!websiteType || !businessName.trim() || isCreating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isCreating ? "Opening Wix..." : "Create Website with Wix"}
      </Button>
      
      {result && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Status:</h4>
          <p className="text-[#22201d] opacity-80">{result}</p>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="website"
      title="AI Website Builder"
      description="Create professional sites with AI"
      icon={<Globe className="h-5 w-5 text-cyan-600" />}
      videoId="A0HHinUgdn4"
      videoTitle="Website Building with Wix ADI"
      videoDescription="Learn to build professional websites using Wix's AI-powered tools"
      demoTitle="Try Website Builder"
      demoDescription="Create your website with Wix's AI assistance"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Wix Premium"
        description="Professional website builder with AI design intelligence and powerful features."
        features={[
          "AI Design Intelligence",
          "Professional templates",
          "E-commerce capabilities",
          "SEO optimization"
        ]}
        ctaText="Start with Wix"
        affiliateUrl="https://www.wix.com"
        commission="Affiliate program available"
        rating={4.5}
        onAffiliateClick={trackAffiliateClick}
        service="wix"
      />
    </CategoryPageLayout>
  );
};

export default Website;
