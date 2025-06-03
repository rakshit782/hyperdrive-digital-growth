
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

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
    const savedContact = localStorage.getItem('contactData');
    if (savedContact) {
      try {
        const parsed = JSON.parse(savedContact);
        setContactInfo({ ...defaultContact, ...parsed });
      } catch (error) {
        console.error('Failed to parse contact settings:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('contactData', JSON.stringify(contactInfo));
    window.dispatchEvent(new CustomEvent('contactUpdated', { detail: contactInfo }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Phone className="w-5 h-5 mr-2 text-green-600" />
          <CardTitle>Contact Information</CardTitle>
        </div>
        <CardDescription>Update contact details displayed throughout the website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={contactInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="hello@yourcompany.com"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="address">Business Address</Label>
          <Textarea
            id="address"
            value={contactInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="123 Business Ave, Suite 100, City, State 12345"
            rows={2}
          />
        </div>
        
        <div>
          <Label htmlFor="hours">Business Hours</Label>
          <Input
            id="hours"
            value={contactInfo.hours}
            onChange={(e) => handleInputChange('hours', e.target.value)}
            placeholder="Monday - Friday: 9AM - 6PM EST"
          />
        </div>

        <Button onClick={handleSave} className={`w-full ${isSaved ? "bg-green-600" : ""}`}>
          {isSaved ? "Saved!" : "Save Contact Information"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContactManagement;
