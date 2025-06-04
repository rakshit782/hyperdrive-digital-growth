
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, Link, Eye, Trash2, Plus } from "lucide-react";
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
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
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
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
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
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
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
          <p className="text-slate-600 mt-1">Add and manage blog content in bulk</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 bg-white/50 backdrop-blur-sm">
          {blogPosts.length} Posts
        </Badge>
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
                  <CardDescription>Upload an Excel file with blog post data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="excel-file" className="text-sm font-medium text-slate-700">
                  Excel File (.xlsx, .xls)
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="excel-file"
                    type="file"
                    accept=".xlsx,.xls"
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
                <strong>Required columns:</strong> Title, Excerpt, Content, Author, Category, Tags, Publish Date, Status, Slug
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
                  <CardDescription>Connect to a Google Sheets document with blog content</CardDescription>
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
                <strong>Note:</strong> Make sure your Google Sheet is publicly accessible and has the same column structure as the Excel template.
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
