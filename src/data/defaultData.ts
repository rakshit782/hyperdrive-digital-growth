
import { ServiceCard, Review } from "@/types/dashboard";

export const defaultServices: ServiceCard[] = [
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

export const defaultReviews: Review[] = [
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
