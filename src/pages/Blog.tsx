
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, BookOpen, ExternalLink, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRSSFeeds, formatDate, type RSSItem } from "@/utils/rssParser";
import { useState } from "react";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: rssItems = [], isLoading, error, refetch } = useQuery({
    queryKey: ['rss-feeds'],
    queryFn: fetchAllRSSFeeds,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  const categories = ["all", "Amazon News", "Walmart Updates", "Shopify Insights", "Meta News"];
  
  const filteredItems = selectedCategory === "all" 
    ? rssItems 
    : rssItems.filter(item => item.category === selectedCategory);

  if (error) {
    console.error("Error loading RSS feeds:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 tracking-wide">LIVE RSS FEEDS</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
            Latest <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Industry News</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            Real-time updates from Amazon, Walmart, Shopify, and Meta - curated automatically from official RSS feeds
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              onClick={() => refetch()}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Feeds
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              {category === "all" ? "All Sources" : category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-xl text-slate-600">Loading latest news from RSS feeds...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-red-600 font-medium mb-4">Unable to load RSS feeds</p>
              <p className="text-red-500 text-sm mb-4">This might be due to CORS restrictions or network issues.</p>
              <Button onClick={() => refetch()} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-600">No articles found for the selected category.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {filteredItems.map((item: RSSItem, index: number) => (
              <Card key={index} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 text-sm font-medium rounded-full">
                      {item.category}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full capitalize">
                      {item.source}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed text-base">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-slate-500 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(item.pubDate)}
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-500 py-3 font-semibold rounded-xl"
                    variant="outline"
                  >
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      Read Full Article
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <p className="text-slate-500 text-sm">
            News automatically updated from official RSS feeds • Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
