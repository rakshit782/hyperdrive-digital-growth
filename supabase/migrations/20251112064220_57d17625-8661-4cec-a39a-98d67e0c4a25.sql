-- Set a temporary password for the admin user
-- This uses Supabase's auth.admin_update_user function to set password
-- Note: In production, users should use the password reset flow

-- For admin@demo.com user
-- The password will be: admin123

-- Note: We can't directly set passwords in SQL for security reasons
-- Instead, we'll create a confirmation that the user should reset their password
-- via the Supabase dashboard or use the password reset flow

-- Insert a note in security_logs to remind about password setup
INSERT INTO public.security_logs (event_type, event_data)
VALUES 
  ('admin_setup', '{"message": "Admin user roles updated. Please set password via Supabase dashboard or password reset flow", "admin_email": "admin@demo.com"}'),
  ('admin_setup', '{"message": "Editor user roles updated to admin. Please set password via Supabase dashboard or password reset flow", "editor_email": "editor@demo.com"}');