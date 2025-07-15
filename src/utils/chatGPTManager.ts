
interface ChatGPTConfig {
  apiKey: string;
  isActive: boolean;
  model?: string;
  maxTokens?: number;
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

  configure(config: ChatGPTConfig) {
    this.config = config;
    console.log('ChatGPT configured:', { active: config.isActive });
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.config?.isActive || !this.config?.apiKey) {
      throw new Error('ChatGPT not configured or not active');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          max_tokens: this.config.maxTokens || 150,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from ChatGPT');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response';
    } catch (error) {
      console.error('ChatGPT API error:', error);
      throw error;
    }
  }

  isActive(): boolean {
    return !!(this.config && this.config.isActive && this.config.apiKey);
  }

  getConfig(): ChatGPTConfig | null {
    return this.config;
  }
}

export const chatGPTManager = ChatGPTManager.getInstance();
