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

// Updated RSS feed URLs with Amazon feeds and new advertising/marketing feeds
export const RSS_FEEDS = {
  // Amazon Feeds
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
  'workplace': 'https://www.aboutamazon.com/news/workplace.rss',
  
  // Advertising Strategy Feeds
  'adweek': 'https://www.adweek.com/feed',
  'adexchanger': 'https://feeds.feedburner.com/ad-exchanger',
  'adtech-daily': 'https://www.adtechdaily.com/feed',
  'more-about-advertising': 'https://moreaboutadvertising.com/feed',
  'adpulp': 'https://www.adpulp.com/feed',
  'adespresso': 'https://adespresso.com/feed',
  'ads-of-the-world': 'https://www.adsoftheworld.com/rss',
  'ad-age': 'https://adage.com/section/rss-feeds/674',
  'microsoft-ads': 'https://about.ads.microsoft.com/en/blog/rss',
  'amazon-ads': 'https://advertising.amazon.com/en/blog/rss',
  
  // Marketing Strategy & Insights
  'hubspot': 'https://blog.hubspot.com/marketing/rss.xml',
  'moz': 'https://moz.com/blog/rss',
  'social-media-examiner': 'https://www.socialmediaexaminer.com/feed',
  'ahrefs': 'https://ahrefs.com/blog/rss',
  'copyblogger': 'https://copyblogger.com/feed',
  'convince-convert': 'https://www.convinceandconvert.com/feed',
  'neil-patel': 'https://neilpatel.com/feed',
  'search-engine-journal': 'https://www.searchenginejournal.com/feed',
  'marketingprofs': 'https://www.marketingprofs.com/rss',
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
    
    // Advertising Strategy categories
    case 'adweek':
      return 'Advertising Strategy';
    case 'adexchanger':
      return 'Advertising Strategy';
    case 'adtech-daily':
      return 'Ad Tech';
    case 'more-about-advertising':
      return 'Advertising Strategy';
    case 'adpulp':
      return 'Advertising Strategy';
    case 'adespresso':
      return 'Social Media Ads';
    case 'ads-of-the-world':
      return 'Creative Advertising';
    case 'ad-age':
      return 'Advertising News';
    case 'microsoft-ads':
      return 'Microsoft Advertising';
    case 'amazon-ads':
      return 'Amazon Advertising';
    
    // Marketing Strategy categories
    case 'hubspot':
      return 'Marketing Strategy';
    case 'moz':
      return 'SEO & Marketing';
    case 'social-media-examiner':
      return 'Social Media Marketing';
    case 'ahrefs':
      return 'SEO & Content';
    case 'copyblogger':
      return 'Content Marketing';
    case 'convince-convert':
      return 'Digital Marketing';
    case 'neil-patel':
      return 'Digital Marketing';
    case 'search-engine-journal':
      return 'SEO & Search';
    case 'marketingprofs':
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
