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
  general: {
    title: "General AI Assistant",
    description: "Chat with AI and get instant answers",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Getting Started with AI Chat",
    videoDescription: "Learn how to effectively communicate with AI assistants"
  },
  writing: {
    title: "AI Writing Assistant", 
    description: "Create professional content with AI",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "AI Writing Mastery",
    videoDescription: "Learn to create compelling content with AI tools"
  },
  images: {
    title: "AI Image Generator",
    description: "Generate and edit images with AI",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    videoTitle: "AI Image Generation Guide",
    videoDescription: "Master the art of AI image creation"
  },
  music: {
    title: "AI Music Generator",
    description: "Create AI-generated music and soundtracks",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "AI Music Generation with Mubert", 
    videoDescription: "Learn to create professional music with AI tools"
  },
  data: {
    title: "AI Data Analysis",
    description: "Analyze data and extract insights with AI", 
    videoUrl: "https://www.youtube.com/embed/2yXZ5UOYfmM?si=8lQdo-6Hl95nLErd",
    videoTitle: "Data Analysis with AI",
    videoDescription: "Transform your data into actionable insights"
  },
  website: {
    title: "AI Website Builder",
    description: "Build websites with AI assistance",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Building Websites with AI", 
    videoDescription: "Create professional websites using AI tools"
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
