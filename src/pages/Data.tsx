
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, ExternalLink } from "lucide-react";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { AffiliateCard } from "@/components/AffiliateCard";
import { UsageMeter } from "@/components/UsageMeter";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    paypal?: any;
  }
}

const Data = () => {
  const [dataQuery, setDataQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isDashboardActive, setIsDashboardActive] = useState(false);
  const [dashboardStartTime, setDashboardStartTime] = useState<number | null>(null);
  
  const { usageMinutes, remainingMinutes, isLimitReached, loading, trackUsage, trackAffiliateClick } = useUsageTracking('data');
  const { isAdmin } = useAdminCheck();
  const { toast } = useToast();

  // Load PayPal script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=BAAKNjnGxmgxH0RlxIrTii6hhseTQDUlLO29mOhyMwo2G4bflbYWqT5riaohj7X6d16wtqRs9Ujn6GZnlM&components=hosted-buttons&disable-funding=venmo&currency=GBP";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Track usage when dashboard is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDashboardActive && dashboardStartTime) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedMinutes = Math.floor((currentTime - dashboardStartTime) / (1000 * 60));
        
        if (elapsedMinutes >= 1) {
          trackUsage(1);
          setDashboardStartTime(currentTime);
          
          if (!isAdmin && usageMinutes + 1 >= 30) {
            setIsDashboardActive(false);
            setDashboardStartTime(null);
            toast({
              title: "Usage Limit Reached",
              description: "You've reached your 30-minute daily limit. Please upgrade to continue.",
              variant: "destructive",
            });
          }
        }
      }, 60000); // Check every minute
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDashboardActive, dashboardStartTime, usageMinutes, isAdmin, trackUsage, toast]);

  const startDashboard = () => {
    if (!isAdmin && isLimitReached) {
      toast({
        title: "Usage Limit Reached",
        description: "You've reached your 30-minute daily limit. Please upgrade to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsDashboardActive(true);
    setDashboardStartTime(Date.now());
    toast({
      title: "Dashboard Started",
      description: isAdmin ? "Admin access - unlimited usage" : `${remainingMinutes} minutes remaining today`,
    });
  };

  const stopDashboard = () => {
    if (isDashboardActive && dashboardStartTime) {
      const currentTime = Date.now();
      const elapsedMinutes = Math.floor((currentTime - dashboardStartTime) / (1000 * 60));
      if (elapsedMinutes >= 1) {
        trackUsage(elapsedMinutes);
      }
    }
    
    setIsDashboardActive(false);
    setDashboardStartTime(null);
    toast({
      title: "Dashboard Stopped",
      description: "Usage tracking stopped",
    });
  };

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
    <div className="space-y-6">
      {/* Usage Meter */}
      {!loading && !isAdmin && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Daily Usage</h4>
          <UsageMeter 
            usageMinutes={usageMinutes} 
            isLimitReached={isLimitReached} 
            loading={loading} 
          />
          {isAdmin && (
            <p className="text-xs text-green-600 mt-1">Admin - Unlimited Access</p>
          )}
        </div>
      )}

      {/* Data Dashboard */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#22201d]">Interactive Data Dashboard</h4>
        <div className="flex gap-2">
          <Button 
            onClick={startDashboard}
            disabled={isDashboardActive || (!isAdmin && isLimitReached)}
            className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
          >
            {isDashboardActive ? "Dashboard Active" : "Start Dashboard"}
          </Button>
          {isDashboardActive && (
            <Button 
              onClick={stopDashboard}
              variant="outline"
            >
              Stop Dashboard
            </Button>
          )}
          <Button 
            variant="outline"
            onClick={() => window.open('https://gemnink-data-dashboard1-451954006366.europe-west1.run.app', '_blank')}
          >
            Open in New Tab <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        {isDashboardActive && (
          <div className="border rounded-lg overflow-hidden bg-white">
            <iframe
              src="https://gemnink-data-dashboard1-451954006366.europe-west1.run.app"
              className="w-full h-[600px]"
              title="Data Analysis Dashboard"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Claude API Analysis */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-[#22201d]">AI Text Analysis</h4>
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

      {/* PayPal Subscription */}
      {!isAdmin && isLimitReached && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">Upgrade for Unlimited Access</h4>
          <p className="text-yellow-700 text-sm mb-4">
            You've reached your daily limit. Subscribe for unlimited data dashboard access.
          </p>
          <div id="paypal-button-container-P-1SB21788HN8043027M4FQVNI"></div>
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
