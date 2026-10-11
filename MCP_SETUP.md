# AMZ AD SCOUT - Claude MCP Server Setup

Connect Claude Desktop to your AMZ AD SCOUT website using Model Context Protocol (MCP).

## Claude Desktop Configuration

Add the following to your Claude Desktop config file:

- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "amz-ad-scout": {
      "command": "node",
      "args": [
        "e:/amz-website-4october/scripts/mcp-server.mjs"
      ]
    }
  }
}
```

## Available MCP Tools for Claude
1. `get_tracking_status`: Check Google Tag / GA4, Meta Pixel, Hotjar, and Clarity setup.
2. `search_case_studies`: Search performance case studies with filters (e.g. `min_roas: 7` for 7x+ ROAS cases, service filter).
3. `get_sitemap_urls`: List all published URLs currently submitted to Google Search Console.
4. `get_robots_txt`: View active robot directives.

## Active Tracking Details
- **Google Tag (GA4):** `G-5K1GGB3SBR`
- **Meta / Facebook Pixel:** `667154722169969`
- **Hotjar Heatmap:** Site ID `6574226`
- **Microsoft Clarity:** `u54bu1wszh`
- **Sitemap:** `https://www.amzadscout.com/sitemap.xml`
- **Robots:** `https://www.amzadscout.com/robots.txt`
