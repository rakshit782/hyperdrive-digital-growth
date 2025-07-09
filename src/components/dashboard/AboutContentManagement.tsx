
import React, { useState } from 'react';
import { useAboutContent, AboutContent } from '@/hooks/useAboutContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, Plus, GripVertical, Eye, EyeOff } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'mission', label: 'Mission' },
  { value: 'vision', label: 'Vision' },
  { value: 'values', label: 'Values' },
  { value: 'team', label: 'Team' },
  { value: 'history', label: 'History' },
  { value: 'achievements', label: 'Achievements' },
  { value: 'custom', label: 'Custom Section' }
];

const AboutContentManagement = () => {
  const { content, loading, createContent, updateContent, deleteContent } = useAboutContent();
  const [editingContent, setEditingContent] = useState<AboutContent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    section_name: '',
    title: '',
    content: '',
    image_url: '',
    sort_order: 0,
    is_active: true
  });

  const handleEdit = (contentItem: AboutContent) => {
    setEditingContent(contentItem);
    setFormData({
      section_name: contentItem.section_name,
      title: contentItem.title || '',
      content: contentItem.content || '',
      image_url: contentItem.image_url || '',
      sort_order: contentItem.sort_order,
      is_active: contentItem.is_active
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingContent(null);
    setFormData({
      section_name: '',
      title: '',
      content: '',
      image_url: '',
      sort_order: content.length + 1,
      is_active: true
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingContent) {
        await updateContent(editingContent.id, formData);
      } else {
        await createContent(formData);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this content section?')) {
      await deleteContent(id);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await updateContent(id, { is_active: !currentStatus });
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(content);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update sort orders
    for (let i = 0; i < items.length; i++) {
      if (items[i].sort_order !== i + 1) {
        await updateContent(items[i].id, { sort_order: i + 1 });
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">About Page Content</h2>
          <p className="text-muted-foreground">Manage sections and content for your About page</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="content-sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {content.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <Card 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`${!item.is_active ? 'opacity-60' : ''}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{item.title || item.section_name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {item.section_name}
                                </Badge>
                                <Badge variant={item.is_active ? "default" : "secondary"} className="text-xs">
                                  {item.is_active ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(item.id, item.is_active)}
                            >
                              {item.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      {item.content && (
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {item.content}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingContent ? 'Edit Content Section' : 'Create Content Section'}
            </DialogTitle>
            <DialogDescription>
              {editingContent ? 'Update the content section details.' : 'Add a new section to your About page.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="section_name">Section Type</Label>
                <Select
                  value={formData.section_name}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, section_name: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTION_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter section title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter section content"
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="Enter image URL (optional)"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingContent ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutContentManagement;
