
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNewsletterEmails } from "@/hooks/useNewsletterEmails";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [honeypotValue, setHoneypotValue] = useState("");
  const { toast } = useToast();
  const { addEmail } = useNewsletterEmails();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);

    try {
      console.log('Submitting email:', email);
      const result = await addEmail({
        email: email.trim(),
        name: email.split('@')[0],
        source: 'newsletter_form',
        status: 'subscribed',
        tags: ['website_signup']
      });

      if (result.success) {
        console.log('Email submission successful');
        toast({
          title: "Thank you for subscribing!",
          description: "You'll receive our latest updates and insights.",
        });
        
        setEmail("");
      } else {
        console.log('Email submission failed:', result.error);
        throw new Error(result.error || 'Subscription failed');
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg"
              disabled={isSubmitting}
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
                <ArrowRight className="w-4 h-4 sm:hidden" />
              </>
            )}
          </Button>
        </div>
        
        <p className="text-xs text-slate-400 text-center">
          Join 10,000+ marketers getting weekly insights. No spam, unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};

export default NewsletterForm;
