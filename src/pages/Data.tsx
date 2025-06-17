
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3 } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { useUsageTracking } from "@/hooks/useUsageTracking";

const Data = () => {
  const [dataSource, setDataSource] = useState("");
  const [analysisType, setAnalysisType] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { trackAffiliateClick } = useUsageTracking('data');

  const analyzeData = async () => {
    if (!dataSource || !analysisType) return;
    
    setIsAnalyzing(true);
    setAnalysisResult("");
    
    setTimeout(() => {
      setAnalysisResult(`Analysis complete for ${dataSource} using ${analysisType}. This demo shows how AI can help you extract insights from your data automatically.`);
      setIsAnalyzing(false);
    }, 3000);
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={dataSource} onValueChange={setDataSource}>
        <SelectTrigger>
          <SelectValue placeholder="Select your data source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="excel">Excel Spreadsheet</SelectItem>
          <SelectItem value="csv">CSV File</SelectItem>
          <SelectItem value="database">SQL Database</SelectItem>
          <SelectItem value="google-sheets">Google Sheets</SelectItem>
          <SelectItem value="api">API Data</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={analysisType} onValueChange={setAnalysisType}>
        <SelectTrigger>
          <SelectValue placeholder="What type of analysis?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="trend-analysis">Trend Analysis</SelectItem>
          <SelectItem value="predictive-modeling">Predictive Modeling</SelectItem>
          <SelectItem value="data-visualization">Data Visualization</SelectItem>
          <SelectItem value="statistical-summary">Statistical Summary</SelectItem>
          <SelectItem value="anomaly-detection">Anomaly Detection</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        onClick={analyzeData}
        disabled={!dataSource || !analysisType || isAnalyzing}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Data"}
      </Button>
      
      {analysisResult && (
        <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
          <h4 className="font-medium text-[#22201d] mb-2">Analysis Result:</h4>
          <p className="text-[#22201d] opacity-80">{analysisResult}</p>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="data"
      title="Data Analysis with AI"
      description="Extract insights from your data"
      icon={<BarChart3 className="h-5 w-5 text-indigo-600" />}
      videoId="dUFIj8JGz0A"
      videoTitle="AI Data Analysis Masterclass"
      videoDescription="Learn to analyze data and create insights with AI tools"
      demoTitle="Try Data Analysis"
      demoDescription="Upload your data and get AI-powered insights"
      demoContent={demoContent}
    >
      <AffiliateCard
        title="Tableau"
        description="Professional data visualization and business intelligence platform."
        features={[
          "Advanced visualizations",
          "Real-time data connections",
          "AI-powered insights",
          "Enterprise collaboration"
        ]}
        ctaText="Start Free Trial"
        affiliateUrl="https://www.tableau.com"
        commission="$100 per sale"
        rating={4.5}
        onAffiliateClick={trackAffiliateClick}
        service="tableau"
      />
    </CategoryPageLayout>
  );
};

export default Data;
