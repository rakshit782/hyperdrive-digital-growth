
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  is_active: boolean;
  sort_order: number;
}

const FAQManagementTab = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyFaq: Omit<FAQ, 'id'> = {
    question: '',
    answer: '',
    category: 'general',
    is_active: true,
    sort_order: 0
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch FAQs',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (faqData: Omit<FAQ, 'id'> | FAQ) => {
    try {
      if ('id' in faqData) {
        // Update existing FAQ
        const { error } = await supabase
          .from('faqs')
          .update({
            question: faqData.question,
            answer: faqData.answer,
            category: faqData.category,
            is_active: faqData.is_active,
            sort_order: faqData.sort_order
          })
          .eq('id', faqData.id);

        if (error) throw error;
        
        setFaqs(faqs.map(f => f.id === faqData.id ? faqData : f));
        setEditingFaq(null);
        
        toast({
          title: 'Success',
          description: 'FAQ updated successfully'
        });
      } else {
        // Create new FAQ
        const { data, error } = await supabase
          .from('faqs')
          .insert([{
            ...faqData,
            sort_order: faqs.length
          }])
          .select()
          .single();

        if (error) throw error;
        
        setFaqs([...faqs, data]);
        setIsCreating(false);
        
        toast({
          title: 'Success',
          description: 'FAQ created successfully'
        });
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: 'Error',
        description: 'Failed to save FAQ',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setFaqs(faqs.filter(f => f.id !== id));
      
      toast({
        title: 'Success',
        description: 'FAQ deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete FAQ',
        variant: 'destructive'
      });
    }
  };

  const FaqEditor = ({ faq, onSave, onCancel }: {
    faq: Omit<FAQ, 'id'> | FAQ;
    onSave: (faq: Omit<FAQ, 'id'> | FAQ) => void;
    onCancel: () => void;
  }) => {
    const [editedFaq, setEditedFaq] = useState(faq);

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{'id' in faq ? 'Edit FAQ' : 'Create New FAQ'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={editedFaq.question}
              onChange={(e) => setEditedFaq({ ...editedFaq, question: e.target.value })}
              placeholder="Enter the question..."
            />
          </div>

          <div>
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              value={editedFaq.answer}
              onChange={(e) => setEditedFaq({ ...editedFaq, answer: e.target.value })}
              placeholder="Enter the answer..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={editedFaq.category || 'general'}
                onChange={(e) => setEditedFaq({ ...editedFaq, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="general">General</option>
                <option value="pricing">Pricing</option>
                <option value="services">Services</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sort">Sort Order</Label>
              <Input
                id="sort"
                type="number"
                value={editedFaq.sort_order}
                onChange={(e) => setEditedFaq({ ...editedFaq, sort_order: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={editedFaq.is_active}
              onCheckedChange={(checked) => setEditedFaq({ ...editedFaq, is_active: checked })}
            />
            <Label>Active</Label>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(editedFaq)}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div>Loading FAQs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">FAQ Management</h2>
          <p className="text-gray-600">Manage your frequently asked questions</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New FAQ
        </Button>
      </div>

      {isCreating && (
        <FaqEditor
          faq={emptyFaq}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingFaq && (
        <FaqEditor
          faq={editingFaq}
          onSave={handleSave}
          onCancel={() => setEditingFaq(null)}
        />
      )}

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className={!faq.is_active ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {faq.question}
                    {faq.category && <Badge variant="outline">{faq.category}</Badge>}
                    {!faq.is_active && <Badge variant="secondary">Inactive</Badge>}
                  </CardTitle>
                  <CardDescription className="mt-2">{faq.answer}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingFaq(faq)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(faq.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                Sort Order: {faq.sort_order}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQManagementTab;
