
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useFormSecurity } from '@/hooks/useFormSecurity';
import { FormSecurityFields } from './FormSecurityFields';

interface SecureContactFormProps {
  formType?: 'contact' | 'newsletter' | 'support';
  title?: string;
  description?: string;
  className?: string;
}

export const SecureContactForm: React.FC<SecureContactFormProps> = ({
  formType = 'contact',
  title = "Get in Touch",
  description = "Send us a message and we'll get back to you.",
  className = ""
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { submitForm, isSubmitting } = useFormSubmission();
  const { csrfToken, isRecaptchaLoaded } = useFormSecurity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isRecaptchaLoaded) {
      alert('Security verification is loading. Please wait a moment and try again.');
      return;
    }

    const result = await submitForm({
      ...formData,
      formType,
      source: `${formType}_form`,
      csrfToken,
      honeypotValue
    });

    if (result.success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setHoneypotValue('');
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="text-green-600 text-2xl mb-2">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-700">Thank you for your message. We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormSecurityFields
          csrfToken={csrfToken}
          honeypotValue={honeypotValue}
          onHoneypotChange={setHoneypotValue}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address *
            </label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company
            </label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Message *
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Tell us about your project or inquiry..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !isRecaptchaLoaded}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending Message...
            </div>
          ) : !isRecaptchaLoaded ? (
            'Loading Security Check...'
          ) : (
            'Send Message'
          )}
        </Button>

        <p className="text-xs text-slate-500 text-center">
          This form is protected by reCAPTCHA and our security measures.
        </p>
      </form>
    </div>
  );
};
