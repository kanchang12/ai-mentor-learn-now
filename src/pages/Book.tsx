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
    
    // Simulate AI book writing with realistic content
    setTimeout(() => {
      const chapters = [
        "Chapter 1: The Beginning",
        "Chapter 2: Rising Action", 
        "Chapter 3: The Climax",
        "Chapter 4: Resolution",
        "Chapter 5: The End"
      ];
      
      const sampleContent = `# ${title}

## Book Type: ${bookType.charAt(0).toUpperCase() + bookType.slice(1)}

## Synopsis
${description}

## Table of Contents
${chapters.map((chapter, index) => `${index + 1}. ${chapter}`).join('\n')}

## Chapter 1: The Beginning

This marks the beginning of your "${title}" - a ${bookType} that explores the themes and ideas you've outlined.

${description}

The story unfolds with careful attention to character development and plot progression. Each chapter builds upon the previous one, creating a cohesive narrative that engages readers from start to finish.

## Sample Content:

In the opening chapter, we establish the foundation of your story. The main character is introduced in their familiar world, unaware of the journey that lies ahead. The setting is carefully crafted to immerse readers in the atmosphere you've described.

Key elements to develop:
- Character motivation and background
- Setting description and world-building
- Initial conflict or tension
- Hook to engage readers

## Chapter 2: Rising Action

The story gains momentum as challenges begin to emerge. Your protagonist faces their first real obstacles, and the central conflict starts to take shape. This is where the foundation laid in Chapter 1 begins to pay off.

## Writing Notes:
- Genre: ${bookType}
- Target audience: Determined by genre and style
- Estimated length: 50,000-80,000 words
- Writing style: Engaging and accessible

## Next Steps:
1. Develop detailed character profiles
2. Create chapter-by-chapter outlines
3. Write first draft
4. Edit and revise
5. Final proofreading

This is a comprehensive sample of how your book "${title}" would begin. The full version would include complete chapters, character development, plot progression, and professional formatting suitable for publication.

---
Generated by HowToUseAI Book Writing Assistant
Total estimated pages: 200-300
Completion time: 2-4 weeks with AI assistance
`;
      
      setResult(sampleContent);
      setIsWriting(false);
      
      toast({
        title: "Book Generated!",
        description: "Your book outline and sample chapters have been created successfully.",
      });
    }, 3000);
  };

  const downloadBook = () => {
    if (!result) {
      toast({
        title: "No Content",
        description: "Please generate a book first before downloading.",
        variant: "destructive",
      });
      return;
    }
    
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase() || 'my-book'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Your book has been downloaded successfully.",
    });
  };

  const handleAffiliateClick = (service: string) => {
    console.log(`Affiliate click tracked for: ${service}`);
    toast({
      title: "Redirecting",
      description: `Opening ${service} in a new tab...`,
    });
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
