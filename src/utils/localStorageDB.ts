
import localforage from 'localforage';

interface DBConfig {
  name: string;
  version: number;
  storeName: string;
}

class LocalStorageDB {
  private stores: { [key: string]: LocalForage } = {};

  constructor() {
    this.initializeStores();
  }

  private initializeStores() {
    const storeConfigs = [
      'blog_posts',
      'pricing_plans',
      'faqs',
      'leads',
      'website_settings',
      'analytics_events',
      'contact_info',
      'contact_submissions',
      'integrations',
      'profiles',
      'user_roles',
      'reviews',
      'services',
      'stats',
      'case_studies'
    ];

    storeConfigs.forEach(storeName => {
      this.stores[storeName] = localforage.createInstance({
        name: 'LocalDB',
        storeName: storeName,
        description: `Local storage for ${storeName}`
      });
    });
  }

  async insert(tableName: string, data: any): Promise<string> {
    const store = this.stores[tableName];
    if (!store) throw new Error(`Table ${tableName} not found`);

    const id = data.id || this.generateId();
    const record = {
      ...data,
      id,
      created_at: data.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await store.setItem(id, record);
    return id;
  }

  async findById(tableName: string, id: string): Promise<any> {
    const store = this.stores[tableName];
    if (!store) throw new Error(`Table ${tableName} not found`);

    return await store.getItem(id);
  }

  async findAll(tableName: string): Promise<any[]> {
    const store = this.stores[tableName];
    if (!store) throw new Error(`Table ${tableName} not found`);

    const results: any[] = [];
    await store.iterate((value: any) => {
      results.push(value);
    });

    return results.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async update(tableName: string, id: string, data: any): Promise<void> {
    const store = this.stores[tableName];
    if (!store) throw new Error(`Table ${tableName} not found`);

    const existing = await store.getItem(id);
    if (!existing) throw new Error(`Record ${id} not found`);

    const updated = {
      ...existing,
      ...data,
      id,
      updated_at: new Date().toISOString()
    };

    await store.setItem(id, updated);
  }

  async delete(tableName: string, id: string): Promise<void> {
    const store = this.stores[tableName];
    if (!store) throw new Error(`Table ${tableName} not found`);

    await store.removeItem(id);
  }

  async findWhere(tableName: string, condition: (item: any) => boolean): Promise<any[]> {
    const all = await this.findAll(tableName);
    return all.filter(condition);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async clearTable(tableName: string): Promise<void> {
    const store = this.stores[tableName];
    if (!store) throw new Error(`Table ${tableName} not found`);

    await store.clear();
  }

  async seedDefaultData(): Promise<void> {
    // Seed default services
    const servicesCount = await this.stores.services.length();
    if (servicesCount === 0) {
      const defaultServices = [
        {
          id: 'amazon-advertising',
          title: 'Amazon Advertising',
          description: 'Professional Amazon PPC management and optimization',
          features: ['PPC Campaign Management', 'Keyword Research', 'Bid Optimization', 'Performance Analytics'],
          gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
          bgGradient: 'from-orange-50 to-red-50',
          link: '/amazon-advertising',
          icon: 'ShoppingCart'
        },
        {
          id: 'walmart-advertising',
          title: 'Walmart Advertising',
          description: 'Strategic Walmart marketplace advertising solutions',
          features: ['Walmart Connect', 'Sponsored Products', 'Brand Stores', 'Performance Tracking'],
          gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          bgGradient: 'from-blue-50 to-cyan-50',
          link: '/walmart-advertising',
          icon: 'Store'
        }
      ];

      for (const service of defaultServices) {
        await this.insert('services', service);
      }
    }

    // Seed default FAQs
    const faqsCount = await this.stores.faqs.length();
    if (faqsCount === 0) {
      const defaultFAQs = [
        {
          question: "How long does it take to see results?",
          answer: "Most clients see initial improvements within 2-4 weeks, with significant results typically visible within 60-90 days.",
          category: "general",
          is_active: true,
          sort_order: 1
        },
        {
          question: "What platforms do you work with?",
          answer: "We specialize in Amazon, Walmart, and Meta advertising platforms, providing comprehensive multi-channel strategies.",
          category: "services",
          is_active: true,
          sort_order: 2
        }
      ];

      for (const faq of defaultFAQs) {
        await this.insert('faqs', faq);
      }
    }
  }
}

export const localDB = new LocalStorageDB();
