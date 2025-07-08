
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X } from "lucide-react";
import { Review } from "@/types/dashboard";

interface ReviewEditModalProps {
  review: Review;
  onSave: (review: Review) => void;
  onClose: () => void;
}

const ReviewEditModal = ({ review, onSave, onClose }: ReviewEditModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Edit Review
            </h3>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={review.name}
                onChange={(e) => onSave({...review, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Company</Label>
              <Input
                value={review.company}
                onChange={(e) => onSave({...review, company: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Rating</Label>
              <Select value={review.rating.toString()} onValueChange={(value) => onSave({...review, rating: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Star</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Review</Label>
              <Textarea
                value={review.review}
                onChange={(e) => onSave({...review, review: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Avatar URL</Label>
              <Input
                value={review.avatar || ''}
                onChange={(e) => onSave({...review, avatar: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onSave(review)}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewEditModal;
