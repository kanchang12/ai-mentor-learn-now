
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Download } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { useToast } from "@/hooks/use-toast";

const Images = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image description",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedImage("");
    
    // Simulate image generation with a placeholder
    setTimeout(() => {
      // Using a placeholder service for demo
      const placeholderUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImage(placeholderUrl);
      setIsGenerating(false);
      
      toast({
        title: "Image Generated!",
        description: "Your AI-generated image is ready. In a real implementation, this would use DALL-E, Midjourney, or Leonardo AI.",
      });
    }, 4000);
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'ai-generated-image.jpg';
      link.click();
    }
  };

  const demoContent = (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe the image you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      
      <Select value={style} onValueChange={setStyle}>
        <SelectTrigger>
          <SelectValue placeholder="Choose style (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="realistic">Realistic</SelectItem>
          <SelectItem value="cartoon">Cartoon</SelectItem>
          <SelectItem value="artistic">Artistic</SelectItem>
          <SelectItem value="photograph">Photograph</SelectItem>
          <SelectItem value="digital-art">Digital Art</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={size} onValueChange={setSize}>
        <SelectTrigger>
          <SelectValue placeholder="Image size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="512x512">512x512 (Square)</SelectItem>
          <SelectItem value="1024x1024">1024x1024 (Large Square)</SelectItem>
          <SelectItem value="1024x768">1024x768 (Landscape)</SelectItem>
          <SelectItem value="768x1024">768x1024 (Portrait)</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        onClick={generateImage}
        disabled={!prompt.trim() || isGenerating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white w-full"
      >
        {isGenerating ? "Generating Image..." : "Generate Image"}
      </Button>
      
      {isGenerating && (
        <div className="flex justify-center p-8">
          <div className="w-16 h-16 border-4 border-[#6cae75] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {generatedImage && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-[#22201d]">Generated Image:</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadImage}
              className="text-[#22201d]"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <img 
              src={generatedImage} 
              alt="AI Generated" 
              className="w-full h-auto max-h-64 object-cover"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Demo placeholder image. Real implementation would generate custom images based on your prompt.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="images"
      title="AI Image Generator"
      description="Create stunning visuals with AI"
      icon={<Image className="h-5 w-5 text-purple-600" />}
      videoId="img123"
      videoTitle="AI Image Generation Mastery"
      videoDescription="Learn to create stunning visuals with AI tools"
      demoTitle="Try Image Generation"
      demoDescription="Generate custom images from text descriptions"
      demoContent={demoContent}
    />
  );
};

export default Images;
