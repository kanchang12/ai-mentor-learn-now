
import { CategoryPageLayout } from "@/components/CategoryPageLayout";

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

  return (
    <CategoryPageLayout
      category="images"
      affiliateCards={affiliateCards}
    />
  );
};

export default Images;
