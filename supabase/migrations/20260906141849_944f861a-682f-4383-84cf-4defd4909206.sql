ALTER TABLE public.contact_inquiries
  ADD COLUMN IF NOT EXISTS ip_hash text,
  ADD COLUMN IF NOT EXISTS notify_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS notify_error text,
  ADD COLUMN IF NOT EXISTS ack_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS ack_error text,
  ADD COLUMN IF NOT EXISTS email_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_email_attempt_at timestamptz;

CREATE INDEX IF NOT EXISTS contact_inquiries_ip_hash_created_idx
  ON public.contact_inquiries (ip_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS contact_inquiries_email_created_idx
  ON public.contact_inquiries (lower(email), created_at DESC);
CREATE INDEX IF NOT EXISTS contact_inquiries_email_status_idx
  ON public.contact_inquiries (notify_status, ack_status);

GRANT ALL ON public.contact_inquiries TO service_role;