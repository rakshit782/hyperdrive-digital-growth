
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useFormSecurity } from "@/hooks/useFormSecurity";
import { FormSecurityFields } from "@/components/forms/FormSecurityFields";
import { toast } from "sonner";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [honeypotValue, setHoneypotValue] = useState("");
  const { submitForm, isSubmitting } = useFormSubmission();
  const { csrfToken, isRecaptchaLoaded } = useFormSecurity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isRecaptchaLoaded) {
      toast.error("Security verification is loading. Please wait a moment and try again.");
      return;
    }

    try {
      const result = await submitForm({
        email,
        name: email.split('@')[0], // Use email prefix as name for newsletter
        formType: 'newsletter',
        source: 'newsletter_form',
        csrfToken,
        honeypotValue
      });
      
      if (result.success) {
        toast.success("Thank you for subscribing! You'll receive our latest updates.");
        setEmail("");
        setHoneypotValue("");
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Stay Updated</h3>
          <p className="text-sm text-slate-600">Get the latest tips and insights</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormSecurityFields
          csrfToken={csrfToken}
          honeypotValue={honeypotValue}
          onHoneypotChange={setHoneypotValue}
        />
        
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            disabled={isSubmitting || !isRecaptchaLoaded}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        {!isRecaptchaLoaded && (
          <p className="text-xs text-slate-500">Loading security verification...</p>
        )}
      </form>
    </div>
  );
};

export default NewsletterForm;
