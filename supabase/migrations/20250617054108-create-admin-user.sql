
-- Create admin user kanchan.g12@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'kanchan.g12@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
