
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock, MapPin, Eye, RefreshCw } from "lucide-react";

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

const defaultContact: ContactInfo = {
  phone: "+1 (555) 123-4567",
  email: "hello@amzadscout.com",
  address: "123 Business Ave, Suite 100, City, State 12345",
  hours: "Monday - Friday: 9AM - 6PM EST"
};

const ContactManagement = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContact);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load from website settings first, then fallback to contact data
    const savedWebsiteSettings = localStorage.getItem('websiteSettings');
    const savedContact = localStorage.getItem('contactData');
    
    let contactData = defaultContact;
    
    if (savedWebsiteSettings) {
      try {
        const websiteSettings = JSON.parse(savedWebsiteSettings);
        if (websiteSettings.contactPhone || websiteSettings.contactEmail || 
            websiteSettings.contactAddress || websiteSettings.businessHours) {
          contactData = {
            phone: websiteSettings.contactPhone || defaultContact.phone,
            email: websiteSettings.contactEmail || defaultContact.email,
            address: websiteSettings.contactAddress || defaultContact.address,
            hours: websiteSettings.businessHours || defaultContact.hours
          };
        }
      } catch (error) {
        console.error('Failed to parse website settings:', error);
      }
    }
    
    if (savedContact) {
      try {
        const parsed = JSON.parse(savedContact);
        contactData = { ...contactData, ...parsed };
      } catch (error) {
        console.error('Failed to parse contact settings:', error);
      }
    }
    
    setContactInfo(contactData);

    // Listen for updates from website settings
    const handleContactUpdate = (event: CustomEvent) => {
      console.log('Contact management received update:', event.detail);
      setContactInfo(prev => ({ ...prev, ...event.detail }));
    };

    window.addEventListener('contactUpdated', handleContactUpdate as EventListener);
    
    return () => {
      window.removeEventListener('contactUpdated', handleContactUpdate as EventListener);
    };
  }, []);

  const handleSave = () => {
    // Save to both contact data and website settings for consistency
    localStorage.setItem('contactData', JSON.stringify(contactInfo));
    
    // Update website settings as well
    const savedWebsiteSettings = localStorage.getItem('websiteSettings');
    if (savedWebsiteSettings) {
      try {
        const websiteSettings = JSON.parse(savedWebsiteSettings);
        const updatedSettings = {
          ...websiteSettings,
          contactPhone: contactInfo.phone,
          contactEmail: contactInfo.email,
          contactAddress: contactInfo.address,
          businessHours: contactInfo.hours
        };
        localStorage.setItem('websiteSettings', JSON.stringify(updatedSettings));
      } catch (error) {
        console.error('Failed to update website settings:', error);
      }
    }
    
    window.dispatchEvent(new CustomEvent('contactUpdated', { detail: contactInfo }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setContactInfo(defaultContact);
    localStorage.removeItem('contactData');
    window.dispatchEvent(new CustomEvent('contactUpdated', { detail: defaultContact }));
    setIsSaved(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Settings Panel */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mr-3">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Contact Information</CardTitle>
                <CardDescription>Update contact details displayed throughout the website</CardDescription>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</Label>
              <Input
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="bg-white/50 border-white/30 focus:border-orange-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="hello@yourcompany.com"
                className="bg-white/50 border-white/30 focus:border-orange-500"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-slate-700">Business Address</Label>
            <Textarea
              id="address"
              value={contactInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="123 Business Ave, Suite 100, City, State 12345"
              rows={2}
              className="bg-white/50 border-white/30 focus:border-orange-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hours" className="text-sm font-medium text-slate-700">Business Hours</Label>
            <Input
              id="hours"
              value={contactInfo.hours}
              onChange={(e) => handleInputChange('hours', e.target.value)}
              placeholder="Monday - Friday: 9AM - 6PM EST"
              className="bg-white/50 border-white/30 focus:border-orange-500"
            />
          </div>

          <Button 
            onClick={handleSave} 
            className={`w-full transition-all duration-300 ${
              isSaved 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            } shadow-lg`}
          >
            {isSaved ? "✓ Saved!" : "Save Contact Information"}
          </Button>
        </CardContent>
      </Card>

      {/* Live Preview Panel */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Live Preview</CardTitle>
              <CardDescription>How contact info appears on your website</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Header Contact Info */}
            <div className="bg-slate-900 rounded-xl p-6 text-white">
              <h4 className="font-medium mb-4">Header Contact Bar</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {contactInfo.phone}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {contactInfo.email}
                </div>
              </div>
            </div>

            {/* Contact Section Preview */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-slate-700 mb-4">Contact Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-700">Phone</p>
                      <p className="text-slate-600">{contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-700">Email</p>
                      <p className="text-slate-600">{contactInfo.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-700">Address</p>
                      <p className="text-slate-600">{contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-700">Hours</p>
                      <p className="text-slate-600">{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Preview */}
            <div className="bg-slate-800 rounded-xl p-6 text-white">
              <h4 className="font-medium mb-4">Footer Contact</h4>
              <div className="text-sm space-y-2">
                <p>{contactInfo.email}</p>
                <p>{contactInfo.phone}</p>
                <p className="text-slate-300">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManagement;
