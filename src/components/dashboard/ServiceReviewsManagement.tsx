
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ServiceReview {
  id: string;
  service_type: string;
  client_name: string;
  company: string;
  review_text: string;
  rating: number;
  avatar_url: string | null;
  results_achieved: string | null;
  is_active: boolean;
  sort_order: number;
}

const ServiceReviewsManagement = () => {
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [editingReview, setEditingReview] = useState<ServiceReview | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyReview: Omit<ServiceReview, 'id'> = {
    service_type: '',
    client_name: '',
    company: '',
    review_text: '',
    rating: 5,
    avatar_url: '',
    results_achieved: '',
    is_active: true,
    sort_order: 0
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('service_reviews')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching service reviews:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch service reviews',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (reviewData: Omit<ServiceReview, 'id'> | ServiceReview) => {
    try {
      if ('id' in reviewData) {
        // Update existing review
        const { error } = await supabase
          .from('service_reviews')
          .update({
            service_type: reviewData.service_type,
            client_name: reviewData.client_name,
            company: reviewData.company,
            review_text: reviewData.review_text,
            rating: reviewData.rating,
            avatar_url: reviewData.avatar_url,
            results_achieved: reviewData.results_achieved,
            is_active: reviewData.is_active,
            sort_order: reviewData.sort_order
          })
          .eq('id', reviewData.id);

        if (error) throw error;
        
        setReviews(reviews.map(r => r.id === reviewData.id ? reviewData : r));
        setEditingReview(null);
        
        toast({
          title: 'Success',
          description: 'Review updated successfully'
        });
      } else {
        // Create new review
        const { data, error } = await supabase
          .from('service_reviews')
          .insert([{
            ...reviewData,
            sort_order: reviews.length
          }])
          .select()
          .single();

        if (error) throw error;
        
        setReviews([...reviews, data]);
        setIsCreating(false);
        
        toast({
          title: 'Success',
          description: 'Review created successfully'
        });
      }
    } catch (error) {
      console.error('Error saving service review:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service review',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setReviews(reviews.filter(r => r.id !== id));
      
      toast({
        title: 'Success',
        description: 'Review deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting service review:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete service review',
        variant: 'destructive'
      });
    }
  };

  const ReviewEditor = ({ review, onSave, onCancel }: {
    review: Omit<ServiceReview, 'id'> | ServiceReview;
    onSave: (review: Omit<ServiceReview, 'id'> | ServiceReview) => void;
    onCancel: () => void;
  }) => {
    const [editedReview, setEditedReview] = useState(review);

    const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
      return Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-6 h-6 cursor-pointer ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          onClick={() => onRatingChange(i + 1)}
        />
      ));
    };

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{'id' in review ? 'Edit Review' : 'Create New Review'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service_type">Service Type</Label>
              <select
                id="service_type"
                value={editedReview.service_type}
                onChange={(e) => setEditedReview({ ...editedReview, service_type: e.target.value })}
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
            <div>
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                value={editedReview.client_name}
                onChange={(e) => setEditedReview({ ...editedReview, client_name: e.target.value })}
                placeholder="Client name..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={editedReview.company}
                onChange={(e) => setEditedReview({ ...editedReview, company: e.target.value })}
                placeholder="Company name..."
              />
            </div>
            <div>
              <Label htmlFor="avatar_url">Avatar URL</Label>
              <Input
                id="avatar_url"
                value={editedReview.avatar_url || ''}
                onChange={(e) => setEditedReview({ ...editedReview, avatar_url: e.target.value })}
                placeholder="Avatar image URL..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="review_text">Review Text</Label>
            <Textarea
              id="review_text"
              value={editedReview.review_text}
              onChange={(e) => setEditedReview({ ...editedReview, review_text: e.target.value })}
              placeholder="Review content..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="results_achieved">Results Achieved</Label>
            <Textarea
              id="results_achieved"
              value={editedReview.results_achieved || ''}
              onChange={(e) => setEditedReview({ ...editedReview, results_achieved: e.target.value })}
              placeholder="Results achieved..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Rating</Label>
              <div className="flex space-x-1 mt-2">
                {renderStars(editedReview.rating, (rating) => 
                  setEditedReview({ ...editedReview, rating })
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="sort">Sort Order</Label>
              <Input
                id="sort"
                type="number"
                value={editedReview.sort_order}
                onChange={(e) => setEditedReview({ ...editedReview, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={editedReview.is_active}
                onCheckedChange={(checked) => setEditedReview({ ...editedReview, is_active: checked })}
              />
              <Label>Active</Label>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(editedReview)}>
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
    return <div>Loading service reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Service Reviews Management</h3>
          <p className="text-gray-600">Manage service reviews</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </Button>
      </div>

      {isCreating && (
        <ReviewEditor
          review={emptyReview}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingReview && (
        <ReviewEditor
          review={editingReview}
          onSave={handleSave}
          onCancel={() => setEditingReview(null)}
        />
      )}

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className={!review.is_active ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {review.client_name} - {review.company}
                    {!review.is_active && <Badge variant="secondary">Inactive</Badge>}
                    <Badge variant="outline">{review.service_type}</Badge>
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <CardDescription className="mt-2">{review.review_text}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingReview(review)}
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
              {review.results_achieved && (
                <div className="mb-4">
                  <span className="font-semibold">Results: </span>
                  {review.results_achieved}
                </div>
              )}
              <div className="text-sm text-gray-600">
                Sort Order: {review.sort_order}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceReviewsManagement;
