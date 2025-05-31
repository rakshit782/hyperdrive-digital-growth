
export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
}

export interface RSSFeed {
  title: string;
  description: string;
  items: RSSItem[];
}

// RSS feed URLs - Amazon Feeds only
export const RSS_FEEDS = {
  'amazon-general': 'https://www.aboutamazon.com/about-amazon-rss.rss',
  'amazon-ai': 'https://www.aboutamazon.com/news/amazon-ai.rss',
  'aws': 'https://www.aboutamazon.com/news/aws.rss',
  'company-news': 'https://www.aboutamazon.com/news/company-news.rss',
  'devices': 'https://www.aboutamazon.com/news/devices.rss',
  'innovation': 'https://www.aboutamazon.com/news/innovation-at-amazon.rss',
  'retail': 'https://www.aboutamazon.com/news/retail.rss',
  'sustainability': 'https://www.aboutamazon.com/news/sustainability.rss'
};

// Use a CORS proxy for client-side fetching
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const parseRSSFeed = async (url: string, source: string): Promise<RSSItem[]> => {
  try {
    console.log(`Fetching RSS feed for ${source} from ${url}`);
    
    // Use CORS proxy to fetch the RSS feed
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    console.log(`Received XML for ${source}, length: ${xmlText.length}`);
    
    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('XML parsing error');
    }
    
    // Extract items from RSS
    const items = xmlDoc.querySelectorAll('item');
    console.log(`Found ${items.length} items for ${source}`);
    
    const rssItems: RSSItem[] = Array.from(items).map(item => {
      const title = item.querySelector('title')?.textContent?.trim() || '';
      const description = item.querySelector('description')?.textContent?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
      
      return {
        title,
        description,
        link,
        pubDate,
        source,
        category: getCategoryFromSource(source)
      };
    });
    
    console.log(`Parsed ${rssItems.length} items for ${source}`);
    return rssItems;
    
  } catch (error) {
    console.error(`Error fetching RSS feed for ${source}:`, error);
    return [];
  }
};

const getCategoryFromSource = (source: string): string => {
  switch (source) {
    case 'amazon-general':
      return 'About Amazon';
    case 'amazon-ai':
      return 'Amazon AI';
    case 'aws':
      return 'AWS';
    case 'company-news':
      return 'Company News';
    case 'devices':
      return 'Devices';
    case 'innovation':
      return 'Innovation';
    case 'retail':
      return 'Retail';
    case 'sustainability':
      return 'Sustainability';
    default:
      return 'General';
  }
};

export const fetchAllRSSFeeds = async (): Promise<RSSItem[]> => {
  try {
    console.log('Fetching all Amazon RSS feeds...');
    
    // Fetch all feeds in parallel
    const feedPromises = Object.entries(RSS_FEEDS).map(([source, url]) =>
      parseRSSFeed(url, source)
    );
    
    const feedResults = await Promise.all(feedPromises);
    
    // Combine all items and sort by date
    const allItems = feedResults.flat();
    console.log(`Total items fetched: ${allItems.length}`);
    
    // Sort by publication date (newest first)
    allItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });
    
    return allItems;
    
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return [];
  }
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};
