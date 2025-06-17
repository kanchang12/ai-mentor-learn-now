
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft,
  Bot,
  User,
  Minimize2,
  Maximize2,
  BarChart3,
  Upload,
  Send,
  FileSpreadsheet,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { UsageMeter } from "@/components/UsageMeter";
import { AffiliateCard } from "@/components/AffiliateCard";

const Data = () => {
  const [prompt, setPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const { usageMinutes, isLimitReached, loading, trackUsage, trackAffiliateClick } = useUsageTracking('data');
  
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message: "Hello! I'm your AI data analysis assistant. I can help you analyze datasets, create visualizations, and extract insights from your data. Upload a CSV or describe your analysis needs!",
      timestamp: "Just now"
    }
  ]);

  const analyzeData = async () => {
    if (!prompt.trim() || isLimitReached) return;

    setIsAnalyzing(true);
    setAnalysisResult("");

    // Simulate data analysis
    setTimeout(() => {
      setAnalysisResult(`Data Analysis Results for: "${prompt}"

Key Insights:
• Identified 3 major trends in your dataset
• Found correlation coefficient of 0.82 between variables
• Detected 5% outliers that may need attention
• Recommended data cleaning steps for improved accuracy

Statistical Summary:
- Mean: 245.7
- Median: 238.5
- Standard Deviation: 42.3
- Sample Size: 1,247 records

Visualization suggestions:
1. Time series plot for trend analysis
2. Scatter plot for correlation visualization
3. Box plot for outlier detection

Next Steps:
Consider implementing data preprocessing to handle missing values and normalize the distribution.`);
      
      trackUsage(2);
      setIsAnalyzing(false);
    }, 3000);
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      message: chatMessage,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setChatMessage("");

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai", 
        message: "Great question about data analysis! I recommend starting with exploratory data analysis (EDA) to understand your dataset structure, then applying statistical methods based on your specific goals.",
        timestamp: "Just now"
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

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
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#22201d]">Data Analysis</h1>
                  <p className="text-sm text-[#22201d] opacity-70">AI-powered data insights</p>
                </div>
              </div>
            </div>

            <UsageMeter 
              usageMinutes={usageMinutes} 
              isLimitReached={isLimitReached} 
              loading={loading} 
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Demo Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Data Analysis Demo */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#22201d] flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-[#6cae75]" />
                  AI Data Analyzer
                </CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  Upload data or describe your analysis needs for AI-powered insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Describe your data analysis needs... (e.g., 'Analyze sales trends over the last quarter', 'Find correlations in customer behavior data')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 min-h-[100px] text-[#22201d]"
                    disabled={isLimitReached}
                  />
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      disabled={isLimitReached}
                      className="border-gray-300"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload CSV
                    </Button>
                    <Button 
                      onClick={analyzeData}
                      disabled={!prompt.trim() || isAnalyzing || isLimitReached}
                      className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Data"}
                    </Button>
                  </div>
                </div>
                
                {analysisResult && (
                  <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
                    <h4 className="font-medium text-[#22201d] mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analysis Results:
                    </h4>
                    <pre className="text-[#22201d] whitespace-pre-wrap text-sm">{analysisResult}</pre>
                  </div>
                )}

                {isLimitReached && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                      You've reached your daily limit of 30 minutes. Upgrade for unlimited access!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Chat Interface */}
            <Card className={`bg-white border border-gray-200 rounded-[20px] shadow-lg transition-all duration-300 ${chatMinimized ? 'h-16' : 'h-96'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6cae75] to-[#5a9d64] rounded-lg flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-[#22201d]">Data Analysis Guide</CardTitle>
                      <CardDescription className="text-xs text-[#22201d] opacity-70">Ask questions about data analysis</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatMinimized(!chatMinimized)}
                    className="text-[#22201d] opacity-70 hover:text-[#22201d] hover:bg-[#e9ecf1]"
                  >
                    {chatMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>

              {!chatMinimized && (
                <CardContent className="pt-0 pb-3">
                  <ScrollArea className="h-48 mb-4">
                    <div className="space-y-3">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-start space-x-2 max-w-[80%] ${
                            msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              msg.sender === 'user' 
                                ? 'bg-[#6cae75]' 
                                : 'bg-gradient-to-br from-[#6cae75] to-[#5a9d64]'
                            }`}>
                              {msg.sender === 'user' ? (
                                <User className="h-3 w-3 text-white" />
                              ) : (
                                <Bot className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className={`p-2 rounded-lg text-sm ${
                              msg.sender === 'user'
                                ? 'bg-[#6cae75] text-white'
                                : 'bg-[#e9ecf1] text-[#22201d]'
                            }`}>
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about data analysis..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      className="text-sm bg-white border-gray-300 text-[#22201d] placeholder:text-[#22201d] placeholder:opacity-50"
                    />
                    <Button size="sm" onClick={sendChatMessage} className="bg-[#6cae75] hover:bg-[#5a9d64]">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar with Affiliate Tools */}
          <div className="space-y-6">
            <AffiliateCard
              title="Observable"
              description="Advanced data visualization and analysis platform for teams."
              features={[
                "Interactive notebooks",
                "Real-time collaboration",
                "Data visualization tools",
                "JavaScript-based analytics"
              ]}
              ctaText="Start Free Trial"
              affiliateUrl="https://observablehq.com/pricing"
              commission="Referral bonus"
              rating={4.6}
              onAffiliateClick={trackAffiliateClick}
              service="observable"
            />

            <AffiliateCard
              title="Tableau"
              description="Professional business intelligence and data visualization."
              features={[
                "Drag-and-drop interface",
                "Advanced analytics",
                "Dashboard creation",
                "Enterprise integration"
              ]}
              ctaText="Get Started"
              affiliateUrl="https://www.tableau.com/pricing"
              commission="Partner program"
              rating={4.7}
              onAffiliateClick={trackAffiliateClick}
              service="tableau"
            />

            <Card className="bg-gradient-to-br from-[#6cae75]/10 to-[#5a9d64]/10 border border-[#6cae75]/30 rounded-[20px]">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-[#22201d] mb-2">Premium Analytics</h3>
                <p className="text-sm text-[#22201d] opacity-70 mb-3">
                  Get advanced analytics features and unlimited data processing.
                </p>
                <Button className="w-full bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
