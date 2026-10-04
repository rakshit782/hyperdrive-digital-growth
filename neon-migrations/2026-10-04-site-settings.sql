-- Singleton site settings for the public rating badge.
-- Paste into the Neon SQL editor once. Safe to re-run.
CREATE TABLE IF NOT EXISTS amz_app.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  rating_value NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating_value >= 0 AND rating_value <= 5),
  review_count INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  review_source_url TEXT NULL CHECK (review_source_url IS NULL OR review_source_url LIKE 'https://%'),
  rating_visible BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO amz_app.site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
