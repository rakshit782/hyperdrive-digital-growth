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

interface PricingPlan {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  billing_period: string | null;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

const PricingManagementTab = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyPlan: Omit<PricingPlan, 'id'> = {
    name: '',
    description: '',
    price: null,
    billing_period: 'monthly',
    features: [],
    is_popular: false,
    is_active: true,
    sort_order: 0
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedPlans = (data || []).map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) 
          ? plan.features.map(feature => String(feature))
          : []
      })) as PricingPlan[];
      
      setPlans(transformedPlans);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pricing plans',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (planData: Omit<PricingPlan, 'id'> | PricingPlan) => {
    try {
      if ('id' in planData) {
        // Update existing plan
        const { error } = await supabase
          .from('pricing_plans')
          .update({
            name: planData.name,
            description: planData.description,
            price: planData.price,
            billing_period: planData.billing_period,
            features: planData.features,
            is_popular: planData.is_popular,
            is_active: planData.is_active,
            sort_order: planData.sort_order
          })
          .eq('id', planData.id);

        if (error) throw error;
        
        setPlans(plans.map(p => p.id === planData.id ? planData : p));
        setEditingPlan(null);
        
        toast({
          title: 'Success',
          description: 'Pricing plan updated successfully'
        });
      } else {
        // Create new plan
        const { data, error } = await supabase
          .from('pricing_plans')
          .insert([{
            ...planData,
            sort_order: plans.length
          }])
          .select()
          .single();

        if (error) throw error;
        
        const newPlan: PricingPlan = {
          ...data,
          features: Array.isArray(data.features) 
            ? data.features.map(feature => String(feature))
            : []
        };
        
        setPlans([...plans, newPlan]);
        setIsCreating(false);
        
        toast({
          title: 'Success',
          description: 'Pricing plan created successfully'
        });
      }
    } catch (error) {
      console.error('Error saving pricing plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to save pricing plan',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pricing_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPlans(plans.filter(p => p.id !== id));
      
      toast({
        title: 'Success',
        description: 'Pricing plan deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete pricing plan',
        variant: 'destructive'
      });
    }
  };

  const PlanEditor = ({ plan, onSave, onCancel }: {
    plan: Omit<PricingPlan, 'id'> | PricingPlan;
    onSave: (plan: Omit<PricingPlan, 'id'> | PricingPlan) => void;
    onCancel: () => void;
  }) => {
    const [editedPlan, setEditedPlan] = useState(plan);
    const [newFeature, setNewFeature] = useState('');

    const addFeature = () => {
      if (newFeature.trim()) {
        setEditedPlan({
          ...editedPlan,
          features: [...editedPlan.features, newFeature.trim()]
        });
        setNewFeature('');
      }
    };

    const removeFeature = (index: number) => {
      setEditedPlan({
        ...editedPlan,
        features: editedPlan.features.filter((_, i) => i !== index)
      });
    };

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{'id' in plan ? 'Edit Plan' : 'Create New Plan'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={editedPlan.name}
                onChange={(e) => setEditedPlan({ ...editedPlan, name: e.target.value })}
                placeholder="e.g., Basic Plan"
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={editedPlan.price || ''}
                onChange={(e) => setEditedPlan({ ...editedPlan, price: Number(e.target.value) || null })}
                placeholder="e.g., 99"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedPlan.description || ''}
              onChange={(e) => setEditedPlan({ ...editedPlan, description: e.target.value })}
              placeholder="Plan description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billing">Billing Period</Label>
              <select
                id="billing"
                value={editedPlan.billing_period || 'monthly'}
                onChange={(e) => setEditedPlan({ ...editedPlan, billing_period: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sort">Sort Order</Label>
              <Input
                id="sort"
                type="number"
                value={editedPlan.sort_order}
                onChange={(e) => setEditedPlan({ ...editedPlan, sort_order: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={editedPlan.is_popular}
                onCheckedChange={(checked) => setEditedPlan({ ...editedPlan, is_popular: checked })}
              />
              <Label>Popular Plan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={editedPlan.is_active}
                onCheckedChange={(checked) => setEditedPlan({ ...editedPlan, is_active: checked })}
              />
              <Label>Active</Label>
            </div>
          </div>

          <div>
            <Label>Features</Label>
            <div className="space-y-2">
              {editedPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="flex-1 p-2 bg-gray-50 rounded">{feature}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add new feature..."
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                />
                <Button onClick={addFeature} variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(editedPlan)}>
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
    return <div>Loading pricing plans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Pricing Management</h2>
          <p className="text-gray-600">Manage your pricing plans</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Plan
        </Button>
      </div>

      {isCreating && (
        <PlanEditor
          plan={emptyPlan}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingPlan && (
        <PlanEditor
          plan={editingPlan}
          onSave={handleSave}
          onCancel={() => setEditingPlan(null)}
        />
      )}

      <div className="grid gap-4">
        {plans.map((plan) => (
          <Card key={plan.id} className={!plan.is_active ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {plan.name}
                    {plan.is_popular && <Badge>Popular</Badge>}
                    {!plan.is_active && <Badge variant="secondary">Inactive</Badge>}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPlan(plan)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(plan.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-semibold">Price: </span>
                  ${plan.price} / {plan.billing_period}
                </div>
                <div>
                  <span className="font-semibold">Sort Order: </span>
                  {plan.sort_order}
                </div>
              </div>
              <div>
                <span className="font-semibold">Features:</span>
                <ul className="list-disc list-inside mt-2">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingManagementTab;
