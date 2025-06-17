
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
  Workflow,
  Play,
  Send,
  Zap,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { UsageMeter } from "@/components/UsageMeter";
import { AffiliateCard } from "@/components/AffiliateCard";

const Business = () => {
  const [workflow, setWorkflow] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [automationResult, setAutomationResult] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const { usageMinutes, isLimitReached, loading, trackUsage, trackAffiliateClick } = useUsageTracking('business');
  
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message: "Hello! I'm your business automation assistant. I can help you create workflows with Make.com, Zapier, and other automation tools. What process would you like to automate?",
      timestamp: "Just now"
    }
  ]);

  const createAutomation = async () => {
    if (!workflow.trim() || isLimitReached) return;

    setIsCreating(true);
    setAutomationResult("");

    // Simulate automation creation
    setTimeout(() => {
      setAutomationResult(`Automation Workflow Created: "${workflow}"

Suggested Automation Steps:
1. Trigger: When new data is received
2. Filter: Check if data meets criteria
3. Transform: Format data for target system
4. Action: Send to destination platform
5. Notify: Alert team members

Recommended Tools:
• Make.com - For complex multi-step workflows
• Zapier - For simple app integrations
• Webhooks - For real-time data transfer

Estimated Time Saved: 15 hours/week
ROI: $2,400/month in productivity gains

Ready-to-use Templates:
- Email to Slack notification
- CRM data sync
- Social media posting automation
- Invoice processing workflow

Next Steps:
1. Choose your automation platform
2. Set up API connections
3. Test the workflow
4. Deploy and monitor`);
      
      trackUsage(2);
      setIsCreating(false);
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
        message: "Great question! Business automation can save significant time. I recommend starting with repetitive tasks like data entry, email notifications, or social media posting. What specific process are you looking to automate?",
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
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#22201d]">Business Automation</h1>
                  <p className="text-sm text-[#22201d] opacity-70">Powered by Make.com & Zapier</p>
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
            {/* Automation Demo */}
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#22201d] flex items-center">
                  <Workflow className="h-5 w-5 mr-2 text-[#6cae75]" />
                  Automation Workflow Builder
                </CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  Describe your business process and get a custom automation workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Describe your automation needs... (e.g., 'When someone fills out our contact form, add them to CRM and send a welcome email', 'Sync new Shopify orders to our inventory system')"
                    value={workflow}
                    onChange={(e) => setWorkflow(e.target.value)}
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
                      <Settings className="h-4 w-4 mr-2" />
                      Templates
                    </Button>
                    <Button 
                      onClick={createAutomation}
                      disabled={!workflow.trim() || isCreating || isLimitReached}
                      className="bg-[#6cae75] hover:bg-[#5a9d64] text-white"
                    >
                      {isCreating ? "Creating..." : "Create Workflow"}
                    </Button>
                  </div>
                </div>
                
                {automationResult && (
                  <div className="mt-4 p-4 bg-[#e9ecf1] rounded-lg">
                    <h4 className="font-medium text-[#22201d] mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Automation Plan:
                    </h4>
                    <pre className="text-[#22201d] whitespace-pre-wrap text-sm">{automationResult}</pre>
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
                      <CardTitle className="text-base text-[#22201d]">Automation Expert</CardTitle>
                      <CardDescription className="text-xs text-[#22201d] opacity-70">Get help with business automation</CardDescription>
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
                      placeholder="Ask about business automation..."
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
              title="Make.com"
              description="Advanced automation platform for complex business workflows."
              features={[
                "Visual workflow builder",
                "1000+ app integrations",
                "Advanced data routing",
                "Enterprise-grade security"
              ]}
              ctaText="Start Automating"
              affiliateUrl="https://make.com/pricing"
              commission="Referral bonus"
              rating={4.8}
              onAffiliateClick={trackAffiliateClick}
              service="make"
            />

            <AffiliateCard
              title="Zapier"
              description="Simple automation tool to connect your favorite apps."
              features={[
                "5000+ app connections",
                "Easy setup workflows",
                "Multi-step automations",
                "Team collaboration"
              ]}
              ctaText="Get Started"
              affiliateUrl="https://zapier.com/pricing"
              commission="Partner program"
              rating={4.6}
              onAffiliateClick={trackAffiliateClick}
              service="zapier"
            />

            <Card className="bg-gradient-to-br from-[#6cae75]/10 to-[#5a9d64]/10 border border-[#6cae75]/30 rounded-[20px]">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-[#22201d] mb-2">Enterprise Automation</h3>
                <p className="text-sm text-[#22201d] opacity-70 mb-3">
                  Get unlimited workflows and priority support for your business.
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

export default Business;
