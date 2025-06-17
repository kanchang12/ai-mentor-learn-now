
import { CategoryPageLayout } from "@/components/CategoryPageLayout";

const Writing = () => {
  const affiliateCards = [
    {
      title: "Jasper AI",
      description: "Professional AI writing assistant for content creation",
      buttonText: "Try Jasper AI",
      buttonUrl: "https://jasper.ai",
      service: "jasper",
      features: [
        "Blog post generation",
        "Marketing copy",
        "SEO optimization", 
        "Brand voice training"
      ]
    },
    {
      title: "Copy.ai",
      description: "AI-powered copywriting for marketing and sales",
      buttonText: "Get Copy.ai",
      buttonUrl: "https://copy.ai",
      service: "copyai",
      features: [
        "Sales copy",
        "Email templates",
        "Social media posts",
        "Product descriptions"
      ]
    }
  ];

  return (
    <CategoryPageLayout
      category="writing"
      affiliateCards={affiliateCards}
    />
  );
};

export default Writing;
