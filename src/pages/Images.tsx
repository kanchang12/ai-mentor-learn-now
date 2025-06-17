
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useToast } from "@/hooks/use-toast";

const Images = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { trackAffiliateClick } = useUsageTracking('images');
  const { toast } = useToast();

  const generateImage = async () => {
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
        description: "Please enter your Leonardo AI API key",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Leonardo Creative model
          width: 1024,
          height: 1024,
          num_images: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const generationId = data.sdGenerationJob.generationId;
      
      // Poll for completion
      let attempts = 0;
      const maxAttempts = 30;
      
      const pollResult = async () => {
        const resultResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });
        
        const resultData = await resultResponse.json();
        
        if (resultData.generations_by_pk?.status === 'COMPLETE') {
          const imageUrl = resultData.generations_by_pk.generated_images[0]?.url;
          if (imageUrl) {
            setGeneratedImage(imageUrl);
          }
          return true;
        }
        
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(pollResult, 2000);
        } else {
          throw new Error('Generation timeout');
        }
        return false;
      };
      
      await pollResult();
      
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const demoContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Leonardo AI API Key</label>
        <Input
          placeholder="Enter your Leonardo AI API key..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="text-[#22201d]"
          type="password"
        />
      </div>
      
      <Textarea
        placeholder="Describe your image... (e.g., 'A futuristic city at sunset', 'Portrait of a wise wizard', 'Abstract art with vibrant colors')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      
      <Button 
        onClick={generateImage}
        disabled={!prompt.trim() || !apiKey.trim() || isGenerating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isGenerating ? "Generating..." : "Generate Image"}
      </Button>
      
      {generatedImage && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Generated Image:</h4>
          <img 
            src={generatedImage} 
            alt="Generated" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="images"
      title="AI Image Generator"
      description="Create stunning visuals with AI"
      icon={<ImageIcon className="h-5 w-5 text-purple-600" />}
      videoId="8MNb_nw5dQo"
      videoTitle="AI Art Generation Complete Guide"
      videoDescription="Master Leonardo AI and advanced image generation techniques"
      demoTitle="Try Image Generation"
      demoDescription="Create amazing images from text descriptions"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Leonardo AI"
        description="Professional AI image generation with advanced control and stunning quality."
        features={[
          "Multiple AI models",
          "Fine-grained control", 
          "High-quality outputs",
          "Commercial licensing"
        ]}
        ctaText="Get Leonardo AI"
        affiliateUrl="https://leonardo.ai"
        commission="Referral available"
        rating={4.8}
        onAffiliateClick={trackAffiliateClick}
        service="leonardo"
      />
    </CategoryPageLayout>
  );
};

export default Images;
