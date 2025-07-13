
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServiceCaseStudies, useServiceStats, useServiceReviews } from '@/hooks/useSupabaseData';
import { 
  Briefcase, 
  Edit, 
  Trash2, 
  Plus,
  RefreshCw,
  Eye,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServicesTab = () => {
  const { toast } = useToast();
  const { caseStudies, loading: casesLoading, deleteCaseStudy, refetch: refetchCases } = useServiceCaseStudies();
  const { stats, loading: statsLoading, deleteStat, refetch: refetchStats } = useServiceStats();
  const { reviews, loading: reviewsLoading, deleteReview, refetch: refetchReviews } = useServiceReviews();

  const handleDeleteCaseStudy = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await deleteCaseStudy(id);
        toast({
          title: "Success",
          description: "Case study deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete case study",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteStat = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this statistic?')) {
      try {
        await deleteStat(id);
        toast({
          title: "Success",
          description: "Statistic deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete statistic",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(id);
        toast({
          title: "Success",
          description: "Review deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete review",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mr-3">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Services Management</CardTitle>
                <CardDescription>Manage case studies, statistics, and reviews</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="cases" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cases">Case Studies</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="cases" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Case Studies</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={refetchCases} size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Case Study
                  </Button>
                </div>
              </div>

              {casesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {caseStudies.length > 0 ? (
                        caseStudies.map((caseStudy) => (
                          <TableRow key={caseStudy.id}>
                            <TableCell className="font-medium">{caseStudy.title}</TableCell>
                            <TableCell>{caseStudy.client_name || 'Anonymous'}</TableCell>
                            <TableCell>{caseStudy.industry || 'N/A'}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {caseStudy.service_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={caseStudy.is_active ? 'default' : 'secondary'}>
                                {caseStudy.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleDeleteCaseStudy(caseStudy.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No case studies found</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Service Statistics</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={refetchStats} size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Statistic
                  </Button>
                </div>
              </div>

              {statsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Label</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.length > 0 ? (
                        stats.map((stat) => (
                          <TableRow key={stat.id}>
                            <TableCell className="font-medium">{stat.stat_label}</TableCell>
                            <TableCell className="text-lg font-bold text-green-600">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {stat.stat_value}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {stat.service_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={stat.is_active ? 'default' : 'secondary'}>
                                {stat.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleDeleteStat(stat.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No statistics found</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Service Reviews</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={refetchReviews} size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>
              </div>

              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <TableRow key={review.id}>
                            <TableCell className="font-medium">{review.client_name}</TableCell>
                            <TableCell>{review.company}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{review.rating}/5</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {review.service_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={review.is_active ? 'default' : 'secondary'}>
                                {review.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleDeleteReview(review.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No reviews found</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesTab;
