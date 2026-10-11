import bulkDataRaw from '@/data/allBulkCaseStudies.json';

export interface BulkCaseStudyRaw {
  "Case ID": string;
  "Service": string;
  "Service Category": string;
  "Client Profile (Mock)": string;
  "Industry": string;
  "Marketplace / Channel": string;
  "Duration (months)": string;
  "Challenge": string;
  "Solution": string;
  "Result 1": string;
  "Value 1": string;
  "Result 2": string;
  "Value 2": string;
  "Result 3": string;
  "Value 3": string;
  "Key Success Factors": string;
  "Data Status": string;
  [key: string]: string;
}

export interface FormattedCaseStudy {
  id: string;
  caseId: string;
  title: string;
  service: string;
  serviceCategory: string;
  client_name: string;
  industry: string;
  channel: string;
  platform: string;
  durationMonths: string;
  challenge: string;
  solution: string;
  description: string;
  keySuccessFactors: string[];
  dataStatus: string;
  results: {
    metric1: { label: string; value: string };
    metric2: { label: string; value: string };
    metric3: { label: string; value: string };
  };
  metrics: Array<{ label: string; value: string }>;
  imageUrl?: string;
  image_url?: string;
}

const defaultImages: Record<string, string> = {
  "Amazon Advertising": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  "Listing Optimization": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  "Catalog Management": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
  "Account Support": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
  "Walmart Advertising": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
  "Meta & Google Ads": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
  "Marketplace Integration": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
  "Shopify & Web Development": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
};

export const allBulkCaseStudies: FormattedCaseStudy[] = (bulkDataRaw as BulkCaseStudyRaw[]).map((row, idx) => {
  const caseId = row["Case ID"] || `CS-${idx + 1}`;
  const clientName = row["Client Profile (Mock)"] || "Confidential Client";
  const service = row["Service"] || "Amazon Advertising";
  const industry = row["Industry"] || "E-commerce";
  const channel = row["Marketplace / Channel"] || "Amazon";
  const duration = row["Duration (months)"] ? `${row["Duration (months)"]} Months` : "";
  
  const challenge = row["Challenge"] || "";
  const solution = row["Solution"] || "";
  const description = challenge && solution ? `${challenge} ${solution}` : challenge || solution || `${service} optimization for ${clientName}`;

  const res1Label = row["Result 1"] || "Growth";
  const res1Val = row["Value 1"] || "—";
  const res2Label = row["Result 2"] || "Efficiency";
  const res2Val = row["Value 2"] || "—";
  const res3Label = row["Result 3"] || "Total Impact";
  const res3Val = row["Value 3"] || "—";

  // Detailed metrics from Metric 1 through 19
  const detailedMetrics: Array<{ label: string; value: string }> = [];
  for (let m = 1; m <= 19; m++) {
    const label = row[`Metric ${m}`];
    const val = row[`Metric ${m} Value`];
    if (label && val) {
      detailedMetrics.push({ label: label.trim(), value: val.trim() });
    }
  }

  const successFactors = (row["Key Success Factors"] || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const img = defaultImages[service] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop";

  return {
    id: caseId.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    caseId,
    title: `${clientName}: ${res1Val} ${res1Label}`,
    service,
    serviceCategory: row["Service Category"] || "E-commerce Services",
    client_name: clientName,
    industry,
    channel,
    platform: channel,
    durationMonths: duration,
    challenge,
    solution,
    description,
    keySuccessFactors: successFactors,
    dataStatus: row["Data Status"] || "Mock / Illustrative",
    results: {
      metric1: { label: res1Label, value: res1Val },
      metric2: { label: res2Label, value: res2Val },
      metric3: { label: res3Label, value: res3Val },
    },
    metrics: detailedMetrics,
    imageUrl: img,
    image_url: img,
  };
});

/**
 * Filter case studies by exact service name or alias
 */
export function getCaseStudiesByService(serviceName: string): FormattedCaseStudy[] {
  const norm = serviceName.trim().toLowerCase();
  return allBulkCaseStudies.filter(
    (cs) => cs.service.toLowerCase() === norm || cs.serviceCategory.toLowerCase() === norm
  );
}

/**
 * Service slug to bulk service name mapping
 */
export const serviceSlugToBulkName: Record<string, string[]> = {
  'amazon-advertising': ['Amazon Advertising'],
  'listing-optimization': ['Listing Optimization'],
  'product-cataloging': ['Catalog Management'],
  'catalog-management': ['Catalog Management'],
  'account-management': ['Account Support'],
  'account-support': ['Account Support'],
  'walmart-advertising': ['Walmart Advertising'],
  'meta-advertising': ['Meta & Google Ads'],
  'google-advertising': ['Meta & Google Ads'],
  'shopify-integration': ['Marketplace Integration'],
  'marketplace-integration': ['Marketplace Integration'],
  'website-development': ['Shopify & Web Development'],
  'shopify-development': ['Shopify & Web Development'],
  'amazon-integration': ['Catalog Management', 'Marketplace Integration'],
};

/**
 * Get case studies matching a specific service slug or multiple aliases
 */
export function getCaseStudiesBySlug(slug: string): FormattedCaseStudy[] {
  const targetServices = serviceSlugToBulkName[slug] || [];
  if (targetServices.length === 0) {
    return allBulkCaseStudies.filter((cs) => 
      cs.service.toLowerCase().includes(slug.replace(/-/g, ' ').toLowerCase())
    );
  }
  return allBulkCaseStudies.filter((cs) => targetServices.includes(cs.service));
}
