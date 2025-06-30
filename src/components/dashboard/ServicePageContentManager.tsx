
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, Save, X } from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface ServicePageContentManagerProps {
  serviceType: string;
  onClose: () => void;
}

const ServicePageContentManager = ({ serviceType, onClose }: ServicePageContentManagerProps) => {
  const { toast } = useToast();
  const { data: allCaseStudies = [] } = useSupabaseData('service_case_studies');
  const { data: allReviews = [] } = useSupabaseData('service_reviews');
  
  const [selectedCaseStudies, setSelectedCaseStudies] = useState<string[]>([]);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);

  // Filter case studies and reviews for this service type
  const serviceCaseStudies = allCaseStudies.filter(cs => cs.service_type === serviceType);
  const serviceReviews = allReviews.filter(r => r.service_type === serviceType);

  // Available case studies and reviews from other services
  const availableCaseStudies = allCaseStudies.filter(cs => cs.service_type !== serviceType);
  const availableReviews = allReviews.filter(r => r.service_type !== serviceType);

  useEffect(() => {
    // Load existing selections from localStorage or API
    const savedCaseStudies = localStorage.getItem(`${serviceType}-case-studies`);
    const savedReviews = localStorage.getItem(`${serviceType}-reviews`);
    
    if (savedCaseStudies) {
      setSelectedCaseStudies(JSON.parse(savedCaseStudies));
    }
    if (savedReviews) {
      setSelectedReviews(JSON.parse(savedReviews));
    }
  }, [serviceType]);

  const handleSaveSelections = () => {
    // Save selections to localStorage (in a real app, this would be an API call)
    localStorage.setItem(`${serviceType}-case-studies`, JSON.stringify(selectedCaseStudies));
    localStorage.setItem(`${serviceType}-reviews`, JSON.stringify(selectedReviews));
    
    toast({
      title: "Content Updated",
      description: `Selected case studies and reviews have been saved for ${serviceType}.`
    });
    
    onClose();
  };

  const toggleCaseStudy = (id: string) => {
    setSelectedCaseStudies(prev => 
      prev.includes(id) 
        ? prev.filter(csId => csId !== id)
        : [...prev, id]
    );
  };

  const toggleReview = (id: string) => {
    setSelectedReviews(prev => 
      prev.includes(id) 
        ? prev.filter(rId => rId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold capitalize">
                {serviceType.replace('-', ' ')} - Content Selection
              </h2>
              <p className="text-gray-600">
                Select additional case studies and reviews to display on this service page
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <Tabs defaultValue="case-studies" className="space-y-4">
            <TabsList>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="case-studies" className="space-y-4">
              <div className="grid gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Current {serviceType.replace('-', ' ')} Case Studies ({serviceCaseStudies.length})
                  </h3>
                  <div className="grid gap-2">
                    {serviceCaseStudies.map((caseStudy) => (
                      <div key={caseStudy.id} className="flex items-center justify-between bg-white p-3 rounded border">
                        <div>
                          <h4 className="font-medium">{caseStudy.title}</h4>
                          <p className="text-sm text-gray-600">{caseStudy.client_name} - {caseStudy.industry}</p>
                        </div>
                        <Badge variant="secondary">Current</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">
                    Available Case Studies from Other Services ({availableCaseStudies.length})
                  </h3>
                  <div className="grid gap-3">
                    {availableCaseStudies.map((caseStudy) => (
                      <Card key={caseStudy.id} className={`cursor-pointer transition-all ${
                        selectedCaseStudies.includes(caseStudy.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              checked={selectedCaseStudies.includes(caseStudy.id)}
                              onCheckedChange={() => toggleCaseStudy(caseStudy.id)}
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{caseStudy.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {caseStudy.client_name} - {caseStudy.industry}
                                  </p>
                                  <p className="text-sm text-gray-700 line-clamp-2">
                                    {caseStudy.description}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="capitalize">
                                    {caseStudy.service_type.replace('-', ' ')}
                                  </Badge>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              {caseStudy.results && (
                                <div className="mt-2 text-xs text-green-600">
                                  Results: {Object.entries(caseStudy.results).map(([key, value]) => 
                                    `${key}: ${value}`
                                  ).join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="grid gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">
                    Current {serviceType.replace('-', ' ')} Reviews ({serviceReviews.length})
                  </h3>
                  <div className="grid gap-2">
                    {serviceReviews.map((review) => (
                      <div key={review.id} className="flex items-center justify-between bg-white p-3 rounded border">
                        <div>
                          <h4 className="font-medium">{review.client_name}</h4>
                          <p className="text-sm text-gray-600">{review.company} - {review.rating}/5 stars</p>
                        </div>
                        <Badge variant="secondary">Current</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">
                    Available Reviews from Other Services ({availableReviews.length})
                  </h3>
                  <div className="grid gap-3">
                    {availableReviews.map((review) => (
                      <Card key={review.id} className={`cursor-pointer transition-all ${
                        selectedReviews.includes(review.id) ? 'ring-2 ring-green-500 bg-green-50' : ''
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              checked={selectedReviews.includes(review.id)}
                              onCheckedChange={() => toggleReview(review.id)}
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{review.client_name}</h4>
                                  <p className="text-sm text-gray-600 mb-1">
                                    {review.company} - {review.rating}/5 stars
                                  </p>
                                  <p className="text-sm text-gray-700 line-clamp-3">
                                    "{review.review_text}"
                                  </p>
                                </div>
                                <Badge variant="outline" className="capitalize">
                                  {review.service_type.replace('-', ' ')}
                                </Badge>
                              </div>
                              {review.results_achieved && (
                                <div className="mt-2 text-xs text-blue-600">
                                  Results: {review.results_achieved}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Selected: {selectedCaseStudies.length} case studies, {selectedReviews.length} reviews
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSaveSelections}>
                <Save className="w-4 h-4 mr-2" />
                Save Selections
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePageContentManager;
