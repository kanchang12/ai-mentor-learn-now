
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music as MusicIcon, ExternalLink } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { useToast } from "@/hooks/use-toast";
import { VoiceAgent } from "@/components/VoiceAgent";
import { AffiliateCard } from "@/components/AffiliateCard";

const Music = () => {
  const [musicStyle, setMusicStyle] = useState("");
  const [duration, setDuration] = useState("");
  const [mood, setMood] = useState("");
  const { toast } = useToast();

  const handleAffiliateClick = (service: string) => {
    console.log(`Affiliate click tracked for: ${service}`);
    toast({
      title: "Redirecting to Mubert",
      description: "Opening Mubert in a new tab to generate your music...",
    });
  };

  const generateMusicWithMubert = () => {
    const mubertUrl = "https://mubert.com/render/pricing?via=kanchan";
    window.open(mubertUrl, '_blank');
    
    toast({
      title: "Redirecting to Mubert",
      description: "Generate high-quality AI music with Mubert's professional tools.",
    });
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={musicStyle} onValueChange={setMusicStyle}>
        <SelectTrigger>
          <SelectValue placeholder="Select music style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ambient">Ambient</SelectItem>
          <SelectItem value="electronic">Electronic</SelectItem>
          <SelectItem value="chill">Chill</SelectItem>
          <SelectItem value="upbeat">Upbeat</SelectItem>
          <SelectItem value="classical">Classical</SelectItem>
          <SelectItem value="jazz">Jazz</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={duration} onValueChange={setDuration}>
        <SelectTrigger>
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30">30 seconds</SelectItem>
          <SelectItem value="60">1 minute</SelectItem>
          <SelectItem value="120">2 minutes</SelectItem>
          <SelectItem value="300">5 minutes</SelectItem>
        </SelectContent>
      </Select>

      <Select value={mood} onValueChange={setMood}>
        <SelectTrigger>
          <SelectValue placeholder="Select mood (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="energetic">Energetic</SelectItem>
          <SelectItem value="relaxing">Relaxing</SelectItem>
          <SelectItem value="inspiring">Inspiring</SelectItem>
          <SelectItem value="mysterious">Mysterious</SelectItem>
          <SelectItem value="happy">Happy</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        onClick={generateMusicWithMubert}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white w-full"
      >
        <MusicIcon className="h-4 w-4 mr-2" />
        Generate Music with Mubert
      </Button>
      
      <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
        <p className="text-[#22201d] opacity-80 text-sm">
          Click the button above to access Mubert's professional AI music generation platform. 
          Create high-quality, royalty-free music for any project.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <CategoryPageLayout
        category="music"
        title="AI Music Generation"
        description="Create AI-generated music and soundtracks"
        icon={<MusicIcon className="h-5 w-5 text-orange-600" />}
        videoId="music123"
        videoTitle="AI Music Generation with Mubert"
        videoDescription="Learn to create professional music with AI tools"
        demoTitle="Try Music Generation"
        demoDescription="Generate custom music tracks with AI"
        demoContent={demoContent}
      >
        <AffiliateCard
          service="Mubert"
          title="Mubert - AI Music Generation Platform"
          description="Create high-quality, royalty-free music for any project. Perfect for content creators, businesses, and developers."
          features={[
            "AI-generated royalty-free music",
            "Multiple genres and moods",
            "Custom duration options",
            "Professional quality output",
            "Commercial licensing available"
          ]}
          ctaText="Start Creating Music"
          affiliateUrl="https://mubert.com/render/pricing?via=kanchan"
          onAffiliateClick={handleAffiliateClick}
        />
      </CategoryPageLayout>
      <VoiceAgent pageContext="music" />
    </>
  );
};

export default Music;
