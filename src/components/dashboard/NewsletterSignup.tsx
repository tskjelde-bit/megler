import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  formId?: string;
  className?: string;
  variant?: 'minimal' | 'full'
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  formId = '6638067', // Placeholder formId
  className,
  variant = 'full'
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to ConvertKit
    // In a real app, this would be:
    // const response = await fetch(`https://app.convertkit.com/forms/${formId}/subscriptions`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email_address: email })
    // });
    
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast.success('Check your inbox!', {
        description: 'We sent a confirmation email to your address.',
        duration: 5000,
      });
    }, 1200);
  };

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={cn("flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg mx-auto", className)}>
        <div className="relative flex-grow w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded bg-black flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">M</span>
          </div>
          <input 
            type="email" 
            placeholder="din@e-post.no" 
            className="w-full h-12 bg-gray-100 border border-transparent focus:bg-white focus:border-black transition-all rounded-xl px-12 text-black text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          size="lg" 
          className="h-12 px-8 rounded-xl bg-black text-white hover:bg-gray-800 transition-all w-full sm:w-auto shrink-0 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Sender...' : 'Meld meg på'}
        </Button>
      </form>
    );
  }

  return (
    <div className={cn("py-12 px-6 bg-white text-black", className)}>
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-h2 font-bold tracking-tight text-black">
            Hold deg oppdatert på markedet!
          </h2>
          <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
            Motta min månedlige oppdatering på boligmarkedet i Oslo. Faglig og ærlig om fortid, nåtid og fremtid.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
          <div className="relative flex-grow w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded bg-black flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">M</span>
            </div>
            <input 
              type="email" 
              placeholder="din@e-post.no" 
              className="w-full h-12 bg-gray-100 border border-transparent focus:bg-white focus:border-black transition-all rounded-xl px-12 text-black text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            className="h-12 px-8 rounded-xl bg-black text-white hover:bg-gray-800 transition-all w-full sm:w-auto shrink-0 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Sender...' : 'Meld meg på'}
          </Button>
        </form>
      </div>
    </div>
  );
};
