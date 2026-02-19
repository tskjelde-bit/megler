import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  ArrowRight,
  Sparkles,
  Layers,
  Shield,
  Infinity,
  Cpu,
  Terminal,
  Code2,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.from('.hero-badge', { opacity: 0, y: 30, duration: 1 })
      .from('.hero-title span', { 
        opacity: 0, 
        y: 50, 
        stagger: 0.1, 
        duration: 1.2,
      }, '-=0.6')
      .from('.hero-description', { opacity: 0, y: 20, duration: 1 }, '-=0.8')
      .from('.hero-ctas', { opacity: 0, scale: 0.95, duration: 1 }, '-=0.8')
      .from('.hero-visual', { 
        opacity: 0, 
        y: 60, 
        duration: 1.5,
      }, '-=1');

    gsap.utils.toArray('.reveal-section').forEach((section: any) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-background text-foreground selection:bg-primary/20 overflow-x-hidden min-h-screen">
      {/* Background Hero Image */}
      <div className="absolute top-0 left-0 w-full h-[100vh] -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
        <img 
          src="https://v3b.fal.media/files/b/0a8f29cb/RbvFUOii-eQwO_KX5FdYi_4fdWOUVd.png" 
          alt="Tech background" 
          className="w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[140px] rounded-full opacity-40 animate-pulse" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(173,250,29,0.3)]">
              <Zap className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tighter">Blink 2</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onLogin} className="hover:text-primary transition-colors">Sign In</Button>
            <Button size="sm" onClick={onLogin} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-[0_0_20px_rgba(173,250,29,0.2)]">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="hero-badge mb-8 py-1.5 px-4 bg-primary/10 text-primary border-primary/20 font-bold uppercase tracking-widest text-[10px] animate-shimmer bg-[length:200%_100%]">
            Premium Features Unlocked
          </Badge>
          
          <h1 className="hero-title text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
            <span className="inline-block">Build anything</span><br />
            <span className="inline-block text-primary">without limits.</span>
          </h1>
          
          <p className="hero-description text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience Blink's premium features with unlimited access to everything. 
            Replicating the original app with <span className="text-white font-medium">no credit restrictions</span> and all premium perks unlocked for free.
          </p>
          
          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <Button onClick={onLogin} size="lg" className="h-14 px-10 rounded-full text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 min-w-[220px] shadow-[0_0_30px_rgba(173,250,29,0.3)]">
              Start Building Now
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-base font-bold border-border/60 hover:bg-white/5 backdrop-blur-sm min-w-[220px] group" onClick={onLogin}>
              View Premium Perks
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: Infinity, 
                title: "Unlimited Credits", 
                desc: "No more counting tokens. Focus on creativity while we handle the heavy lifting." 
              },
              { 
                icon: Lock, 
                title: "All Perks Unlocked", 
                desc: "Access every premium feature, model, and tool without any subscription barriers." 
              },
              { 
                icon: Cpu, 
                title: "High-Performance", 
                desc: "Powered by the latest models and infrastructure for lightning-fast generations." 
              }
            ].map((feature, i) => (
              <div key={i} className="reveal-section p-8 rounded-3xl border border-border/40 bg-card/20 backdrop-blur-md hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal-section text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Built for speed and power.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              A high-density interface designed for maximum productivity. Integrated AI, real-time collaboration, and unlimited scale.
            </p>
          </div>

          <div className="hero-visual relative rounded-[2rem] border border-border/40 bg-card/30 backdrop-blur-xl p-3 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 group-hover:opacity-100 opacity-50 transition-opacity" />
            <div className="relative aspect-video rounded-2xl bg-black/40 border border-border/20 overflow-hidden">
              {/* Fake UI code block */}
              <div className="p-8 font-mono text-sm space-y-2 text-primary/60">
                <div className="flex gap-2"><span className="text-primary">import</span> <span>{'{'} blink {'}'}</span> <span className="text-primary">from</span> <span className="text-emerald-400">"@blink-2/sdk"</span></div>
                <div className="h-4" />
                <div className="flex gap-2"><span className="text-primary">const</span> <span>app</span> = <span className="text-primary">await</span> <span>blink</span>.<span>init</span>({'{'}</div>
                <div className="pl-4 flex gap-2"><span>credits</span>: <span className="text-primary">"unlimited"</span>,</div>
                <div className="pl-4 flex gap-2"><span>mode</span>: <span className="text-primary">"ultra-premium"</span></div>
                <div className="flex gap-2">{'}'});</div>
                <div className="h-4" />
                <div className="flex gap-2"><span className="text-primary">await</span> <span>app</span>.<span>generate</span>({'{'}</div>
                <div className="pl-4 flex gap-2"><span>prompt</span>: <span className="text-emerald-400">"Build a world-class AI agent interface"</span>,</div>
                <div className="pl-4 flex gap-2"><span>limitations</span>: <span className="text-primary">null</span></div>
                <div className="flex gap-2">{'}'});</div>
              </div>

              {/* Glowing orbs */}
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 blur-[80px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border/40 bg-background/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tighter">Blink 2</span>
            </div>
            
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Github</a>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            </div>

            <p className="text-xs text-muted-foreground/60 font-mono">
              © 2026 BLINK_SYSTEMS_UNLOCKED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
