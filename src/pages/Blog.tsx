import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { publishedBlogPosts } from "@/content/blogPosts";
import { format } from "date-fns";

const Blog = () => {
  const posts = publishedBlogPosts;
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extract unique tags from all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag));
    });
    return ["All", ...Array.from(tagSet).sort()];
  }, [posts]);

  const filteredPosts = selectedTag === "All" 
    ? posts 
    : posts.filter(post => post.tags?.includes(selectedTag));

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
    if (!match) return '';
    return format(new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])), 'MMM d, yyyy');
  };

  const estimateReadTime = (content: string | null) => {
    if (!content) return '3 min read';
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  return (
    <>
      <SEOHead 
        title="E-commerce Marketing Blog & Seller Insights | AMZ AD SCOUT"
        description="Practical guides on Amazon PPC, Walmart ads, listing optimization and Shopify growth from the AMZ AD SCOUT team. New articles are on the way, so check back."
        keywords="amazon advertising blog, amazon ppc tips, walmart advertising insights, shopify development blog, e-commerce marketing strategies"
        canonical="https://www.amzadscout.com/blog"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                Digital Marketing Blog
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Expert insights, tips, and strategies to help you dominate digital marketing and grow your business.
              </p>
            </div>

            {/* Tag Filter */}
            {allTags.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {allTags.slice(0, 12).map((tag) => (
                  <Badge 
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="px-4 py-2 cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Empty State */}
            {posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">No blog posts yet. Check back soon!</p>
              </div>
            )}

            {/* Featured Post */}
            {featuredPost && (
              <Card className="mb-12 overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <div className="md:flex">
                  {featuredPost.featured_image ? (
                    <div className="md:w-1/2">
                      <img 
                        src={featuredPost.featured_image} 
                        alt={featuredPost.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className={featuredPost.featured_image ? "md:w-1/2 p-8" : "p-8"}>
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Latest
                      </Badge>
                      {featuredPost.tags?.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt || featuredPost.meta_description}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredPost.published_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {estimateReadTime(featuredPost.content)}
                        </div>
                      </div>
                      <Button asChild className="group">
                        <Link to={`/blog/${featuredPost.slug}`} aria-label={`Read more: ${featuredPost.title}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Blog Posts Grid */}
            {regularPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {post.featured_image ? (
                      <div className="relative">
                        <img 
                          src={post.featured_image} 
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                        {post.tags?.[0] && (
                          <Badge className="absolute top-4 left-4 bg-white/90 text-slate-800 hover:bg-white">
                            {post.tags[0]}
                          </Badge>
                        )}
                      </div>
                    ) : post.tags?.[0] ? (
                      <div className="px-6 pt-6">
                        <Badge className="bg-white/90 text-slate-800 hover:bg-white">
                          {post.tags[0]}
                        </Badge>
                      </div>
                    ) : null}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt || post.meta_description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.published_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {estimateReadTime(post.content)}
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="group w-full">
                        <Link to={`/blog/${post.slug}`} aria-label={`Read more: ${post.title}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Newsletter Subscription */}
            <Card className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl font-bold mb-4">
                  Never Miss an Update
                </h3>
                <p className="text-xl mb-8 text-blue-100">
                  Subscribe to our newsletter and get the latest digital marketing insights delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder:text-slate-500"
                  />
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
                  >
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
