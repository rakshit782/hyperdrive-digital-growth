
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLogoData } from "@/hooks/useLogoData";

const Footer = () => {
  let logoData;
  try {
    logoData = useLogoData();
  } catch (error) {
    console.error('Error in Footer useLogoData:', error);
    logoData = { text: 'AMZ AD SCOUT', imageUrl: '/logo.png', faviconUrl: '/favicon.ico', size: 70 };
  }

  return (
    <footer className="bg-slate-900 text-white py-16">
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
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/amazon-advertising" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Amazon Advertising
                </Link>
              </li>
              <li>
                <Link to="/google-advertising" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Google Advertising
                </Link>
              </li>
              <li>
                <Link to="/meta-advertising" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Meta Advertising
                </Link>
              </li>
              <li>
                <Link to="/walmart-advertising" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Walmart Advertising
                </Link>
              </li>
              <li>
                <Link to="/website-development" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/shopify-development" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Shopify Development
                </Link>
              </li>
              <li>
                <Link to="/account-management" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Account Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
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
                <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Pricing
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
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm" id="footer-phone">+91-9799411555</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="text-slate-300 text-sm">
                    <div className="font-semibold">USA</div>
                    <div id="footer-address">New York, NY 10001</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="text-slate-300 text-sm">
                    <div className="font-semibold">UK</div>
                    <div>London, United Kingdom</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="text-slate-300 text-sm">
                    <div className="font-semibold">India</div>
                    <div>Mumbai, India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 AMZ AD SCOUT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
