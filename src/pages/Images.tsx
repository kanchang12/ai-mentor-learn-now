
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Images = () => {
  const affiliateCards = [
    {
      title: "Leonardo AI",
      description: "Professional AI image generation with advanced controls",
      buttonText: "Try Leonardo AI",
      buttonUrl: "https://leonardo.ai",
      service: "leonardo",
      features: [
        "High-quality image generation",
        "Style control",
        "Batch processing",
        "Commercial license"
      ]
    },
    {
      title: "Midjourney",
      description: "Premium AI art generation platform",
      buttonText: "Get Midjourney",
      buttonUrl: "https://midjourney.com",
      service: "midjourney",
      features: [
        "Artistic styles",
        "High resolution",
        "Community gallery",
        "Style mixing"
      ]
    }
  ];

  const customContent = (
    <Card className="bg-white border border-gray-200 rounded-[20px] mb-6">
      <CardHeader>
        <CardTitle className="text-[#22201d]">Generated Images</CardTitle>
        <CardDescription>Your AI-generated images will appear here</CardDescription>
      </CardHeader>
      <CardContent>
        <div id="generated-images-container" className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[200px] border-2 border-dashed border-gray-200 rounded-lg p-4">
          <div className="col-span-full flex items-center justify-center text-gray-500">
            Generated images will appear here after you create them using the AI Assistant
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <CategoryPageLayout
      category="images"
      affiliateCards={affiliateCards}
    >
      {customContent}
    </CategoryPageLayout>
  );
};

export default Images;
