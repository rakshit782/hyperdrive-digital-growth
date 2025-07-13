
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  is_active: boolean;
  sort_order?: number;
}

const FAQManagementTab = () => {
  const { toast } = useToast();
  const [faqs, setFAQs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', category: 'general', is_active: true });

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFAQs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: "Error",
        description: "Failed to load FAQs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleAddFAQ = async () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both question and answer.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('faqs')
        .insert([{
          question: newFAQ.question.trim(),
          answer: newFAQ.answer.trim(),
          category: newFAQ.category,
          is_active: newFAQ.is_active,
          sort_order: faqs.length
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "FAQ added successfully"
      });

      setNewFAQ({ question: '', answer: '', category: 'general', is_active: true });
      setIsAddingNew(false);
      await fetchFAQs();
    } catch (error) {
      console.error('Error adding FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to add FAQ",
        variant: "destructive"
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingFAQ) return;

    if (!editingFAQ.question.trim() || !editingFAQ.answer.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both question and answer.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('faqs')
        .update({
          question: editingFAQ.question.trim(),
          answer: editingFAQ.answer.trim(),
          category: editingFAQ.category,
          is_active: editingFAQ.is_active
        })
        .eq('id', editingFAQ.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "FAQ updated successfully"
      });

      setEditingFAQ(null);
      await fetchFAQs();
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to update FAQ",
        variant: "destructive"
      });
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "FAQ deleted successfully"
      });

      await fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to delete FAQ",
        variant: "destructive"
      });
    }
  };

  const toggleFAQStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      await fetchFAQs();
    } catch (error) {
      console.error('Error updating FAQ status:', error);
      toast({
        title: "Error",
        description: "Failed to update FAQ status",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">FAQ Management</h2>
          <p className="text-gray-600">Manage frequently asked questions displayed on your homepage</p>
        </div>
        <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      {/* Add New FAQ Form */}
      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Add New FAQ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Question</label>
              <Input
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                placeholder="Enter the question..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Answer</label>
              <Textarea
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                placeholder="Enter the answer..."
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Input
                value={newFAQ.category}
                onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                placeholder="Category (e.g., general, services)"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={newFAQ.is_active}
                onCheckedChange={(checked) => setNewFAQ({ ...newFAQ, is_active: checked })}
              />
              <label className="text-sm font-medium">Active</label>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddFAQ}>
                <Save className="w-4 h-4 mr-2" />
                Save FAQ
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ List */}
      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className={`${!faq.is_active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {editingFAQ?.id === faq.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editingFAQ.question}
                        onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                        placeholder="Question"
                      />
                      <Textarea
                        value={editingFAQ.answer}
                        onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                        placeholder="Answer"
                        rows={4}
                      />
                      <Input
                        value={editingFAQ.category || ''}
                        onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value })}
                        placeholder="Category"
                      />
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingFAQ.is_active}
                          onCheckedChange={(checked) => setEditingFAQ({ ...editingFAQ, is_active: checked })}
                        />
                        <label className="text-sm font-medium">Active</label>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSaveEdit}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingFAQ(null)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        <Badge variant={faq.is_active ? "default" : "secondary"}>
                          {faq.is_active ? (
                            <><Eye className="w-3 h-3 mr-1" />Active</>
                          ) : (
                            <><EyeOff className="w-3 h-3 mr-1" />Inactive</>
                          )}
                        </Badge>
                        {faq.category && (
                          <Badge variant="outline">{faq.category}</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">{faq.answer}</CardDescription>
                    </>
                  )}
                </div>
                {editingFAQ?.id !== faq.id && (
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFAQStatus(faq.id, faq.is_active)}
                    >
                      {faq.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingFAQ({ ...faq })}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteFAQ(faq.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQManagementTab;
