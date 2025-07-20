-- Enable RLS
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Create waitlist_submissions table
CREATE TABLE public.waitlist_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  subscribed_to_newsletter BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  utm_source VARCHAR(50),
  utm_medium VARCHAR(50),
  utm_campaign VARCHAR(50)
);

-- Create indexes
CREATE INDEX idx_email ON public.waitlist_submissions(email);
CREATE INDEX idx_created_at ON public.waitlist_submissions(created_at DESC);

-- RLS Policies

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous submissions" ON public.waitlist_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated users to read submissions" ON public.waitlist_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Prevent updates and deletes for all roles
CREATE POLICY "Prevent updates" ON public.waitlist_submissions
  FOR UPDATE
  TO authenticated
  USING (false);

CREATE POLICY "Prevent deletes" ON public.waitlist_submissions
  FOR DELETE
  TO authenticated
  USING (false); 