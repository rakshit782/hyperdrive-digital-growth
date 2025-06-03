import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Save, X } from "lucide-react";

interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  bgGradient: string;
  link: string;
}

interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatar?: string;
}

const defaultServices: ServiceCard[] = [
  {
    id: "amazon-advertising",
    icon: "ShoppingCart",
    title: "Amazon Advertising",
    description: "Expert PPC management, keyword optimization, and campaign strategies that maximize your Amazon sales and ROI.",
    features: ["Sponsored Products", "Sponsored Brands", "Keyword Research", "Performance Analytics"],
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    link: "/amazon-advertising"
  },
  {
    id: "walmart-advertising",
    icon: "Store",
    title: "Walmart Advertising",
    description: "Comprehensive Walmart Connect advertising solutions to boost your visibility and sales on the growing marketplace.",
    features: ["Search Ads", "Display Campaigns", "Video Advertising", "Performance Analytics"],
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
    link: "/walmart-advertising"
  },
  {
    id: "meta-advertising",
    icon: "Users",
    title: "Meta Advertising",
    description: "Facebook and Instagram ad campaigns that drive traffic, generate leads, and increase conversions for your business.",
    features: ["Facebook Ads", "Instagram Campaigns", "Audience Targeting", "Creative Optimization"],
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    link: "/meta-advertising"
  },
  {
    id: "account-management",
    icon: "Settings",
    title: "Complete Account Management",
    description: "Full-service account management with dedicated specialists monitoring and optimizing your campaigns 24/7.",
    features: ["24/7 Monitoring", "Performance Reports", "Strategy Optimization", "Dedicated Manager"],
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    link: "/account-management"
  },
  {
    id: "shopify-integration",
    icon: "Link2",
    title: "Shopify Integration",
    description: "Seamless integration of your Shopify store with Amazon and Walmart marketplaces for unified inventory management.",
    features: ["Inventory Sync", "Order Management", "Product Listing", "Multi-channel Setup"],
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-50 to-blue-50",
    link: "/shopify-integration"
  },
  {
    id: "shopify-development",
    icon: "Code",
    title: "Shopify Development",
    description: "Custom Shopify store development and theme customization to create a powerful e-commerce presence.",
    features: ["Custom Themes", "App Integration", "Mobile Optimization", "Speed Enhancement"],
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50",
    link: "/shopify-development"
  }
];

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "E-commerce Store Owner",
    rating: 5,
    review: "AMZ Ad Scout transformed our Amazon business. Our sales increased by 400% in just 3 months!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "Product Manager",
    rating: 5,
    review: "The team's expertise in Amazon advertising is unmatched. They delivered results beyond our expectations.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "Brand Director",
    rating: 5,
    review: "Professional, results-driven, and always available. Our ROAS improved dramatically with their strategies.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "4",
    name: "David Thompson",
    company: "Startup Founder",
    rating: 5,
    review: "From zero to hero on Amazon! Their campaign management and optimization skills are top-notch.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "5",
    name: "Lisa Wang",
    company: "Brand Manager",
    rating: 5,
    review: "Outstanding results! Our conversion rates doubled within the first month of working with them.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "6",
    name: "Robert Miller",
    company: "Online Retailer",
    rating: 5,
    review: "Best investment we made for our business. Their strategic approach to Amazon advertising is phenomenal.",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face"
  }
];

const isValidData = (data: any, type: 'services' | 'reviews'): boolean => {
  if (!Array.isArray(data) || data.length === 0) return false;
  
  if (type === 'services') {
    return data.every(item => 
      item.id && item.title && item.description && Array.isArray(item.features)
    );
  } else {
    return data.every(item => 
      item.id && item.name && item.company && typeof item.rating === 'number'
    );
  }
};

const initializeData = () => {
  console.log("Dashboard: Initializing data...");
  
  // Clear potentially corrupted localStorage
  const savedServices = localStorage.getItem('servicesData');
  const savedReviews = localStorage.getItem('reviewsData');
  
  let servicesData = defaultServices;
  let reviewsData = defaultReviews;
  
  // Validate and load services
  if (savedServices) {
    try {
      const parsedServices = JSON.parse(savedServices);
      if (isValidData(parsedServices, 'services') && parsedServices.length === 6) {
        servicesData = parsedServices;
        console.log("Dashboard: Loaded valid services from localStorage", parsedServices.length);
      } else {
        console.log("Dashboard: Invalid services data, using defaults");
      }
    } catch (error) {
      console.error("Dashboard: Failed to parse services data:", error);
    }
  }
  
  // Validate and load reviews
  if (savedReviews) {
    try {
      const parsedReviews = JSON.parse(savedReviews);
      if (isValidData(parsedReviews, 'reviews') && parsedReviews.length === 6) {
        reviewsData = parsedReviews;
        console.log("Dashboard: Loaded valid reviews from localStorage", parsedReviews.length);
      } else {
        console.log("Dashboard: Invalid reviews data, using defaults");
      }
    } catch (error) {
      console.error("Dashboard: Failed to parse reviews data:", error);
    }
  }
  
  // Force update localStorage with valid data
  localStorage.setItem('servicesData', JSON.stringify(servicesData));
  localStorage.setItem('reviewsData', JSON.stringify(reviewsData));
  
  // Update state
  setServices(servicesData);
  setReviews(reviewsData);
  
  // Dispatch events to notify frontend components
  console.log("Dashboard: Dispatching update events");
  window.dispatchEvent(new CustomEvent('servicesUpdated', { detail: servicesData }));
  window.dispatchEvent(new CustomEvent('reviewsUpdated', { detail: reviewsData }));
  
  console.log("Dashboard: Initialization complete - Services:", servicesData.length, "Reviews:", reviewsData.length);
};

