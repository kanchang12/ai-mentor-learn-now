
-- Update existing admin user's password and ensure proper auth fields
UPDATE auth.users 
SET 
  encrypted_password = crypt('Poiuy@4321', gen_salt('bf')),
  email_confirmed_at = NOW(),
  confirmation_token = '',
  recovery_token = '',
  email_change_token_new = '',
  email_change = '',
  raw_app_meta_data = '{"provider":"email","providers":["email"]}',
  raw_user_meta_data = '{"full_name":"Admin User"}',
  updated_at = NOW()
WHERE email = 'kanchan.g12@gmail.com';

-- Ensure profile exists with correct data
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
SELECT id, email, 'Admin User', NOW(), NOW()
FROM auth.users 
WHERE email = 'kanchan.g12@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  updated_at = EXCLUDED.updated_at;

-- Ensure admin role exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'kanchan.g12@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
