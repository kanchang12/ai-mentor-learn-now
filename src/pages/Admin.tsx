import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import AdminContentManager from "@/components/AdminContentManager";

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

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats[]>([]);
  const [paymentStats, setPaymentStats] = useState<PaymentStats>({
    total_revenue: 0,
    active_subscriptions: 0,
    failed_payments: 0
  });
  const [loading, setLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState({
    perplexity: '',
    leonardo: '',
    claude: '',
    vapi_api_key: '',
    vapi_assistant_id: '',
    openai: '',
    anthropic: '',
    huggingface: ''
  });
  const [activeTab, setActiveTab] = useState("api-keys");
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminData();
    loadApiKeys();
  }, []);

  const fetchAdminData = async () => {
    try {
      console.log('Fetching admin data...');
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at');

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        throw profilesError;
      }

      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Roles error:', rolesError);
        throw rolesError;
      }

      const usersWithRoles = profilesData?.map(profile => ({
        ...profile,
        user_roles: rolesData?.filter(role => role.user_id === profile.id).map(role => ({ role: role.role })) || []
      })) || [];

      setUsers(usersWithRoles);

      const { data: usageData, error: usageError } = await supabase
        .from('usage_tracking')
        .select('category, usage_minutes, user_id');

      if (usageError && usageError.code !== 'PGRST116') {
        console.error('Usage error:', usageError);
      }

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
        total_revenue: totalRevenue / 100,
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

