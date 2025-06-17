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
          setPartnerImages(parsed.filter((partner: PartnerImage) => partner.isActive));
          console.log("Footer: Loaded partner images:", parsed.length);
        } catch (error) {
          console.error('Footer: Failed to parse partner images:', error);
        }
      }
    };

    // Initial load
    loadSocialLinks();
    loadContactInfo();
    loadPartnerImages();

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

    window.addEventListener('socialMediaUpdated', handleSocialMediaUpdate);
    window.addEventListener('contactUpdated', handleContactUpdate);
    window.addEventListener('partnerImagesUpdated', handlePartnerImagesUpdate);
    
    return () => {
      window.removeEventListener('socialMediaUpdated', handleSocialMediaUpdate);
      window.removeEventListener('contactUpdated', handleContactUpdate);
      window.removeEventListener('partnerImagesUpdated', handlePartnerImagesUpdate);
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

  return (
    <footer className="bg-slate-900 text-white">
      {/* Partner Images Section */}
      {partnerImages.length > 0 && (
        <div className="border-b border-slate-700">
          <div className="container mx-auto px-6 py-8">
            <h4 className="text-center text-lg font-semibold mb-6 text-white">Trusted Partners</h4>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {partnerImages.map((partner) => (
                <div key={partner.id} className="flex-shrink-0">
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
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
                Your Agency
              </h3>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Driving digital growth through strategic advertising across Amazon, Walmart, Meta, and beyond. 
                Your success is our mission.
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

        {/* Newsletter Signup and Partner Logos Row */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Newsletter Signup */}
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
              <p className="text-slate-300 mb-6">
                Get the latest insights, tips, and strategies delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Authorized Partners Section */}
            {partnerImages.length > 0 && (
              <div className="text-center md:text-right">
                <h4 className="text-xl font-semibold mb-4">Authorized Partners</h4>
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
                  {partnerImages.slice(0, 4).map((partner) => (
                    <div key={partner.id} className="flex-shrink-0">
                      <img
                        src={partner.imageUrl}
                        alt={partner.name}
                        className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 filter grayscale hover:grayscale-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © {currentYear} Your Agency. All rights reserved.
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