const Dashboard = () => {
  const [services, setServices] = useState<ServiceCard[]>(defaultServices);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'reviews'>('services');

  useEffect(() => {
    initializeData();
  }, []);

  const updateServices = (newServices: ServiceCard[]) => {
    console.log("Dashboard: Updating services", newServices.length);
    setServices(newServices);
    localStorage.setItem('servicesData', JSON.stringify(newServices));
    window.dispatchEvent(new CustomEvent('servicesUpdated', { detail: newServices }));
  };

  const updateReviews = (newReviews: Review[]) => {
    console.log("Dashboard: Updating reviews", newReviews.length);
    setReviews(newReviews);
    localStorage.setItem('reviewsData', JSON.stringify(newReviews));
    window.dispatchEvent(new CustomEvent('reviewsUpdated', { detail: newReviews }));
  };

  const deleteService = (id: string) => {
    const newServices = services.filter(service => service.id !== id);
    updateServices(newServices);
  };

  const deleteReview = (id: string) => {
    const newReviews = reviews.filter(review => review.id !== id);
    updateReviews(newReviews);
  };

  const saveService = (service: ServiceCard) => {
    const newServices = services.map(s => s.id === service.id ? service : s);
    updateServices(newServices);
    setEditingService(null);
  };

  const saveReview = (review: Review) => {
    const newReviews = reviews.map(r => r.id === review.id ? review : r);
    updateReviews(newReviews);
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('services')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'services'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Services ({services.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Manage Services</h2>
              <Button onClick={addNewService}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

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
                          onClick={() => setEditingService(service)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteService(service.id)}
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
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Manage Reviews</h2>
              <Button onClick={addNewReview}>
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
                          onClick={() => setEditingReview(review)}
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
                    <p className="text-sm text-gray-600 mb-2">Rating: {review.rating}/5</p>
                    <p className="text-sm">{review.review}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Service Edit Modal */}
        {editingService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => setEditingService(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingService.title}
                      onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingService.description}
                      onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Features (comma separated)</Label>
                    <Input
                      value={editingService.features.join(', ')}
                      onChange={(e) => setEditingService({
                        ...editingService, 
                        features: e.target.value.split(',').map(f => f.trim())
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label>Link</Label>
                    <Input
                      value={editingService.link}
                      onChange={(e) => setEditingService({...editingService, link: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Icon</Label>
                    <Select value={editingService.icon} onValueChange={(value) => setEditingService({...editingService, icon: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ShoppingCart">Shopping Cart</SelectItem>
                        <SelectItem value="Store">Store</SelectItem>
                        <SelectItem value="Users">Users</SelectItem>
                        <SelectItem value="Settings">Settings</SelectItem>
                        <SelectItem value="Link2">Link</SelectItem>
                        <SelectItem value="Code">Code</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setEditingService(null)}>Cancel</Button>
                  <Button onClick={() => {
                    if (services.find(s => s.id === editingService.id)) {
                      saveService(editingService);
                    } else {
                      updateServices([...services, editingService]);
                      setEditingService(null);
                    }
                  }}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Edit Modal */}
        {editingReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {reviews.find(r => r.id === editingReview.id) ? 'Edit Review' : 'Add New Review'}
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => setEditingReview(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={editingReview.name}
                      onChange={(e) => setEditingReview({...editingReview, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={editingReview.company}
                      onChange={(e) => setEditingReview({...editingReview, company: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Rating</Label>
                    <Select value={editingReview.rating.toString()} onValueChange={(value) => setEditingReview({...editingReview, rating: parseInt(value)})}>
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
                      value={editingReview.review}
                      onChange={(e) => setEditingReview({...editingReview, review: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Avatar URL</Label>
                    <Input
                      value={editingReview.avatar || ''}
                      onChange={(e) => setEditingReview({...editingReview, avatar: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setEditingReview(null)}>Cancel</Button>
                  <Button onClick={() => {
                    if (reviews.find(r => r.id === editingReview.id)) {
                      saveReview(editingReview);
                    } else {
                      updateReviews([...reviews, editingReview]);
                      setEditingReview(null);
                    }
                  }}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
