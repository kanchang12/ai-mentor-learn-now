
-- Create user subscription types enum
CREATE TYPE public.subscription_type AS ENUM ('admin', 'paid', 'unpaid');

-- Add subscription_type column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN subscription_type subscription_type DEFAULT 'unpaid';

-- Update existing users to have unpaid subscription by default
UPDATE public.profiles 
SET subscription_type = 'unpaid' 
WHERE subscription_type IS NULL;

-- Make the column not null
ALTER TABLE public.profiles 
ALTER COLUMN subscription_type SET NOT NULL;

-- Create a function to check if user has unlimited access
CREATE OR REPLACE FUNCTION public.has_unlimited_access(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND subscription_type IN ('admin', 'paid')
  )
$$;

-- Update the usage tracking function to respect subscription types
CREATE OR REPLACE FUNCTION public.update_usage_tracking(
  p_user_id UUID,
  p_ip_address INET,
  p_category TEXT,
  p_minutes INTEGER
)
RETURNS VOID AS $$
BEGIN
  -- Only track usage for unpaid users
  IF NOT public.has_unlimited_access(p_user_id) THEN
    INSERT INTO public.usage_tracking (user_id, ip_address, category, usage_minutes, date)
    VALUES (p_user_id, p_ip_address, p_category, p_minutes, CURRENT_DATE)
    ON CONFLICT (ip_address, category, date)
    DO UPDATE SET 
      usage_minutes = usage_tracking.usage_minutes + p_minutes,
      updated_at = NOW();
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create function to get user subscription type
CREATE OR REPLACE FUNCTION public.get_user_subscription_type(_user_id UUID)
RETURNS subscription_type
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT subscription_type 
  FROM public.profiles 
  WHERE id = _user_id
$$;

-- Update RLS policies for profiles table to allow users to see their own subscription type
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow users to insert their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Update the handle_new_user function to set default subscription type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, subscription_type)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data ->> 'full_name',
    'unpaid'::subscription_type
  );
  RETURN NEW;
END;
$$;
