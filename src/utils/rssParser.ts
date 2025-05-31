
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

// RSS feed URLs for different platforms
export const RSS_FEEDS = {
  amazon: 'https://press.aboutamazon.com/rss/news-releases.xml',
  walmart: 'https://corporate.walmart.com/news.xml',
  shopify: 'https://www.shopify.com/blog.rss',
  facebook: 'https://about.fb.com/news/rss/'
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
    case 'amazon':
      return 'Amazon News';
    case 'walmart':
      return 'Walmart Updates';
    case 'shopify':
      return 'Shopify Insights';
    case 'facebook':
      return 'Meta News';
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
