
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink, AlertCircle, Monitor, Printer } from "lucide-react";
import { RSSItem } from "@/utils/rssParser";
import { useState } from "react";

interface ArticleViewProps {
  article: RSSItem;
  onBack: () => void;
}

const ArticleView = ({ article, onBack }: ArticleViewProps) => {
  const [showEmbedded, setShowEmbedded] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  const handleEmbedError = () => {
    setEmbedError(true);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${article.title}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px;
            }
            h1 { 
              color: #333; 
              border-bottom: 2px solid #eee; 
              padding-bottom: 10px;
            }
            .meta { 
              color: #666; 
              font-size: 14px; 
              margin-bottom: 20px;
            }
            .content { 
              margin-bottom: 30px;
            }
            .source { 
              border-top: 1px solid #eee; 
              padding-top: 15px; 
              font-size: 12px; 
              color: #666;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <h1>${article.title}</h1>
          <div class="meta">
            <strong>Category:</strong> ${article.category} | 
            <strong>Source:</strong> ${article.source} | 
            <strong>Published:</strong> ${new Date(article.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div class="content">
            ${article.description || "No preview content available for this article."}
          </div>
          <div class="source">
            <strong>Original Source:</strong> ${article.link}
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-6 py-20">
        <Button 
          onClick={onBack}
          variant="outline"
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>
        
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 text-sm font-medium rounded-full">
                {article.category}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full capitalize">
                {article.source}
              </span>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              {article.title}
            </CardTitle>
            <div className="flex items-center text-slate-500 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(article.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </CardHeader>
          <CardContent className="prose max-w-none">
            {!showEmbedded ? (
              <>
                <div className="text-lg text-slate-700 leading-relaxed mb-8 whitespace-pre-wrap">
                  {article.description || "No preview content available for this article."}
                </div>
                
                <div className="flex gap-4 mb-8">
                  <Button 
                    onClick={() => setShowEmbedded(true)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    <Monitor className="mr-2 w-4 h-4" />
                    View Full Article (Embedded)
                  </Button>
                  <Button 
                    onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}
                    variant="outline"
                  >
                    Open in New Tab
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={handlePrint}
                    variant="outline"
                  >
                    <Printer className="mr-2 w-4 h-4" />
                    Print Article
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">Full Article</h3>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setShowEmbedded(false)}
                      variant="outline"
                      size="sm"
                    >
                      Show Preview
                    </Button>
                    <Button 
                      onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}
                      variant="outline"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Original
                    </Button>
                    <Button 
                      onClick={handlePrint}
                      variant="outline"
                      size="sm"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>

                {embedError ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">Unable to Embed Content</h4>
                        <p className="text-red-700 mb-4">
                          This website doesn't allow embedding. This is a security feature implemented by many websites to prevent their content from being displayed in frames.
                        </p>
                        <Button 
                          onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Open in New Tab Instead
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <iframe
                      src={article.link}
                      className="w-full h-[800px] border-0"
                      title={article.title}
                      onError={handleEmbedError}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                  </div>
                )}
              </>
            )}

            {article.link && !showEmbedded && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-2">Original Source:</p>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium break-all"
                >
                  {article.link}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleView;
