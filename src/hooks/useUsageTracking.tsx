
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useUsageTracking(category: string) {
  const { user } = useAuth();
  const [usageMinutes, setUsageMinutes] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUsage();
  }, [category, user]);

  const checkUsage = async () => {
    try {
      // Get user's IP address (simplified - in production use a proper IP service)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      const { data, error } = await supabase
        .from('usage_tracking')
        .select('usage_minutes')
        .eq('ip_address', ip)
        .eq('category', category)
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking usage:', error);
        return;
      }

      const minutes = data?.usage_minutes || 0;
      setUsageMinutes(minutes);
      setIsLimitReached(minutes >= 30);
    } catch (error) {
      console.error('Error checking usage:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackUsage = async (minutes: number) => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      const { error } = await supabase.rpc('update_usage_tracking', {
        p_user_id: user?.id || null,
        p_ip_address: ip,
        p_category: category,
        p_minutes: minutes
      });

      if (error) {
        console.error('Error tracking usage:', error);
        return;
      }

      setUsageMinutes(prev => prev + minutes);
      setIsLimitReached(usageMinutes + minutes >= 30);
    } catch (error) {
      console.error('Error tracking usage:', error);
    }
  };

  const trackAffiliateClick = async (service: string) => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      await supabase
        .from('affiliate_clicks')
        .insert({
          user_id: user?.id || null,
          ip_address: ip,
          affiliate_service: service
        });
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
    }
  };

  return {
    usageMinutes,
    isLimitReached,
    loading,
    trackUsage,
    trackAffiliateClick,
    remainingMinutes: Math.max(0, 30 - usageMinutes)
  };
}
