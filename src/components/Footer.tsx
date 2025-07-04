
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AMZ AD SCOUT
            </div>
            <p className="text-slate-400 leading-relaxed">
              Expert digital marketing agency specializing in Amazon, Walmart, Meta advertising, 
              and Shopify development. Scale your ecommerce business with proven strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li><a href="/amazon-advertising" className="text-slate-400 hover:text-blue-400 transition-colors">Amazon Advertising</a></li>
              <li><a href="/walmart-advertising" className="text-slate-400 hover:text-blue-400 transition-colors">Walmart Advertising</a></li>
              <li><a href="/meta-advertising" className="text-slate-400 hover:text-blue-400 transition-colors">Meta Advertising</a></li>
              <li><a href="/google-advertising" className="text-slate-400 hover:text-blue-400 transition-colors">Google Advertising</a></li>
              <li><a href="/account-management" className="text-slate-400 hover:text-blue-400 transition-colors">Account Management</a></li>
              <li><a href="/shopify-development" className="text-slate-400 hover:text-blue-400 transition-colors">Shopify Development</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/case-studies" className="text-slate-400 hover:text-blue-400 transition-colors">Case Studies</a></li>
              <li><a href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="/pricing" className="text-slate-400 hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="/dashboard" className="text-slate-400 hover:text-blue-400 transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-slate-400">Email</p>
                  <a href="mailto:hello@amzadscout.com" className="text-white hover:text-blue-400 transition-colors">
                    hello@amzadscout.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-slate-400">Phone</p>
                  <a href="tel:+1234567890" className="text-white hover:text-blue-400 transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-slate-400">Address</p>
                  <p className="text-white">
                    123 Business Ave<br />
                    Suite 100<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2024 AMZ AD SCOUT. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className="text-slate-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-slate-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="/terms-conditions" className="text-slate-400 hover:text-blue-400 transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
