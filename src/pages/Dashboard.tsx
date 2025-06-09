import { useState } from "react";
import ServicesTab from "@/components/dashboard/ServicesTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import WebsiteTab from "@/components/dashboard/WebsiteTab";
import LogoManagement from "@/components/dashboard/LogoManagement";
import ContactManagement from "@/components/dashboard/ContactManagement";
import HomepageElements from "@/components/dashboard/HomepageElements";
import PricingManagement from "@/components/dashboard/PricingManagement";
import CustomEventsTab from "@/components/dashboard/CustomEventsTab";
import WebsiteSEOTab from "@/components/dashboard/WebsiteSEOTab";
import HeaderCustomizationTab from "@/components/dashboard/HeaderCustomizationTab";
import ServiceEditModal from "@/components/dashboard/ServiceEditModal";
import ReviewEditModal from "@/components/dashboard/ReviewEditModal";
import BlogManagement from "@/components/dashboard/BlogManagement";
import FacebookPixelTab from "@/components/dashboard/FacebookPixelTab";
import ClerkTab from "@/components/dashboard/ClerkTab";
import Auth0Tab from "@/components/dashboard/Auth0Tab";
import GoogleAnalyticsTab from "@/components/dashboard/GoogleAnalyticsTab";
import EmailJSTab from "@/components/dashboard/EmailJSTab";
import FormspreeTab from "@/components/dashboard/FormspreeTab";
import Header from "@/components/Header";
import { useDashboardData } from "@/hooks/useDashboardData";
import { ServiceCard, Review } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { services, reviews, updateServices, updateReviews } = useDashboardData();
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'website' | 'logo' | 'contact' | 'homepage' | 'pricing' | 'blog' | 'custom-events' | 'seo' | 'header' | 'facebook-pixel' | 'clerk' | 'auth0' | 'google-analytics' | 'emailjs' | 'formspree'>('services');

  const deleteService = (id: string) => {
    const newServices = services.filter(service => service.id !== id);
    updateServices(newServices);
  };

  const deleteReview = (id: string) => {
    const newReviews = reviews.filter(review => review.id !== id);
    updateReviews(newReviews);
  };

  const saveService = (service: ServiceCard) => {
    const isNew = !services.find(s => s.id === service.id);
    if (isNew) {
      updateServices([...services, service]);
    } else {
      const newServices = services.map(s => s.id === service.id ? service : s);
      updateServices(newServices);
    }
    setEditingService(null);
  };

  const saveReview = (review: Review) => {
    const isNew = !reviews.find(r => r.id === review.id);
    if (isNew) {
      updateReviews([...reviews, review]);
    } else {
      const newReviews = reviews.map(r => r.id === review.id ? review : r);
      updateReviews(newReviews);
    }
    setEditingReview(null);
  };

  const addNewService = () => {
    const newService: ServiceCard = {
      id: `new-service-${Date.now()}`,
      icon: "ShoppingCart",
      title: "New Service",
      description: "Service description",
      features: ["Feature 1", "Feature 2"],
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-50 to-purple-50",
      link: "/new-service"
    };
    setEditingService(newService);
  };

  const addNewReview = () => {
    const newReview: Review = {
      id: `new-review-${Date.now()}`,
      name: "New Customer",
      company: "Company Name",
      rating: 5,
      review: "Review text",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    setEditingReview(newReview);
  };

  const tabs = [
    { id: 'services', label: 'Services', count: services.length, color: 'bg-blue-500' },
    { id: 'reviews', label: 'Reviews', count: reviews.length, color: 'bg-green-500' },
    { id: 'website', label: 'Website', color: 'bg-purple-500' },
    { id: 'logo', label: 'Logo', color: 'bg-indigo-500' },
    { id: 'contact', label: 'Contact', color: 'bg-orange-500' },
    { id: 'homepage', label: 'Homepage', color: 'bg-pink-500' },
    { id: 'pricing', label: 'Pricing', color: 'bg-cyan-500' },
    { id: 'blog', label: 'Blog', color: 'bg-emerald-500' },
    { id: 'header', label: 'Header Menu', color: 'bg-indigo-600' },
    { id: 'facebook-pixel', label: 'Facebook Pixel', color: 'bg-blue-600' },
    { id: 'clerk', label: 'Clerk Auth', color: 'bg-purple-600' },
    { id: 'auth0', label: 'Auth0', color: 'bg-orange-600' },
    { id: 'google-analytics', label: 'Google Analytics', color: 'bg-green-600' },
    { id: 'emailjs', label: 'EmailJS', color: 'bg-red-600' },
    { id: 'formspree', label: 'Formspree', color: 'bg-teal-600' },
    { id: 'custom-events', label: 'Custom Events', color: 'bg-purple-600' },
    { id: 'seo', label: 'Website SEO', color: 'bg-green-600' },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <div className="max-w-7xl mx-auto p-6">
          {/* Modern Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-slate-600 mt-2">Manage your website content and integrations</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="px-4 py-2 bg-white/50 backdrop-blur-sm">
                  Live Preview Mode
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Modern Tab Navigation */}
          <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <div className="p-4">
              <nav className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`group relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white text-slate-900 shadow-lg scale-105'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${tab.color} ${
                        activeTab === tab.id ? 'scale-100' : 'scale-75 group-hover:scale-100'
                      } transition-transform duration-300`}></div>
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <Badge variant="secondary" className="ml-1 h-5 text-xs">
                          {tab.count}
                        </Badge>
                      )}
                    </div>
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl -z-10"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </Card>

          {/* Tab Content with Enhanced Styling */}
          <div className="space-y-6">
            {activeTab === 'services' && (
              <div className="animate-fade-in">
                <ServicesTab
                  services={services}
                  onEdit={setEditingService}
                  onDelete={deleteService}
                  onAdd={addNewService}
                />
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in">
                <ReviewsTab
                  reviews={reviews}
                  onEdit={setEditingReview}
                  onDelete={deleteReview}
                  onAdd={addNewReview}
                />
              </div>
            )}

            {activeTab === 'website' && (
              <div className="animate-fade-in">
                <WebsiteTab />
              </div>
            )}

            {activeTab === 'logo' && (
              <div className="animate-fade-in">
                <LogoManagement />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="animate-fade-in">
                <ContactManagement />
              </div>
            )}

            {activeTab === 'homepage' && (
              <div className="animate-fade-in">
                <HomepageElements />
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="animate-fade-in">
                <PricingManagement />
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="animate-fade-in">
                <BlogManagement />
              </div>
            )}

            {activeTab === 'header' && (
              <div className="animate-fade-in">
                <HeaderCustomizationTab />
              </div>
            )}

            {activeTab === 'facebook-pixel' && (
              <div className="animate-fade-in">
                <FacebookPixelTab />
              </div>
            )}

            {activeTab === 'clerk' && (
              <div className="animate-fade-in">
                <ClerkTab />
              </div>
            )}

            {activeTab === 'auth0' && (
              <div className="animate-fade-in">
                <Auth0Tab />
              </div>
            )}

            {activeTab === 'google-analytics' && (
              <div className="animate-fade-in">
                <GoogleAnalyticsTab />
              </div>
            )}

            {activeTab === 'emailjs' && (
              <div className="animate-fade-in">
                <EmailJSTab />
              </div>
            )}

            {activeTab === 'formspree' && (
              <div className="animate-fade-in">
                <FormspreeTab />
              </div>
            )}

            {activeTab === 'custom-events' && (
              <div className="animate-fade-in">
                <CustomEventsTab />
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="animate-fade-in">
                <WebsiteSEOTab />
              </div>
            )}
          </div>

          {/* Modals */}
          {editingService && (
            <ServiceEditModal
              service={editingService}
              isNew={!services.find(s => s.id === editingService.id)}
              onSave={saveService}
              onCancel={() => setEditingService(null)}
              onChange={setEditingService}
            />
          )}

          {editingReview && (
            <ReviewEditModal
              review={editingReview}
              isNew={!reviews.find(r => r.id === editingReview.id)}
              onSave={saveReview}
              onCancel={() => setEditingReview(null)}
              onChange={setEditingReview}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
