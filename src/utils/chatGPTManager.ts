
export interface ChatGPTConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  isActive: boolean;
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

  getConfig(): ChatGPTConfig | null {
    return this.config;
  }

  loadSavedConfig(): ChatGPTConfig | null {
    try {
      const saved = localStorage.getItem('chatgpt_config');
      if (saved) {
        this.config = JSON.parse(saved);
        return this.config;
      }
    } catch (error) {
      console.error('Error loading ChatGPT config:', error);
    }
    return null;
  }

  async saveConfig(config: ChatGPTConfig): Promise<void> {
    this.config = config;
    localStorage.setItem('chatgpt_config', JSON.stringify(config));
  }

  async testConnection(): Promise<boolean> {
    if (!this.config?.apiKey) return false;
    
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error('ChatGPT connection test failed:', error);
      return false;
    }
  }

  async optimizeContent(content: string): Promise<string> {
    if (!this.config?.apiKey || !this.config?.isActive) {
      throw new Error('ChatGPT not configured');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: 'You are a content optimization expert. Improve the given content for better engagement and SEO.'
            },
            {
              role: 'user',
              content: content
            }
          ],
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Content optimization failed:', error);
      throw error;
    }
  }

  isActive(): boolean {
    return this.config?.isActive || false;
  }
}

export const chatGPTManager = ChatGPTManager.getInstance();
