
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3 } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useToast } from "@/hooks/use-toast";

const Data = () => {
  const [dataQuery, setDataQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const { trackAffiliateClick } = useUsageTracking('data');
  const { toast } = useToast();

  const analyzeData = async () => {
    if (!dataQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter your data analysis request",
        variant: "destructive",
      });
      return;
    }

    const apiKey = localStorage.getItem('api_key_claude');
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Claude API key not configured. Please contact admin.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult("");

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: `You are a data analysis expert. Please analyze the following data request and provide insights: ${dataQuery}`
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data.content[0].text);
    } catch (error) {
      console.error('Error calling Claude API:', error);
      toast({
        title: "Error",
        description: "Failed to analyze data. Please check API configuration.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const demoContent = (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe your data analysis request... (e.g., 'Analyze sales trends', 'Find patterns in customer data', 'Statistical analysis of survey results')"
        value={dataQuery}
        onChange={(e) => setDataQuery(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      
      <Button 
        onClick={analyzeData}
        disabled={!dataQuery.trim() || isAnalyzing}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isAnalyzing ? "Analyzing..." : "Analyze with Claude"}
      </Button>
      
      {analysisResult && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Analysis Result:</h4>
          <p className="text-[#22201d] opacity-80 whitespace-pre-wrap">{analysisResult}</p>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="data"
      title="AI Data Analysis"
      description="Extract insights with AI"
      icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
      videoId="A0HHinUgdn4"
      videoTitle="AI Data Analysis Mastery"
      videoDescription="Learn to analyze data and extract insights with Claude AI"
      demoTitle="Try Data Analysis"
      demoDescription="Get AI-powered insights from your data"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Claude Pro"
        description="Advanced AI assistant for complex data analysis and reasoning tasks."
        features={[
          "Advanced reasoning",
          "Large context window",
          "Data analysis expertise",
          "Priority access"
        ]}
        ctaText="Get Claude Pro"
        affiliateUrl="https://claude.ai/upgrade"
        commission="Available through Anthropic partners"
        rating={4.9}
        onAffiliateClick={trackAffiliateClick}
        service="claude"
      />
    </CategoryPageLayout>
  );
};

export default Data;
