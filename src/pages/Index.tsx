import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRSSFeeds } from "@/utils/rssParser";

const Index = () => {
  const { data: rssItems = [] } = useQuery({
    queryKey: ['rss-feeds-preview'],
    queryFn: fetchAllRSSFeeds,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Show latest 2 items from RSS feeds, fallback to static content
  const featuredPosts = rssItems.length >= 2 
    ? rssItems.slice(0, 2).map(item => ({
        title: item.title,
        excerpt: item.description,
        date: new Date(item.pubDate).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        link: `/blog?article=${encodeURIComponent(item.link)}`,
        isRSS: true
      }))
    : [
        {
          title: "Amazon AI Innovation: The Future of E-commerce",
          excerpt: "Discover how Amazon's AI initiatives are transforming the retail landscape and customer experience.",
          date: "March 15, 2024",
          isRSS: false
        },
        {
          title: "AWS Latest Updates: Cloud Computing Excellence",
          excerpt: "Stay updated with the latest AWS announcements and how they can benefit your business.",
          date: "March 12, 2024",
          isRSS: false
        }
      ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      
      {/* Blog Section Preview */}
      <section className="py-20 bg-gradient-to-br from-slate-100 via-white to-blue-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 tracking-wide">
                {rssItems.length > 0 ? 'AMAZON RSS FEEDS' : 'LATEST INSIGHTS'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Stay <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Informed</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {rssItems.length > 0 
                ? 'Real-time updates from Amazon\'s official RSS feeds - covering AI, AWS, devices, and business insights'
                : 'Get the latest tips, strategies, and insights from our team of digital marketing experts'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map((post, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">{post.title}</CardTitle>
                  <CardDescription className="text-slate-600">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{post.date}</span>
                    <Button variant="outline" size="sm" onClick={() => window.location.href = post.isRSS ? post.link : '/blog'}>
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl"
              onClick={() => window.location.href = '/blog'}
            >
              View All Posts
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <Contact />
    </div>
  );
};

export default Index;
