
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, Link, Eye, Trash2, Plus, Download, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  status: 'draft' | 'published';
  slug: string;
}

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      const samplePosts: BlogPost[] = [
        {
          id: "1",
          title: "10 Amazon PPC Strategies That Actually Work",
          excerpt: "Discover proven Amazon PPC strategies that can boost your sales and reduce your ACoS.",
          content: `<p>Amazon PPC can be challenging, but with the right strategies, you can achieve great results.</p>
<img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" alt="Amazon advertising dashboard" style="width: 100%; margin: 20px 0;">
<h2>Key Strategies</h2>
<p>Here are the top strategies that actually work...</p>`,
          author: "John Smith",
          category: "Amazon Advertising",
          tags: ["PPC", "Amazon", "Strategy"],
          publishDate: "2024-01-15",
          status: "draft",
          slug: "amazon-ppc-strategies-that-work"
        },
        {
          id: "2", 
          title: "Walmart Advertising vs Amazon: Complete Comparison",
          excerpt: "A comprehensive comparison between Walmart and Amazon advertising platforms.",
          content: `<p>When choosing between Walmart and Amazon advertising, understanding the differences is crucial.</p>
<img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800" alt="E-commerce comparison chart" style="width: 100%; margin: 20px 0;">
<p>Let's dive into the complete comparison...</p>`,
          author: "Jane Doe",
          category: "Walmart Advertising",
          tags: ["Walmart", "Amazon", "Comparison"],
          publishDate: "2024-01-20",
          status: "published",
          slug: "walmart-vs-amazon-advertising"
        }
      ];
      
      setBlogPosts(prev => [...prev, ...samplePosts]);
      setIsUploading(false);
    }, 2000);
  };

  const handleGoogleSheetConnect = async () => {
    if (!googleSheetUrl) return;
    
    setIsConnecting(true);
    
    // Simulate Google Sheets connection
    setTimeout(() => {
      const samplePosts: BlogPost[] = [
        {
          id: "gs1",
          title: "Meta Advertising Best Practices for E-commerce",
          excerpt: "Learn how to optimize your Meta ads for maximum ROI in e-commerce.",
          content: `<p>Meta advertising offers incredible opportunities for e-commerce businesses.</p>
<img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800" alt="Social media advertising" style="width: 100%; margin: 20px 0;">
<h2>Best Practices</h2>
<p>Follow these proven practices to maximize your ROI...</p>`,
          author: "Marketing Team",
          category: "Meta Advertising",
          tags: ["Meta", "Facebook", "E-commerce"],
          publishDate: "2024-01-25",
          status: "draft",
          slug: "meta-advertising-best-practices"
        }
      ];
      
      setBlogPosts(prev => [...prev, ...samplePosts]);
      setIsConnecting(false);
    }, 2000);
  };

  const downloadTemplate = () => {
    const templateData = [
      ["Title", "Excerpt", "Content", "Author", "Category", "Tags", "Publish Date", "Status", "Slug"],
      [
        "Sample Blog Post Title",
        "This is a sample excerpt that describes the blog post content briefly.",
        `<p>This is the full content of the blog post with HTML formatting.</p>

<h2>Adding Images to Your Content</h2>
<p>You can include images in your content using HTML img tags:</p>
<img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800" alt="Sample image description" style="width: 100%; margin: 20px 0;">

<p>Or using markdown syntax:</p>
<p>![Alt text](https://your-image-url.com/image.jpg)</p>

<h2>Image Best Practices</h2>
<ul>
<li>Use descriptive alt text for accessibility</li>
<li>Optimize images for web (recommended width: 800px)</li>
<li>Use high-quality stock photos or your own images</li>
<li>Include proper spacing with margins</li>
</ul>

<p>Continue with your blog content here...</p>`,
        "Author Name",
        "Category Name",
        "tag1,tag2,tag3",
        "2024-01-15",
        "draft",
        "sample-blog-post-title"
      ],
      [
        "Another Example Post",
        "Another sample excerpt for demonstration purposes.",
        `<p>More sample content here with detailed information about the topic.</p>

<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" alt="Business analytics dashboard" style="width: 100%; margin: 20px 0;">

<h2>Section with Image</h2>
<p>This section demonstrates how to include images within your blog content. The image above shows a business analytics dashboard.</p>

<p>You can also use smaller images inline: <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200" alt="Small icon" style="width: 50px; height: auto; display: inline; margin: 0 5px;"> like this small icon.</p>`,
        "Another Author",
        "Different Category",
        "example,sample,demo",
        "2024-01-20",
        "published",
        "another-example-post"
      ]
    ];

    // Create CSV content
    const csvContent = templateData.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(",")
    ).join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "blog_template_with_images.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  const toggleStatus = (id: string) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'draft' ? 'published' : 'draft' }
        : post
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Blog Management</h2>
          <p className="text-slate-600 mt-1">Add and manage blog content with inline images</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={downloadTemplate}
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-white/30"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
          <Badge variant="outline" className="px-4 py-2 bg-white/50 backdrop-blur-sm">
            {blogPosts.length} Posts
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Excel Upload</TabsTrigger>
          <TabsTrigger value="sheets">Google Sheets</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
                  <FileSpreadsheet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Upload Excel File</CardTitle>
                  <CardDescription>Upload an Excel file with blog post data and inline images</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="excel-file" className="text-sm font-medium text-slate-700">
                  Excel File (.xlsx, .xls, .csv)
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="excel-file"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="bg-white/50 border-white/30 focus:border-green-500"
                    disabled={isUploading}
                  />
                  <Button 
                    disabled={isUploading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isUploading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="font-medium">Required columns:</div>
                </div>
                <div className="mt-1 text-xs">
                  Title, Excerpt, Content, Author, Category, Tags (comma-separated), Publish Date (YYYY-MM-DD), Status (draft/published), Slug
                </div>
                <div className="mt-2 text-xs font-medium text-blue-700">
                  💡 Download the template above to get started with the correct format including image examples
                </div>
              </div>
              
              {/* New Image Guidelines Card */}
              <div className="text-sm text-slate-600 bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start space-x-2">
                  <Image className="w-4 h-4 mt-0.5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Including Images in Content:</div>
                    <div className="mt-1 text-xs space-y-1">
                      <div>• HTML format: <code className="bg-white px-1 rounded">&lt;img src="url" alt="description" style="width: 100%; margin: 20px 0;"&gt;</code></div>
                      <div>• Markdown format: <code className="bg-white px-1 rounded">![Alt text](image-url)</code></div>
                      <div>• Use descriptive alt text for accessibility</div>
                      <div>• Recommended image width: 800px for main images</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sheets" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg mr-3">
                  <Link className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Connect Google Sheets</CardTitle>
                  <CardDescription>Connect to a Google Sheets document with blog content and images</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sheet-url" className="text-sm font-medium text-slate-700">
                  Google Sheets URL
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="sheet-url"
                    value={googleSheetUrl}
                    onChange={(e) => setGoogleSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="bg-white/50 border-white/30 focus:border-blue-500"
                    disabled={isConnecting}
                  />
                  <Button 
                    onClick={handleGoogleSheetConnect}
                    disabled={!googleSheetUrl || isConnecting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isConnecting ? (
                      <>Connecting...</>
                    ) : (
                      <>
                        <Link className="w-4 h-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                <strong>Note:</strong> Make sure your Google Sheet is publicly accessible and has the same column structure as the template. Download the template to see the required format with image examples.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Blog Posts Table */}
      {blogPosts.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Imported Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-slate-600 truncate max-w-xs">
                          {post.excerpt}
                        </div>
                        {post.content.includes('<img') && (
                          <div className="flex items-center mt-1">
                            <Image className="w-3 h-3 text-green-600 mr-1" />
                            <span className="text-xs text-green-600">Contains images</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={post.status === 'published' ? 'default' : 'secondary'}
                        className={post.status === 'published' ? 'bg-green-600' : ''}
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.publishDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleStatus(post.id)}
                        >
                          {post.status === 'draft' ? 'Publish' : 'Unpublish'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteBlogPost(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogManagement;
