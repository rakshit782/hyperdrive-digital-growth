
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
    console.log("useBlogData: Loading from localStorage:", savedPosts);
    
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        console.log("useBlogData: Parsed posts:", parsedPosts);
        setBlogPosts(parsedPosts);
      } catch (error) {
        console.error("useBlogData: Error parsing saved posts:", error);
        setBlogPosts([]);
      }
    }
  }, []);

  const saveBlogPosts = (posts: BlogPost[]) => {
    console.log("useBlogData: Saving posts:", posts);
    setBlogPosts(posts);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('blogPostsUpdated', {
      detail: { posts }
    }));
    console.log("useBlogData: Dispatched blogPostsUpdated event");
  };

  const addBlogPosts = (newPosts: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    console.log("useBlogData: Adding new posts:", newPosts);
    const timestamp = new Date().toISOString();
    
    const postsWithIds = newPosts.map((post, index) => ({
      ...post,
      id: `${Date.now()}-${index}`,
      createdAt: timestamp,
      updatedAt: timestamp
    }));
    
    console.log("useBlogData: Posts with IDs:", postsWithIds);
    
    const updatedPosts = [...blogPosts, ...postsWithIds];
    console.log("useBlogData: Updated posts array:", updatedPosts);
    
    saveBlogPosts(updatedPosts);
    return postsWithIds;
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    console.log("useBlogData: Updating post:", id, updates);
    const updatedPosts = blogPosts.map(post =>
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    );
    saveBlogPosts(updatedPosts);
  };

  const deleteBlogPost = (id: string) => {
    console.log("useBlogData: Deleting post:", id);
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
