
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, MessageSquare, Award } from 'lucide-react';
import ServiceCaseStudiesManagement from './ServiceCaseStudiesManagement';
import ServiceStatsManagement from './ServiceStatsManagement';
import ServiceReviewsManagement from './ServiceReviewsManagement';

const ServicesTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Services Management
        </h2>
        <p className="text-slate-600">
          Manage case studies, statistics, and reviews for your services
        </p>
      </div>

      <Tabs defaultValue="case-studies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="case-studies" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Case Studies
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="case-studies">
          <Card>
            <CardHeader>
              <CardTitle>Case Studies</CardTitle>
              <CardDescription>
                Manage case studies that showcase your service successes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceCaseStudiesManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Service Statistics</CardTitle>
              <CardDescription>
                Manage key statistics and metrics for your services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceStatsManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Service Reviews</CardTitle>
              <CardDescription>
                Manage client reviews and testimonials for your services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceReviewsManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesTab;
