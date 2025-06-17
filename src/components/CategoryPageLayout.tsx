
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";

interface CategoryPageLayoutProps {
  category: string;
  title: string;
  description: string;
  icon: ReactNode;
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  demoTitle: string;
  demoDescription: string;
  demoContent: ReactNode;
  children?: ReactNode;
}

export const CategoryPageLayout = ({
  category,
  title,
  description,
  icon,
  videoId,
  videoTitle,
  videoDescription,
  demoTitle,
  demoDescription,
  demoContent,
  children
}: CategoryPageLayoutProps) => {
  const { getPageContent } = useContent();
  const pageContent = getPageContent(category);

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75] hover:bg-[#e9ecf1]">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  {icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#22201d]">{pageContent.title}</h1>
                  <p className="text-sm text-[#22201d] opacity-70">{pageContent.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Section */}
          <Card className="bg-white border border-gray-200 rounded-[20px] overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={pageContent.videoUrl}
                title={pageContent.videoTitle}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-[#22201d] mb-2">{pageContent.videoTitle}</h2>
              <p className="text-[#22201d] opacity-70">{pageContent.videoDescription}</p>
            </CardContent>
          </Card>

          {/* Demo Section */}
          <Card className="bg-white border border-gray-200 rounded-[20px]">
            <CardHeader>
              <CardTitle className="text-[#22201d]">{demoTitle}</CardTitle>
              <CardDescription className="text-[#22201d] opacity-70">{demoDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              {demoContent}
            </CardContent>
          </Card>
        </div>

        {/* Affiliate Section */}
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
