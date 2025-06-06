
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, Search, Tag } from "lucide-react";
import { BlogPost } from "@/hooks/useBlogData";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    // Load published blog posts from localStorage
    const loadBlogPosts = () => {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        const allPosts: BlogPost[] = JSON.parse(savedPosts);
        const publishedPosts = allPosts.filter(post => post.status === 'published');
        setBlogPosts(publishedPosts);
      }
    };

    loadBlogPosts();

    // Listen for blog posts updates
    const handleBlogPostsUpdate = () => {
      loadBlogPosts();
    };

    window.addEventListener('blogPostsUpdated', handleBlogPostsUpdate);
    return () => window.removeEventListener('blogPostsUpdated', handleBlogPostsUpdate);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Blog & Insights
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, strategies, and insights in e-commerce advertising
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-600">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex items-center">
                        <Tag className="w-3 h-3 mr-1 text-slate-400" />
                        <span className="text-xs text-slate-500">
                          {post.tags.slice(0, 2).join(', ')}
                          {post.tags.length > 2 && '...'}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              {searchTerm || selectedCategory ? 'No articles found' : 'No articles published yet'}
            </h3>
            <p className="text-slate-500">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filter criteria' 
                : 'Check back soon for new content!'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
