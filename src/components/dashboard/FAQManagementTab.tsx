
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, HelpCircle, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useSupabaseFAQs, FAQ } from '@/hooks/useSupabaseFAQs';

const FAQManagementTab = () => {
  const { toast } = useToast();
  const { faqs, loading, error, createFAQ, updateFAQ, deleteFAQ } = useSupabaseFAQs();
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', category: '', is_active: true, sort_order: 0 });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span>Loading FAQs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-600">
        <AlertCircle className="w-8 h-8 mr-2" />
        <span>Error loading FAQs: {error}</span>
      </div>
    );
  }

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
      await createFAQ({
        question: newFAQ.question.trim(),
        answer: newFAQ.answer.trim(),
        category: newFAQ.category || null,
        is_active: newFAQ.is_active,
        sort_order: faqs.length
      });
      
      setNewFAQ({ question: '', answer: '', category: '', is_active: true, sort_order: 0 });
      setIsAddingNew(false);
    } catch (error) {
      console.error('Error creating FAQ:', error);
    }
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQ({ ...faq });
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
      await updateFAQ(editingFAQ.id, {
        question: editingFAQ.question.trim(),
        answer: editingFAQ.answer.trim(),
        category: editingFAQ.category,
        is_active: editingFAQ.is_active,
        sort_order: editingFAQ.sort_order
      });
      setEditingFAQ(null);
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteFAQ(id);
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  const toggleFAQStatus = async (faq: FAQ) => {
    try {
      await updateFAQ(faq.id, { is_active: !faq.is_active });
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">FAQ Management</h2>
          <p className="text-gray-600">Manage frequently asked questions displayed on your homepage ({faqs.length} total)</p>
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
              <label className="block text-sm font-medium mb-2">Category (Optional)</label>
              <Input
                value={newFAQ.category}
                onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                placeholder="Enter category..."
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
                        placeholder="Category (optional)"
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
                      onClick={() => toggleFAQStatus(faq)}
                    >
                      {faq.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditFAQ(faq)}
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

      {faqs.length === 0 && !isAddingNew && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <HelpCircle className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs yet</h3>
            <p className="text-gray-500 text-center mb-4">
              Start by adding your first frequently asked question to help your visitors.
            </p>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First FAQ
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FAQManagementTab;
