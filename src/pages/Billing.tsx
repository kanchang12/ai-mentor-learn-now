import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, CreditCard, Download, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";

const Billing = () => {
  const { toast } = useToast();
  const paypalRef = useRef<HTMLDivElement>(null);
  const { subscriptionType, loading, checkSubscription } = useSubscription();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshSubscription = async () => {
    setIsRefreshing(true);
    try {
      await checkSubscription();
      toast({
        title: "Subscription Updated",
        description: "Your subscription status has been refreshed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh subscription status.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleContactSales = () => {
    toast({
      title: "Contact Sales",
      description: "Opening contact form...",
    });
    window.open('mailto:sales@howtouseai.com?subject=Enterprise Plan Inquiry', '_blank');
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment Setup",
      description: "Contact support to add payment method.",
    });
    window.open('mailto:support@howtouseai.com?subject=Add Payment Method', '_blank');
  };

  useEffect(() => {
    // Load PayPal SDK with webhook integration
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AVKxMbT8tz0EQCLg5Rt2biPRfqWU4DCZ90agiBqkxxOgzKoR1KBo2ejZedD2hhcec_pNVCn096sr_Dml&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    
    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: function(data: any, actions: any) {
            return actions.subscription.create({
              plan_id: 'P-7N8009650M991643SNBIYENI'
            });
          },
          onApprove: function(data: any, actions: any) {
            toast({
              title: "Subscription Created!",
              description: `Subscription ID: ${data.subscriptionID}. Your account will be updated shortly.`,
            });
            console.log('Subscription ID:', data.subscriptionID);
            
            // Refresh subscription status after a short delay
            setTimeout(() => {
              checkSubscription();
            }, 3000);
          },
          onError: function(err: any) {
            toast({
              title: "Payment Error",
              description: "There was an issue processing your payment. Please try again.",
              variant: "destructive",
            });
            console.error('PayPal error:', err);
          }
        }).render(paypalRef.current);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [toast, checkSubscription]);

  const getCurrentPlanName = () => {
    switch (subscriptionType) {
      case 'admin': return 'Admin Plan';
      case 'paid': return 'Pro Plan';
      default: return 'Free Plan';
    }
  };

  const getCurrentPlanPrice = () => {
    switch (subscriptionType) {
      case 'admin': return 'Unlimited';
      case 'paid': return '£19';
      default: return '£0';
    }
  };

  const getCurrentPlanFeatures = () => {
    switch (subscriptionType) {
      case 'admin': 
      case 'paid': 
        return 'Unlimited access • All tutorials • Premium AI companion • Priority support';
      default: 
        return '30 minutes daily access • All tutorials • AI companion';
    }
  };

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
            </Link>
            <Button 
              onClick={handleRefreshSubscription}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Status
            </Button>
          </div>
          <h1 className="text-3xl font-black text-[#22201d]">Billing & Subscription</h1>
          <p className="text-[#22201d] opacity-70 mt-2">Manage your subscription and billing information</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Plan */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#22201d] mb-6">Current Subscription</h2>
          <Card className={`bg-white border rounded-[20px] ${subscriptionType === 'paid' || subscriptionType === 'admin' ? 'border-[#6cae75] bg-gradient-to-br from-[#6cae75]/10 to-[#5a9d64]/10' : 'border-gray-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#22201d] mb-2">
                    {getCurrentPlanName()}
                    {(subscriptionType === 'paid' || subscriptionType === 'admin') && (
                      <span className="ml-2 bg-[#6cae75] text-white px-2 py-1 rounded-full text-xs">Active</span>
                    )}
                  </h3>
                  <p className="text-[#22201d] opacity-70">{getCurrentPlanFeatures()}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[#22201d]">{getCurrentPlanPrice()}</p>
                  <p className="text-[#22201d] opacity-50">/month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Options - Only show if not already paid/admin */}
        {subscriptionType === 'unpaid' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#22201d] mb-6">Upgrade Your Plan</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pro Plan */}
              <Card className="bg-gradient-to-br from-[#6cae75]/20 to-[#5a9d64]/20 border-[#6cae75]/30 relative shadow-lg rounded-[20px]">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#6cae75] to-[#5a9d64] text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl">
                    ⭐ Recommended
                  </span>
                </div>
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl text-[#22201d] font-bold">Pro Plan</CardTitle>
                  <div className="text-5xl font-black text-[#22201d] my-6">
                    £19<span className="text-lg font-normal text-[#22201d] opacity-50">/month</span>
                  </div>
                  <CardDescription className="text-[#22201d] opacity-70">Unlimited learning and growth</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* ... keep existing code (features list) */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] font-semibold">Unlimited access</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">All video tutorials</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Premium AI companion</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Priority support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Early access to new content</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Downloadable resources</span>
                    </div>
                  </div>
                  
                  {/* PayPal Subscription Button */}
                  <div className="mt-6">
                    <div ref={paypalRef} id="paypal-button-container-P-7N8009650M991643SNBIYENI"></div>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="bg-white border border-gray-200 rounded-[20px]">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#22201d] font-bold">Enterprise</CardTitle>
                  <div className="text-5xl font-black text-[#22201d] my-6">
                    Custom
                  </div>
                  <CardDescription className="text-[#22201d] opacity-70">For teams and organizations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* ... keep existing code (enterprise features) */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Everything in Pro</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Team management</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Custom integrations</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Advanced analytics</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">Dedicated support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#6cae75] mr-3" />
                      <span className="text-[#22201d] opacity-80">SSO integration</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleContactSales}
                    className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-[#22201d] font-bold py-3 rounded-[30px]" 
                    variant="outline"
                  >
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Success message for paid users */}
        {(subscriptionType === 'paid' || subscriptionType === 'admin') && (
          <div className="mb-12">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-[20px]">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">You're all set!</h3>
                <p className="text-green-700">You have unlimited access to all features and content.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Billing History */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#22201d] mb-6">Billing History</h2>
          <Card className="bg-white border border-gray-200 rounded-[20px]">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <p className="text-[#22201d] opacity-50 text-lg">No billing history available</p>
                <p className="text-[#22201d] opacity-40 text-sm mt-2">
                  {subscriptionType === 'unpaid' ? "You're currently on the free plan" : "Contact support for detailed billing history"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="text-2xl font-bold text-[#22201d] mb-6">Payment Method</h2>
          <Card className="bg-white border border-gray-200 rounded-[20px]">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 text-[#22201d] opacity-30 mx-auto mb-4" />
                <p className="text-[#22201d] opacity-50 text-lg">
                  {subscriptionType === 'paid' ? 'PayPal Subscription Active' : 'No payment method on file'}
                </p>
                <p className="text-[#22201d] opacity-40 text-sm mt-2">
                  {subscriptionType === 'paid' 
                    ? 'Manage your PayPal subscription in your PayPal account' 
                    : 'Add a payment method to upgrade your plan'
                  }
                </p>
                {subscriptionType === 'unpaid' && (
                  <Button 
                    onClick={handleAddPaymentMethod}
                    className="mt-4 bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]"
                  >
                    Add Payment Method
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Webhook Information */}
        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-2">For Developers:</h3>
          <p className="text-blue-700 text-sm">
            PayPal webhook endpoint: <code className="bg-blue-100 px-2 py-1 rounded">/functions/v1/paypal-webhook</code>
          </p>
          <p className="text-blue-700 text-sm mt-1">
            Configure this URL in your PayPal Developer Dashboard to automatically sync subscription status.
          </p>
        </div>
      </div>
    </div>
  );
};

// Add TypeScript declaration for PayPal
declare global {
  interface Window {
    paypal: any;
  }
}

export default Billing;
