import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { serviceBlogPosts } from "@/data/blogPosts";
import { toast } from "sonner";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = serviceBlogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // Get related posts from the same category
  const relatedPosts = serviceBlogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <SEOHead 
        title={`${post.title} | Blog`}
        description={post.excerpt}
        keywords="amazon advertising blog, ecommerce marketing blog, digital marketing insights, amazon ppc blog, advertising strategies, marketing tips, ecommerce growth tips, amazon seller blog, marketplace advertising, social media marketing blog, google ads blog, meta advertising blog, walmart advertising blog, advertising best practices, marketing trends, ecommerce optimization, conversion rate optimization blog, advertising case studies, marketing success stories, industry insights, expert advice, marketing guides, advertising tutorials, ecommerce resources, seller resources, marketing education, advertising training, strategy guides, performance marketing blog, growth marketing blog, revenue optimization, sales growth tips, marketplace success, brand building blog, product marketing blog, listing optimization blog, seo blog, content marketing blog, email marketing blog, influencer marketing blog, video marketing blog, mobile marketing blog, retargeting strategies, customer acquisition blog, lead generation blog, marketing analytics blog, data driven marketing, marketing automation blog, advertising technology, martech blog, ad tech insights, platform updates, algorithm changes, marketing news, advertising news, ecommerce trends, marketplace trends, seller tips, advertising benchmarks, industry standards, competitive analysis, market research, consumer insights, buyer behavior, shopping trends, seasonal marketing, holiday advertising, promotional strategies, discount strategies, pricing strategies, competitor strategies"
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5">
        <Header />
        
        <article className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="text-sm bg-primary/10 text-primary hover:bg-primary/20">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-16">
              <div className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
                {post.excerpt}
              </div>

              <div className="text-foreground leading-relaxed space-y-6 whitespace-pre-line">
                {post.content}
              </div>
            </div>

            {/* Author Card */}
            <Card className="p-6 mb-12 bg-secondary/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">
                    Digital Marketing Expert
                  </p>
                </div>
              </div>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
