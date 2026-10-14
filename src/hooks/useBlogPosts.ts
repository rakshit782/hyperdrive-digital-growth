import { useState } from 'react';
import { serviceBlogPosts } from '@/data/blogPosts';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[] | null;
  status: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  author_id: string | null;
  author?: string;
  category?: string;
  read_time?: string;
}

// Convert local high-quality articles from serviceBlogPosts into uniform BlogPost schema
const staticPostsFormatted: BlogPost[] = serviceBlogPosts.map((sp) => ({
  id: `static-${sp.id}`,
  title: sp.title,
  slug: sp.slug,
  content: sp.content,
  excerpt: sp.excerpt,
  featured_image: sp.image,
  meta_title: `${sp.title} | AMZ AD SCOUT`,
  meta_description: sp.excerpt,
  tags: [sp.category],
  status: 'published',
  published_at: new Date(sp.publishDate).toISOString() || new Date().toISOString(),
  created_at: new Date(sp.publishDate).toISOString() || new Date().toISOString(),
  updated_at: new Date(sp.publishDate).toISOString() || new Date().toISOString(),
  author_id: sp.author,
  author: sp.author,
  category: sp.category,
  read_time: sp.readTime,
}));

export const useBlogPosts = () => {
  const [posts] = useState<BlogPost[]>(staticPostsFormatted);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const fetchPosts = async () => {};

  return { posts, loading, error, refetch: fetchPosts };
};

export const useBlogPost = (slug: string) => {
  const post = staticPostsFormatted.find((p) => p.slug === slug) || null;
  const [loading] = useState(false);
  const error = post ? null : 'Article not found';

  return { post, loading, error };
};
