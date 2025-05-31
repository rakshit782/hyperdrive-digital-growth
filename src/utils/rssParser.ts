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

// Updated RSS feed URLs - keeping only feeds that work reliably without CORS issues
export const RSS_FEEDS = {
  // Amazon Feeds (these typically work well with CORS proxy)
  'amazon-general': 'https://www.aboutamazon.com/about-amazon-rss.rss',
  'amazon-ai': 'https://www.aboutamazon.com/news/amazon-ai.rss',
  'aws': 'https://www.aboutamazon.com/news/aws.rss',
  'company-news': 'https://www.aboutamazon.com/news/company-news.rss',
  'devices': 'https://www.aboutamazon.com/news/devices.rss',
  'innovation': 'https://www.aboutamazon.com/news/innovation-at-amazon.rss',
  'retail': 'https://www.aboutamazon.com/news/retail.rss',
  'sustainability': 'https://www.aboutamazon.com/news/sustainability.rss',
  
  // Marketing Strategy Feeds (keeping only the most reliable ones)
  'hubspot': 'https://blog.hubspot.com/marketing/rss.xml',
  'content-marketing-institute': 'https://contentmarketinginstitute.com/feed'
};

export const parseRSSFeed = async (url: string, source: string): Promise<RSSItem[]> => {
  try {
    // Using a CORS proxy to fetch RSS feeds
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    const rssItems: RSSItem[] = [];
    
    items.forEach((item, index) => {
      if (index < 5) { // Limit to 5 items per feed
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        
        // Clean up description (remove HTML tags)
        const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
        
        rssItems.push({
          title: title.trim(),
          description: cleanDescription.trim(),
          link: link.trim(),
          pubDate: pubDate.trim(),
          source,
          category: getCategoryFromSource(source)
        });
      }
    });
    
    return rssItems;
  } catch (error) {
    console.error(`Error fetching RSS feed for ${source}:`, error);
    return [];
  }
};

const getCategoryFromSource = (source: string): string => {
  switch (source) {
    // Amazon categories
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
    
    // Marketing Strategy categories
    case 'hubspot':
      return 'Marketing Strategy';
    case 'content-marketing-institute':
      return 'Content Marketing';
    
    default:
      return 'General';
  }
};

export const fetchAllRSSFeeds = async (): Promise<RSSItem[]> => {
  const feedPromises = Object.entries(RSS_FEEDS).map(([source, url]) =>
    parseRSSFeed(url, source)
  );
  
  try {
    const results = await Promise.all(feedPromises);
    const allItems = results.flat();
    
    // Sort by publication date (newest first)
    return allItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });
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
