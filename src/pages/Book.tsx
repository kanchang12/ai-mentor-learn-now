
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Download } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { useToast } from "@/hooks/use-toast";
import { VoiceAgent } from "@/components/VoiceAgent";
import { AffiliateCard } from "@/components/AffiliateCard";

const Book = () => {
  const [bookType, setBookType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const writeBook = async () => {
    if (!bookType || !title.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsWriting(true);
    setResult("");
    
    setTimeout(() => {
      const sampleContent = `# ${title}

## Chapter 1: Introduction

This is a sample chapter of your book "${title}". 

${description}

In a real implementation, this would connect to SudoWriter's AI writing API to generate complete book chapters with professional structure and engaging content.

## Key Features:
- Chapter-by-chapter generation
- Professional formatting
- Character development (for fiction)
- Research integration (for non-fiction)
- Consistent tone and style

## Next Steps:
This demo shows how the book writing assistant would work in your application. SudoWriter would help you create:
- Detailed outlines
- Full chapters
- Character profiles
- Plot development
- Professional editing suggestions

Your book would be generated with AI assistance while maintaining your unique voice and vision.`;
      
      setResult(sampleContent);
      setIsWriting(false);
    }, 4000);
  };

  const downloadBook = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAffiliateClick = (service: string) => {
    console.log(`Affiliate click tracked for: ${service}`);
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={bookType} onValueChange={setBookType}>
        <SelectTrigger>
          <SelectValue placeholder="What type of book?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fiction">Fiction Novel</SelectItem>
          <SelectItem value="nonfiction">Non-Fiction</SelectItem>
          <SelectItem value="memoir">Memoir</SelectItem>
          <SelectItem value="howto">How-To Guide</SelectItem>
          <SelectItem value="children">Children's Book</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Enter your book title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-[#22201d]"
      />
      
      <Textarea
        placeholder="Describe your book concept, plot, or main ideas..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      
      <Button 
        onClick={writeBook}
        disabled={!bookType || !title.trim() || !description.trim() || isWriting}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white w-full"
      >
        {isWriting ? "Writing Book..." : "Start Writing Book"}
      </Button>
      
      {result && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-[#22201d]">Book Preview:</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadBook}
              className="text-[#22201d]"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          <div className="p-4 bg-[#e9ecf1] rounded-lg max-h-[400px] overflow-y-auto">
            <pre className="text-[#22201d] opacity-80 whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <CategoryPageLayout
        category="book"
        title="AI Book Writing"
        description="Write complete books with AI assistance"
        icon={<BookOpen className="h-5 w-5 text-orange-600" />}
        videoId="book123"
        videoTitle="AI Book Writing Mastery"
        videoDescription="Learn to write complete books with AI assistance"
        demoTitle="Try Book Writing"
        demoDescription="Start writing your book with AI assistance"
        demoContent={demoContent}
      >
        {/* SudoWriter Affiliate Card */}
        <AffiliateCard
          service="SudoWriter"
          title="SudoWriter - AI Book Writing Platform"
          description="Write complete books with AI assistance. Get professional-quality chapters, character development, and plot structuring."
          features={[
            "AI-powered chapter generation",
            "Character development tools",
            "Plot structuring assistance",
            "Professional editing suggestions",
            "Multiple genre support"
          ]}
          ctaText="Start Writing Your Book"
          affiliateUrl="https://sudowriter.com"
          onAffiliateClick={handleAffiliateClick}
        />
      </CategoryPageLayout>
      <VoiceAgent pageContext="book" />
    </>
  );
};

export default Book;
