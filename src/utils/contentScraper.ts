
export interface ScrapedContent {
  title: string;
  content: string;
  author?: string;
  publishedDate?: string;
  success: boolean;
  error?: string;
}

// Your backend API base URL - update this to match your server
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001';

export const scrapeArticleContent = async (url: string): Promise<ScrapedContent> => {
  try {
    // Send request to your backend content scraping endpoint
    const response = await fetch(`${API_BASE_URL}/api/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to scrape content');
    }
    
    return {
      title: data.title || 'Article',
      content: data.content || '',
      author: data.author,
      publishedDate: data.publishedDate,
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
