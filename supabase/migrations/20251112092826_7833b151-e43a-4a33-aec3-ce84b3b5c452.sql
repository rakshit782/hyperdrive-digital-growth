-- Clear existing pricing plans
DELETE FROM pricing_plans;

-- Insert Starter Plan
INSERT INTO pricing_plans (name, description, price, billing_period, features, is_popular, is_active, sort_order)
VALUES (
  'Starter Plan',
  'Best for: Small businesses or new sellers testing marketplace ads',
  799,
  'monthly',
  '["Amazon & Walmart Ads Management (2 marketplaces)", "1 Campaign Setup + Weekly Optimization", "Monthly Performance Report + ACOS Review", "Product Listing Optimization (10 listings)", "Basic Email Support", "Add-ons: Multi-Marketplace Integration (+$79), Google + Meta Ads (+$499), Amazon Ads Automation (+$299), Shopify Audit (+$299 one-time)"]'::jsonb,
  false,
  true,
  1
);

-- Insert Growth Plan
INSERT INTO pricing_plans (name, description, price, billing_period, features, is_popular, is_active, sort_order)
VALUES (
  'Growth Plan',
  'Best for: Established sellers scaling across multiple marketplaces',
  1499,
  'monthly',
  '["Ads on Amazon, Walmart & eBay (3 marketplaces)", "Advanced Keyword Research + Bid Optimization", "Bi-weekly Reports + Strategy Call", "Multi-Marketplace Integration (Included)", "Performance Dashboard (ACOS, CTR, CPC Insights)", "Priority Support (Email + WhatsApp)", "Add-ons: Shopify Dev ($3,500+), Google + Meta Ads (+$699), Amazon Ads Automation (+$299)"]'::jsonb,
  false,
  true,
  2
);

-- Insert Elite Plan (Most Popular)
INSERT INTO pricing_plans (name, description, price, billing_period, features, is_popular, is_active, sort_order)
VALUES (
  'Elite Plan',
  'Best for: High-volume brands managing multiple marketplaces',
  2999,
  'monthly',
  '["Ads on Amazon, Walmart, eBay & Etsy", "Full Multi-Marketplace Integration Suite (Included)", "Custom Shopify Dashboard with Live Data", "Competitor Analysis & Smart Bid Adjustments", "Weekly Optimization + Monthly Strategy Meeting", "Shopify Development Credit ($3,500 Included)", "Google & Meta Ads Management (Included)", "Amazon Ads Automation (Included)", "Dedicated Account Manager + 24/7 Support"]'::jsonb,
  true,
  true,
  3
);

-- Insert Enterprise Plan
INSERT INTO pricing_plans (name, description, price, billing_period, features, is_popular, is_active, sort_order)
VALUES (
  'Enterprise Plan',
  'Best for: Agencies & enterprise-level brands with large catalogs or global presence',
  4999,
  'monthly',
  '["Everything in Elite + Custom Integrations (Amazon, Shopify, Meta, GA4)", "AMC Advanced Queries + Audience Segmentation", "Enterprise Reporting (Looker Studio / Power BI)", "CRM Integrations (HubSpot, Zoho, Salesforce)", "Weekly Reports + Monthly Executive Review", "Custom Shopify App Development", "NDA & White-Label Partnership Options", "Dedicated Enterprise Team + Multi-Account Management", "Price Range: $4,999 – $9,999/month"]'::jsonb,
  false,
  true,
  4
);