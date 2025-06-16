
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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-black text-white">Settings</h1>
          <p className="text-gray-300 mt-2">Manage your account preferences and settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-blue-600">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue="John" 
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue="Doe" 
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="john@example.com" 
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                  <Input 
                    id="bio" 
                    placeholder="Tell us about yourself" 
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-300">
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Email Notifications</Label>
                    <p className="text-gray-400 text-sm">Receive email updates about your progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Course Reminders</Label>
                    <p className="text-gray-400 text-sm">Get reminded about incomplete tutorials</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">New Content Alerts</Label>
                    <p className="text-gray-400 text-sm">Be notified when new tutorials are available</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Weekly Progress Report</Label>
                    <p className="text-gray-400 text-sm">Receive a summary of your learning progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Privacy Settings</CardTitle>
                <CardDescription className="text-gray-300">
                  Control your privacy and data sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Public Profile</Label>
                    <p className="text-gray-400 text-sm">Make your learning progress visible to others</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Analytics Collection</Label>
                    <p className="text-gray-400 text-sm">Help us improve by sharing usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">AI Training Data</Label>
                    <p className="text-gray-400 text-sm">Allow your interactions to improve our AI</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Billing Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold">Current Plan</h3>
                      <p className="text-gray-300">Free Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">£0</p>
                      <p className="text-gray-400 text-sm">/month</p>
                    </div>
                  </div>
                  <Link to="/billing">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Upgrade to Pro
                    </Button>
                  </Link>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Usage This Month</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Daily Access Used</span>
                      <span className="text-white">12/30 minutes</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
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
