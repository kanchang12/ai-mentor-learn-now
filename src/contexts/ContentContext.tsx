
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PageContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
  videoDescription: string;
  heroImage?: string;
  backgroundImage?: string;
  logoUrl?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  socialLinks?: {
    twitter?: string;
    youtube?: string;
    linkedin?: string;
    facebook?: string;
  };
}

interface ContentContextType {
  getPageContent: (pageId: string) => PageContent;
  updatePageContent: (pageId: string, content: Partial<PageContent>) => void;
  getAllContent: () => Record<string, PageContent>;
  setAllContent: (content: Record<string, PageContent>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultContent: Record<string, PageContent> = {
  homepage: {
    id: "homepage",
    title: "Master AI Tools with Real API Integrations",
    description: "Learn and use the most powerful AI tools through hands-on practice. Connect with Perplexity, Leonardo AI, Jasper, Claude, and more with real API integrations.",
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
    videoTitle: "Complete AI Mastery Course - 2024 Edition",
    videoDescription: "Everything you need to know about AI tools with real API integrations. Perfect for beginners and advanced users.",
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
    title: "AI Chat with Perplexity API",
    description: "Connect directly to Perplexity API for real-time AI conversations with web search capabilities.",
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
    videoTitle: "Master Perplexity AI Integration",
    videoDescription: "Learn to integrate and use Perplexity API for powerful AI conversations with real-time data.",
    heroImage: "",
    backgroundImage: "",
    logoUrl: "",
    ctaButtonText: "Try Perplexity",
    ctaButtonUrl: "/general",
    socialLinks: {
      twitter: "",
      youtube: "",
      linkedin: "",
      facebook: ""
    }
  },
  writing: {
    id: "writing",
    title: "AI Writing with Jasper Integration",
    description: "Direct integration with Jasper AI for professional content creation and copywriting.",
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
    videoTitle: "Jasper AI Writing Mastery",
    videoDescription: "Master content creation using Jasper AI's powerful writing templates and tools.",
    heroImage: "",
    backgroundImage: "",
    logoUrl: "",
    ctaButtonText: "Start Writing",
    ctaButtonUrl: "/writing",
    socialLinks: {
      twitter: "",
      youtube: "",
      linkedin: "",
      facebook: ""
    }
  },
  images: {
    id: "images",
    title: "AI Image Generation with Leonardo AI",
    description: "Create stunning visuals using Leonardo AI's powerful image generation API.",
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
    videoTitle: "Leonardo AI Image Generation Guide",
    videoDescription: "Complete guide to generating professional images using Leonardo AI API integration.",
    heroImage: "",
    backgroundImage: "",
    logoUrl: "",
    ctaButtonText: "Generate Images",
    ctaButtonUrl: "/images",
    socialLinks: {
      twitter: "",
      youtube: "",
      linkedin: "",
      facebook: ""
    }
  },
  business: {
    id: "business",
    title: "Business Automation with Make.com",
    description: "Automate your business workflows using Make.com's powerful visual automation platform.",
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
    videoTitle: "Make.com Business Automation Guide",
    videoDescription: "Learn to create powerful business automations using Make.com webhooks and integrations.",
    heroImage: "",
    backgroundImage: "",
    logoUrl: "",
    ctaButtonText: "Automate Now",
    ctaButtonUrl: "/business",
    socialLinks: {
      twitter: "",
      youtube: "",
      linkedin: "",
      facebook: ""
    }
  },
  data: {
    id: "data",
    title: "AI Data Analysis with Claude",
    description: "Analyze data and extract insights using Claude AI's advanced reasoning capabilities.",
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
    videoTitle: "Claude AI Data Analysis Mastery",
    videoDescription: "Master data analysis techniques using Claude AI's powerful reasoning and analysis capabilities.",
    heroImage: "",
    backgroundImage: "",
    logoUrl: "",
    ctaButtonText: "Analyze Data",
    ctaButtonUrl: "/data",
    socialLinks: {
      twitter: "",
      youtube: "",
      linkedin: "",
      facebook: ""
    }
  },
  website: {
    id: "website",
    title: "AI Website Building with Wix",
    description: "Build professional websites using Wix's AI-powered design tools and templates.",
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4",
    videoTitle: "Wix AI Website Building Tutorial",
    videoDescription: "Learn to create professional websites using Wix's AI design intelligence and powerful features.",
    heroImage: "",
    backgroundImage: "",
    logoUrl: "",
    ctaButtonText: "Build Website",
    ctaButtonUrl: "/website",
    socialLinks: {
      twitter: "",
      youtube: "",
      linkedin: "",
      facebook: ""
    }
  }
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, PageContent>>(defaultContent);

  useEffect(() => {
    const savedContent = localStorage.getItem('admin-content');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  const getPageContent = (pageId: string): PageContent => {
    return content[pageId] || defaultContent[pageId];
  };

  const updatePageContent = (pageId: string, newContent: Partial<PageContent>) => {
    const updatedContent = {
      ...content,
      [pageId]: { ...content[pageId], ...newContent }
    };
    setContent(updatedContent);
    localStorage.setItem('admin-content', JSON.stringify(updatedContent));
  };

  const getAllContent = () => content;

  const setAllContent = (newContent: Record<string, PageContent>) => {
    setContent(newContent);
    localStorage.setItem('admin-content', JSON.stringify(newContent));
  };

  return (
    <ContentContext.Provider value={{
      getPageContent,
      updatePageContent,
      getAllContent,
      setAllContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
