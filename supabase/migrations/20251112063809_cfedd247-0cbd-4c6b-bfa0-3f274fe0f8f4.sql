-- Update the admin user to have admin role
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = 'f8ece718-96c8-456b-8133-05464fdb3adb';

-- Also update the editor user to have admin role for backup
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = 'd3c7c5e5-27e6-4b53-bca5-93ef5ff0d78f';