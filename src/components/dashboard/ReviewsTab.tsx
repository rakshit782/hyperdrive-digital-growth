
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Save } from "lucide-react";
import { Review } from "@/types/dashboard";
import { useToast } from "@/hooks/use-toast";

interface ReviewsTabProps {
  reviews: Review[];
  updateReviews: (reviews: Review[]) => void;
}

const ReviewsTab = ({ reviews, updateReviews }: ReviewsTabProps) => {
  const { toast } = useToast();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedReviews = reviews.filter(r => r.id !== id);
    updateReviews(updatedReviews);
    toast({
      title: "Review Deleted",
      description: "Review has been removed successfully.",
    });
  };

  const handleAdd = () => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      name: "New Customer",
      company: "Company Name",
      rating: 5,
      review: "Great service!"
    };
    setEditingReview(newReview);
    setIsDialogOpen(true);
  };

  const handleSave = (updatedReview: Review) => {
    if (reviews.find(r => r.id === updatedReview.id)) {
      // Update existing
      const updatedReviews = reviews.map(r => 
        r.id === updatedReview.id ? updatedReview : r
      );
      updateReviews(updatedReviews);
    } else {
      // Add new
      updateReviews([...reviews, updatedReview]);
    }
    setIsDialogOpen(false);
    setEditingReview(null);
    toast({
      title: "Review Saved",
      description: "Review has been saved successfully.",
    });
  };

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
              <p className="text-sm">{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingReview?.id.includes('review-') && editingReview.id.includes(Date.now().toString().slice(-5)) ? 'Add New Review' : 'Edit Review'}</DialogTitle>
            <DialogDescription>
              {editingReview?.id.includes('review-') && editingReview.id.includes(Date.now().toString().slice(-5)) ? 'Add a new customer review.' : 'Make changes to the review here.'}
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
  review: Review;
  onSave: (review: Review) => void;
  onCancel: () => void;
}

const ReviewEditForm = ({ review, onSave, onCancel }: ReviewEditFormProps) => {
  const [formData, setFormData] = useState<Review>(review);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Customer Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
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
        <Label htmlFor="review">Review Text</Label>
        <Textarea
          id="review"
          value={formData.review}
          onChange={(e) => setFormData({...formData, review: e.target.value})}
          required
          rows={4}
        />
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
