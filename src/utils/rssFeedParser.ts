export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  link: string;
  pubDate: string;
  author?: string;
  image?: string;
  categories?: string[];
}

// RSS Feeds related to digital marketing services
const RSS_FEEDS = [
  'https://www.searchenginejournal.com/feed/',
  'https://feeds.feedburner.com/searchengineland',
  'https://www.socialmediatoday.com/rss',
  'https://feeds.feedburner.com/ClickZ',
  'https://marketingland.com/feed'
];

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const fetchRSSFeeds = async (): Promise<BlogPost[]> => {
  try {
    const allPosts: BlogPost[] = [];

    for (const feedUrl of RSS_FEEDS) {
      try {
        const response = await fetch(`${CORS_PROXY}${encodeURIComponent(feedUrl)}`);
        const xmlText = await response.text();
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const items = xmlDoc.querySelectorAll('item');
        
        items.forEach((item, index) => {
          if (index < 5) { // Get only 5 posts per feed
            const title = item.querySelector('title')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const author = item.querySelector('author, creator, dc\\:creator')?.textContent || '';
            
            // Try to extract image
            let image = item.querySelector('enclosure')?.getAttribute('url') || '';
            if (!image) {
              const mediaContent = item.querySelector('media\\:content');
              image = mediaContent?.getAttribute('url') || '';
            }
            
            // Extract categories
            const categoryElements = item.querySelectorAll('category');
            const categories = Array.from(categoryElements).map(cat => cat.textContent || '');
            
            allPosts.push({
              id: `${feedUrl}-${index}`,
              title: title.replace(/<!\[CDATA\[|\]\]>/g, ''),
              description: description.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, '').substring(0, 200),
              content: description.replace(/<!\[CDATA\[|\]\]>/g, ''),
              link,
              pubDate,
              author,
              image,
              categories: categories.filter(Boolean)
            });
          }
        });
      } catch (error) {
        console.error(`Error fetching feed ${feedUrl}:`, error);
      }
    }

    // Sort by date (newest first)
    allPosts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    return allPosts.slice(0, 20); // Return top 20 posts
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return [];
  }
};

export const cacheRSSFeeds = async (): Promise<void> => {
  const posts = await fetchRSSFeeds();
  localStorage.setItem('rss_blog_posts', JSON.stringify(posts));
  localStorage.setItem('rss_last_fetched', new Date().toISOString());
};

export const getCachedPosts = (): BlogPost[] => {
  const cached = localStorage.getItem('rss_blog_posts');
  if (cached) {
    return JSON.parse(cached);
  }
  return [];
};

export const shouldRefetchFeeds = (): boolean => {
  const lastFetched = localStorage.getItem('rss_last_fetched');
  if (!lastFetched) return true;
  
  const lastFetchedDate = new Date(lastFetched);
  const now = new Date();
  const hoursSinceLastFetch = (now.getTime() - lastFetchedDate.getTime()) / (1000 * 60 * 60);
  
  return hoursSinceLastFetch > 6; // Refetch every 6 hours
};
