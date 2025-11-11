import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { usePricingPlans, PricingPlan } from '@/hooks/usePricingPlans';

export function PricingSection() {
  const { plans, loading, savePlan, deletePlan } = usePricingPlans();
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingPlan({
      name: '',
      description: '',
      price: 0,
      billing_period: 'monthly',
      features: [''],
      is_popular: false,
      is_active: true,
      sort_order: plans.length,
    });
    setIsAdding(true);
  };

  const handleSave = async () => {
    if (editingPlan) {
      await savePlan(editingPlan);
      setEditingPlan(null);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setIsAdding(false);
  };

  const updateFeature = (index: number, value: string) => {
    if (editingPlan) {
      const newFeatures = [...editingPlan.features];
      newFeatures[index] = value;
      setEditingPlan({ ...editingPlan, features: newFeatures });
    }
  };

  const addFeature = () => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, ''],
      });
    }
  };

  const removeFeature = (index: number) => {
    if (editingPlan && editingPlan.features.length > 1) {
      const newFeatures = editingPlan.features.filter((_, i) => i !== index);
      setEditingPlan({ ...editingPlan, features: newFeatures });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Pricing Management</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Plan
        </Button>
      </div>

      {editingPlan && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? 'Add New Plan' : 'Edit Plan'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={editingPlan.name}
                onChange={(e) =>
                  setEditingPlan({ ...editingPlan, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editingPlan.description || ''}
                onChange={(e) =>
                  setEditingPlan({ ...editingPlan, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={editingPlan.price}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      price: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="billing">Billing Period</Label>
                <Input
                  id="billing"
                  value={editingPlan.billing_period}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      billing_period: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Features</Label>
              {editingPlan.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Feature description"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addFeature}
                className="mt-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Feature
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={editingPlan.is_popular}
                  onCheckedChange={(checked) =>
                    setEditingPlan({ ...editingPlan, is_popular: checked })
                  }
                />
                <Label htmlFor="popular">Mark as Popular</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={editingPlan.is_active}
                  onCheckedChange={(checked) =>
                    setEditingPlan({ ...editingPlan, is_active: checked })
                  }
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>Save Plan</Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.is_popular && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-1 inline-block">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(plan)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => plan.id && deletePlan(plan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                ${plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /{plan.billing_period}
                </span>
              </div>
              {plan.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
              )}
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-xs text-muted-foreground">
                Status: {plan.is_active ? 'Active' : 'Inactive'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
