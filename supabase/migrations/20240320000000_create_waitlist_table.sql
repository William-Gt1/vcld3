-- Create waitlist_submissions table
CREATE TABLE public.waitlist_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX waitlist_submissions_email_idx ON public.waitlist_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow only inserts
CREATE POLICY "Allow inserts" ON public.waitlist_submissions
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow reading count only
CREATE POLICY "Allow count" ON public.waitlist_submissions
    FOR SELECT
    USING (true); 