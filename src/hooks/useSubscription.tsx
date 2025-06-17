
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type SubscriptionType = 'admin' | 'paid' | 'unpaid';

export const useSubscription = () => {
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>('unpaid');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const checkSubscription = async () => {
    if (!user) {
      setSubscriptionType('unpaid');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_type')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionType('unpaid');
      } else {
        setSubscriptionType(data.subscription_type as SubscriptionType);
      }
    } catch (error) {
      console.error('Error in checkSubscription:', error);
      setSubscriptionType('unpaid');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  const hasUnlimitedAccess = subscriptionType === 'admin' || subscriptionType === 'paid';

  return {
    subscriptionType,
    hasUnlimitedAccess,
    loading,
    checkSubscription
  };
};
