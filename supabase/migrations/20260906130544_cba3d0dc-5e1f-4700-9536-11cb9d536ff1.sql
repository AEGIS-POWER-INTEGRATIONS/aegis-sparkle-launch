CREATE TABLE public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  inquiry_type text NOT NULL,
  name text NOT NULL,
  company text,
  role text,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  locale text NOT NULL DEFAULT 'zh-TW',
  source_path text,
  status text NOT NULL DEFAULT 'new'
);

GRANT ALL ON public.contact_inquiries TO service_role;

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages inquiries"
ON public.contact_inquiries
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE INDEX contact_inquiries_created_at_idx ON public.contact_inquiries (created_at DESC);