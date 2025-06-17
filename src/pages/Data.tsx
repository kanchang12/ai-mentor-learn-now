
import { CategoryPageLayout } from "@/components/CategoryPageLayout";

const Data = () => {
  const affiliateCards = [
    {
      title: "Jupyter AI",
      description: "AI-powered data science notebooks",
      buttonText: "Try Jupyter AI",
      buttonUrl: "https://jupyter.org",
      service: "jupyter",
      features: [
        "Code generation",
        "Data exploration",
        "Visualization tools",
        "ML workflows"
      ]
    }
  ];

  return (
    <CategoryPageLayout
      category="data"
      affiliateCards={affiliateCards}
    />
  );
};

export default Data;
