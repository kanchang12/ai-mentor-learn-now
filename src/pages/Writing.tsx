
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, Copy } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { useToast } from "@/hooks/use-toast";

const Writing = () => {
  const [contentType, setContentType] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
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
    setResult("");
    
    // Simulate content generation
    setTimeout(() => {
      const sampleContent = {
        blog: `# ${topic}\n\nThis is a sample blog post about ${topic}. In a real implementation, this would connect to an AI writing service like Jasper or OpenAI to generate compelling, original content.\n\nKey points to cover:\n- Introduction to the topic\n- Main benefits and features\n- Practical examples\n- Conclusion and call to action\n\nThis demo shows how the writing assistant would work in your application.`,
        email: `Subject: Exciting News About ${topic}\n\nHi there!\n\nI hope this email finds you well. I wanted to share some exciting information about ${topic}.\n\n[Generated email content would appear here with proper structure, engaging copy, and clear call-to-action]\n\nBest regards,\nYour AI Writing Assistant`,
        social: `🚀 Exciting update about ${topic}! \n\n✨ This is where AI-generated social media content would appear\n📈 Optimized for engagement\n💡 Tailored to your audience\n\n#AI #Content #${topic.replace(/\s+/g, '')}`
      };
      
      setResult(sampleContent[contentType as keyof typeof sampleContent] || "Sample generated content would appear here.");
      setIsGenerating(false);
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={contentType} onValueChange={setContentType}>
        <SelectTrigger>
          <SelectValue placeholder="What type of content?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="blog">Blog Post</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="social">Social Media Post</SelectItem>
          <SelectItem value="article">Article</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Enter your topic..."
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
        </SelectContent>
      </Select>
      
      <Button 
        onClick={generateContent}
        disabled={!contentType || !topic.trim() || isGenerating}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white w-full"
      >
        {isGenerating ? "Generating..." : "Generate Content"}
      </Button>
      
      {result && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-[#22201d]">Generated Content:</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="text-[#22201d]"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="min-h-[200px] text-[#22201d]"
            placeholder="Generated content will appear here..."
          />
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
      videoId="wrt123"
      videoTitle="AI Writing Mastery"
      videoDescription="Learn to create compelling content with AI tools"
      demoTitle="Try Content Generation"
      demoDescription="Generate blog posts, emails, and social media content"
      demoContent={demoContent}
    />
  );
};

export default Writing;
