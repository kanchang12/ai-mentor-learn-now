
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";

const Website = () => {
  const [websiteType, setWebsiteType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteCode, setWebsiteCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { trackAffiliateClick } = useUsageTracking('website');

  const generateWebsite = async () => {
    if (!websiteType || !businessName.trim()) return;
    
    setIsGenerating(true);
    setWebsiteCode("");
    
    setTimeout(() => {
      setWebsiteCode(`<!DOCTYPE html>
<html>
<head>
    <title>${businessName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #6cae75; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to ${businessName}</h1>
        <p>${description || 'Your AI-generated website is ready!'}</p>
        <p>This is a demo ${websiteType} website created with AI assistance.</p>
    </div>
</body>
</html>`);
      setIsGenerating(false);
    }, 4000);
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
          <SelectItem value="landing-page">Landing Page</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Business/Website name..."
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        className="text-[#22201d]"
      />
      
      <Textarea
        placeholder="Brief description of your business or website purpose..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-[#22201d]"
      />
      
      <Button 
        onClick={generateWebsite}
        disabled={!websiteType || !businessName.trim() || isGenerating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isGenerating ? "Building Website..." : "Generate Website"}
      </Button>
      
      {websiteCode && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Generated Website Code:</h4>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-800">
            {websiteCode}
          </pre>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="website"
      title="AI Website Builder"
      description="Build websites with AI assistance"
      icon={<Globe className="h-5 w-5 text-teal-600" />}
      videoId="HXV3zeQKqGY"
      videoTitle="Build Websites with AI"
      videoDescription="Learn to create professional websites using AI tools"
      demoTitle="Try Website Builder"
      demoDescription="Generate a complete website with AI assistance"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Webflow"
        description="Professional website builder with AI-powered design assistance."
        features={[
          "Visual design tools",
          "CMS capabilities",
          "E-commerce ready",
          "Custom code export"
        ]}
        ctaText="Start Building"
        affiliateUrl="https://webflow.com"
        commission="25% recurring"
        rating={4.8}
        onAffiliateClick={trackAffiliateClick}
        service="webflow"
      />
    </CategoryPageLayout>
  );
};

export default Website;
