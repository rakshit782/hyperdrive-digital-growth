import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  BookOpen, 
  Sparkles, 
  User, 
  ArrowUpRight,
  TrendingUp,
  Tag,
  Mail,
  CheckCircle2
} from "lucide-react";
import { useBlogPosts, BlogPost } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { toast } from "sonner";

const Blog = () => {
  const { posts, loading, error } = useBlogPosts();
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Extract unique categories / tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      if (post.category) tagSet.add(post.category);
      post.tags?.forEach((tag) => tagSet.add(tag));
    });
    return ["All", ...Array.from(tagSet).sort()];
  }, [posts]);

  // Filter posts by tag & search
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "All" ||
        post.category === selectedTag ||
        post.tags?.includes(selectedTag);

      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Recent";
    }
  };

  const estimateReadTime = (post: BlogPost) => {
    if (post.read_time) return post.read_time;
    if (!post.content) return "5 min read";
    const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.max(3, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  const getDefaultImage = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1556742400-b5ad0e806a10?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
    ];
    return images[index % images.length];
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setNewsletterSubscribed(true);
    toast.success("Thank you for subscribing to marketplace growth insights!");
    setNewsletterEmail("");
  };

  return (
    <>
      <SEOHead 
        title="E-commerce Advertising Insights & Marketplace Blog | AMZ AD SCOUT"
        description="Master Amazon PPC, Walmart Connect, Meta Ads, listing SEO and conversion optimization with tactical step-by-step guides from our senior marketplace directors."
        keywords="amazon advertising blog, amazon ppc tips, walmart advertising insights, shopify development blog, e-commerce marketing strategies, marketplace optimization"
        canonical={typeof window !== "undefined" ? window.location.href : ""}
      />
      <Header />

      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold mb-6 text-blue-300">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Proven Tactics from Real Account Operators</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
              E-commerce Growth & Marketplace Insights
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Deep-dive strategies, bid engineering frameworks, and profitability blueprints across Amazon, Walmart Connect, Meta, and Shopify.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search articles by topic, keyword, or platform..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-2xl backdrop-blur-md focus:bg-white/15 focus:border-blue-400 text-base"
                />
              </div>
            </div>

          </div>
        </section>

        {/* TOPICS / FILTER BAR */}
        <section className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-[80px] z-30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
            <div className="flex items-center justify-between gap-4">
              
              {/* Filter Pills with horizontal scroll & hidden scrollbar */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 pr-2">
                <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1.5 shrink-0 select-none">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Topic:</span>
                </div>

                {allTags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  const count = tag === "All" 
                    ? posts.length 
                    : posts.filter((p) => p.category === tag || p.tags?.includes(tag)).length;

                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 border cursor-pointer select-none ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm shadow-slate-900/15"
                          : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-white hover:text-slate-900 hover:border-slate-300"
                      }`}
                    >
                      <span>{tag}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full transition-colors ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-slate-200/70 text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Counter / Reset */}
              <div className="shrink-0 flex items-center gap-3 text-xs">
                {selectedTag !== "All" && (
                  <button
                    onClick={() => setSelectedTag("All")}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-xs whitespace-nowrap"
                  >
                    Clear filter
                  </button>
                )}
                <span className="text-slate-400 hidden lg:inline">•</span>
                <span className="text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
                  <strong className="text-slate-900 font-bold">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "article" : "articles"}
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ARTICLES MAIN SECTION */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Empty Search Result */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">No matching articles found</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  We couldn't find any articles matching your search criteria. Try using different keywords or reset your filters.
                </p>
                <Button 
                  onClick={() => {
                    setSelectedTag("All");
                    setSearchQuery("");
                  }}
                  variant="outline"
                >
                  Reset all filters
                </Button>
              </div>
            )}

            {/* FEATURED ARTICLE (HERO CARD) */}
            {featuredPost && (
              <div className="mb-16">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">
                  <TrendingUp className="w-4 h-4" />
                  <span>Featured Read</span>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <div className="grid lg:grid-cols-12 gap-0">
                    
                    {/* Image Column */}
                    <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                      <img 
                        src={featuredPost.featured_image || getDefaultImage(0)} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white font-semibold shadow-md">
                          {featuredPost.category || featuredPost.tags?.[0] || "Featured"}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {formatDate(featuredPost.published_at)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {estimateReadTime(featuredPost)}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                          <Link to={`/blog/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>

                        <p className="text-slate-600 text-base leading-relaxed line-clamp-3 mb-6">
                          {featuredPost.excerpt || featuredPost.meta_description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        {featuredPost.author && (
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                              {featuredPost.author.charAt(0)}
                            </div>
                            <span className="text-xs font-semibold text-slate-700">
                              {featuredPost.author}
                            </span>
                          </div>
                        )}

                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl group/btn">
                          <Link to={`/blog/${featuredPost.slug}`}>
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* REGULAR ARTICLES GRID */}
            {regularPosts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Latest Insights & Guides
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post, idx) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative h-52 overflow-hidden bg-slate-100">
                          <img 
                            src={post.featured_image || getDefaultImage(idx + 1)} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/95 text-slate-900 font-semibold shadow-sm border border-slate-200 backdrop-blur-sm">
                              {post.category || post.tags?.[0] || "E-commerce"}
                            </Badge>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(post.published_at)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {estimateReadTime(post)}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt || post.meta_description}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between">
                        {post.author ? (
                          <span className="text-xs font-semibold text-slate-500">
                            By {post.author}
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-slate-500">
                            AMZ AD SCOUT
                          </span>
                        )}

                        <Link 
                          to={`/blog/${post.slug}`} 
                          className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 group/link"
                        >
                          <span>Read More</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1 group-link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* NEWSLETTER SUBSCRIBE BANNER */}
            <div className="mt-20">
              <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-blue-900/50">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-2xl mx-auto text-center relative">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-400/20">
                    <Mail className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                    Stay Ahead of Marketplace Changes
                  </h3>
                  
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                    Get bi-weekly breakdown of algorithm updates, Amazon PPC strategies, and Walmart Connect growth playbooks delivered directly to your inbox.
                  </p>

                  {newsletterSubscribed ? (
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/20 text-green-300 border border-green-500/30 font-medium">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>You are subscribed! Check your inbox for our latest briefing.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Enter your work email..."
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl h-12 px-4 focus:bg-white/15"
                      />
                      <Button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-blue-600/30 shrink-0"
                      >
                        Subscribe Free
                      </Button>
                    </form>
                  )}

                  <p className="text-[11px] text-slate-400 mt-4">
                    Zero spam. Unsubscribe anytime with 1-click.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default Blog;
