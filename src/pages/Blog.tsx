import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { serviceBlogPosts } from "@/data/blogPosts";

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Amazon Advertising",
    "Google Advertising",
    "Meta Advertising",
    "Walmart Advertising",
    "Shopify Development",
    "Website Development",
    "PPC Management",
    "Growth Strategy"
  ];

  const filteredPosts = selectedCategory === "All" 
    ? serviceBlogPosts 
    : serviceBlogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <>
      <SEOHead 
        title="E-commerce Marketing Blog | Amazon, Walmart & Shopify Growth Strategies"
        description="Expert insights on Amazon PPC, Walmart advertising, Shopify development, and e-commerce growth strategies. Stay updated with the latest digital marketing trends, tips, and best practices from certified advertising professionals."
        keywords="amazon advertising blog, amazon ppc tips, walmart advertising insights, shopify development blog, e-commerce marketing strategies, digital marketing blog, amazon seller tips, sponsored products guide, sponsored brands strategies, ppc optimization tips, listing optimization guide, amazon seo tips, conversion rate optimization, marketplace growth strategies, product launch tips, seasonal campaign strategies, amazon analytics insights, roi optimization guide, acos reduction tips, advertising budget tips, keyword research guide, competitive analysis tips, market research insights, inventory management tips, fulfillment strategies, international expansion guide, account health tips, review management strategies, ranking strategies, prime day tips, black friday strategies, q4 planning guide, growth hacking tips, performance marketing insights, customer acquisition strategies, retention marketing tips, remarketing strategies, data-driven marketing, amazon dsp insights, video advertising tips, influencer marketing guide, content marketing strategies, email marketing tips, social media advertising"
        canonical={window.location.href}
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

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="px-4 py-2 cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Featured Post */}
            {featuredPost && (
              <Card className="mb-12 overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Featured
                      </Badge>
                      <Badge variant="outline">
                        {featuredPost.category}
                      </Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.publishDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <Button 
                        className="group"
                        onClick={() => handlePostClick(featuredPost.slug)}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-slate-800 hover:bg-white">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{post.publishDate}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group"
                        onClick={() => handlePostClick(post.slug)}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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