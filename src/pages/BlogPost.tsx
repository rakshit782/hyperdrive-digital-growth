import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { getBlogPostBySlug, publishedBlogPosts } from "@/content/blogPosts";
import { toast } from "sonner";
import { format } from "date-fns";

const SITE_ORIGIN = "https://www.amzadscout.com";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
  }, [post, navigate]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || '',
          text: post?.excerpt || '',
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

  const relatedPosts = post
    ? publishedBlogPosts
        .filter((related) => related.id !== post.id && related.tags?.some((tag) => post.tags?.includes(tag)))
        .slice(0, 3)
    : [];

  if (!post) {
    return null;
  }

  const canonical = `${SITE_ORIGIN}/blog/${post.slug}`;
  const description = post.meta_description || post.excerpt || '';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    author: {
      '@type': 'Organization',
      name: 'AMZ AD SCOUT',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AMZ AD SCOUT',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.png`,
      },
    },
  };

  return (
    <>
      <SEOHead 
        title={post.meta_title || post.title}
        description={description}
        canonical={canonical}
        schema={schema}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5">
        <Header />
        
        <article className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            {/* Back Button */}
            <Button asChild variant="ghost" className="mb-8 group">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {post.tags?.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{estimateReadTime(post.content)}</span>
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

            {post.featured_image ? (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            ) : null}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-16">
              {post.excerpt && (
                <div className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
                  {post.excerpt}
                </div>
              )}

              <div 
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
            </div>

            {/* Author Card */}
            <Card className="p-6 mb-12 bg-secondary/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                  A
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AMZ AD SCOUT</h3>
                  <p className="text-sm text-muted-foreground">
                    E-commerce Marketing Experts
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
                        {relatedPost.featured_image ? (
                          <img
                            src={relatedPost.featured_image}
                            alt={relatedPost.title}
                            className="w-full h-40 object-cover"
                          />
                        ) : null}
                        <div className="p-4">
                          {relatedPost.tags?.[0] && (
                            <Badge variant="outline" className="mb-2 text-xs">
                              {relatedPost.tags[0]}
                            </Badge>
                          )}
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
