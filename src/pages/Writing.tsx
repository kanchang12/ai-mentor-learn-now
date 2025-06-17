
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useToast } from "@/hooks/use-toast";

const Writing = () => {
  const [contentType, setContentType] = useState("");
  const [topic, setTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { trackAffiliateClick } = useUsageTracking('writing');
  const { toast } = useToast();

  const generateContent = async () => {
    if (!contentType || !topic.trim()) {
      toast({
        title: "Error",
        description: "Please select content type and enter a topic",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedContent("");
    
    // Redirect to Jasper AI for content generation
    const jasperUrl = `https://www.jasper.ai/templates/${contentType}?topic=${encodeURIComponent(topic)}`;
    window.open(jasperUrl, '_blank');
    
    setTimeout(() => {
      setGeneratedContent(`Content generation has been opened in Jasper AI. Please complete your ${contentType} about "${topic}" in the new tab and copy the result back here if needed.`);
      setIsGenerating(false);
    }, 2000);
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={contentType} onValueChange={setContentType}>
        <SelectTrigger>
          <SelectValue placeholder="What do you want to write?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="blog-post">Blog Post</SelectItem>
          <SelectItem value="email">Marketing Email</SelectItem>
          <SelectItem value="social-media">Social Media Post</SelectItem>
          <SelectItem value="product-description">Product Description</SelectItem>
          <SelectItem value="article">Article</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Enter your topic or brief description..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="text-[#22201d]"
      />
      
      <Button 
        onClick={generateContent}
        disabled={!contentType || !topic.trim() || isGenerating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isGenerating ? "Opening Jasper..." : "Generate with Jasper AI"}
      </Button>
      
      {generatedContent && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Status:</h4>
          <p className="text-[#22201d] opacity-80">{generatedContent}</p>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="writing"
      title="AI Writing Assistant"
      description="Create professional content with AI"
      icon={<PenTool className="h-5 w-5 text-green-600" />}
      videoId="nKIu9yen5nc"
      videoTitle="AI Writing Masterclass"
      videoDescription="Learn to create engaging content with AI writing tools"
      demoTitle="Try AI Writing"
      demoDescription="Generate professional content for any purpose"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Jasper AI"
        description="Professional AI writing assistant for marketing teams and content creators."
        features={[
          "50+ writing templates",
          "Brand voice training",
          "SEO optimization",
          "Team collaboration"
        ]}
        ctaText="Start Free Trial"
        affiliateUrl="https://www.jasper.ai"
        commission="30% recurring"
        rating={4.7}
        onAffiliateClick={trackAffiliateClick}
        service="jasper"
      />
    </CategoryPageLayout>
  );
};

export default Writing;
