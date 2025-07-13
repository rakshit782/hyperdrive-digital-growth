import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useServiceReviews, ServiceReview } from "@/hooks/useSupabaseData";

const ReviewsTab = () => {
  const { toast } = useToast();
  const { reviews: serviceReviews, loading, createReview, updateReview, deleteReview } = useServiceReviews();
  
  const [editingReview, setEditingReview] = useState<ServiceReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (review: ServiceReview) => {
    setEditingReview(review);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id);
      toast({
        title: "Review Deleted",
        description: "Review has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review.",
        variant: "destructive",
      });
    }
  };

  const handleAdd = () => {
    const newReview: Omit<ServiceReview, 'id' | 'created_at' | 'updated_at'> = {
      service_type: "general",
      client_name: "New Customer",
      company: "Company Name",
      rating: 5,
      review_text: "Great service!",
      avatar_url: null,
      results_achieved: null,
      sort_order: serviceReviews.length,
      is_active: true
    };
    setEditingReview(newReview as ServiceReview);
    setIsDialogOpen(true);
  };

  const handleSave = async (updatedReview: ServiceReview) => {
    try {
      if (serviceReviews.find(r => r.id === updatedReview.id)) {
        // Update existing
        await updateReview(updatedReview.id!, updatedReview);
      } else {
        // Add new
        await createReview(updatedReview);
      }
      setIsDialogOpen(false);
      setEditingReview(null);
      toast({
        title: "Review Saved",
        description: "Review has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save review.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Manage Reviews</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {serviceReviews.map((review) => (
          <Card key={review.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{review.client_name}</CardTitle>
                  <CardDescription>{review.company} • {review.service_type}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(review)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(review.id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm mb-2">"{review.review_text}"</p>
              {review.results_achieved && (
                <p className="text-xs text-green-600 font-medium">Results: {review.results_achieved}</p>
              )}
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Sort Order: {review.sort_order}</span>
                <span className={`px-2 py-1 rounded ${review.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {review.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingReview && serviceReviews.find(r => r.id === editingReview.id) ? 'Edit Review' : 'Add New Review'}
            </DialogTitle>
            <DialogDescription>
              {editingReview && serviceReviews.find(r => r.id === editingReview.id) ? 'Make changes to the review here.' : 'Add a new customer review.'}
            </DialogDescription>
          </DialogHeader>
          {editingReview && (
            <ReviewEditForm 
              review={editingReview} 
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ReviewEditFormProps {
  review: ServiceReview;
  onSave: (review: ServiceReview) => void;
  onCancel: () => void;
}

const ReviewEditForm = ({ review, onSave, onCancel }: ReviewEditFormProps) => {
  const [formData, setFormData] = useState<ServiceReview>(review);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="client_name">Customer Name</Label>
        <Input
          id="client_name"
          value={formData.client_name}
          onChange={(e) => setFormData({...formData, client_name: e.target.value})}
          required
        />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          required
        />
      </div>
      <div>
        <Label htmlFor="service_type">Service Type</Label>
        <Select 
          value={formData.service_type} 
          onValueChange={(value) => setFormData({...formData, service_type: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="amazon">Amazon Advertising</SelectItem>
            <SelectItem value="meta">Meta Advertising</SelectItem>
            <SelectItem value="google">Google Advertising</SelectItem>
            <SelectItem value="walmart">Walmart Advertising</SelectItem>
            <SelectItem value="shopify-development">Shopify Development</SelectItem>
            <SelectItem value="shopify-integration">Shopify Integration</SelectItem>
            <SelectItem value="website-development">Website Development</SelectItem>
            <SelectItem value="account-management">Account Management</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="rating">Rating</Label>
        <Select 
          value={formData.rating.toString()} 
          onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map(rating => (
              <SelectItem key={rating} value={rating.toString()}>
                {rating} Star{rating !== 1 ? 's' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="review_text">Review Text</Label>
        <Textarea
          id="review_text"
          value={formData.review_text}
          onChange={(e) => setFormData({...formData, review_text: e.target.value})}
          required
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="results_achieved">Results Achieved (Optional)</Label>
        <Input
          id="results_achieved"
          value={formData.results_achieved || ''}
          onChange={(e) => setFormData({...formData, results_achieved: e.target.value || null})}
          placeholder="e.g., 300% increase in sales"
        />
      </div>
      <div>
        <Label htmlFor="sort_order">Sort Order</Label>
        <Input
          id="sort_order"
          type="number"
          value={formData.sort_order}
          onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
        />
        <Label htmlFor="is_active">Active (visible on website)</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Save Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewsTab;
