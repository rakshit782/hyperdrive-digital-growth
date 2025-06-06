
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Plus, Edit, Trash2, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBlogData, BlogPost } from "@/hooks/useBlogData";

const BlogManagement = () => {
  const { blogPosts, addBlogPosts, updateBlogPost, deleteBlogPost } = useBlogData();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    publishDate: "",
    status: "draft" as "draft" | "published",
    slug: ""
  });

  const resetForm = () => {
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      tags: "",
      publishDate: "",
      status: "draft",
      slug: ""
    });
    setShowAddForm(false);
    setEditingPost(null);
  };

  const handleAddPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }

    const slug = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tagsArray = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const postData = {
      title: newPost.title,
      excerpt: newPost.excerpt || newPost.content.substring(0, 150) + "...",
      content: newPost.content,
      author: newPost.author || "Admin",
      category: newPost.category || "General",
      tags: tagsArray,
      publishDate: newPost.publishDate || new Date().toISOString(),
      status: newPost.status,
      slug: slug
    };

    if (editingPost) {
      updateBlogPost(editingPost.id, postData);
      toast({
        title: "Success",
        description: "Blog post updated successfully"
      });
    } else {
      addBlogPosts([postData]);
      toast({
        title: "Success",
        description: "Blog post added successfully"
      });
    }

    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      publishDate: post.publishDate,
      status: post.status,
      slug: post.slug
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    deleteBlogPost(id);
    toast({
      title: "Success",
      description: "Blog post deleted successfully"
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvContent = e.target?.result as string;
      console.log("CSV Content:", csvContent);
      
      try {
        const lines = csvContent.split('\n').filter(line => line.trim());
        console.log("CSV Lines:", lines);
        
        if (lines.length < 2) {
          throw new Error("CSV file must have at least a header row and one data row");
        }

        // Parse header row
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        console.log("Headers:", headers);
        
        // Expected headers mapping
        const headerMap: { [key: string]: string } = {
          'title': 'title',
          'excerpt': 'excerpt', 
          'content': 'content',
          'author': 'author',
          'category': 'category',
          'tags': 'tags',
          'publishdate': 'publishDate',
          'publish_date': 'publishDate',
          'status': 'status',
          'slug': 'slug'
        };

        // Create mapping from CSV headers to our fields
        const fieldMapping: { [key: string]: number } = {};
        headers.forEach((header, index) => {
          const normalizedHeader = header.toLowerCase().replace(/\s+/g, '');
          const mappedField = headerMap[normalizedHeader];
          if (mappedField) {
            fieldMapping[mappedField] = index;
          }
        });

        console.log("Field Mapping:", fieldMapping);

        // Parse data rows
        const posts = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          console.log(`Row ${i} values:`, values);
          
          if (values.length < headers.length) continue;

          const title = values[fieldMapping.title] || `Blog Post ${i}`;
          const content = values[fieldMapping.content] || "No content available";
          
          const post = {
            title,
            excerpt: values[fieldMapping.excerpt] || content.substring(0, 150) + "...",
            content,
            author: values[fieldMapping.author] || "Admin",
            category: values[fieldMapping.category] || "General",
            tags: values[fieldMapping.tags] ? values[fieldMapping.tags].split(';').map(t => t.trim()).filter(t => t) : [],
            publishDate: values[fieldMapping.publishDate] || new Date().toISOString(),
            status: (values[fieldMapping.status]?.toLowerCase() === 'published' ? 'published' : 'draft') as "draft" | "published",
            slug: values[fieldMapping.slug] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          };

          console.log(`Parsed post ${i}:`, post);
          posts.push(post);
        }

        console.log("All parsed posts:", posts);

        if (posts.length === 0) {
          throw new Error("No valid blog posts found in CSV");
        }

        addBlogPosts(posts);
        
        toast({
          title: "Success",
          description: `Successfully imported ${posts.length} blog posts`
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

      } catch (error) {
        console.error("CSV parsing error:", error);
        toast({
          title: "Error",
          description: `Failed to parse CSV: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive"
        });
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">Blog Management</CardTitle>
          <CardDescription>Create, edit, and manage blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Post
            </Button>
            
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">CSV Format Guide:</h4>
            <p className="text-sm text-blue-800 mb-2">Your CSV should include these columns (case insensitive):</p>
            <code className="text-xs text-blue-700 bg-blue-100 p-2 rounded block">
              title,excerpt,content,author,category,tags,publishDate,status,slug
            </code>
            <p className="text-xs text-blue-600 mt-2">
              • Tags should be separated by semicolons (;)<br/>
              • Status should be 'published' or 'draft'<br/>
              • publishDate in ISO format (YYYY-MM-DD)
            </p>
          </div>

          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingPost ? 'Edit Post' : 'Add New Post'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title *</Label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      placeholder="Enter post title"
                    />
                  </div>
                  <div>
                    <Label>Author</Label>
                    <Input
                      value={newPost.author}
                      onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      placeholder="Post category"
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={newPost.status} onValueChange={(value: "draft" | "published") => setNewPost({...newPost, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Excerpt</Label>
                  <Textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    placeholder="Brief description of the post"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label>Content *</Label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Full post content"
                    rows={6}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Tags (comma separated)</Label>
                    <Input
                      value={newPost.tags}
                      onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={newPost.slug}
                      onChange={(e) => setNewPost({...newPost, slug: e.target.value})}
                      placeholder="url-friendly-slug"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddPost} className="bg-blue-600 hover:bg-blue-700">
                    {editingPost ? 'Update Post' : 'Add Post'}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Existing Posts ({blogPosts.length})</h3>
            {blogPosts.length === 0 ? (
              <p className="text-gray-500">No blog posts yet. Add some posts to get started!</p>
            ) : (
              <div className="grid gap-4">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{post.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>By: {post.author}</span>
                            <span>•</span>
                            <span>Category: {post.category}</span>
                            <span>•</span>
                            <span>Status: {post.status}</span>
                            <span>•</span>
                            <span>Date: {new Date(post.publishDate).toLocaleDateString()}</span>
                          </div>
                          {post.tags.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs text-gray-500">Tags: </span>
                              {post.tags.map((tag, index) => (
                                <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;
