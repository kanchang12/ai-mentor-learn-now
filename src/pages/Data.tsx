
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Download } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { useToast } from "@/hooks/use-toast";

const Data = () => {
  const [analysisType, setAnalysisType] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const analyzeData = async () => {
    if (!analysisType || !dataDescription.trim()) {
      toast({
        title: "Error",
        description: "Please select analysis type and describe your data",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setResult("");
    
    setTimeout(() => {
      const analyses = {
        trends: `📈 Trend Analysis Results:\n\n• Growing trend detected in Q4 2024\n• 23% increase compared to previous period\n• Seasonal patterns identified\n• Projected growth: 15% for next quarter\n\nRecommendations:\n✅ Increase inventory for peak season\n✅ Optimize marketing spend`,
        summary: `📊 Data Summary:\n\nKey Metrics:\n• Total Records: 10,247\n• Average Value: $156.30\n• Peak Performance: March 2024\n• Success Rate: 87.5%\n\nInsights:\n✅ Strong performance in target demographics\n✅ Opportunity for expansion in new markets`,
        predictions: `🔮 Predictive Analysis:\n\nForecasted Outcomes:\n• Next Month: +12% growth expected\n• Customer Retention: 89% probability\n• Revenue Projection: $245,000\n• Risk Factors: Low (15%)\n\nAction Items:\n✅ Focus on customer satisfaction\n✅ Prepare for capacity increase`
      };
      
      setResult(analyses[analysisType as keyof typeof analyses] || "Analysis completed successfully!");
      setIsAnalyzing(false);
    }, 3000);
  };

  const downloadReport = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data-analysis-report.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const demoContent = (
    <div className="space-y-4">
      <Select value={analysisType} onValueChange={setAnalysisType}>
        <SelectTrigger>
          <SelectValue placeholder="What type of analysis?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="trends">Trend Analysis</SelectItem>
          <SelectItem value="summary">Data Summary</SelectItem>
          <SelectItem value="predictions">Predictive Analytics</SelectItem>
          <SelectItem value="insights">Business Insights</SelectItem>
        </SelectContent>
      </Select>
      
      <Textarea
        placeholder="Describe your data and what you want to analyze..."
        value={dataDescription}
        onChange={(e) => setDataDescription(e.target.value)}
        className="min-h-[100px] text-[#22201d]"
      />
      
      <Button 
        onClick={analyzeData}
        disabled={!analysisType || !dataDescription.trim() || isAnalyzing}
        className="bg-[#6cae75] hover:bg-[#5a9d64] text-white w-full"
      >
        {isAnalyzing ? "Analyzing Data..." : "Analyze Data"}
      </Button>
      
      {result && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-[#22201d]">Analysis Results:</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadReport}
              className="text-[#22201d]"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
          <div className="p-4 bg-[#e9ecf1] rounded-lg">
            <pre className="text-[#22201d] opacity-80 whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      category="data"
      title="AI Data Analysis"
      description="Extract insights from your data with AI"
      icon={<BarChart3 className="h-5 w-5 text-indigo-600" />}
      videoId="data123"
      videoTitle="AI Data Analysis Mastery"
      videoDescription="Learn to analyze data and extract insights with AI"
      demoTitle="Try Data Analysis"
      demoDescription="Analyze your data and get AI-powered insights"
      demoContent={demoContent}
    />
  );
};

export default Data;
