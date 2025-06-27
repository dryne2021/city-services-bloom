
-- Let's create some sample services without requiring specific auth users
-- We'll temporarily disable the foreign key constraint for profiles
ALTER TABLE public.profiles DROP CONSTRAINT profiles_id_fkey;

-- Now insert sample provider profiles
INSERT INTO public.profiles (id, email, full_name, phone, location, user_type) VALUES
('11111111-1111-1111-1111-111111111111', 'john.cleaner@example.com', 'John Smith', '+1-555-0101', 'New York, NY', 'provider'),
('22222222-2222-2222-2222-222222222222', 'sarah.handyman@example.com', 'Sarah Johnson', '+1-555-0102', 'Los Angeles, CA', 'provider'),
('33333333-3333-3333-3333-333333333333', 'mike.tutor@example.com', 'Mike Wilson', '+1-555-0103', 'Chicago, IL', 'provider'),
('44444444-4444-4444-4444-444444444444', 'emily.petcare@example.com', 'Emily Davis', '+1-555-0104', 'Houston, TX', 'provider'),
('55555555-5555-5555-5555-555555555555', 'david.landscaper@example.com', 'David Brown', '+1-555-0105', 'Phoenix, AZ', 'provider');

-- Create sample services
INSERT INTO public.services (provider_id, category_id, title, description, price_per_hour, location, status)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  (SELECT id FROM public.service_categories WHERE name = 'cleaning' LIMIT 1),
  'Professional House Cleaning',
  'Reliable and thorough cleaning services for your home or office. Experienced, insured, and eco-friendly products available.',
  25.00,
  'New York, NY',
  'approved'
UNION ALL
SELECT 
  '22222222-2222-2222-2222-222222222222'::uuid,
  (SELECT id FROM public.service_categories WHERE name = 'handyman' LIMIT 1),
  'Home Repairs & Maintenance',
  'Skilled handyman for all your repair needs. Plumbing, electrical, carpentry, and general maintenance.',
  45.00,
  'Los Angeles, CA',
  'approved'
UNION ALL
SELECT 
  '33333333-3333-3333-3333-333333333333'::uuid,
  (SELECT id FROM public.service_categories WHERE name = 'tutoring' LIMIT 1),
  'Math & Science Tutoring',
  'Certified teacher with 5+ years experience. Specializing in high school math and science subjects.',
  35.00,
  'Chicago, IL',
  'approved'
UNION ALL
SELECT 
  '44444444-4444-4444-4444-444444444444'::uuid,
  (SELECT id FROM public.service_categories WHERE name = 'petcare' LIMIT 1),
  'Pet Sitting & Walking',
  'Loving pet care services including walking, sitting, and overnight care. Great with all breeds.',
  20.00,
  'Houston, TX',
  'approved'
UNION ALL
SELECT 
  '55555555-5555-5555-5555-555555555555'::uuid,
  (SELECT id FROM public.service_categories WHERE name = 'landscaping' LIMIT 1),
  'Garden Design & Maintenance',
  'Transform your outdoor space with professional landscaping. Design, planting, and maintenance services.',
  40.00,
  'Phoenix, AZ',
  'approved'
UNION ALL
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  (SELECT id FROM public.service_categories WHERE name = 'moving' LIMIT 1),
  'Moving & Packing Services',
  'Professional moving services for local and long-distance moves. Careful handling and competitive rates.',
  50.00,
  'New York, NY',
  'approved'
UNION ALL
SELECT 
  '22222222-2222-2222-2222-222222222222'::uuid,
  (SELECT id FROM public.service_categories WHERE name = 'computer-repair' LIMIT 1),
  'Computer & Tech Repair',
  'Expert computer repair and tech support. Virus removal, hardware upgrades, and troubleshooting.',
  60.00,
  'Los Angeles, CA',
  'approved'
UNION ALL
SELECT 
  '33333333-3333-3333-3333-333333333333'::uuid,
  (SELECT id FROM public.service_categories WHERE name = 'photography' LIMIT 1),
  'Event Photography',
  'Professional photography for weddings, events, and portraits. High-quality images delivered quickly.',
  75.00,
  'Chicago, IL',
  'approved';
