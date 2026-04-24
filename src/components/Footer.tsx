import { Link } from "react-router-dom";
import { Mail, MapPin, Linkedin } from "lucide-react";
import { useLogoData } from "@/hooks/useLogoData";
import PlatformLogos from "./PlatformLogos";

const Footer = () => {
  let logoData;
  try {
    logoData = useLogoData();
  } catch (error) {
    console.error('Error in Footer useLogoData:', error);
    logoData = { text: 'AMZ AD SCOUT', imageUrl: '/logo.png', faviconUrl: '/favicon.ico', size: 70 };
  }

  return (
    <footer className="bg-slate-900 text-white">
      {/* Platform Logos Section */}
      <PlatformLogos />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              {logoData.imageUrl ? (
                <img 
                  src={logoData.imageUrl} 
                  alt={logoData.text}
                  style={{ height: '70px' }}
                  className="w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="text-xl font-bold">{logoData.text}</span>
              )}
              <p className="text-slate-300 text-sm leading-relaxed">
                The Growth Agency specializing in Amazon advertising, digital marketing, and e-commerce solutions.
              </p>
              
              {/* E-commerce Expertise Badge */}
              <div className="space-y-2 pt-4">
                <p className="text-sm text-slate-400 font-medium">E-commerce Growth Specialists</p>
                <p className="text-xs text-slate-500">Helping brands advertise on major marketplaces</p>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/amazon-advertising" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Amazon Advertising
                  </Link>
                </li>
                <li>
                  <Link to="/services/google-advertising" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Google Advertising
                  </Link>
                </li>
                <li>
                  <Link to="/services/meta-advertising" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Meta Advertising
                  </Link>
                </li>
                <li>
                  <Link to="/services/walmart-advertising" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Walmart Advertising
                  </Link>
                </li>
                <li>
                  <Link to="/services/website-development" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Website Development
                  </Link>
                </li>
                <li>
                  <Link to="/services/shopify-development" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Shopify Development
                  </Link>
                </li>
                <li>
                  <Link to="/services/account-management" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Account Management
                  </Link>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Useful Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-slate-300 hover:text-white transition-colors text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div id="footer-contact" className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300 text-sm" id="footer-email">info@amzadscout.com</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="text-slate-300 text-sm" id="footer-address">
                      New York, NY 10001
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="text-slate-300 text-sm">
                      London, United Kingdom
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="text-slate-300 text-sm">
                      Gurgaon, India
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                <a href="https://www.linkedin.com/company/amz-adscout/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center space-y-2">
            <p className="text-slate-400 text-sm">
              © 2025 AMZ AD SCOUT. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs">
              We are not affiliated with or endorsed by Amazon.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
