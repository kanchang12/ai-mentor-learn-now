
import { CategoryPageLayout } from "@/components/CategoryPageLayout";

const General = () => {
  const affiliateCards = [
    {
      title: "Perplexity AI Pro",
      description: "Advanced AI search and chat with real-time information",
      buttonText: "Get Perplexity Pro",
      buttonUrl: "https://perplexity.ai/pro",
      service: "perplexity",
      features: [
        "Real-time web search",
        "Advanced AI models",
        "Citation tracking",
        "Unlimited queries"
      ]
    },
    {
      title: "ChatGPT Plus",
      description: "OpenAI's premium chatbot with GPT-4 access",
      buttonText: "Get ChatGPT Plus",
      buttonUrl: "https://chat.openai.com/",
      service: "chatgpt",
      features: [
        "GPT-4 access",
        "Faster responses",
        "Priority access",
        "Latest features"
      ]
    }
  ];

  return (
    <CategoryPageLayout
      category="general"
      affiliateCards={affiliateCards}
    />
  );
};

export default General;
