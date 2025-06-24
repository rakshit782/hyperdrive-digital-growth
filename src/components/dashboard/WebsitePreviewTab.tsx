
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink, Smartphone, Monitor, Tablet } from "lucide-react";

const WebsitePreviewTab = () => {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentPage, setCurrentPage] = useState('/');

  const pages = [
    { path: '/', name: 'Home', description: 'Main landing page' },
    { path: '/about', name: 'About', description: 'About us page' },
    { path: '/contact', name: 'Contact', description: 'Contact information and form' },
    { path: '/case-studies', name: 'Case Studies', description: 'Success stories' },
    { path: '/pricing', name: 'Pricing', description: 'Service pricing' },
    { path: '/blog', name: 'Blog', description: 'Blog posts and articles' }
  ];

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      default: return 'w-full';
    }
  };

  const getPreviewHeight = () => {
    switch (previewMode) {
      case 'mobile': return 'h-[667px]';
      case 'tablet': return 'h-[1024px]';
      default: return 'h-[800px]';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-3">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Website Preview</CardTitle>
                <CardDescription>View your website pages in different screen sizes</CardDescription>
              </div>
            </div>
            <Button
              onClick={() => window.open(window.location.origin + currentPage, '_blank')}
              className="flex items-center gap-2"
              variant="outline"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Page Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-slate-700">Select Page</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {pages.map((page) => (
                <Button
                  key={page.path}
                  onClick={() => setCurrentPage(page.path)}
                  variant={currentPage === page.path ? "default" : "outline"}
                  className="text-sm"
                  size="sm"
                >
                  {page.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Device Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-slate-700">Device Preview</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => setPreviewMode('desktop')}
                variant={previewMode === 'desktop' ? "default" : "outline"}
                className="flex items-center gap-2"
                size="sm"
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </Button>
              <Button
                onClick={() => setPreviewMode('tablet')}
                variant={previewMode === 'tablet' ? "default" : "outline"}
                className="flex items-center gap-2"
                size="sm"
              >
                <Tablet className="w-4 h-4" />
                Tablet
              </Button>
              <Button
                onClick={() => setPreviewMode('mobile')}
                variant={previewMode === 'mobile' ? "default" : "outline"}
                className="flex items-center gap-2"
                size="sm"
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </Button>
            </div>
          </div>

          {/* Preview Frame */}
          <div className="bg-slate-100 p-4 rounded-lg">
            <div className="flex justify-center">
              <div className={`${getPreviewWidth()} ${getPreviewHeight()} border border-slate-300 bg-white rounded-lg overflow-hidden shadow-lg`}>
                <iframe
                  src={window.location.origin + currentPage}
                  className="w-full h-full"
                  title={`Preview of ${currentPage}`}
                />
              </div>
            </div>
          </div>

          {/* Page Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-medium text-slate-900 mb-2">
              Current Page: {pages.find(p => p.path === currentPage)?.name || 'Unknown'}
            </h4>
            <p className="text-sm text-slate-600">
              {pages.find(p => p.path === currentPage)?.description || 'No description available'}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              URL: {window.location.origin + currentPage}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsitePreviewTab;
