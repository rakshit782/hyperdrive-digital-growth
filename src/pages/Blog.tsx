import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, TrendingUp, Target, BarChart3 } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Amazon PPC Strategies That Actually Work in 2024",
      excerpt: "Discover the latest Amazon advertising strategies that are driving real results for sellers this year.",
      category: "Amazon Advertising",
      author: "Sarah Johnson",
      publishDate: "March 15, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Google Ads vs Meta Ads: Which Platform Delivers Better ROI?",
      excerpt: "A comprehensive comparison of the two biggest advertising platforms and how to choose the right one for your business.",
      category: "Digital Marketing",
      author: "Mike Chen",
      publishDate: "March 12, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop"
    },
    {
      id: 3,
      title: "The Complete Guide to Walmart Marketplace Success",
      excerpt: "Everything you need to know to start selling on Walmart and compete with Amazon sellers.",
      category: "E-commerce",
      author: "Lisa Rodriguez",
      publishDate: "March 10, 2024",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1556742400-b5ad0e806a10?w=600&h=300&fit=crop"
    },
    {
      id: 4,
      title: "5 Common PPC Mistakes That Are Killing Your ROAS",
      excerpt: "Learn about the most expensive mistakes in PPC advertising and how to avoid them to maximize your return on ad spend.",
      category: "PPC Management",
      author: "David Park",
      publishDate: "March 8, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop"
    },
    {
      id: 5,
      title: "How to Scale Your E-commerce Business with Multi-Platform Advertising",
      excerpt: "Strategic approaches to expanding your advertising reach across Amazon, Google, Meta, and beyond.",
      category: "Growth Strategy",
      author: "Emma Thompson",
      publishDate: "March 5, 2024",
      readTime: "14 min read",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=300&fit=crop"
    },
    {
      id: 6,
      title: "The Future of E-commerce: AI and Automation in Digital Marketing",
      excerpt: "Explore how artificial intelligence and automation are revolutionizing digital marketing and what it means for your business.",
      category: "Technology",
      author: "Alex Kumar",
      publishDate: "March 1, 2024",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop"
    }
  ];

  const categories = ["All", "Amazon Advertising", "Digital Marketing", "E-commerce", "PPC Management", "Growth Strategy", "Technology"];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <SEOHead 
        title="Digital Marketing Blog - Expert Tips & Insights"
        description="Stay updated with the latest digital marketing trends, Amazon advertising tips, and e-commerce strategies from our expert team."
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
              {categories.map((category, index) => (
                <Badge 
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
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
                      <Button className="group">
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
                      <Button variant="outline" size="sm" className="group">
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