
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "Amazon PPC Strategy: How to Maximize Your ROI in 2024",
      excerpt: "Learn the latest Amazon PPC strategies that top sellers use to increase their return on ad spend and dominate their niches.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Amazon Advertising",
      readTime: "8 min read"
    },
    {
      title: "Walmart Connect vs Amazon Advertising: Which Platform is Right for You?",
      excerpt: "A comprehensive comparison of Walmart Connect and Amazon Advertising to help you choose the best platform for your business.",
      author: "Mike Chen",
      date: "March 12, 2024",
      category: "Platform Comparison",
      readTime: "12 min read"
    },
    {
      title: "Meta Advertising Trends: What's Working in 2024",
      excerpt: "Discover the latest Facebook and Instagram advertising trends that are driving results for e-commerce businesses.",
      author: "Emily Rodriguez",
      date: "March 8, 2024",
      category: "Meta Advertising",
      readTime: "6 min read"
    },
    {
      title: "Shopify to Amazon Integration: A Complete Guide",
      excerpt: "Step-by-step guide to integrating your Shopify store with Amazon for seamless multi-channel selling.",
      author: "David Kim",
      date: "March 5, 2024",
      category: "Shopify Integration",
      readTime: "15 min read"
    },
    {
      title: "5 Common PPC Mistakes That Are Killing Your Profits",
      excerpt: "Avoid these critical PPC mistakes that could be costing you thousands in lost revenue and wasted ad spend.",
      author: "Lisa Thompson",
      date: "March 1, 2024",
      category: "PPC Strategy",
      readTime: "10 min read"
    },
    {
      title: "The Future of E-commerce Advertising: AI and Automation",
      excerpt: "Explore how artificial intelligence and automation are transforming e-commerce advertising and what it means for your business.",
      author: "Alex Parker",
      date: "February 28, 2024",
      category: "Industry Insights",
      readTime: "9 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 tracking-wide">BLOG</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
            Latest <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Insights</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Stay ahead of the curve with expert tips, strategies, and industry insights from our team of digital marketing professionals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed text-base">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-slate-500 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-500 py-3 font-semibold rounded-xl"
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl"
          >
            View All Posts
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
