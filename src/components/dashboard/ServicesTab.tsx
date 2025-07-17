import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Edit } from "lucide-react";
import { ServiceCard } from "@/types/dashboard";
import useSupabaseData, { ServiceCaseStudy, ServiceStat, ServiceReview } from "@/hooks/useSupabaseData";
import ServicePagesManagementTab from "./ServicePagesManagementTab";

interface ServicesTabProps {
  services: ServiceCard[];
  onEdit: (service: ServiceCard) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ServicesTab = ({ services, onEdit, onDelete, onAdd }: ServicesTabProps) => {
  const { useServiceCaseStudies, useServiceStats, useServiceReviews } = useSupabaseData();
  const { caseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy } = useServiceCaseStudies();
  const { stats, createStat, updateStat, deleteStat } = useServiceStats();
  const { reviews, createReview, updateReview, deleteReview } = useServiceReviews();

  const [selectedService, setSelectedService] = useState<string>('all');

  const filteredCaseStudies = selectedService === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.service_type === selectedService);

  const filteredStats = selectedService === 'all' 
    ? stats 
    : stats.filter(stat => stat.service_type === selectedService);

  const filteredReviews = selectedService === 'all' 
    ? reviews 
    : reviews.filter(review => review.service_type === selectedService);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Manage Services</h2>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <Tabs defaultValue="service-pages" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="service-pages">Service Pages</TabsTrigger>
          <TabsTrigger value="services">Service Cards</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="service-pages" className="space-y-6">
          <ServicePagesManagementTab />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Features: {service.features.join(', ')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="case-studies" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Service Case Studies</h3>
            <Button onClick={() => console.log('Add case study')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCaseStudies.map((study) => (
              <Card key={study.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{study.title}</CardTitle>
                      <CardDescription>{study.service_type} • {study.industry}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('Edit study', study.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCaseStudy(study.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{study.description}</p>
                  <div className="text-xs text-gray-500">
                    Client: {study.client_name || 'Anonymous'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Service Statistics</h3>
            <Button onClick={() => console.log('Add stat')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredStats.map((stat) => (
              <Card key={stat.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="text-center w-full">
                      <div className="text-2xl font-bold text-blue-600">{stat.stat_value}</div>
                      <CardTitle className="text-sm">{stat.stat_label}</CardTitle>
                      <CardDescription className="text-xs">{stat.service_type}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('Edit stat', stat.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteStat(stat.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {stat.stat_description && (
                  <CardContent>
                    <p className="text-xs text-gray-600">{stat.stat_description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Service Reviews</h3>
            <Button onClick={() => console.log('Add review')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Review
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{review.client_name}</CardTitle>
                      <CardDescription>{review.company} • {review.service_type}</CardDescription>
                      <div className="flex items-center mt-2">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('Edit review', review.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteReview(review.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">"{review.review_text}"</p>
                  {review.results_achieved && (
                    <div className="text-xs text-green-600 font-medium">
                      Results: {review.results_achieved}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesTab;
