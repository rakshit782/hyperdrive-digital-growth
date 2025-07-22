
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useSupabaseReviews, type SupabaseReview } from "@/hooks/useSupabaseReviews";
import { useToast } from "@/hooks/use-toast";

const ReviewsTab = () => {
  const { toast } = useToast();
  const { reviews, loading, error, createReview, updateReview, deleteReview } = useSupabaseReviews();
  const [editingReview, setEditingReview] = useState<SupabaseReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (review: SupabaseReview) => {
    setEditingReview({ ...review });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(id);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const handleAdd = () => {
    const newReview: Partial<SupabaseReview> = {
      name: "",
      company: "",
      rating: 5,
      review: "",
      avatar: "",
      service_type: "",
      sort_order: reviews.length,
      is_active: true
    };
    setEditingReview(newReview as SupabaseReview);
    setIsDialogOpen(true);
  };

  const handleSave = async (reviewData: SupabaseReview) => {
    if (!reviewData.name.trim() || !reviewData.company.trim() || !reviewData.review.trim()) {
      toast({
        title: "Error",
        description: "Please fill in name, company, and review fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (reviewData.id && reviewData.created_at) {
        // Update existing review
        const { id, created_at, updated_at, ...updateData } = reviewData;
        await updateReview(id, updateData);
        toast({
          title: "Success",
          description: "Review updated successfully",
        });
      } else {
        // Create new review
        const { id, created_at, updated_at, ...createData } = reviewData;
        await createReview(createData);
        toast({
          title: "Success", 
          description: "Review created successfully",
        });
      }
      setIsDialogOpen(false);
      setEditingReview(null);
    } catch (error) {
      console.error('Error saving review:', error);
      toast({
        title: "Error",
        description: "Failed to save review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span>Loading reviews...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-600">
        <AlertCircle className="w-8 h-8 mr-2" />
        <span>Error loading reviews: {error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Manage Reviews</h2>
            <p className="text-gray-600">Real-time customizable reviews for homepage ({reviews.filter(r => r.is_active).length} active of {reviews.length} total)</p>
          </div>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </Button>
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-500 text-center mb-4">
              Start by adding your first customer review to build trust with visitors.
            </p>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Review
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <CardDescription>{review.company}</CardDescription>
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
                    onClick={() => handleDelete(review.id)}
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
              <p className="text-sm mb-2 line-clamp-3">{review.review}</p>
              {review.service_type && (
                <p className="text-xs text-gray-500">Service: {review.service_type}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs px-2 py-1 rounded ${review.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {review.is_active ? 'Active' : 'Inactive'}
                </span>
                <span className="text-xs text-gray-500">Order: {review.sort_order}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingReview?.created_at ? 'Edit Review' : 'Add New Review'}
            </DialogTitle>
            <DialogDescription>
              {editingReview?.created_at ? 'Make changes to the review here.' : 'Add a new customer review.'}
            </DialogDescription>
          </DialogHeader>
          {editingReview && (
            <ReviewEditForm 
              review={editingReview} 
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingReview(null);
              }}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ReviewEditFormProps {
  review: SupabaseReview;
  onSave: (review: SupabaseReview) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ReviewEditForm = ({ review, onSave, onCancel, isSubmitting }: ReviewEditFormProps) => {
  const [formData, setFormData] = useState<SupabaseReview>({ ...review });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Customer Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="company">Company *</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          required
        />
      </div>

      <div>
        <Label htmlFor="service_type">Service Type (Optional)</Label>
        <Input
          id="service_type"
          value={formData.service_type || ''}
          onChange={(e) => setFormData({...formData, service_type: e.target.value})}
          placeholder="e.g., Amazon Advertising, Meta Ads"
        />
      </div>
      
      <div>
        <Label htmlFor="rating">Rating *</Label>
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
        <Label htmlFor="review">Review Text *</Label>
        <Textarea
          id="review"
          value={formData.review}
          onChange={(e) => setFormData({...formData, review: e.target.value})}
          required
          rows={4}
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
        <Label htmlFor="is_active">Active (show on website)</Label>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Review
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReviewsTab;
