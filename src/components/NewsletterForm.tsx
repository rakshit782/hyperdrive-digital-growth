
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePostgresFormSubmission } from "@/hooks/usePostgresFormSubmission";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [honeypotValue, setHoneypotValue] = useState("");
  const { toast } = useToast();
  const { submitForm, isSubmitting } = usePostgresFormSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Newsletter form submission started');
    
    // Check honeypot
    if (honeypotValue) {
      console.log('Honeypot triggered, blocking submission');
      return;
    }
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await submitForm({
        name: email.split('@')[0], // Use email prefix as name for newsletter
        email: email,
        source: 'newsletter_form',
        formType: 'newsletter',
        message: 'Newsletter subscription'
      });

      if (result.success) {
        toast({
          title: "Thank you for subscribing!",
          description: "You'll receive our latest updates and insights. Data saved to PostgreSQL.",
        });
        
        setEmail("");
      } else {
        throw new Error(result.error || 'Subscription failed');
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "Please check your connection and try again.",
        variant: "destructive",
      });
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
          <p className="text-sm text-slate-600">Get the latest tips and insights (PostgreSQL)</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Honeypot field - Hidden from users, visible to bots */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
          <Input
            name="website_url"
            value={honeypotValue}
            onChange={(e) => setHoneypotValue(e.target.value)}
            tabIndex={-1}
            autoComplete="nope"
            aria-hidden="true"
          />
        </div>

        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
            disabled={isSubmitting}
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        <p className="text-xs text-slate-500">
          No spam, ever. Unsubscribe anytime. Stored in PostgreSQL.
        </p>
      </form>
    </div>
  );
};

export default NewsletterForm;
