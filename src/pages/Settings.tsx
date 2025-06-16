
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Bell, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#fef9ed]">
      {/* Header */}
      <div className="bg-[#e9ecf1] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-[#22201d] hover:text-[#6cae75] hover:bg-white/50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-[#22201d]">Settings</h1>
          <p className="text-[#22201d] opacity-70 mt-2">Manage your account preferences and settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-[20px] p-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#6cae75] data-[state=active]:text-white rounded-[15px] text-[#22201d]">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#6cae75] data-[state=active]:text-white rounded-[15px] text-[#22201d]">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-[#6cae75] data-[state=active]:text-white rounded-[15px] text-[#22201d]">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-[#6cae75] data-[state=active]:text-white rounded-[15px] text-[#22201d]">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#22201d]">Profile Information</CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-[#22201d] font-medium">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue="John" 
                      className="bg-[#e9ecf1] border-gray-300 text-[#22201d] mt-1 rounded-[15px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-[#22201d] font-medium">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue="Doe" 
                      className="bg-[#e9ecf1] border-gray-300 text-[#22201d] mt-1 rounded-[15px]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#22201d] font-medium">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="john@example.com" 
                    className="bg-[#e9ecf1] border-gray-300 text-[#22201d] mt-1 rounded-[15px]"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-[#22201d] font-medium">Bio</Label>
                  <Input 
                    id="bio" 
                    placeholder="Tell us about yourself" 
                    className="bg-[#e9ecf1] border-gray-300 text-[#22201d] mt-1 rounded-[15px]"
                  />
                </div>
                <Button className="bg-[#6cae75] hover:bg-[#5a9d64] text-white rounded-[30px] px-8">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#22201d]">Notification Preferences</CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[#22201d] font-medium">Email Notifications</Label>
                    <p className="text-[#22201d] opacity-60 text-sm">Receive email updates about your progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[#22201d] font-medium">Course Reminders</Label>
                    <p className="text-[#22201d] opacity-60 text-sm">Get reminded about incomplete tutorials</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[#22201d] font-medium">New Content Alerts</Label>
                    <p className="text-[#22201d] opacity-60 text-sm">Be notified when new tutorials are available</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[#22201d] font-medium">Weekly Progress Report</Label>
                    <p className="text-[#22201d] opacity-60 text-sm">Receive a summary of your learning progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#22201d]">Privacy Settings</CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  Control your privacy and data sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[#22201d] font-medium">Public Profile</Label>
                    <p className="text-[#22201d] opacity-60 text-sm">Make your learning progress visible to others</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[#22201d] font-medium">Analytics Collection</Label>
                    <p className="text-[#22201d] opacity-60 text-sm">Help us improve by sharing usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[#22201d] font-medium">AI Training Data</Label>
                    <p className="text-[#22201d] opacity-60 text-sm">Allow your interactions to improve our AI</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-white border border-gray-200 rounded-[20px] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#22201d]">Billing Information</CardTitle>
                <CardDescription className="text-[#22201d] opacity-70">
                  Manage your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#e9ecf1] rounded-[15px] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[#22201d] font-semibold">Current Plan</h3>
                      <p className="text-[#22201d] opacity-70">Free Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#22201d]">£0</p>
                      <p className="text-[#22201d] opacity-60 text-sm">/month</p>
                    </div>
                  </div>
                  <Link to="/billing">
                    <Button className="w-full bg-[#ee4023] hover:bg-[#d63a1e] text-white rounded-[30px]">
                      Upgrade to Pro
                    </Button>
                  </Link>
                </div>

                <div>
                  <h4 className="text-[#22201d] font-medium mb-4">Usage This Month</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#22201d] opacity-70">Daily Access Used</span>
                      <span className="text-[#22201d] font-medium">12/30 minutes</span>
                    </div>
                    <div className="w-full bg-[#e9ecf1] rounded-full h-2">
                      <div className="bg-[#6cae75] h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
