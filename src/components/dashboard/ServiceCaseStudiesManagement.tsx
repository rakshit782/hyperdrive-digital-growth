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

interface CaseStudy {
  id: string;
  service_type: string;
  title: string;
  description: string;
  client_name: string | null;
  industry: string | null;
  image_url: string | null;
  results: Record<string, any>;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

const ServiceCaseStudiesManagement = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyStudy: Omit<CaseStudy, 'id'> = {
    service_type: '',
    title: '',
    description: '',
    client_name: '',
    industry: '',
    image_url: '',
    results: {},
    is_featured: false,
    is_active: true,
    sort_order: 0
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('service_case_studies')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch case studies',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (studyData: Omit<CaseStudy, 'id'> | CaseStudy) => {
    try {
      if ('id' in studyData) {
        // Update existing case study
        const { error } = await supabase
          .from('service_case_studies')
          .update({
            service_type: studyData.service_type,
            title: studyData.title,
            description: studyData.description,
            client_name: studyData.client_name,
            industry: studyData.industry,
            image_url: studyData.image_url,
            results: studyData.results,
            is_featured: studyData.is_featured,
            is_active: studyData.is_active,
            sort_order: studyData.sort_order
          })
          .eq('id', studyData.id);

        if (error) throw error;
        
        setCaseStudies(caseStudies.map(s => s.id === studyData.id ? studyData : s));
        setEditingStudy(null);
        
        toast({
          title: 'Success',
          description: 'Case study updated successfully'
        });
      } else {
        // Create new case study
        const { data, error } = await supabase
          .from('service_case_studies')
          .insert([{
            ...studyData,
            sort_order: caseStudies.length
          }])
          .select()
          .single();

        if (error) throw error;
        
        setCaseStudies([...caseStudies, data]);
        setIsCreating(false);
        
        toast({
          title: 'Success',
          description: 'Case study created successfully'
        });
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: 'Error',
        description: 'Failed to save case study',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCaseStudies(caseStudies.filter(s => s.id !== id));
      
      toast({
        title: 'Success',
        description: 'Case study deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete case study',
        variant: 'destructive'
      });
    }
  };

  const StudyEditor = ({ study, onSave, onCancel }: {
    study: Omit<CaseStudy, 'id'> | CaseStudy;
    onSave: (study: Omit<CaseStudy, 'id'> | CaseStudy) => void;
    onCancel: () => void;
  }) => {
    const [editedStudy, setEditedStudy] = useState(study);
    const [resultsText, setResultsText] = useState(JSON.stringify(study.results, null, 2));

    const handleResultsChange = (value: string) => {
      setResultsText(value);
      try {
        const parsed = JSON.parse(value);
        setEditedStudy({ ...editedStudy, results: parsed });
      } catch (e) {
        // Invalid JSON, keep the text but don't update the object
      }
    };

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{'id' in study ? 'Edit Case Study' : 'Create New Case Study'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedStudy.title}
                onChange={(e) => setEditedStudy({ ...editedStudy, title: e.target.value })}
                placeholder="Case study title..."
              />
            </div>
            <div>
              <Label htmlFor="service_type">Service Type</Label>
              <select
                id="service_type"
                value={editedStudy.service_type}
                onChange={(e) => setEditedStudy({ ...editedStudy, service_type: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select service...</option>
                <option value="amazon-advertising">Amazon Advertising</option>
                <option value="walmart-advertising">Walmart Advertising</option>
                <option value="meta-advertising">Meta Advertising</option>
                <option value="google-advertising">Google Advertising</option>
                <option value="shopify-development">Shopify Development</option>
                <option value="website-development">Website Development</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedStudy.description}
              onChange={(e) => setEditedStudy({ ...editedStudy, description: e.target.value })}
              placeholder="Case study description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                value={editedStudy.client_name || ''}
                onChange={(e) => setEditedStudy({ ...editedStudy, client_name: e.target.value })}
                placeholder="Client name..."
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={editedStudy.industry || ''}
                onChange={(e) => setEditedStudy({ ...editedStudy, industry: e.target.value })}
                placeholder="Industry..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={editedStudy.image_url || ''}
              onChange={(e) => setEditedStudy({ ...editedStudy, image_url: e.target.value })}
              placeholder="Image URL..."
            />
          </div>

          <div>
            <Label htmlFor="results">Results (JSON)</Label>
            <Textarea
              id="results"
              value={resultsText}
              onChange={(e) => handleResultsChange(e.target.value)}
              placeholder='{"metric1": "value1", "metric2": "value2"}'
              rows={4}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sort">Sort Order</Label>
              <Input
                id="sort"
                type="number"
                value={editedStudy.sort_order}
                onChange={(e) => setEditedStudy({ ...editedStudy, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={editedStudy.is_featured}
                onCheckedChange={(checked) => setEditedStudy({ ...editedStudy, is_featured: checked })}
              />
              <Label>Featured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={editedStudy.is_active}
                onCheckedChange={(checked) => setEditedStudy({ ...editedStudy, is_active: checked })}
              />
              <Label>Active</Label>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(editedStudy)}>
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
    return <div>Loading case studies...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Case Studies Management</h3>
          <p className="text-gray-600">Manage service case studies</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Case Study
        </Button>
      </div>

      {isCreating && (
        <StudyEditor
          study={emptyStudy}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingStudy && (
        <StudyEditor
          study={editingStudy}
          onSave={handleSave}
          onCancel={() => setEditingStudy(null)}
        />
      )}

      <div className="grid gap-4">
        {caseStudies.map((study) => (
          <Card key={study.id} className={!study.is_active ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {study.title}
                    {study.is_featured && <Badge>Featured</Badge>}
                    {!study.is_active && <Badge variant="secondary">Inactive</Badge>}
                    <Badge variant="outline">{study.service_type}</Badge>
                  </CardTitle>
                  <CardDescription>{study.description}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingStudy(study)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(study.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-semibold">Client: </span>
                  {study.client_name || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Industry: </span>
                  {study.industry || 'N/A'}
                </div>
              </div>
              <div>
                <span className="font-semibold">Results: </span>
                <pre className="text-sm bg-gray-50 p-2 rounded mt-1">
                  {JSON.stringify(study.results, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceCaseStudiesManagement;
