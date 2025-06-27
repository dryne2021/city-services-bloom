
-- Add admin-specific columns to profiles if not exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create admin sessions table for secure admin authentication
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for admin sessions
CREATE POLICY "Admins can manage their own sessions" ON public.admin_sessions
  FOR ALL USING (admin_id = auth.uid());

-- Create an admin user (you can change these credentials)
INSERT INTO public.profiles (id, email, full_name, user_type, is_admin) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@localservice.com', 'System Administrator', 'admin', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Update services table to add more detailed status tracking
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES public.profiles(id);
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Create provider applications table for better tracking
CREATE TABLE IF NOT EXISTS public.provider_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT,
  business_description TEXT,
  experience_years INTEGER,
  certifications TEXT[],
  portfolio_urls TEXT[],
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT
);

-- Enable RLS on provider applications
ALTER TABLE public.provider_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for provider applications
CREATE POLICY "Providers can view their own applications" ON public.provider_applications
  FOR SELECT USING (provider_id = auth.uid());

CREATE POLICY "Providers can create applications" ON public.provider_applications
  FOR INSERT WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Admins can view all applications" ON public.provider_applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

CREATE POLICY "Admins can update applications" ON public.provider_applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Add some sample pending applications
INSERT INTO public.provider_applications (provider_id, business_name, business_description, experience_years, certifications) VALUES
('22222222-2222-2222-2222-222222222222', 'Johnson Home Services', 'Professional home repair and maintenance services with focus on quality and customer satisfaction.', 8, ARRAY['Licensed General Contractor', 'Insured']);

INSERT INTO public.provider_applications (provider_id, business_name, business_description, experience_years, certifications) VALUES
('44444444-4444-4444-4444-444444444444', 'Happy Paws Pet Care', 'Loving and professional pet care services including walking, sitting, and grooming.', 3, ARRAY['Pet First Aid Certified', 'Bonded and Insured']);

-- Update existing services to have pending applications
UPDATE public.services SET status = 'pending' WHERE provider_id IN (
  '22222222-2222-2222-2222-222222222222',
  '44444444-4444-4444-4444-444444444444'
);

-- Create audit log table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.profiles(id) NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL, -- 'service', 'provider_application', etc.
  target_id UUID NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON public.admin_audit_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  p_admin_id UUID,
  p_action TEXT,
  p_target_type TEXT,
  p_target_id UUID,
  p_details JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.admin_audit_log (admin_id, action, target_type, target_id, details)
  VALUES (p_admin_id, p_action, p_target_type, p_target_id, p_details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
