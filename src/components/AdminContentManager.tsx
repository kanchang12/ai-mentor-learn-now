
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/contexts/ContentContext";

const AdminContentManager = () => {
  const [selectedPage, setSelectedPage] = useState<string>("homepage");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { getPageContent, updatePageContent, setAllContent } = useContent();

  const pageNames = ["homepage", "general", "writing", "images", "business", "data", "website"];

  const handleUpdateContent = (field: string, value: string) => {
    updatePageContent(selectedPage, { [field]: value });
  };

  const extractVideoUrlFromIframe = (iframeCode: string) => {
    const srcMatch = iframeCode.match(/src="([^"]*)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  const handleIframeCodeChange = (iframeCode: string) => {
    const extractedUrl = extractVideoUrlFromIframe(iframeCode);
    if (extractedUrl) {
      updatePageContent(selectedPage, { videoUrl: extractedUrl });
      toast({
        title: "Success",
        description: "Video URL extracted from iframe code and updated",
      });
    }
  };

  const handleSaveContent = async () => {
    setLoading(true);
    try {
      toast({
        title: "Success",
        description: `Content updated for ${selectedPage} page and will be reflected immediately`,
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

  const handleResetToDefault = () => {
    const defaultContent = {
      homepage: {
        id: "homepage",
        title: "Master AI Tutorials, AI Writing & AI Image Editing",
        description: "Learn the most powerful AI tools through step-by-step tutorials. Master ChatGPT, Midjourney, Jasper AI, and more with hands-on practice and expert guidance.",
        videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
        videoTitle: "Complete AI Mastery Course - 2024 Edition",
        videoDescription: "Everything you need to know about AI tutorials, AI writing tools, and AI image editing in one comprehensive guide. Perfect for beginners and advanced users.",
        heroImage: "",
        backgroundImage: "",
        logoUrl: "",
        ctaButtonText: "Start Learning",
        ctaButtonUrl: "/dashboard",
        socialLinks: {
          twitter: "",
          youtube: "",
          linkedin: "",
          facebook: ""
        }
      },
      general: {
        id: "general",
        title: "AI Tutorials - Master ChatGPT and AI Chat Tools",
        description: "Learn how to use ChatGPT and other AI chat tools effectively with step-by-step tutorials and practical examples.",
        videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
        videoTitle: "Complete ChatGPT Tutorial - From Beginner to Expert",
        videoDescription: "Master ChatGPT with this comprehensive tutorial covering prompt engineering, advanced techniques, and real-world applications.",
        heroImage: "",
        backgroundImage: "",
        logoUrl: "",
        ctaButtonText: "Start Learning",
        ctaButtonUrl: "/dashboard",
        socialLinks: {
          twitter: "",
          youtube: "",
          linkedin: "",
          facebook: ""
        }
      },
      writing: {
        id: "writing",
        title: "AI Writing Tools - Master Jasper AI and Content Creation",
        description: "Learn to create professional content using AI writing assistants like Jasper AI, Copy.ai, and more.",
        videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
        videoTitle: "AI Writing Mastery - Complete Guide to AI Content Creation",
        videoDescription: "Learn how to create engaging content, blog posts, and marketing copy using advanced AI writing tools and techniques.",
        heroImage: "",
        backgroundImage: "",
        logoUrl: "",
        ctaButtonText: "Start Learning",
        ctaButtonUrl: "/dashboard",
        socialLinks: {
          twitter: "",
          youtube: "",
          linkedin: "",
          facebook: ""
        }
      },
      images: {
        id: "images",
        title: "AI Image Editing - Master Midjourney and DALL-E",
        description: "Create stunning visuals with AI image generation and editing tools including Midjourney, DALL-E, and Stable Diffusion.",
        videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
        videoTitle: "AI Image Generation Masterclass - Midjourney & DALL-E Guide",
        videoDescription: "Complete guide to AI image generation covering Midjourney, DALL-E, prompt engineering, and advanced techniques for creating professional visuals.",
        heroImage: "",
        backgroundImage: "",
        logoUrl: "",
        ctaButtonText: "Start Learning",
        ctaButtonUrl: "/dashboard",
        socialLinks: {
          twitter: "",
          youtube: "",
          linkedin: "",
          facebook: ""
        }
      },
      business: {
        id: "business",
        title: "Business AI Automation - Streamline Your Workflow",
        description: "Automate your business processes with AI tools and increase productivity with intelligent automation solutions.",
        videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
        videoTitle: "Business AI Automation Complete Guide",
        videoDescription: "Learn how to implement AI automation in your business, streamline workflows, and boost productivity with the latest AI tools.",
        heroImage: "",
        backgroundImage: "",
        logoUrl: "",
        ctaButtonText: "Start Learning",
        ctaButtonUrl: "/dashboard",
        socialLinks: {
          twitter: "",
          youtube: "",
          linkedin: "",
          facebook: ""
        }
      },
      data: {
        id: "data",
        title: "AI Data Analysis - Extract Insights with Artificial Intelligence",
        description: "Learn to analyze data and extract valuable insights using AI-powered analytics tools and machine learning techniques.",
        videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
        videoTitle: "AI Data Analysis Mastery Course",
        videoDescription: "Master data analysis with AI tools, learn machine learning basics, and discover how to extract actionable insights from your data.",
        heroImage: "",
        backgroundImage: "",
        logoUrl: "",
        ctaButtonText: "Start Learning",
        ctaButtonUrl: "/dashboard",
        socialLinks: {
          twitter: "",
          youtube: "",
          linkedin: "",
          facebook: ""
        }
      },
      website: {
        id: "website",
        title: "AI Website Builder - Create Professional Sites with AI",
        description: "Build professional websites using AI-powered tools and platforms that automate design and development processes.",
        videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
        videoTitle: "AI Website Building Complete Tutorial",
        videoDescription: "Learn to build professional websites using AI tools, from design to deployment, with practical examples and best practices.",
        heroImage: "",
        backgroundImage: "",
        logoUrl: "",
        ctaButtonText: "Start Learning",
        ctaButtonUrl: "/dashboard",
        socialLinks: {
          twitter: "",
          youtube: "",
          linkedin: "",
          facebook: ""
        }
      }
    };
    setAllContent(defaultContent);
    toast({
      title: "Reset Complete",
      description: "All content has been reset to default values",
    });
  };

  const currentPage = getPageContent(selectedPage);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {pageNames.map((pageId) => (
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
            Update all content including videos, images, text, and links for the {selectedPage === "homepage" ? "homepage" : selectedPage} page. Changes are applied immediately.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Content */}
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={currentPage?.title || ""}
              onChange={(e) => handleUpdateContent("title", e.target.value)}
              placeholder="Enter page title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Page Description</Label>
            <Textarea
              id="description"
              value={currentPage?.description || ""}
              onChange={(e) => handleUpdateContent("description", e.target.value)}
              placeholder="Enter page description"
              rows={3}
            />
          </div>

          {/* Video Content */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Video Content</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="iframeCode">YouTube Iframe Embed Code</Label>
                <Textarea
                  id="iframeCode"
                  placeholder="Paste your complete YouTube iframe embed code here..."
                  onChange={(e) => handleIframeCodeChange(e.target.value)}
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  Paste the complete iframe code from YouTube (e.g., &lt;iframe width="560" height="315" src="..."&gt;&lt;/iframe&gt;). The video URL will be automatically extracted.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL (Auto-extracted or Manual)</Label>
                <Input
                  id="videoUrl"
                  value={currentPage?.videoUrl || ""}
                  onChange={(e) => handleUpdateContent("videoUrl", e.target.value)}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                />
                <p className="text-xs text-gray-500">
                  This field is auto-populated when you paste iframe code above, or you can enter manually.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoTitle">Video Title</Label>
                <Input
                  id="videoTitle"
                  value={currentPage?.videoTitle || ""}
                  onChange={(e) => handleUpdateContent("videoTitle", e.target.value)}
                  placeholder="Enter video title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoDescription">Video Description</Label>
                <Textarea
                  id="videoDescription"
                  value={currentPage?.videoDescription || ""}
                  onChange={(e) => handleUpdateContent("videoDescription", e.target.value)}
                  placeholder="Enter video description"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Image & Visual Content</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image URL</Label>
                <Input
                  id="heroImage"
                  value={currentPage?.heroImage || ""}
                  onChange={(e) => handleUpdateContent("heroImage", e.target.value)}
                  placeholder="https://example.com/hero-image.jpg"
                />
                <p className="text-xs text-gray-500">Main banner/hero image for the page</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundImage">Background Image URL</Label>
                <Input
                  id="backgroundImage"
                  value={currentPage?.backgroundImage || ""}
                  onChange={(e) => handleUpdateContent("backgroundImage", e.target.value)}
                  placeholder="https://example.com/background.jpg"
                />
                <p className="text-xs text-gray-500">Background image for the page</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={currentPage?.logoUrl || ""}
                  onChange={(e) => handleUpdateContent("logoUrl", e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
                <p className="text-xs text-gray-500">Logo image URL</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Call to Action</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaButtonText">CTA Button Text</Label>
                <Input
                  id="ctaButtonText"
                  value={currentPage?.ctaButtonText || ""}
                  onChange={(e) => handleUpdateContent("ctaButtonText", e.target.value)}
                  placeholder="Start Learning"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaButtonUrl">CTA Button URL</Label>
                <Input
                  id="ctaButtonUrl"
                  value={currentPage?.ctaButtonUrl || ""}
                  onChange={(e) => handleUpdateContent("ctaButtonUrl", e.target.value)}
                  placeholder="/dashboard"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Social Media Links</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  value={currentPage?.socialLinks?.twitter || ""}
                  onChange={(e) => handleUpdateContent("socialLinks", JSON.stringify({
                    ...currentPage?.socialLinks,
                    twitter: e.target.value
                  }))}
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube URL</Label>
                <Input
                  id="youtube"
                  value={currentPage?.socialLinks?.youtube || ""}
                  onChange={(e) => handleUpdateContent("socialLinks", JSON.stringify({
                    ...currentPage?.socialLinks,
                    youtube: e.target.value
                  }))}
                  placeholder="https://youtube.com/channel/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={currentPage?.socialLinks?.linkedin || ""}
                  onChange={(e) => handleUpdateContent("socialLinks", JSON.stringify({
                    ...currentPage?.socialLinks,
                    linkedin: e.target.value
                  }))}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  value={currentPage?.socialLinks?.facebook || ""}
                  onChange={(e) => handleUpdateContent("socialLinks", JSON.stringify({
                    ...currentPage?.socialLinks,
                    facebook: e.target.value
                  }))}
                  placeholder="https://facebook.com/page/..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleSaveContent}
              disabled={loading}
              className="bg-[#6cae75] hover:bg-[#5a9d64]"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleResetToDefault}
            >
              Reset All to Default
            </Button>
          </div>

          {/* Live Preview */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Live Preview</h4>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">{currentPage?.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{currentPage?.description}</p>
                
                {/* Video Preview */}
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  {currentPage?.videoUrl ? (
                    <iframe
                      src={currentPage.videoUrl}
                      title="Preview"
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <span className="text-gray-500">No video URL set</span>
                  )}
                </div>
                
                {/* Image Previews */}
                {currentPage?.heroImage && (
                  <div className="mb-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">Hero Image:</p>
                    <img src={currentPage.heroImage} alt="Hero" className="h-20 object-cover rounded" />
                  </div>
                )}
                
                {/* CTA Preview */}
                {currentPage?.ctaButtonText && (
                  <div className="mb-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      {currentPage.ctaButtonText}
                    </Button>
                  </div>
                )}
                
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
