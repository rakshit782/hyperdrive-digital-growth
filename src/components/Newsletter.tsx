
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';
import { useNewsletterEmails } from '@/hooks/useNewsletterEmails';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addEmail } = useNewsletterEmails();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    const result = await addEmail({
      email: email.trim(),
      name: email.split('@')[0],
      source: 'newsletter_footer',
      status: 'subscribed',
      tags: ['newsletter_signup']
    });

    if (result.success) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Mail className="w-12 h-12 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with Industry Insights
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest tips, strategies, and case studies delivered to your inbox weekly
          </p>
          
          {isSubmitted ? (
            <div className="flex items-center justify-center space-x-2 text-green-300">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20"
                required
              />
              <Button 
                type="submit"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
