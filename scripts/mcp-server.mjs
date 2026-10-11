#!/usr/bin/env node
/**
 * Model Context Protocol (MCP) Server for AMZ AD SCOUT
 * 
 * Provides Claude (and other MCP clients) direct tools and resources to:
 * - Query case studies data, statistics, and ROAS performance
 * - Inspect live website routes, sitemap.xml, and robots.txt
 * - Check tracking configurations (Google Tag / GA4, Meta Pixel, Hotjar, Clarity)
 * - Fetch services and catalog information
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load case studies
function loadCaseStudies() {
  try {
    const raw = fs.readFileSync(path.join(rootDir, "src", "data", "allBulkCaseStudies.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Tracking configuration
const TRACKING_CONFIG = {
  google_analytics_4: {
    tag_id: "G-5K1GGB3SBR",
    status: "active",
    script: "https://www.googletagmanager.com/gtag/js?id=G-5K1GGB3SBR",
    provider: "Google Tag Manager / GA4",
  },
  meta_pixel: {
    pixel_id: "667154722169969",
    status: "active",
    provider: "Meta / Facebook Events",
  },
  hotjar: {
    site_id: "6574226",
    status: "active",
    version: 6,
    provider: "Hotjar Heatmaps & Session Recordings",
  },
  microsoft_clarity: {
    project_id: "u54bu1wszh",
    status: "active",
    provider: "Microsoft Clarity Heatmaps",
  },
};

const server = new Server(
  {
    name: "amz-ad-scout-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "amz://tracking-config",
        mimeType: "application/json",
        name: "Tracking Configuration (GA4, Pixel, Hotjar, Clarity)",
      },
      {
        uri: "amz://sitemap",
        mimeType: "application/xml",
        name: "Website Sitemap XML",
      },
      {
        uri: "amz://robots",
        mimeType: "text/plain",
        name: "Website Robots.txt",
      },
    ],
  };
});

// Read resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  if (uri === "amz://tracking-config") {
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(TRACKING_CONFIG, null, 2),
        },
      ],
    };
  }
  if (uri === "amz://sitemap") {
    const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
    const content = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
    return {
      contents: [
        {
          uri,
          mimeType: "application/xml",
          text: content,
        },
      ],
    };
  }
  if (uri === "amz://robots") {
    const robotsPath = path.join(rootDir, "public", "robots.txt");
    const content = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, "utf8") : "";
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: content,
        },
      ],
    };
  }
  throw new Error(`Resource not found: ${uri}`);
});

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_tracking_status",
        description: "Returns active tracking tags, GA4 IDs, Meta Pixel ID, Hotjar ID, and Clarity ID on the website.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "search_case_studies",
        description: "Search AMZ AD SCOUT case studies by service, industry, or ROAS minimum threshold.",
        inputSchema: {
          type: "object",
          properties: {
            service: {
              type: "string",
              description: "Optional filter by service (e.g. 'Amazon Advertising', 'Walmart Advertising', 'Meta & Google Ads')",
            },
            min_roas: {
              type: "number",
              description: "Optional minimum ROAS (e.g. 7 for 7x+ ROAS)",
            },
            limit: {
              type: "number",
              description: "Maximum number of results to return (default 10)",
            },
          },
        },
      },
      {
        name: "get_sitemap_urls",
        description: "Get all URLs indexed in the website sitemap for Google Search Console.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_robots_txt",
        description: "Retrieve robots.txt crawler directives.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Execute tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_tracking_status") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(TRACKING_CONFIG, null, 2),
        },
      ],
    };
  }

  if (name === "search_case_studies") {
    const studies = loadCaseStudies();
    const serviceFilter = args?.service ? String(args.service).toLowerCase() : null;
    const minRoas = typeof args?.min_roas === "number" ? args.min_roas : null;
    const limit = typeof args?.limit === "number" ? args.limit : 10;

    let filtered = studies.filter((item) => {
      if (serviceFilter && !(item["Service"] || "").toLowerCase().includes(serviceFilter)) {
        return false;
      }
      if (minRoas !== null) {
        const roasStr = item["Value 2"] || item["Metric 11 Value"] || item["Metric 10 Value"] || "";
        const roasNum = parseFloat(roasStr.replace(/[^0-9.]/g, ""));
        if (isNaN(roasNum) || roasNum < minRoas) return false;
      }
      return true;
    });

    const results = filtered.slice(0, limit).map((s) => ({
      caseId: s["Case ID"],
      client: s["Client Profile (Mock)"],
      service: s["Service"],
      channel: s["Marketplace / Channel"],
      result1: `${s["Result 1"]}: ${s["Value 1"]}`,
      result2: `${s["Result 2"]}: ${s["Value 2"]}`,
      result3: `${s["Result 3"]}: ${s["Value 3"]}`,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ total: filtered.length, returned: results.length, results }, null, 2),
        },
      ],
    };
  }

  if (name === "get_sitemap_urls") {
    const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
    const xml = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ total: locs.length, urls: locs }, null, 2),
        },
      ],
    };
  }

  if (name === "get_robots_txt") {
    const robotsPath = path.join(rootDir, "public", "robots.txt");
    const content = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, "utf8") : "";
    return {
      content: [
        {
          type: "text",
          text: content,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("AMZ AD SCOUT MCP Server running on stdio");
}

run().catch((error) => {
  console.error("Error starting MCP server:", error);
  process.exit(1);
});
