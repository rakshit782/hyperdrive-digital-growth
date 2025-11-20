import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { usePricingPlans, PricingPlan } from "@/hooks/usePricingPlans";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

// Helper types for editing
interface EditingFeature {
  text: string;
  included?: boolean;
}

interface EditingAddon {
  name: string;
  price: number;
}

interface EditingPlan extends Omit<PricingPlan, 'features' | 'addons'> {
  features: EditingFeature[];
  addons: EditingAddon[];
}

export function PricingSection() {
  const { plans, loading, savePlan, deletePlan } = usePricingPlans();
  const [editingPlan, setEditingPlan] = useState<Partial<EditingPlan> | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (plan: PricingPlan) => {
    const editFeatures: EditingFeature[] = (plan.features || []).map(f => 
      typeof f === 'string' ? { text: f, included: true } : f
    );
    const editAddons: EditingAddon[] = plan.addons || [];

    setEditingPlan({
      ...plan,
      features: editFeatures,
      addons: editAddons,
    });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingPlan({
      name: "",
      description: "",
      price: 0,
      billing_period: "monthly",
      features: [{ text: "", included: true }],
      addons: [],
      is_popular: false,
      is_active: true,
      sort_order: plans.length + 1,
    });
    setIsAdding(true);
  };

  const handleSave = async () => {
    if (!editingPlan) return;
    
    if (!editingPlan.name || !editingPlan.price) {
      alert("Please fill in all required fields");
      return;
    }

    const filteredFeatures = (editingPlan.features || [])
      .filter(f => f.text.trim() !== "")
      .map(f => ({ text: f.text, included: f.included }));
    const filteredAddons = (editingPlan.addons || [])
      .filter(a => a.name.trim() !== "");
    
    await savePlan({
      ...editingPlan,
      features: filteredFeatures,
      addons: filteredAddons,
    } as PricingPlan);
    
    setEditingPlan(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this pricing plan?")) {
      await deletePlan(id);
    }
  };

  const updateFeature = (index: number, field: 'text' | 'included', value: string | boolean) => {
    if (!editingPlan) return;
    const newFeatures = [...(editingPlan.features || [])];
    if (field === 'text') {
      newFeatures[index] = { ...newFeatures[index], text: value as string };
    } else {
      newFeatures[index] = { ...newFeatures[index], included: value as boolean };
    }
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  const addFeature = () => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...(editingPlan.features || []), { text: "", included: true }],
    });
  };

  const removeFeature = (index: number) => {
    if (!editingPlan) return;
    const newFeatures = (editingPlan.features || []).filter((_, i) => i !== index);
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  const updateAddon = (index: number, field: 'name' | 'price', value: string | number) => {
    if (!editingPlan) return;
    const newAddons = [...(editingPlan.addons || [])];
    if (field === 'name') {
      newAddons[index] = { ...newAddons[index], name: value as string };
    } else {
      newAddons[index] = { ...newAddons[index], price: value as number };
    }
    setEditingPlan({ ...editingPlan, addons: newAddons });
  };

  const addAddon = () => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      addons: [...(editingPlan.addons || []), { name: "", price: 0 }],
    });
  };

  const removeAddon = (index: number) => {
    if (!editingPlan) return;
    const newAddons = (editingPlan.addons || []).filter((_, i) => i !== index);
    setEditingPlan({ ...editingPlan, addons: newAddons });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-32" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pricing Plans Management</h2>
        {!editingPlan && (
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
        )}
      </div>

      <Alert>
        <AlertDescription>
          Manage pricing plans stored in JSON format (localStorage). Changes are saved locally and can be modified anytime from this dashboard.
        </AlertDescription>
      </Alert>

      {editingPlan && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{isAdding ? "Add New Plan" : "Edit Plan"}</CardTitle>
            <CardDescription>Fill in the details for the pricing plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Plan Name *</Label>
                <Input
                  id="name"
                  value={editingPlan.name || ""}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  placeholder="e.g., Starter, Professional"
                />
              </div>
              <div>
                <Label htmlFor="price">Monthly Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={editingPlan.price || 0}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: parseFloat(e.target.value) })}
                  placeholder="999"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingPlan.description || ""}
                onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                placeholder="Brief description of the plan"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="billing_period">Billing Period</Label>
                <Input
                  id="billing_period"
                  value={editingPlan.billing_period || "monthly"}
                  onChange={(e) => setEditingPlan({ ...editingPlan, billing_period: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={editingPlan.sort_order || 0}
                  onChange={(e) => setEditingPlan({ ...editingPlan, sort_order: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Options</Label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Switch
                      checked={editingPlan.is_popular || false}
                      onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, is_popular: checked })}
                    />
                    <span className="text-sm">Popular</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Switch
                      checked={editingPlan.is_active !== false}
                      onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, is_active: checked })}
                    />
                    <span className="text-sm">Active</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Features</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {(editingPlan.features || []).map((feature, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      value={feature.text}
                      onChange={(e) => updateFeature(index, 'text', e.target.value)}
                      placeholder="Feature description"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Add-ons (Optional)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addAddon}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Add-on
                </Button>
              </div>
              <div className="space-y-2">
                {(editingPlan.addons || []).map((addon, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      value={addon.name}
                      onChange={(e) => updateAddon(index, 'name', e.target.value)}
                      placeholder="Add-on name"
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={addon.price}
                      onChange={(e) => updateAddon(index, 'price', parseFloat(e.target.value))}
                      placeholder="Price"
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAddon(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                Save Plan
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {plans
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {plan.name}
                      {plan.is_popular && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                      {!plan.is_active && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(plan)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(plan.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/ {plan.billing_period}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, idx) => {
                        const featureText = typeof feature === 'string' ? feature : feature.text;
                        return (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {featureText}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {plan.addons && plan.addons.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Add-ons:</h4>
                      <ul className="space-y-1">
                        {plan.addons.map((addon, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {addon.name} (+${addon.price})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
