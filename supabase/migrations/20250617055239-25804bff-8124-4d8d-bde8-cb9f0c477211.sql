
-- Create admin user kanchan.g12@gmail.com
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  last_sign_in_at,
  email_change_sent_at,
  confirmation_sent_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'kanchan.g12@gmail.com',
  crypt('Poiuy@4321', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User"}',
  false,
  NOW(),
  NOW(),
  NOW(),
  NOW(),
  NOW()
);

-- Get the user ID and assign admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'kanchan.g12@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
