import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { serviceBlogPosts, BlogPost as StaticBlogPost } from '@/data/blogPosts';

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
  const [posts, setPosts] = useState<BlogPost[]>(staticPostsFormatted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const { data, error: dbError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (dbError) {
        // Fall back gracefully to static posts
        setPosts(staticPostsFormatted);
        return;
      }

      if (data && data.length > 0) {
        // Merge Supabase posts with static posts ensuring no slug collisions
        const supabaseSlugs = new Set(data.map((p) => p.slug));
        const nonDuplicateStatic = staticPostsFormatted.filter((p) => !supabaseSlugs.has(p.slug));
        setPosts([...data, ...nonDuplicateStatic]);
      } else {
        setPosts(staticPostsFormatted);
      }
    } catch {
      // Graceful fallback to static posts without throwing unhandled rejection
      setPosts(staticPostsFormatted);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
};

export const useBlogPost = (slug: string) => {
  const fallbackPost = staticPostsFormatted.find((p) => p.slug === slug) || null;
  const [post, setPost] = useState<BlogPost | null>(fallbackPost);
  const [loading, setLoading] = useState(!fallbackPost);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (!dbError && data) {
          setPost(data);
        } else if (fallbackPost) {
          setPost(fallbackPost);
        } else {
          setError('Article not found');
        }
      } catch {
        if (fallbackPost) {
          setPost(fallbackPost);
        } else {
          setError('Article not found');
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  return { post, loading, error };
};
