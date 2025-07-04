
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BlogPost } from "@/hooks/useBlogData";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Load blog posts from localStorage
    const loadBlogPosts = () => {
      const saved = localStorage.getItem('blogPosts');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setBlogPosts(parsed.filter((post: BlogPost) => post.status === 'published'));
        } catch (error) {
          console.error("Error loading blog posts:", error);
          setBlogPosts([]);
        }
      }
    };

    loadBlogPosts();

    // Listen for blog post updates
    const handleBlogUpdate = () => {
      loadBlogPosts();
    };

    window.addEventListener('blogPostsUpdated', handleBlogUpdate);
    return () => {
      window.removeEventListener('blogPostsUpdated', handleBlogUpdate);
    };
  }, []);

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead 
        title="Blog - Expert Advertising Insights & Tips"
        description="Stay updated with the latest advertising strategies, tips, and insights from our expert team."
        keywords="advertising blog, marketing tips, Amazon PPC insights, Meta advertising strategies"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Expert Insights &
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Industry Updates
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Stay ahead of the competition with the latest advertising strategies, tips, and insights from our expert team.
              </p>
              
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {blogPosts.length === 0 ? "No Blog Posts Yet" : "No Posts Found"}
                  </h3>
                  <p className="text-slate-600">
                    {blogPosts.length === 0 
                      ? "We're working on creating amazing content for you. Check back soon!"
                      : "Try adjusting your search terms or selecting a different category."
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Content */}
                    <div className="p-8">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                      </div>

                      {/* Title and Excerpt */}
                      <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-slate-500">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Read More */}
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
