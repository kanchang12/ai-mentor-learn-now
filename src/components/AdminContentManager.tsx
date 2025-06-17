
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface PageContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
  videoDescription: string;
}

const AdminContentManager = () => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("homepage");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Default content for all pages
  const defaultContent: Record<string, PageContent> = {
    homepage: {
      id: "homepage",
      title: "Master AI Tutorials, AI Writing & AI Image Editing",
      description: "Learn the most powerful AI tools through step-by-step tutorials. Master ChatGPT, Midjourney, Jasper AI, and more with hands-on practice and expert guidance.",
      videoUrl: "https://www.youtube.com/embed/QH2-TGUlwu4",
      videoTitle: "Complete AI Mastery Course - 2024 Edition",
      videoDescription: "Everything you need to know about AI tutorials, AI writing tools, and AI image editing in one comprehensive guide. Perfect for beginners and advanced users."
    },
    general: {
      id: "general",
      title: "AI Tutorials - Master ChatGPT and AI Chat Tools",
      description: "Learn how to use ChatGPT and other AI chat tools effectively with step-by-step tutorials and practical examples.",
      videoUrl: "https://www.youtube.com/embed/JTxsNm9IdYU",
      videoTitle: "Complete ChatGPT Tutorial - From Beginner to Expert",
      videoDescription: "Master ChatGPT with this comprehensive tutorial covering prompt engineering, advanced techniques, and real-world applications."
    },
    writing: {
      id: "writing",
      title: "AI Writing Tools - Master Jasper AI and Content Creation",
      description: "Learn to create professional content using AI writing assistants like Jasper AI, Copy.ai, and more.",
      videoUrl: "https://www.youtube.com/embed/VjVyUh_pKnY",
      videoTitle: "AI Writing Mastery - Complete Guide to AI Content Creation",
      videoDescription: "Learn how to create engaging content, blog posts, and marketing copy using advanced AI writing tools and techniques."
    },
    images: {
      id: "images",
      title: "AI Image Editing - Master Midjourney and DALL-E",
      description: "Create stunning visuals with AI image generation and editing tools including Midjourney, DALL-E, and Stable Diffusion.",
      videoUrl: "https://www.youtube.com/embed/35RaoKs1hJU",
      videoTitle: "AI Image Generation Masterclass - Midjourney & DALL-E Guide",
      videoDescription: "Complete guide to AI image generation covering Midjourney, DALL-E, prompt engineering, and advanced techniques for creating professional visuals."
    },
    business: {
      id: "business",
      title: "Business AI Automation - Streamline Your Workflow",
      description: "Automate your business processes with AI tools and increase productivity with intelligent automation solutions.",
      videoUrl: "https://www.youtube.com/embed/d4yCWBzIhqs",
      videoTitle: "Business AI Automation Complete Guide",
      videoDescription: "Learn how to implement AI automation in your business, streamline workflows, and boost productivity with the latest AI tools."
    },
    data: {
      id: "data",
      title: "AI Data Analysis - Extract Insights with Artificial Intelligence",
      description: "Learn to analyze data and extract valuable insights using AI-powered analytics tools and machine learning techniques.",
      videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
      videoTitle: "AI Data Analysis Mastery Course",
      videoDescription: "Master data analysis with AI tools, learn machine learning basics, and discover how to extract actionable insights from your data."
    },
    website: {
      id: "website",
      title: "AI Website Builder - Create Professional Sites with AI",
      description: "Build professional websites using AI-powered tools and platforms that automate design and development processes.",
      videoUrl: "https://www.youtube.com/embed/gUmBf2HfUUY",
      videoTitle: "AI Website Building Complete Tutorial",
      videoDescription: "Learn to build professional websites using AI tools, from design to deployment, with practical examples and best practices."
    }
  };

  useEffect(() => {
    // Initialize with default content
    const initialPages = Object.values(defaultContent);
    setPages(initialPages);
  }, []);

  const handleUpdateContent = (pageId: string, field: keyof PageContent, value: string) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, [field]: value }
        : page
    ));
  };

  const handleSaveContent = async (pageId: string) => {
    setLoading(true);
    try {
      // In a real implementation, this would save to a database
      // For now, we'll just show a success message
      console.log('Saving content for page:', pageId);
      
      toast({
        title: "Success",
        description: `Content updated for ${pageId} page`,
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentPage = pages.find(page => page.id === selectedPage) || defaultContent[selectedPage];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.keys(defaultContent).map((pageId) => (
          <Button
            key={pageId}
            variant={selectedPage === pageId ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPage(pageId)}
            className="capitalize"
          >
            {pageId === "homepage" ? "Home" : pageId}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="capitalize">
            Edit {selectedPage === "homepage" ? "Home" : selectedPage} Page Content
          </CardTitle>
          <CardDescription>
            Update the video, title, and description for the {selectedPage === "homepage" ? "homepage" : selectedPage} page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={currentPage?.title || ""}
              onChange={(e) => handleUpdateContent(selectedPage, "title", e.target.value)}
              placeholder="Enter page title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Page Description</Label>
            <Textarea
              id="description"
              value={currentPage?.description || ""}
              onChange={(e) => handleUpdateContent(selectedPage, "description", e.target.value)}
              placeholder="Enter page description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL (YouTube Embed)</Label>
            <Input
              id="videoUrl"
              value={currentPage?.videoUrl || ""}
              onChange={(e) => handleUpdateContent(selectedPage, "videoUrl", e.target.value)}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoTitle">Video Title</Label>
            <Input
              id="videoTitle"
              value={currentPage?.videoTitle || ""}
              onChange={(e) => handleUpdateContent(selectedPage, "videoTitle", e.target.value)}
              placeholder="Enter video title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoDescription">Video Description</Label>
            <Textarea
              id="videoDescription"
              value={currentPage?.videoDescription || ""}
              onChange={(e) => handleUpdateContent(selectedPage, "videoDescription", e.target.value)}
              placeholder="Enter video description"
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={() => handleSaveContent(selectedPage)}
              disabled={loading}
              className="bg-[#6cae75] hover:bg-[#5a9d64]"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setPages(Object.values(defaultContent))}
            >
              Reset to Default
            </Button>
          </div>

          {/* Preview Section */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Preview</h4>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">{currentPage?.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{currentPage?.description}</p>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-gray-500">Video Preview</span>
                </div>
                <h4 className="font-semibold text-sm">{currentPage?.videoTitle}</h4>
                <p className="text-xs text-gray-600">{currentPage?.videoDescription}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContentManager;
