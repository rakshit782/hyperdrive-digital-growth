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

export function PricingSection() {
  const { plans, loading, savePlan, deletePlan } = usePricingPlans();
  const [editingPlan, setEditingPlan] = useState<Partial<PricingPlan> | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan({
      ...plan,
      features: [...plan.features],
    });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingPlan({
      name: "",
      description: "",
      price: 0,
      billing_period: "monthly",
      features: [""],
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

    const filteredFeatures = (editingPlan.features || []).filter(f => f.trim() !== "");
    
    await savePlan({
      ...editingPlan,
      features: filteredFeatures,
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

  const updateFeature = (index: number, value: string) => {
    if (!editingPlan) return;
    const newFeatures = [...(editingPlan.features || [])];
    newFeatures[index] = value;
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  const addFeature = () => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...(editingPlan.features || []), ""],
    });
  };

  const removeFeature = (index: number) => {
    if (!editingPlan) return;
    const newFeatures = (editingPlan.features || []).filter((_, i) => i !== index);
    setEditingPlan({ ...editingPlan, features: newFeatures });
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
          Manage your pricing plans here. Changes will be reflected on the public pricing page immediately.
        </AlertDescription>
      </Alert>

      {editingPlan && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{isAdding ? "Add New Plan" : "Edit Plan"}</CardTitle>
            <CardDescription>
              {isAdding ? "Create a new pricing plan" : "Update the pricing plan details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Plan Name *</Label>
                <Input
                  id="name"
                  value={editingPlan.name || ""}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, name: e.target.value })
                  }
                  placeholder="e.g., Starter Plan"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={editingPlan.price || 0}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, price: Number(e.target.value) })
                  }
                  placeholder="799"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingPlan.description || ""}
                onChange={(e) =>
                  setEditingPlan({ ...editingPlan, description: e.target.value })
                }
                placeholder="Best for: Small businesses or new sellers..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billing_period">Billing Period</Label>
                <Input
                  id="billing_period"
                  value={editingPlan.billing_period || "monthly"}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, billing_period: e.target.value })
                  }
                  placeholder="monthly"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={editingPlan.sort_order || 0}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, sort_order: Number(e.target.value) })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={editingPlan.is_active}
                      onCheckedChange={(checked) =>
                        setEditingPlan({ ...editingPlan, is_active: checked })
                      }
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_popular"
                      checked={editingPlan.is_popular}
                      onCheckedChange={(checked) =>
                        setEditingPlan({ ...editingPlan, is_popular: checked })
                      }
                    />
                    <Label htmlFor="is_popular">Popular</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Features</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {(editingPlan.features || []).map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Enter feature description"
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

            <div className="flex gap-2 pt-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">
                      ${plan.price.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{plan.billing_period}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sort Order: {plan.sort_order}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Features:</p>
                    <ul className="text-sm space-y-1">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          • {feature}
                        </li>
                      ))}
                      {plan.features.length > 3 && (
                        <li className="text-muted-foreground">
                          + {plan.features.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
