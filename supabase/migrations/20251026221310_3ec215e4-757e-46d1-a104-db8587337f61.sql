-- Fix search_path for validation functions
CREATE OR REPLACE FUNCTION public.validate_text_length(
  text_value TEXT,
  min_length INTEGER DEFAULT 1,
  max_length INTEGER DEFAULT 1000
)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  RETURN LENGTH(TRIM(text_value)) >= min_length 
    AND LENGTH(TRIM(text_value)) <= max_length;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_lead_data()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate name
  IF NOT public.validate_text_length(NEW.name, 2, 100) THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate email length
  IF NOT public.validate_text_length(NEW.email, 5, 255) THEN
    RAISE EXCEPTION 'Email must be between 5 and 255 characters';
  END IF;
  
  -- Validate phone if provided
  IF NEW.phone IS NOT NULL AND LENGTH(TRIM(NEW.phone)) > 0 THEN
    IF NOT public.validate_text_length(NEW.phone, 10, 20) THEN
      RAISE EXCEPTION 'Phone must be between 10 and 20 characters';
    END IF;
  END IF;
  
  -- Validate company if provided
  IF NEW.company IS NOT NULL AND LENGTH(TRIM(NEW.company)) > 0 THEN
    IF NOT public.validate_text_length(NEW.company, 2, 200) THEN
      RAISE EXCEPTION 'Company must be between 2 and 200 characters';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate name
  IF NOT public.validate_text_length(NEW.name, 2, 100) THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  
  -- Validate email
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  IF NOT public.validate_text_length(NEW.email, 5, 255) THEN
    RAISE EXCEPTION 'Email must be between 5 and 255 characters';
  END IF;
  
  -- Validate message if provided
  IF NEW.message IS NOT NULL AND LENGTH(TRIM(NEW.message)) > 0 THEN
    IF NOT public.validate_text_length(NEW.message, 10, 5000) THEN
      RAISE EXCEPTION 'Message must be between 10 and 5000 characters';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;