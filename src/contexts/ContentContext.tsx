
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface PageContent {
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
  getPageContent: (category: string) => PageContent;
  updatePageContent: (category: string, updates: Partial<PageContent>) => void;
  setAllContent: (content: Record<string, PageContent>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultContent: Record<string, PageContent> = {
  homepage: {
    title: "Master AI Tools with Expert Tutorials",
    description: "Learn how to use Perplexity AI, Leonardo AI, Jasper AI and more with step-by-step video tutorials and hands-on practice",
    videoUrl: "https://www.youtube.com/embed/2yXZ5UOYfmM?si=8lQdo-6Hl95nLErd",
    videoTitle: "How to Use AI Tools - Complete Beginner's Guide",
    videoDescription: "Get started with the most powerful AI tools including Perplexity for research, Leonardo for images, and Jasper for writing"
  },
  general: {
    title: "Perplexity AI Chat Assistant",
    description: "Master Perplexity AI for real-time research and intelligent conversations with web-connected AI",
    videoUrl: "https://www.youtube.com/embed/fq4k2xawhJQ?si=XmPIDNGqcVcGa3WS",
    videoTitle: "Perplexity AI Complete Tutorial - Research Like a Pro",
    videoDescription: "Learn how to use Perplexity AI for advanced research, fact-checking, and getting up-to-date information with citations"
  },
  writing: {
    title: "Jasper AI Writing Assistant", 
    description: "Create professional content with Jasper AI and advanced writing tools for blogs, emails, and marketing copy",
    videoUrl: "https://www.youtube.com/embed/fq4k2xawhJQ?si=XmPIDNGqcVcGa3WS",
    videoTitle: "Jasper AI Writing Mastery - From Beginner to Pro",
    videoDescription: "Master content creation using Jasper AI's powerful writing assistant and advanced prompting techniques"
  },
  images: {
    title: "Leonardo AI Image Generator",
    description: "Generate stunning visuals with Leonardo AI's professional image generation and editing tools",
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4?si=rYqQCFIYLPOeS4hs",
    videoTitle: "Leonardo AI Image Generation Masterclass",
    videoDescription: "Learn to create professional images using Leonardo AI's advanced models and prompting strategies"
  },
  music: {
    title: "AI Music Generator",
    description: "Create AI-generated music and soundtracks with professional tools",
    videoUrl: "https://www.youtube.com/embed/2yXZ5UOYfmM?si=8lQdo-6Hl95nLErd",
    videoTitle: "AI Music Generation Complete Guide", 
    videoDescription: "Learn to create professional music tracks using AI-powered composition tools"
  },
  data: {
    title: "AI Data Analysis with Jupyter",
    description: "Analyze data and extract insights using Jupyter AI and advanced analytics tools", 
    videoUrl: "https://www.youtube.com/embed/A0HHinUgdn4?si=ePAK5_lNfBAFg5cG",
    videoTitle: "Data Science with AI - Complete Tutorial",
    videoDescription: "Transform your data into actionable insights using Jupyter AI and advanced analysis techniques"
  },
  website: {
    title: "AI Website Builder",
    description: "Build professional websites with AI assistance and modern development tools",
    videoUrl: "https://www.youtube.com/embed/2yXZ5UOYfmM?si=8lQdo-6Hl95nLErd",
    videoTitle: "Building Websites with AI - Complete Course", 
    videoDescription: "Create professional websites using AI-powered design and development tools"
  }
};

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Record<string, PageContent>>(defaultContent);

  const getPageContent = (category: string): PageContent => {
    return content[category] || content.general;
  };

  const updatePageContent = (category: string, updates: Partial<PageContent>) => {
    setContent(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...updates
      }
    }));
  };

  const setAllContent = (newContent: Record<string, PageContent>) => {
    setContent(newContent);
  };

  return (
    <ContentContext.Provider value={{ getPageContent, updatePageContent, setAllContent }}>
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
