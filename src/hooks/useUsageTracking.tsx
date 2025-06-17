
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUsageTracking = (category: string) => {
  const [usageMinutes, setUsageMinutes] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error getting IP:', error);
      return '127.0.0.1'; // fallback
    }
  };

  const checkUsage = async () => {
    try {
      const ip = await getClientIP();
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('usage_tracking')
        .select('usage_minutes')
        .eq('ip_address', ip)
        .eq('category', category)
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking usage:', error);
        return;
      }

      const currentUsage = data?.usage_minutes || 0;
      setUsageMinutes(currentUsage);
      setIsLimitReached(currentUsage >= 30);
    } catch (error) {
      console.error('Error in checkUsage:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackUsage = async (minutes: number) => {
    try {
      const ip = await getClientIP();
      
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

      await checkUsage();
    } catch (error) {
      console.error('Error in trackUsage:', error);
    }
  };

  const trackAffiliateClick = async (service: string) => {
    try {
      const ip = await getClientIP();
      
      const { error } = await supabase
        .from('affiliate_clicks')
        .insert({
          user_id: user?.id || null,
          ip_address: ip,
          affiliate_service: service
        });

      if (error) {
        console.error('Error tracking affiliate click:', error);
      }
    } catch (error) {
      console.error('Error in trackAffiliateClick:', error);
    }
  };

  useEffect(() => {
    checkUsage();
  }, [category]);

  const remainingMinutes = Math.max(0, 30 - usageMinutes);

  return {
    usageMinutes,
    remainingMinutes,
    isLimitReached,
    loading,
    trackUsage,
    trackAffiliateClick
  };
};