// REPLACE your loadApiKeys function (around line 144) with this:
const loadApiKeys = async () => {
  try {
    // Load API keys from Supabase database instead of localStorage
    const { data, error } = await supabase
      .from('admin_settings')
      .select('key, value')
      .eq('type', 'api_key');

    if (error) {
      console.error('Error loading API keys:', error);
      // Fallback to localStorage if database fails
      const keys = {
        perplexity: localStorage.getItem('api_key_perplexity') || '',
        leonardo: localStorage.getItem('api_key_leonardo') || '',
        claude: localStorage.getItem('api_key_claude') || '',
        vapi_api_key: localStorage.getItem('vapi_api_key') || '',
        vapi_assistant_id: localStorage.getItem('vapi_assistant_id') || '',
        openai: localStorage.getItem('api_key_openai') || '',
        anthropic: localStorage.getItem('api_key_anthropic') || '',
        huggingface: localStorage.getItem('api_key_huggingface') || ''
      };
      setApiKeys(keys);
      return;
    }

    // Convert database results to the format your UI expects
    const keys = {
      perplexity: data?.find(k => k.key === 'PERPLEXITY_API_KEY')?.value || '',
      leonardo: data?.find(k => k.key === 'LEONARDO_API_KEY')?.value || '',
      claude: data?.find(k => k.key === 'CLAUDE_API_KEY')?.value || '',
      vapi_api_key: data?.find(k => k.key === 'VAPI_API_KEY')?.value || '',
      vapi_assistant_id: data?.find(k => k.key === 'VAPI_ASSISTANT_ID')?.value || '',
      openai: data?.find(k => k.key === 'OPENAI_API_KEY')?.value || '',
      anthropic: data?.find(k => k.key === 'ANTHROPIC_API_KEY')?.value || '',
      huggingface: data?.find(k => k.key === 'HUGGINGFACE_API_KEY')?.value || ''
    };
    
    setApiKeys(keys);
  } catch (error) {
    console.error('Error loading API keys:', error);
    toast({
      title: "Error",
      description: "Failed to load API keys",
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

  // REPLACE your updateApiKey function (around line 209) with this:
const updateApiKey = async (service: string, key: string) => {
  if (!key.trim()) {
    toast({
      title: "Error",
      description: "API key cannot be empty",
      variant: "destructive",
    });
    return;
  }

  try {
    // Convert service name to database key format
    let dbKey: string;
    if (service === 'VAPI API Key') {
      dbKey = 'VAPI_API_KEY';
    } else if (service === 'VAPI Assistant ID') {
      dbKey = 'VAPI_ASSISTANT_ID';
    } else {
      dbKey = `${service.toUpperCase()}_API_KEY`;
    }

    // Save to Supabase database (where Edge Functions can access)
    const { error } = await supabase
      .from('admin_settings')
      .upsert({
        type: 'api_key',
        key: dbKey,
        value: key,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Database save error:', error);
      throw error;
    }

    
  const handleQuickAction = (action: string) => {
    setActiveTab(action);
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
                  <p className="text-sm text-[#22201d] opacity-70">System management & API keys</p>
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
              <Key className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-[#22201d]">API Keys</h3>
              <p className="text-sm text-[#22201d] opacity-70">Configure all services</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleQuickAction('content')}
          >
            <CardContent className="p-4 text-center">
              <Video className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-[#22201d]">Edit Content</h3>
              <p className="text-sm text-[#22201d] opacity-70">Manage all page content</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleQuickAction('users')}
          >
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-[#22201d]">Users</h3>
              <p className="text-sm text-[#22201d] opacity-70">Manage user roles</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleQuickAction('analytics')}
          >
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-[#22201d]">Analytics</h3>
              <p className="text-sm text-[#22201d] opacity-70">View system stats</p>
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
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle>API Keys Management</CardTitle>
                <CardDescription>Configure all AI service API keys to enable functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Important: Set All API Keys</h3>
                    <p className="text-sm text-blue-800">
                      Configure these API keys to enable all AI functionality. Without proper keys, services will show demo responses.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Perplexity AI */}
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-4">Perplexity AI (General Chat & Writing)</h4>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="Enter Perplexity API key..."
                            value={apiKeys.perplexity}
                            onChange={(e) => setApiKeys(prev => ({ ...prev, perplexity: e.target.value }))}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => updateApiKey('Perplexity', apiKeys.perplexity)}
                            className="w-full"
                          >
                            Update Perplexity Key
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Leonardo AI */}
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-4">Leonardo AI (Images)</h4>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="Enter Leonardo AI API key..."
                            value={apiKeys.leonardo}
                            onChange={(e) => setApiKeys(prev => ({ ...prev, leonardo: e.target.value }))}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => updateApiKey('Leonardo', apiKeys.leonardo)}
                            className="w-full"
                          >
                            Update Leonardo Key
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Claude AI */}
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-4">Claude AI (Data Analysis)</h4>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="Enter Claude API key..."
                            value={apiKeys.claude}
                            onChange={(e) => setApiKeys(prev => ({ ...prev, claude: e.target.value }))}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => updateApiKey('Claude', apiKeys.claude)}
                            className="w-full"
                          >
                            Update Claude Key
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* VAPI Configuration */}
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-4">VAPI Voice Assistant</h4>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="Enter VAPI API key..."
                            value={apiKeys.vapi_api_key}
                            onChange={(e) => setApiKeys(prev => ({ ...prev, vapi_api_key: e.target.value }))}
                          />
                          <Input
                            type="text"
                            placeholder="Enter VAPI Assistant ID..."
                            value={apiKeys.vapi_assistant_id}
                            onChange={(e) => setApiKeys(prev => ({ ...prev, vapi_assistant_id: e.target.value }))}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => updateApiKey('VAPI API Key', apiKeys.vapi_api_key)}
                            className="w-full"
                          >
                            Update VAPI API Key
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => updateApiKey('VAPI Assistant ID', apiKeys.vapi_assistant_id)}
                            className="w-full"
                          >
                            Update VAPI Assistant ID
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* OpenAI */}
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-4">OpenAI (Backup/Alternative)</h4>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="Enter OpenAI API key..."
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

                    {/* Hugging Face */}
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-4">Hugging Face (Alternative Images)</h4>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="Enter Hugging Face API token..."
                            value={apiKeys.huggingface}
                            onChange={(e) => setApiKeys(prev => ({ ...prev, huggingface: e.target.value }))}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => updateApiKey('HuggingFace', apiKeys.huggingface)}
                            className="w-full"
                          >
                            Update HuggingFace Token
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content & Video Management</CardTitle>
                <CardDescription>Edit all page content, videos, and descriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminContentManager />
              </CardContent>
            </Card>
          </TabsContent>

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
