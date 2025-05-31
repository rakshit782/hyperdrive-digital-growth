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

// Updated RSS feed URLs using Amazon's official RSS feeds
export const RSS_FEEDS = {
  'amazon-general': 'https://www.aboutamazon.com/about-amazon-rss.rss',
  'amazon-ai': 'https://www.aboutamazon.com/news/amazon-ai.rss',
  'amazon-offices': 'https://www.aboutamazon.com/news/amazon-offices.rss',
  'amazon-prime': 'https://www.aboutamazon.com/news/amazon-prime.rss',
  'aws': 'https://www.aboutamazon.com/news/aws.rss',
  'books-authors': 'https://www.aboutamazon.com/news/books-and-authors.rss',
  'community': 'https://www.aboutamazon.com/news/community.rss',
  'company-news': 'https://www.aboutamazon.com/news/company-news.rss',
  'devices': 'https://www.aboutamazon.com/news/devices.rss',
  'entertainment': 'https://www.aboutamazon.com/news/entertainment.rss',
  'how-amazon-works': 'https://www.aboutamazon.com/news/how-amazon-works.rss',
  'innovation': 'https://www.aboutamazon.com/news/innovation-at-amazon.rss',
  'job-creation': 'https://www.aboutamazon.com/news/job-creation-and-investment.rss',
  'operations': 'https://www.aboutamazon.com/news/operations.rss',
  'policy': 'https://www.aboutamazon.com/news/policy-news-views.rss',
  'retail': 'https://www.aboutamazon.com/news/retail.rss',
  'small-business': 'https://www.aboutamazon.com/news/small-business.rss',
  'sustainability': 'https://www.aboutamazon.com/news/sustainability.rss',
  'transportation': 'https://www.aboutamazon.com/news/transportation.rss',
  'workplace': 'https://www.aboutamazon.com/news/workplace.rss'
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
    case 'amazon-general':
      return 'About Amazon';
    case 'amazon-ai':
      return 'Amazon AI';
    case 'amazon-offices':
      return 'Amazon Offices';
    case 'amazon-prime':
      return 'Amazon Prime';
    case 'aws':
      return 'AWS';
    case 'books-authors':
      return 'Books & Authors';
    case 'community':
      return 'Community';
    case 'company-news':
      return 'Company News';
    case 'devices':
      return 'Devices';
    case 'entertainment':
      return 'Entertainment';
    case 'how-amazon-works':
      return 'How Amazon Works';
    case 'innovation':
      return 'Innovation';
    case 'job-creation':
      return 'Job Creation';
    case 'operations':
      return 'Operations';
    case 'policy':
      return 'Policy';
    case 'retail':
      return 'Retail';
    case 'small-business':
      return 'Small Business';
    case 'sustainability':
      return 'Sustainability';
    case 'transportation':
      return 'Transportation';
    case 'workplace':
      return 'Workplace';
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
