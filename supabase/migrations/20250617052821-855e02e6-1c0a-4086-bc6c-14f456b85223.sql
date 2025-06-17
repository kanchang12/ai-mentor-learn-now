
-- Create usage tracking table
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address INET NOT NULL,
  category TEXT NOT NULL, -- 'general', 'writing', 'images', 'business', 'data', 'website'
  usage_minutes INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(ip_address, category, date)
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- amount in cents
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  plan_type TEXT NOT NULL, -- 'unlimited_daily', 'unlimited_monthly', 'premium'
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create affiliate clicks tracking
CREATE TABLE public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address INET NOT NULL,
  affiliate_service TEXT NOT NULL, -- 'copy_ai', 'stability_ai', 'make_com', etc.
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Usage tracking policies
CREATE POLICY "Users can view own usage" ON public.usage_tracking
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert usage" ON public.usage_tracking
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own usage" ON public.usage_tracking
  FOR UPDATE USING (user_id = auth.uid());

-- Payments policies
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert payments" ON public.payments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Affiliate clicks policies
CREATE POLICY "Users can view own clicks" ON public.affiliate_clicks
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert clicks" ON public.affiliate_clicks
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Function to update usage tracking
CREATE OR REPLACE FUNCTION update_usage_tracking(
  p_user_id UUID,
  p_ip_address INET,
  p_category TEXT,
  p_minutes INTEGER
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.usage_tracking (user_id, ip_address, category, usage_minutes, date)
  VALUES (p_user_id, p_ip_address, p_category, p_minutes, CURRENT_DATE)
  ON CONFLICT (ip_address, category, date)
  DO UPDATE SET 
    usage_minutes = usage_tracking.usage_minutes + p_minutes,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
