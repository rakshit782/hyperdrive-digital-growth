
export interface ScrapedContent {
  title: string;
  content: string;
  author?: string;
  publishedDate?: string;
  success: boolean;
  error?: string;
}

export const scrapeArticleContent = async (url: string): Promise<ScrapedContent> => {
  try {
    // Using a CORS proxy to fetch the article HTML
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (!data.contents) {
      throw new Error('No content received from proxy');
    }

    // Parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    
    // Try different selectors to find the main content
    const contentSelectors = [
      'article',
      '[role="main"]',
      '.post-content',
      '.entry-content',
      '.article-content',
      '.content',
      '.post-body',
      'main',
      '#content',
      '.main-content'
    ];
    
    let content = '';
    let title = '';
    
    // Extract title
    const titleElement = doc.querySelector('h1') || doc.querySelector('title');
    title = titleElement?.textContent?.trim() || '';
    
    // Try to find the main content
    for (const selector of contentSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        // Remove unwanted elements
        const unwantedSelectors = ['script', 'style', 'nav', 'header', 'footer', '.advertisement', '.ad', '.social-share'];
        unwantedSelectors.forEach(sel => {
          element.querySelectorAll(sel).forEach(el => el.remove());
        });
        
        content = element.textContent || '';
        if (content.length > 500) { // Only use if we got substantial content
          break;
        }
      }
    }
    
    // If no good content found, try to get all paragraphs
    if (content.length < 500) {
      const paragraphs = Array.from(doc.querySelectorAll('p'))
        .map(p => p.textContent?.trim())
        .filter(text => text && text.length > 50)
        .join('\n\n');
      
      if (paragraphs.length > content.length) {
        content = paragraphs;
      }
    }
    
    // Clean up content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    if (content.length < 100) {
      throw new Error('Insufficient content extracted');
    }
    
    return {
      title: title || 'Article',
      content,
      success: true
    };
    
  } catch (error) {
    console.error('Error scraping article content:', error);
    return {
      title: '',
      content: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
