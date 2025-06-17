
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  Shield,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  role?: string;
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
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch users with their roles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          created_at,
          user_roles(role)
        `);

      if (profilesError) throw profilesError;

      const usersWithRoles = profilesData?.map(profile => ({
        ...profile,
        role: profile.user_roles?.[0]?.role || 'user'
      })) || [];

      setUsers(usersWithRoles);

      // Fetch usage statistics
      const { data: usageData, error: usageError } = await supabase
        .from('usage_tracking')
        .select('category, usage_minutes, user_id');

      if (usageError) throw usageError;

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

      if (paymentsError) throw paymentsError;

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
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const promoteToAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: 'admin' });

      if (error) throw error;

      toast({
        title: "Success",
        description: "User promoted to admin",
      });

      fetchAdminData();
    } catch (error) {
      console.error('Error promoting user:', error);
      toast({
        title: "Error",
        description: "Failed to promote user",
        variant: "destructive",
      });
    }
  };

  const demoteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin privileges removed",
      });

      fetchAdminData();
    } catch (error) {
      console.error('Error demoting user:', error);
      toast({
        title: "Error",
        description: "Failed to remove admin privileges",
        variant: "destructive",
      });
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
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-[#22201d]">{user.full_name || 'No name'}</p>
                        <p className="text-sm text-[#22201d] opacity-70">{user.email}</p>
                        <p className="text-xs text-[#22201d] opacity-50">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                          {user.role}
                        </Badge>
                        {user.role === 'admin' ? (
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Monitor system usage across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usageStats.map((stat) => (
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Overview</CardTitle>
                <CardDescription>Monitor revenue and subscription status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
