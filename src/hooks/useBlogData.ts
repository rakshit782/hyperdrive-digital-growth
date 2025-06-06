
import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  status: 'draft' | 'published';
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const useBlogData = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blog posts from localStorage on mount
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    }
  }, []);

  const saveBlogPosts = (posts: BlogPost[]) => {
    setBlogPosts(posts);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('blogPostsUpdated', {
      detail: { posts }
    }));
  };

  const addBlogPosts = (newPosts: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const timestamp = new Date().toISOString();
    const postsWithIds = newPosts.map((post, index) => ({
      ...post,
      id: `${Date.now()}-${index}`,
      createdAt: timestamp,
      updatedAt: timestamp
    }));
    
    const updatedPosts = [...blogPosts, ...postsWithIds];
    saveBlogPosts(updatedPosts);
    return postsWithIds;
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    const updatedPosts = blogPosts.map(post =>
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    );
    saveBlogPosts(updatedPosts);
  };

  const deleteBlogPost = (id: string) => {
    const updatedPosts = blogPosts.filter(post => post.id !== id);
    saveBlogPosts(updatedPosts);
  };

  return {
    blogPosts,
    addBlogPosts,
    updateBlogPost,
    deleteBlogPost,
    saveBlogPosts
  };
};
