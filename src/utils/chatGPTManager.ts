
interface ChatGPTConfig {
  apiKey: string;
  model: string;
  isActive: boolean;
  maxTokens: number;
  temperature: number;
}

interface OptimizationRequest {
  type: 'content' | 'review' | 'seo' | 'service';
  content: string;
  context?: string;
}

class ChatGPTManager {
  private static instance: ChatGPTManager;
  private config: ChatGPTConfig | null = null;

  static getInstance(): ChatGPTManager {
    if (!ChatGPTManager.instance) {
      ChatGPTManager.instance = new ChatGPTManager();
    }
    return ChatGPTManager.instance;
  }

  loadSavedConfig() {
    try {
      const saved = localStorage.getItem('chatgpt_config');
      if (saved) {
        this.config = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load ChatGPT config:', error);
    }
  }

  saveConfig(config: ChatGPTConfig) {
    this.config = config;
    localStorage.setItem('chatgpt_config', JSON.stringify(config));
    console.log('ChatGPT Manager: Configuration saved');
  }

  getConfig(): ChatGPTConfig | null {
    return this.config;
  }

  isActive(): boolean {
    return !!(this.config && this.config.isActive && this.config.apiKey);
  }

  async optimizeContent(request: OptimizationRequest): Promise<string> {
    if (!this.isActive()) {
      throw new Error('ChatGPT is not configured or active');
    }

    const prompts = {
      content: `Optimize this website content for better engagement and clarity. Keep the same tone but make it more compelling:\n\n${request.content}`,
      review: `Improve this customer review to be more detailed and helpful while maintaining authenticity:\n\n${request.content}`,
      seo: `Optimize this content for SEO while maintaining readability. Focus on relevant keywords and structure:\n\n${request.content}`,
      service: `Enhance this service description to be more persuasive and professional:\n\n${request.content}`
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config!.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config!.model,
          messages: [
            {
              role: 'system',
              content: 'You are a professional content optimizer specializing in website copy and marketing materials.'
            },
            {
              role: 'user',
              content: prompts[request.type]
            }
          ],
          max_tokens: this.config!.maxTokens,
          temperature: this.config!.temperature,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('ChatGPT optimization error:', error);
      throw error;
    }
  }

  async generateSuggestions(content: string, type: string): Promise<string[]> {
    if (!this.isActive()) {
      return [];
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config!.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config!.model,
          messages: [
            {
              role: 'system',
              content: 'Generate 3-5 brief improvement suggestions for the given content. Return as a JSON array of strings.'
            },
            {
              role: 'user',
              content: `Analyze this ${type} content and suggest improvements:\n\n${content}`
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const suggestions = JSON.parse(data.choices[0].message.content);
      return Array.isArray(suggestions) ? suggestions : [];
    } catch (error) {
      console.error('ChatGPT suggestions error:', error);
      return [];
    }
  }

  testConnection(): Promise<boolean> {
    if (!this.config || !this.config.apiKey) {
      return Promise.resolve(false);
    }

    return fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    })
    .then(response => response.ok)
    .catch(() => false);
  }
}

export const chatGPTManager = ChatGPTManager.getInstance();
