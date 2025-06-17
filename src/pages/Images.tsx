
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, Download } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";

const Images = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { trackAffiliateClick } = useUsageTracking('images');

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    setTimeout(() => {
      setGeneratedImage("https://via.placeholder.com/512x512/6cae75/ffffff?text=AI+Generated+Image");
      setIsGenerating(false);
    }, 4000);
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'ai-generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const demoContent = (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe your image... (e.g., 'A futuristic city at sunset', 'Portrait of a wise wizard', 'Abstract art with vibrant colors')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      
      <Button 
        onClick={generateImage}
        disabled={!prompt.trim() || isGenerating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isGenerating ? "Generating..." : "Generate Image"}
      </Button>
      
      {generatedImage && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-[#22201d]">Generated Image:</h4>
            <Button
              onClick={downloadImage}
              variant="outline"
              size="sm"
              className="border-gray-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
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
      videoDescription="Master Midjourney, DALL-E, and Stable Diffusion"
      demoTitle="Try Image Generation"
      demoDescription="Create amazing images from text descriptions"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Midjourney"
        description="The most popular AI art generator with stunning artistic capabilities."
        features={[
          "Best-in-class image quality",
          "Artistic style variations", 
          "Community features",
          "Commercial licensing"
        ]}
        ctaText="Subscribe Now"
        affiliateUrl="https://www.midjourney.com/account/"
        commission="Referral bonus"
        rating={4.9}
        onAffiliateClick={trackAffiliateClick}
        service="midjourney"
      />
    </CategoryPageLayout>
  );
};

export default Images;
