
-- First, create the subscription_type enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.subscription_type AS ENUM ('admin', 'paid', 'unpaid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Ensure the profiles table has the subscription_type column with proper default
DO $$ BEGIN
    -- Add the column if it doesn't exist
    ALTER TABLE public.profiles 
    ADD COLUMN subscription_type subscription_type DEFAULT 'unpaid';
EXCEPTION
    WHEN duplicate_column THEN 
    -- If column exists, just update the default
    ALTER TABLE public.profiles 
    ALTER COLUMN subscription_type SET DEFAULT 'unpaid';
END $$;

-- Make sure the column is not null
ALTER TABLE public.profiles 
ALTER COLUMN subscription_type SET NOT NULL;

-- Update any existing null values
UPDATE public.profiles 
SET subscription_type = 'unpaid' 
WHERE subscription_type IS NULL;

-- Recreate the handle_new_user function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, subscription_type)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    'unpaid'::subscription_type
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;
