
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, CreditCard, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";

const Billing = () => {
  const { toast } = useToast();
  const paypalRef = useRef<HTMLDivElement>(null);

  const handleUpgradeToPro = () => {
    toast({
      title: "Payment Setup Required",
      description: "Please contact support to set up your Pro subscription payment.",
    });
    // You need to replace this with your actual payment processor setup
    window.open('mailto:support@howtouseai.com?subject=Pro Plan Upgrade Request', '_blank');
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
    // Load PayPal SDK
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
              description: `Subscription ID: ${data.subscriptionID}`,
            });
            console.log('Subscription ID:', data.subscriptionID);
          }
        }).render(paypalRef.current);
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [toast]);

  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
            </Link>
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
          <Card className="bg-white border border-gray-200 rounded-[20px]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#22201d] mb-2">Free Plan</h3>
                  <p className="text-[#22201d] opacity-70">30 minutes daily access • All tutorials • AI companion</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[#22201d]">£0</p>
                  <p className="text-[#22201d] opacity-50">/month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Options */}
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

        {/* Billing History */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#22201d] mb-6">Billing History</h2>
          <Card className="bg-white border border-gray-200 rounded-[20px]">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <p className="text-[#22201d] opacity-50 text-lg">No billing history available</p>
                <p className="text-[#22201d] opacity-40 text-sm mt-2">You're currently on the free plan</p>
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
                <p className="text-[#22201d] opacity-50 text-lg">No payment method on file</p>
                <p className="text-[#22201d] opacity-40 text-sm mt-2">Add a payment method to upgrade your plan</p>
                <Button 
                  onClick={handleAddPaymentMethod}
                  className="mt-4 bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px]"
                >
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
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
