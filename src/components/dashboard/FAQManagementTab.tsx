
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, HelpCircle, Eye, EyeOff } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

const FAQManagementTab = () => {
  const { toast } = useToast();
  const [faqs, setFAQs] = useState<FAQItem[]>([]);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', isActive: true });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = () => {
    const savedFAQs = localStorage.getItem('faqData');
    if (savedFAQs) {
      try {
        const parsed = JSON.parse(savedFAQs);
        setFAQs(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Failed to load FAQs:', error);
        setFAQs([]);
      }
    } else {
      // Set default FAQs
      const defaultFAQs = [
        {
          id: "1",
          question: "How quickly can I see results from your advertising campaigns?",
          answer: "Most clients see initial improvements within 2-4 weeks, with significant results typically visible within 60-90 days. However, timelines can vary based on your current account status, competition, and budget.",
          isActive: true
        },
        {
          id: "2",
          question: "What makes your agency different from others?",
          answer: "We specialize exclusively in e-commerce advertising with a data-driven approach. Our team has managed over $50M in ad spend and focuses on profitable growth, not just traffic. We provide transparent reporting and dedicated account management.",
          isActive: true
        },
        {
          id: "3",
          question: "Do you guarantee results?",
          answer: "While we can't guarantee specific numbers due to market variables, we do guarantee our commitment to improving your performance. If you're not satisfied with our service within the first 60 days, we'll work with you to make it right.",
          isActive: true
        }
      ];
      setFAQs(defaultFAQs);
      localStorage.setItem('faqData', JSON.stringify(defaultFAQs));
    }
  };

  const saveFAQs = (updatedFAQs: FAQItem[]) => {
    setFAQs(updatedFAQs);
    localStorage.setItem('faqData', JSON.stringify(updatedFAQs));
    
    // Dispatch custom event to update FAQ component
    window.dispatchEvent(new CustomEvent('faqUpdated', { detail: updatedFAQs }));
    
    toast({
      title: "FAQs Updated",
      description: "Your FAQ changes have been saved successfully."
    });
  };

  const handleAddFAQ = () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both question and answer.",
        variant: "destructive"
      });
      return;
    }

    const faq: FAQItem = {
      id: Date.now().toString(),
      question: newFAQ.question.trim(),
      answer: newFAQ.answer.trim(),
      isActive: newFAQ.isActive
    };

    const updatedFAQs = [...faqs, faq];
    saveFAQs(updatedFAQs);
    setNewFAQ({ question: '', answer: '', isActive: true });
    setIsAddingNew(false);
  };

  const handleEditFAQ = (faq: FAQItem) => {
    setEditingFAQ({ ...faq });
  };

  const handleSaveEdit = () => {
    if (!editingFAQ) return;

    if (!editingFAQ.question.trim() || !editingFAQ.answer.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both question and answer.",
        variant: "destructive"
      });
      return;
    }

    const updatedFAQs = faqs.map(faq => 
      faq.id === editingFAQ.id ? editingFAQ : faq
    );
    saveFAQs(updatedFAQs);
    setEditingFAQ(null);
  };

  const handleDeleteFAQ = (id: string) => {
    const updatedFAQs = faqs.filter(faq => faq.id !== id);
    saveFAQs(updatedFAQs);
  };

  const toggleFAQStatus = (id: string) => {
    const updatedFAQs = faqs.map(faq => 
      faq.id === id ? { ...faq, isActive: !faq.isActive } : faq
    );
    saveFAQs(updatedFAQs);
  };

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
            <div className="flex items-center space-x-2">
              <Switch
                checked={newFAQ.isActive}
                onCheckedChange={(checked) => setNewFAQ({ ...newFAQ, isActive: checked })}
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
          <Card key={faq.id} className={`${!faq.isActive ? 'opacity-60' : ''}`}>
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
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingFAQ.isActive}
                          onCheckedChange={(checked) => setEditingFAQ({ ...editingFAQ, isActive: checked })}
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
                        <Badge variant={faq.isActive ? "default" : "secondary"}>
                          {faq.isActive ? (
                            <><Eye className="w-3 h-3 mr-1" />Active</>
                          ) : (
                            <><EyeOff className="w-3 h-3 mr-1" />Inactive</>
                          )}
                        </Badge>
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
                      onClick={() => toggleFAQStatus(faq.id)}
                    >
                      {faq.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
    </div>
  );
};

export default FAQManagementTab;
