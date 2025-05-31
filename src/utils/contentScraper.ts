
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
    console.log(`Using proxy URL: ${proxyUrl}`);
    
    const response = await fetch(proxyUrl);
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Received data structure:`, Object.keys(data));
    
    const htmlContent = data.contents;
    console.log(`HTML content length: ${htmlContent?.length || 0}`);
    
    if (!htmlContent) {
      throw new Error('No HTML content received from proxy');
    }
    
    // Parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Check if parsing was successful
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
      console.error('HTML parsing error:', parseError.textContent);
      throw new Error('Failed to parse HTML content');
    }
    
    // Try to extract content from common article selectors
    let content = '';
    let title = '';
    
    // Extract title
    title = doc.querySelector('title')?.textContent?.trim() || 
            doc.querySelector('h1')?.textContent?.trim() || 
            doc.querySelector('.post-title')?.textContent?.trim() ||
            doc.querySelector('.article-title')?.textContent?.trim() ||
            'Article';
    
    console.log(`Extracted title: ${title}`);
    
    // Try to extract main content from common selectors
    const contentSelectors = [
      'article',
      '.article-body',
      '.post-body',
      '.content',
      '.article-content',
      '.post-content',
      '.entry-content',
      '.blog-content',
      'main',
      '.main-content',
      '.story-body',
      '.article-text'
    ];
    
    for (const selector of contentSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        console.log(`Found content with selector: ${selector}`);
        
        // Remove script and style elements
        const scripts = element.querySelectorAll('script, style');
        scripts.forEach(script => script.remove());
        
        content = element.textContent?.trim() || '';
        console.log(`Content length for ${selector}: ${content.length}`);
        
        if (content.length > 200) { // Only use if substantial content
          console.log(`Using content from selector: ${selector}`);
          break;
        }
      }
    }
    
    // Fallback to body content if no specific content found
    if (!content || content.length < 200) {
      console.log('Trying fallback to body content');
      const bodyElement = doc.querySelector('body');
      if (bodyElement) {
        // Remove script, style, nav, header, footer elements
        const unwantedElements = bodyElement.querySelectorAll('script, style, nav, header, footer, .navigation, .sidebar, .ads');
        unwantedElements.forEach(element => element.remove());
        
        const bodyContent = bodyElement.textContent?.trim();
        if (bodyContent) {
          // Clean up the content - remove excessive whitespace
          content = bodyContent
            .replace(/\s+/g, ' ')
            .replace(/\n\s*\n/g, '\n\n')
            .substring(0, 3000) + (bodyContent.length > 3000 ? '...' : '');
          console.log(`Fallback content length: ${content.length}`);
        }
      }
    }
    
    // Final cleanup of content
    if (content) {
      content = content
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .trim();
    }
    
    const success = content.length > 50;
    console.log(`Scraping ${success ? 'successful' : 'failed'}. Final content length: ${content.length}`);
    
    return {
      title,
      content: content || 'Content could not be extracted from this article.',
      success,
      error: success ? undefined : 'Insufficient content extracted'
    };
    
  } catch (error) {
    console.error('Error scraping article content:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to scrape content';
    console.error('Full error details:', error);
    
    return {
      title: '',
      content: '',
      success: false,
      error: errorMessage
    };
  }
};
