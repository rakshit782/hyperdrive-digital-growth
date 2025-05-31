
export interface ScrapedContent {
  title: string;
  content: string;
  author?: string;
  publishedDate?: string;
  success: boolean;
  error?: string;
}

// Use a CORS proxy for client-side scraping
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

export const scrapeArticleContent = async (url: string): Promise<ScrapedContent> => {
  try {
    console.log(`Attempting to scrape content from: ${url}`);
    
    // Use CORS proxy to fetch the page
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const htmlContent = data.contents;
    
    // Parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Try to extract content from common article selectors
    let content = '';
    let title = '';
    
    // Extract title
    title = doc.querySelector('title')?.textContent?.trim() || 
            doc.querySelector('h1')?.textContent?.trim() || 
            'Article';
    
    // Try to extract main content from common selectors
    const contentSelectors = [
      'article',
      '.content',
      '.article-content',
      '.post-content',
      '.entry-content',
      'main',
      '.main-content'
    ];
    
    for (const selector of contentSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        content = element.textContent?.trim() || '';
        if (content.length > 100) { // Only use if substantial content
          break;
        }
      }
    }
    
    // Fallback to body content if no specific content found
    if (!content || content.length < 100) {
      const bodyContent = doc.querySelector('body')?.textContent?.trim();
      if (bodyContent) {
        // Clean up the content - remove script/style content and excessive whitespace
        content = bodyContent
          .replace(/\s+/g, ' ')
          .substring(0, 2000) + '...'; // Limit length
      }
    }
    
    return {
      title,
      content: content || 'Content could not be extracted from this article.',
      success: true
    };
    
  } catch (error) {
    console.error('Error scraping article content:', error);
    return {
      title: '',
      content: '',
      success: false,
      error: error instanceof Error ? error.message : 'Failed to scrape content'
    };
  }
};
