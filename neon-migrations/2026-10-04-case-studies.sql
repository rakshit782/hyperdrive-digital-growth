-- Case studies (admin-managed). Safe to run more than once.
CREATE TABLE IF NOT EXISTS amz_app.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  brand_name text NOT NULL,
  channel text NOT NULL,
  category text,
  logo_url text,
  challenge text,
  solution text,
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  time_period text,
  testimonial_quote text,
  testimonial_author text,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT case_studies_slug_format CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CONSTRAINT case_studies_brand_name_len CHECK (char_length(brand_name) BETWEEN 1 AND 120),
  CONSTRAINT case_studies_channel_check CHECK (channel IN ('amazon', 'walmart', 'meta', 'google', 'shopify')),
  CONSTRAINT case_studies_category_len CHECK (category IS NULL OR char_length(category) <= 120),
  CONSTRAINT case_studies_logo_url_check CHECK (
    logo_url IS NULL OR (char_length(logo_url) <= 500 AND logo_url ~ '^https://')
  ),
  CONSTRAINT case_studies_challenge_len CHECK (challenge IS NULL OR char_length(challenge) <= 4000),
  CONSTRAINT case_studies_solution_len CHECK (solution IS NULL OR char_length(solution) <= 4000),
  CONSTRAINT case_studies_time_period_len CHECK (time_period IS NULL OR char_length(time_period) <= 80),
  CONSTRAINT case_studies_quote_len CHECK (testimonial_quote IS NULL OR char_length(testimonial_quote) <= 1000),
  CONSTRAINT case_studies_author_len CHECK (testimonial_author IS NULL OR char_length(testimonial_author) <= 120),
  CONSTRAINT case_studies_results_array CHECK (
    jsonb_typeof(results) = 'array' AND jsonb_array_length(results) <= 6
  )
);

CREATE INDEX IF NOT EXISTS idx_case_studies_published_sort
  ON amz_app.case_studies (published, sort_order);
