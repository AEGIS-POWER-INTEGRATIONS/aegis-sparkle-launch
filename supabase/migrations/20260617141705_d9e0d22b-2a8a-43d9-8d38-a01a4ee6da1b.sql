CREATE TABLE public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  industry TEXT,
  product_interest TEXT NOT NULL,
  problem TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.demo_requests TO anon;
GRANT INSERT ON public.demo_requests TO authenticated;
GRANT ALL ON public.demo_requests TO service_role;

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a demo request"
ON public.demo_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND length(company) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(product_interest) BETWEEN 1 AND 200
  AND (problem IS NULL OR length(problem) <= 2000)
  AND (phone IS NULL OR length(phone) <= 50)
  AND (industry IS NULL OR length(industry) <= 100)
  AND (job_title IS NULL OR length(job_title) <= 100)
);