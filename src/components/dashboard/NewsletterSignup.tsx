import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  formId?: string;
  className?: string;
  variant?: 'minimal' | 'full';
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
      <form onSubmit={handleSubmit} className={cn("flex items-center gap-2", className)}>
        <Input 
          type="email" 
          placeholder="your@email.com" 
          className="bg-background/50 border-border/40 focus:border-primary/50 transition-all rounded-full h-10 px-6 text-sm flex-grow"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" size="icon" className="h-10 w-10 rounded-full bg-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all" disabled={isLoading}>
          <ArrowRight className={cn("w-4 h-4 transition-transform", isLoading && "animate-pulse")} />
        </Button>
      </form>
    );
  }

  return (
    <div className={cn("bg-gradient-to-br from-primary/10 via-card to-background border border-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl shadow-primary/5", className)}>
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-colors" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/30 transition-colors" />
      
      <div className="relative z-10 space-y-8 max-w-lg mx-auto text-center">
        <div className="bg-primary/15 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-primary/10 border border-primary/20">
          <Zap className="w-10 h-10 text-primary animate-pulse" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            Nexus Insider
          </h2>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            Get exclusive SaaS growth strategies, AI trends, and design secrets delivered to your inbox every Tuesday.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-grow w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input 
              type="email" 
              placeholder="you@company.com" 
              className="w-full h-14 bg-background/50 border border-border/40 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all rounded-2xl px-12 text-base font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto shrink-0"
            disabled={isLoading}
          >
            {isLoading ? 'Joining...' : 'Subscribe Free'}
          </Button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Zero Spam
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
            <Zap className="w-4 h-4 text-primary" />
            Instant Access
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
            <Mail className="w-4 h-4 text-primary" />
            Weekly Updates
          </div>
        </div>
        
        <p className="text-[11px] text-muted-foreground/50 font-medium pt-2">
          By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};
