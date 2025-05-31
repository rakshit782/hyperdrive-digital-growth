
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

// RSS feed URLs - your backend will handle fetching these
export const RSS_FEEDS = {
  // Amazon Feeds only
  'amazon-general': 'https://www.aboutamazon.com/about-amazon-rss.rss',
  'amazon-ai': 'https://www.aboutamazon.com/news/amazon-ai.rss',
  'aws': 'https://www.aboutamazon.com/news/aws.rss',
  'company-news': 'https://www.aboutamazon.com/news/company-news.rss',
  'devices': 'https://www.aboutamazon.com/news/devices.rss',
  'innovation': 'https://www.aboutamazon.com/news/innovation-at-amazon.rss',
  'retail': 'https://www.aboutamazon.com/news/retail.rss',
  'sustainability': 'https://www.aboutamazon.com/news/sustainability.rss'
};

// Your backend API base URL - update this to match your server
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001';

export const parseRSSFeed = async (url: string, source: string): Promise<RSSItem[]> => {
  try {
    console.log(`Attempting to fetch RSS feed for ${source} from ${API_BASE_URL}/api/rss`);
    
    // Send request to your backend RSS proxy endpoint
    const response = await fetch(`${API_BASE_URL}/api/rss`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, source }),
    });
    
    console.log(`Response status for ${source}:`, response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Received data for ${source}:`, data);
    
    // Your backend should return parsed RSS items
    return data.items.map((item: any) => ({
      title: item.title?.trim() || '',
      description: item.description?.trim() || '',
      link: item.link?.trim() || '',
      pubDate: item.pubDate?.trim() || '',
      source,
      category: getCategoryFromSource(source)
    }));
    
  } catch (error) {
    console.error(`Error fetching RSS feed for ${source}:`, error);
    return [];
  }
};

const getCategoryFromSource = (source: string): string => {
  switch (source) {
    // Amazon categories only
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
    console.log(`Attempting to fetch all RSS feeds from ${API_BASE_URL}/api/rss/all`);
    console.log('Feeds to fetch:', RSS_FEEDS);
    
    // Send all feed URLs to your backend in a single request
    const response = await fetch(`${API_BASE_URL}/api/rss/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feeds: RSS_FEEDS }),
    });
    
    console.log('Response status for all feeds:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Received all feeds data:', data);
    
    // Your backend should return all RSS items sorted by date
    return data.items || [];
    
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
