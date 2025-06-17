
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PageContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
  videoDescription: string;
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
