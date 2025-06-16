
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, CreditCard, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Billing = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-black text-white">Billing & Subscription</h1>
          <p className="text-gray-300 mt-2">Manage your subscription and billing information</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Plan */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Current Subscription</h2>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Free Plan</h3>
                  <p className="text-gray-300">30 minutes daily access • All tutorials • AI companion</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-white">£0</p>
                  <p className="text-gray-400">/month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Upgrade Your Plan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pro Plan */}
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30 relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl">
                  ⭐ Recommended
                </span>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl text-white font-bold">Pro Plan</CardTitle>
                <div className="text-5xl font-black text-white my-6">
                  £19<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
                <CardDescription className="text-gray-300">Unlimited learning and growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-white font-semibold">Unlimited access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">All video tutorials</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Premium AI companion</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Priority support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Early access to new content</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Downloadable resources</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white font-bold">Enterprise</CardTitle>
                <div className="text-5xl font-black text-white my-6">
                  Custom
                </div>
                <CardDescription className="text-gray-300">For teams and organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Everything in Pro</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Team management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Custom integrations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Advanced analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Dedicated support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">SSO integration</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Billing History */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Billing History</h2>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No billing history available</p>
                <p className="text-gray-500 text-sm mt-2">You're currently on the free plan</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No payment method on file</p>
                <p className="text-gray-500 text-sm mt-2">Add a payment method to upgrade your plan</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
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

export default Billing;
