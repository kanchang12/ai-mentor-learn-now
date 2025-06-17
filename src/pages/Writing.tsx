
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
import { supabase } from "@/integrations/supabase/client";

const Writing = () => {
  const [contentType, setContentType] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
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
    
    try {
      const { data, error } = await supabase.functions.invoke('perplexity-writing', {
        body: {
          contentType,
          topic,
          tone,
          length
        }
      });

      if (error) {
        throw error;
      }

      setGeneratedContent(data.generatedContent);
      toast({
        title: "Success",
        description: "Content generated successfully!",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
          <SelectItem value="essay">Essay</SelectItem>
          <SelectItem value="press-release">Press Release</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Enter your topic or brief description..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="text-[#22201d]"
      />

      <Select value={tone} onValueChange={setTone}>
        <SelectTrigger>
          <SelectValue placeholder="Select tone (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="casual">Casual</SelectItem>
          <SelectItem value="friendly">Friendly</SelectItem>
          <SelectItem value="formal">Formal</SelectItem>
          <SelectItem value="persuasive">Persuasive</SelectItem>
          <SelectItem value="informative">Informative</SelectItem>
        </SelectContent>
      </Select>

      <Select value={length} onValueChange={setLength}>
        <SelectTrigger>
          <SelectValue placeholder="Select length (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="short">Short</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="long">Long</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        onClick={generateContent}
        disabled={!contentType || !topic.trim() || isGenerating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white w-full"
      >
        {isGenerating ? "Generating..." : "Generate with Perplexity AI"}
      </Button>
      
      {generatedContent && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Generated Content:</h4>
          <Textarea
            value={generatedContent}
            onChange={(e) => setGeneratedContent(e.target.value)}
            className="min-h-[200px] text-[#22201d] resize-none"
            placeholder="Your generated content will appear here..."
          />
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              navigator.clipboard.writeText(generatedContent);
              toast({
                title: "Copied!",
                description: "Content copied to clipboard",
              });
            }}
          >
            Copy to Clipboard
          </Button>
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
      demoDescription="Generate professional content for any purpose with Perplexity AI"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Perplexity Pro"
        description="Advanced AI search and writing assistant with real-time information access."
        features={[
          "Real-time web search",
          "Advanced reasoning",
          "Multiple AI models",
          "Unlimited queries"
        ]}
        ctaText="Get Perplexity Pro"
        affiliateUrl="https://www.perplexity.ai/pro"
        commission="Available through partnerships"
        rating={4.8}
        onAffiliateClick={trackAffiliateClick}
        service="perplexity"
      />
    </CategoryPageLayout>
  );
};

export default Writing;
