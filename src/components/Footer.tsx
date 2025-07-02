
import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  icon: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

interface PartnerImage {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}

interface FooterSettings {
  companyName: string;
  companyDescription: string;
  copyrightText: string;
  newsletterTitle: string;
  newsletterDescription: string;
  partnersTitle: string;
  showPartners: boolean;
  showNewsletter: boolean;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+1 (555) 123-4567",
    email: "hello@amzadscout.com",
    address: "123 Business Ave, Suite 100, City, State 12345",
    hours: "Monday - Friday: 9AM - 6PM EST"
  });
  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);
  const [footerSettings, setFooterSettings] = useState<FooterSettings>({
    companyName: "Your Agency",
    companyDescription: "Driving digital growth through strategic advertising across Amazon, Walmart, Meta, and beyond. Your success is our mission.",
    copyrightText: "Your Agency. All rights reserved.",
    newsletterTitle: "Stay Updated",
    newsletterDescription: "Get the latest insights, tips, and strategies delivered to your inbox.",
    partnersTitle: "Authorized Partners",
    showPartners: true,
    showNewsletter: true,
  });

  // Default partner logos data
  const getDefaultPartners = (): PartnerImage[] => [
    {
      id: "shopify-partner",
      name: "Shopify Partner",
      imageUrl: "https://cdn.shopify.com/assets/images/logos/shopify-bag.svg",
      isActive: true
    },
    {
      id: "meta-partner",
      name: "Meta Business Partner",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      isActive: true
    },
    {
      id: "amazon-partner",
      name: "Amazon Advertising Partner",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      isActive: true
    },
    {
      id: "walmart-partner",
      name: "Walmart Connect Partner", 
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
      isActive: true
    },
    {
      id: "google-ads-partner",
      name: "Google Ads Partner",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      isActive: true
    },
    {
      id: "google-analytics-partner",
      name: "Google Analytics Certified",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      isActive: true
    },
    {
      id: "tiktok-partner",
      name: "TikTok Marketing Partner",
      imageUrl: "https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.svg",
      isActive: true
    },
    {
      id: "klaviyo-partner", 
      name: "Klaviyo Partner",
      imageUrl: "https://www.klaviyo.com/wp-content/uploads/2020/02/klaviyo-logo.svg",
      isActive: true
    }
  ];

  useEffect(() => {
    console.log("Footer: Component mounted, loading data...");
    
    const loadSocialLinks = () => {
      const savedLinks = localStorage.getItem('socialMediaLinks');
      if (savedLinks) {
        try {
          const parsed = JSON.parse(savedLinks);
          setSocialLinks(parsed.filter((link: SocialMediaLink) => link.isActive));
          console.log("Footer: Loaded social links:", parsed.length);
        } catch (error) {
          console.error('Footer: Failed to parse social media links:', error);
          // Fallback to default links
          setSocialLinks([
            { id: "facebook", platform: "Facebook", url: "#", isActive: true, icon: "Facebook" },
            { id: "instagram", platform: "Instagram", url: "#", isActive: true, icon: "Instagram" },
            { id: "linkedin", platform: "LinkedIn", url: "#", isActive: true, icon: "Linkedin" },
            { id: "twitter", platform: "Twitter", url: "#", isActive: true, icon: "Twitter" },
            { id: "youtube", platform: "YouTube", url: "#", isActive: true, icon: "Youtube" }
          ]);
        }
      }
    };

    const loadContactInfo = () => {
      const savedContact = localStorage.getItem('contactData');
      if (savedContact) {
        try {
          const parsed = JSON.parse(savedContact);
          setContactInfo(prev => ({ ...prev, ...parsed }));
          console.log("Footer: Loaded contact info:", parsed);
        } catch (error) {
          console.error('Footer: Failed to parse contact info:', error);
        }
      }
    };

    const loadPartnerImages = () => {
      const savedPartners = localStorage.getItem('partnerImages');
      if (savedPartners) {
        try {
          const parsed = JSON.parse(savedPartners);
          setPartnerImages(parsed);
          console.log("Footer: Loaded partner images:", parsed.length);
        } catch (error) {
          console.error('Footer: Failed to parse partner images:', error);
          // Set default partners on error
          const defaultPartners = getDefaultPartners();
          setPartnerImages(defaultPartners);
          localStorage.setItem('partnerImages', JSON.stringify(defaultPartners));
        }
      } else {
        // Set default partner logos if none exist
        const defaultPartners = getDefaultPartners();
        setPartnerImages(defaultPartners);
        localStorage.setItem('partnerImages', JSON.stringify(defaultPartners));
        console.log("Footer: Set default partner images:", defaultPartners.length);
      }
    };

    const loadFooterSettings = () => {
      const savedSettings = localStorage.getItem('footerSettings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setFooterSettings(prev => ({ ...prev, ...parsed }));
          console.log("Footer: Loaded footer settings:", parsed);
        } catch (error) {
          console.error('Footer: Failed to parse footer settings:', error);
        }
      }
    };

    // Initial load
    loadSocialLinks();
    loadContactInfo();
    loadPartnerImages();
    loadFooterSettings();

    // Listen for updates
    const handleSocialMediaUpdate = () => {
      console.log("Footer: Received social media update");
      loadSocialLinks();
    };

    const handleContactUpdate = () => {
      console.log("Footer: Received contact update");
      loadContactInfo();
    };

    const handlePartnerImagesUpdate = () => {
      console.log("Footer: Received partner images update");
      loadPartnerImages();
    };

    const handleFooterSettingsUpdate = () => {
      console.log("Footer: Received footer settings update");
      loadFooterSettings();
    };

    window.addEventListener('socialMediaUpdated', handleSocialMediaUpdate);
    window.addEventListener('contactUpdated', handleContactUpdate);
    window.addEventListener('partnerImagesUpdated', handlePartnerImagesUpdate);
    window.addEventListener('footerSettingsUpdated', handleFooterSettingsUpdate);
    
    return () => {
      window.removeEventListener('socialMediaUpdated', handleSocialMediaUpdate);
      window.removeEventListener('contactUpdated', handleContactUpdate);
      window.removeEventListener('partnerImagesUpdated', handlePartnerImagesUpdate);
      window.removeEventListener('footerSettingsUpdated', handleFooterSettingsUpdate);
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Facebook": return Facebook;
      case "Instagram": return Instagram;
      case "Linkedin": return Linkedin;
      case "Twitter": return Twitter;
      case "Youtube": return Youtube;
      default: return Share2;
    }
  };

  const services = [
    { name: "Amazon Advertising", href: "/amazon-advertising" },
    { name: "Walmart Advertising", href: "/walmart-advertising" },
    { name: "Meta Advertising", href: "/meta-advertising" },
    { name: "Account Management", href: "/account-management" },
    { name: "Shopify Integration", href: "/shopify-integration" },
    { name: "Shopify Development", href: "/shopify-development" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const resources = [
    { name: "Free Audit", href: "/free-audit" },
    { name: "Pricing", href: "/pricing" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
  ];

  // Filter active partners for display
  const activePartners = partnerImages.filter(partner => partner.isActive);

  return (
    <footer className="bg-slate-900 text-white">
      {/* Partner Images Section */}
      {footerSettings.showPartners && activePartners.length > 0 && (
        <div className="border-b border-slate-700">
          <div className="container mx-auto px-6 py-8">
            <h4 className="text-center text-lg font-semibold mb-6 text-white">{footerSettings.partnersTitle}</h4>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {activePartners.map((partner) => (
                <div key={partner.id} className="flex-shrink-0">
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200 bg-white/10 rounded p-2"
                    onError={(e) => {
                      console.error(`Failed to load partner image: ${partner.name}`, e);
                      // Fallback to a placeholder
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyNEg4MFYzNkg0MFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                      e.currentTarget.alt = `${partner.name} - Logo unavailable`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {footerSettings.companyName}
              </h3>
              <p className="text-slate-300 mt-4 leading-relaxed">
                {footerSettings.companyDescription}
              </p>
            </div>
            
            {/* Dynamic Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        {footerSettings.showNewsletter && (
          <div className="mt-16 pt-8 border-t border-slate-700">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">{footerSettings.newsletterTitle}</h4>
              <p className="text-slate-300 mb-6">
                {footerSettings.newsletterDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © {currentYear} {footerSettings.copyrightText}
            </div>

            {/* Dynamic Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = getIcon(social.icon);
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                    aria-label={social.platform}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-slate-400 mt-4 md:mt-0">
              <a href="/privacy-policy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
