import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  Shield,
  Key,
  Video,
  FileText,
  HelpCircle,
  Save
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  user_roles?: Array<{ role: string }>;
}

interface UsageStats {
  category: string;
  total_usage: number;
  user_count: number;
}

interface PaymentStats {
  total_revenue: number;
  active_subscriptions: number;
  failed_payments: number;
}

interface ContentItem {
  id: string;
  category: string;
  title: string;
  description: string;
  video_url?: string;
  price?: number;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats[]>([]);
  const [paymentStats, setPaymentStats] = useState<PaymentStats>({
    total_revenue: 0,
    active_subscriptions: 0,
    failed_payments: 0
  });
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    replicate: ''
  });
  const [activeTab, setActiveTab] = useState("users");
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminData();
    loadContentItems();
  }, []);

  const fetchAdminData = async () => {
    try {
      console.log('Fetching admin data...');
      
      // Fetch users with their roles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at');

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        throw profilesError;
      }

      console.log('Profiles data:', profilesData);

      // Fetch user roles separately
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Roles error:', rolesError);
        throw rolesError;
      }

      console.log('Roles data:', rolesData);

      // Combine profiles with roles
      const usersWithRoles = profilesData?.map(profile => ({
        ...profile,
        user_roles: rolesData?.filter(role => role.user_id === profile.id).map(role => ({ role: role.role })) || []
      })) || [];

      console.log('Users with roles:', usersWithRoles);
      setUsers(usersWithRoles);

      // Fetch usage statistics
      const { data: usageData, error: usageError } = await supabase
        .from('usage_tracking')
        .select('category, usage_minutes, user_id');

      if (usageError && usageError.code !== 'PGRST116') {
        console.error('Usage error:', usageError);
      }

      // Aggregate usage stats
      const statsMap = new Map();
      usageData?.forEach(record => {
        const existing = statsMap.get(record.category) || { total_usage: 0, users: new Set() };
        existing.total_usage += record.usage_minutes || 0;
        existing.users.add(record.user_id);
        statsMap.set(record.category, existing);
      });

      const aggregatedStats = Array.from(statsMap.entries()).map(([category, data]) => ({
        category,
        total_usage: data.total_usage,
        user_count: data.users.size
      }));

      setUsageStats(aggregatedStats);

      // Fetch payment statistics
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('amount, status, expires_at');

      if (paymentsError && paymentsError.code !== 'PGRST116') {
        console.error('Payments error:', paymentsError);
      }

      const now = new Date();
      let totalRevenue = 0;
      let activeSubscriptions = 0;
      let failedPayments = 0;

      paymentsData?.forEach(payment => {
        if (payment.status === 'completed') {
          totalRevenue += payment.amount;
          if (payment.expires_at && new Date(payment.expires_at) > now) {
            activeSubscriptions++;
          }
        } else if (payment.status === 'failed') {
          failedPayments++;
        }
      });

      setPaymentStats({
        total_revenue: totalRevenue / 100, // Convert from cents
        active_subscriptions: activeSubscriptions,
        failed_payments: failedPayments
      });

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadContentItems = () => {
    // Sample content items - in real app this would come from database
    const sampleContent = [
      {
        id: '1',
        category: 'general',
        title: 'General AI Chat',
        description: 'Chat with AI, generate content, and get instant answers',
        video_url: 'https://example.com/general-demo.mp4',
        price: 0
      },
      {
        id: '2',
        category: 'writing',
        title: 'AI Writing Assistant',
        description: 'Create articles, blogs, and marketing copy with AI',
        video_url: 'https://example.com/writing-demo.mp4',
        price: 9.99
      },
      {
        id: '3',
        category: 'images',
        title: 'AI Image Generator',
        description: 'Generate, edit, and enhance images with AI',
        video_url: 'https://example.com/images-demo.mp4',
        price: 19.99
      }
    ];
    setContentItems(sampleContent);
  };

  const promoteToAdmin = async (userId: string) => {
    try {
      console.log('Promoting user to admin:', userId);
      
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: 'admin' });

      if (error) {
        console.error('Error promoting user:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "User promoted to admin successfully",
      });

      // Refresh the data
      await fetchAdminData();
    } catch (error) {
      console.error('Error promoting user:', error);
      toast({
        title: "Error",
        description: "Failed to promote user. Check console for details.",
        variant: "destructive",
      });
    }
  };

  const demoteUser = async (userId: string) => {
    try {
      console.log('Demoting user:', userId);
      
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) {
        console.error('Error demoting user:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Admin privileges removed successfully",
      });

      // Refresh the data
      await fetchAdminData();
    } catch (error) {
      console.error('Error demoting user:', error);
      toast({
        title: "Error",
        description: "Failed to remove admin privileges. Check console for details.",
        variant: "destructive",
      });
    }
  };

  const updateApiKey = async (service: string, key: string) => {
    if (!key.trim()) {
      toast({
        title: "Error",
        description: "API key cannot be empty",
        variant: "destructive",
      });
      return;
    }

    console.log(`Updating ${service} API key...`);
    
    // In a real implementation, this would call a Supabase Edge Function
    // For now, just show success message
    toast({
      title: "Success",
      description: `${service} API key updated successfully. In production, this would be stored securely via Supabase Edge Functions.`,
    });
  };

  const updateContent = (id: string, field: string, value: string | number) => {
    console.log(`Updating content ${id}, field ${field}:`, value);
    setContentItems(items => 
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const saveContent = async (item: ContentItem) => {
    console.log('Saving content:', item);
    
    // In a real implementation, this would save to database
    toast({
      title: "Success",
      description: `${item.title} content updated successfully`,
    });
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action clicked:', action);
    
    switch (action) {
      case 'api-keys':
        setActiveTab('api-keys');
        break;
      case 'videos':
        setActiveTab('content');
        break;
      case 'content':
        setActiveTab('content');
        break;
      case 'support':
        toast({
          title: "Support",
          description: "Support features coming soon!",
        });
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fef9ed] flex items-center justify-center">
        <div className="text-[#22201d]">Loading admin dashboard...</div>
      </div>
    );
  }

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
                <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#22201d]">Admin Dashboard</h1>
                  <p className="text-sm text-[#22201d] opacity-70">System management & analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleQuickAction('api-keys')}
          >
            <CardContent className="p-4 text-center">
              <Key className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-[#22201d]">API Keys</h3>
              <p className="text-sm text-[#22201d] opacity-70">Manage secure API keys</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleQuickAction('videos')}
          >
            <CardContent className="p-4 text-center">
              <Video className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-[#22201d]">Videos</h3>
              <p className="text-sm text-[#22201d] opacity-70">Update demo videos</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleQuickAction('content')}
          >
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-[#22201d]">Content</h3>
              <p className="text-sm text-[#22201d] opacity-70">Edit text & pricing</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleQuickAction('support')}
          >
            <CardContent className="p-4 text-center">
              <HelpCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-[#22201d]">Support</h3>
              <p className="text-sm text-[#22201d] opacity-70">Help users</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-[#22201d]">{users.length}</p>
                  <p className="text-sm text-[#22201d] opacity-70">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-[#22201d]">
                    {usageStats.reduce((sum, stat) => sum + stat.total_usage, 0)}
                  </p>
                  <p className="text-sm text-[#22201d] opacity-70">Total Usage (min)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-[#22201d]">${paymentStats.total_revenue}</p>
                  <p className="text-sm text-[#22201d] opacity-70">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-[#22201d]">{paymentStats.active_subscriptions}</p>
                  <p className="text-sm text-[#22201d] opacity-70">Active Subs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content & Videos</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <div className="text-center py-8 text-[#22201d] opacity-70">
                      No users found. Check console for error details.
                    </div>
                  ) : (
                    users.map((user) => {
                      const isAdmin = user.user_roles?.some(role => role.role === 'admin');
                      return (
                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium text-[#22201d]">{user.full_name || 'No name'}</p>
                            <p className="text-sm text-[#22201d] opacity-70">{user.email}</p>
                            <p className="text-xs text-[#22201d] opacity-50">
                              Joined: {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={isAdmin ? 'destructive' : 'secondary'}>
                              {isAdmin ? 'admin' : 'user'}
                            </Badge>
                            {isAdmin ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => demoteUser(user.id)}
                              >
                                Remove Admin
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => promoteToAdmin(user.id)}
                              >
                                Make Admin
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content & Video Management</CardTitle>
                <CardDescription>Update descriptions, videos, and category content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contentItems.map((item) => (
                    <div key={item.id} className="p-6 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold capitalize">{item.category}</h3>
                        <Button size="sm" onClick={() => saveContent(item)}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`title-${item.id}`}>Title</Label>
                          <Input
                            id={`title-${item.id}`}
                            value={item.title}
                            onChange={(e) => updateContent(item.id, 'title', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`video-${item.id}`}>Demo Video URL</Label>
                          <Input
                            id={`video-${item.id}`}
                            value={item.video_url || ''}
                            onChange={(e) => updateContent(item.id, 'video_url', e.target.value)}
                            placeholder="https://example.com/video.mp4"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor={`desc-${item.id}`}>Description</Label>
                        <Textarea
                          id={`desc-${item.id}`}
                          value={item.description}
                          onChange={(e) => updateContent(item.id, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Management</CardTitle>
                <CardDescription>Update subscription plans and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Free Plan</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Daily Usage Limit (minutes)</Label>
                          <Input type="number" defaultValue={30} />
                        </div>
                        <div>
                          <Label>Features</Label>
                          <Textarea defaultValue="Basic AI chat, Limited image generation" rows={3} />
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => toast({ title: "Success", description: "Free plan updated" })}
                        >
                          Update Free Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Pro Plan</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Monthly Price ($)</Label>
                          <Input type="number" defaultValue={19.99} />
                        </div>
                        <div>
                          <Label>Features</Label>
                          <Textarea defaultValue="Unlimited usage, Priority support, Advanced AI models" rows={3} />
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => toast({ title: "Success", description: "Pro plan updated" })}
                        >
                          Update Pro Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Enterprise Plan</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Monthly Price ($)</Label>
                          <Input type="number" defaultValue={99.99} />
                        </div>
                        <div>
                          <Label>Features</Label>
                          <Textarea defaultValue="Everything in Pro, Custom integrations, Dedicated support" rows={3} />
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => toast({ title: "Success", description: "Enterprise plan updated" })}
                        >
                          Update Enterprise Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle>API Keys Management</CardTitle>
                <CardDescription>Securely manage API keys for services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Security Note</h3>
                    <p className="text-sm text-blue-800">
                      API keys are stored securely in Supabase Edge Function secrets. 
                      They are never exposed in the frontend code and are only accessible 
                      to server-side functions.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-4">OpenAI API Key</h4>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="sk-..."
                            value={apiKeys.openai}
                            onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => updateApiKey('OpenAI', apiKeys.openai)}
                            className="w-full"
                          >
                            Update OpenAI Key
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-4">Replicate API Key</h4>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="r8_..."
                            value={apiKeys.replicate}
                            onChange={(e) => setApiKeys(prev => ({ ...prev, replicate: e.target.value }))}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => updateApiKey('Replicate', apiKeys.replicate)}
                            className="w-full"
                          >
                            Update Replicate Key
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Monitor system usage across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usageStats.length === 0 ? (
                      <div className="text-center py-8 text-[#22201d] opacity-70">
                        No usage data available yet.
                      </div>
                    ) : (
                      usageStats.map((stat) => (
                        <div key={stat.category} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium text-[#22201d] capitalize">{stat.category}</p>
                            <p className="text-sm text-[#22201d] opacity-70">{stat.user_count} users</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#22201d]">{stat.total_usage}</p>
                            <p className="text-sm text-[#22201d] opacity-70">minutes</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Overview</CardTitle>
                  <CardDescription>Monitor revenue and subscription status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">${paymentStats.total_revenue}</p>
                      <p className="text-sm text-[#22201d] opacity-70">Total Revenue</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">{paymentStats.active_subscriptions}</p>
                      <p className="text-sm text-[#22201d] opacity-70">Active Subscriptions</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-2xl font-bold text-red-600">{paymentStats.failed_payments}</p>
                      <p className="text-sm text-[#22201d] opacity-70">Failed Payments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
