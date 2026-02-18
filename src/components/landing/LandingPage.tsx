import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Globe, 
  Shield, 
  Zap, 
  ChevronRight, 
  ArrowRight,
  MousePointer2,
  PieChart,
  LineChart,
  Users,
  TrendingUp,
  Activity,
  DollarSign,
  Heart,
  LayoutDashboard,
  Sparkles,
  Layers,
  Play, 
  CheckCircle2,
  Calendar,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { NewsletterSignup } from '@/components/dashboard/NewsletterSignup';
import { mockPosts } from '@/components/dashboard/BlogPage';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const container = useRef<HTMLDivElement>(null);

  const featuredPost = mockPosts[0];
  const recentPosts = mockPosts.slice(1, 4);

  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.from('.hero-badge', { opacity: 0, y: 30, duration: 1 })
      .from('.hero-title span', { 
        opacity: 0, 
        y: 50, 
        stagger: 0.1, 
        duration: 1.2,
        rotation: 2
      }, '-=0.6')
      .from('.hero-description', { opacity: 0, y: 20, duration: 1 }, '-=0.8')
      .from('.hero-ctas', { opacity: 0, scale: 0.95, duration: 1 }, '-=0.8')
      .from('.hero-visual', { 
        opacity: 0, 
        y: 60, 
        rotationX: 10,
        duration: 1.5,
        clearProps: 'all'
      }, '-=1');

    // Smooth Parallax for Hero Visual
    gsap.to('.hero-visual-inner', {
      scrollTrigger: {
        trigger: '.hero-visual',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -50,
      rotationX: 5,
    });

    // Scroll Revelations
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach((section: any) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
      });
    });

    // Bento Grid Stagger
    gsap.from('.bento-item', {
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 85%',
      },
      opacity: 0,
      scale: 0.95,
      y: 30,
      stagger: 0.1,
      duration: 1,
      ease: 'power4.out',
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Background Mesh/Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[140px] rounded-full opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[140px] rounded-full opacity-30" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-background font-bold">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Nexus</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-foreground hover:after:w-full after:transition-all" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Platform</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-foreground hover:after:w-full after:transition-all" onClick={(e) => { e.preventDefault(); document.querySelector('.stats-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onLogin} className="hover:bg-secondary/50">Sign In</Button>
            <Button variant="premium" size="sm" onClick={onLogin} className="rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 border border-border/50 text-xs font-medium mb-8 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground font-semibold">Nexus v2.4</span>
            <span className="text-border mx-1">|</span>
            <span className="text-foreground/80">New Data Geography Engine</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          </div>
          
          <h1 className="hero-title text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-10 leading-[1.1] perspective-[1000px]">
            <span className="inline-block pb-2">High-density</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/30 inline-block pb-4">growth analytics</span>
          </h1>
          
          <p className="hero-description text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Stop guessing. Nexus provides the "Linear-level" precision you need to scale your SaaS with confidence and clarity.
          </p>
          
          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <Button variant="premium" size="lg" onClick={onLogin} className="h-14 px-10 rounded-full text-base min-w-[200px]">
              Start Scaling Now
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-base font-bold border-border bg-background/50 backdrop-blur-sm min-w-[200px] group hover:bg-secondary/50" onClick={onLogin}>
              Explore Demo
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="hero-visual relative mx-auto max-w-6xl p-4 md:p-8">
            <div className="absolute inset-0 bg-primary/10 blur-[120px] -z-10 rounded-full scale-90" />
            <div className="hero-visual-inner relative rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md p-2 md:p-4 shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
              
              {/* High-Fidelity UI Preview */}
              <div className="w-full h-full rounded-2xl bg-background/80 border border-border/40 overflow-hidden flex flex-col md:flex-row aspect-[16/10]">
                {/* Sidebar Mock */}
                <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-border/40 flex flex-col p-4 gap-6 bg-secondary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded bg-foreground/10" />
                    <div className="w-20 h-3 rounded bg-foreground/20" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={cn("flex items-center gap-3 p-2 rounded-md", i === 1 ? "bg-foreground/5" : "")}>
                        <div className={cn("w-4 h-4 rounded", i === 1 ? "bg-primary/40" : "bg-foreground/10")} />
                        <div className="w-24 h-2 rounded bg-foreground/10" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content Mock */}
                <div className="flex-1 p-6 md:p-10 space-y-8 overflow-hidden bg-background">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="w-32 h-6 rounded bg-foreground/10" />
                      <div className="w-48 h-3 rounded bg-foreground/5" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-foreground/5" />
                      <div className="w-8 h-8 rounded-full bg-foreground/5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: DollarSign, color: "text-blue-500", label: "MRR", val: "$50,234" },
                      { icon: Users, color: "text-purple-500", label: "Users", val: "1,284" },
                      { icon: Activity, color: "text-rose-500", label: "Churn", val: "2.4%" },
                      { icon: Heart, color: "text-emerald-500", label: "NPS", val: "72" }
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl border border-border/40 bg-secondary/5 space-y-3">
                        <div className="flex justify-between items-start">
                          <stat.icon className={cn("w-4 h-4", stat.color)} />
                          <div className="w-10 h-2 rounded bg-emerald-500/20" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                          <div className="text-lg md:text-xl font-bold">{stat.val}</div>
                        </div>
                        <div className="h-8 w-full bg-gradient-to-t from-primary/5 to-transparent rounded" />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-6 rounded-2xl border border-border/40 bg-secondary/5 space-y-6">
                      <div className="flex justify-between">
                        <div className="w-32 h-4 rounded bg-foreground/10" />
                        <div className="w-16 h-4 rounded bg-foreground/10" />
                      </div>
                      <div className="h-48 w-full relative">
                        <svg className="w-full h-full stroke-primary/40 fill-primary/5 stroke-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M0,80 Q20,70 40,85 T80,60 T100,40 L100,100 L0,100 Z" />
                          <path fill="none" d="M0,80 Q20,70 40,85 T80,60 T100,40" className="stroke-primary" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl border border-border/40 bg-secondary/5 flex flex-col justify-center items-center text-center space-y-4">
                      <Globe className="w-12 h-12 text-primary/40" />
                      <div className="space-y-2">
                        <div className="w-24 h-3 mx-auto rounded bg-foreground/10" />
                        <div className="w-32 h-2 mx-auto rounded bg-foreground/5" />
                      </div>
                      <div className="w-full h-2 rounded-full bg-foreground/5 overflow-hidden">
                        <div className="w-2/3 h-full bg-primary/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Bento Solutions Section */}
      <section id="features" className="py-24 relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal-section text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Built for <span className="text-muted-foreground">modern operators</span></h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              We've re-engineered the analytics stack from the ground up to give you insights that were previously impossible to reach.
            </p>
          </div>

          <div className="bento-grid grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6">
            {/* Main AI Card */}
            <div className="bento-item md:col-span-8 md:row-span-1 rounded-[2.5rem] border border-border/50 bg-card/30 p-10 flex flex-col justify-between overflow-hidden relative group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Predictive Growth Engine</h3>
                <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                  Our neural networks analyze millions of data points to predict your next quarter's growth with 98% accuracy.
                </p>
              </div>
              <div className="mt-12 relative h-40 w-full flex items-end gap-2 px-4">
                {[40, 70, 45, 90, 65, 80, 50, 85, 60, 95].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-primary/40 to-primary/5 rounded-t-lg transition-all duration-700 group-hover:bg-primary/60" 
                    style={{ height: `${h}%` }} 
                  />
                ))}
              </div>
            </div>
            
            {/* Security Card */}
            <div className="bento-item md:col-span-4 md:row-span-1 rounded-[2.5rem] border border-border/50 bg-card/30 p-10 flex flex-col items-center justify-center text-center group hover:border-emerald-500/30 transition-colors">
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                <Shield className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Enterprise Grade</h3>
              <p className="text-muted-foreground font-medium">SOC2 Type II compliant encryption for every single data byte.</p>
            </div>

            {/* Global Infrastructure */}
            <div className="bento-item md:col-span-4 md:row-span-1 rounded-[2.5rem] border border-border/50 bg-card/30 p-10 flex flex-col justify-between group hover:border-purple-500/30 transition-colors">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Global Edge</h3>
                <p className="text-muted-foreground font-medium">Nodes in 150+ locations worldwide for zero-latency tracking.</p>
              </div>
              <div className="relative h-32 w-full flex items-center justify-center overflow-hidden">
                <Globe className="w-32 h-32 text-purple-500/10 group-hover:scale-110 group-hover:text-purple-500/20 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
            </div>

            {/* Collaborative Workflows */}
            <div className="bento-item md:col-span-8 md:row-span-1 rounded-[2.5rem] border border-border/50 bg-card/30 p-10 flex flex-col md:flex-row gap-10 items-center group hover:border-blue-500/30 transition-colors">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
                  <Layers className="w-3 h-3" />
                  Workflows
                </div>
                <h3 className="text-3xl font-bold">Multiplayer Insights</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Share insights and build reports together in real-time. Linear-style comments and automated task tracking integrated directly into your dashboard.
                </p>
              </div>
              <div className="flex-1 w-full space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/5 border border-border/20 group-hover:bg-secondary/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-foreground/10" />
                    <div className="h-2 rounded bg-foreground/5 flex-1" />
                    <div className="w-4 h-4 rounded bg-blue-500/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-40 overflow-hidden border-y border-border/40 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24 text-center">
            <div className="stat-item space-y-2">
              <p className="text-5xl md:text-8xl font-black tracking-tighter">$1.2B+</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Revenue Tracked</p>
            </div>
            <div className="stat-item space-y-2">
              <p className="text-5xl md:text-8xl font-black tracking-tighter">45k+</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Daily Sessions</p>
            </div>
            <div className="stat-item space-y-2">
              <p className="text-5xl md:text-8xl font-black tracking-tighter">99.9%</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Uptime SLA</p>
            </div>
            <div className="stat-item space-y-2">
              <p className="text-5xl md:text-8xl font-black tracking-tighter">24/7</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Post & Recent Posts */}
      <section className="py-24 px-6 bg-secondary/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold uppercase tracking-widest text-[10px] px-3 py-1">
                From the Blog
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                Nexus Insights & Stories
              </h2>
              <p className="text-xl text-muted-foreground font-medium max-w-xl">
                The latest trends in SaaS analytics, engineering performance, and product design.
              </p>
            </div>
            <Button variant="ghost" className="group text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
              View all posts <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Featured Post Card */}
            <div className="lg:col-span-7 group cursor-pointer space-y-6">
              <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-border/40 shadow-2xl relative">
                <img 
                  src={featuredPost.featuredImage} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10">
                    {featuredPost.category}
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredPost.readingTime}</div>
                </div>
                <h3 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed line-clamp-2 font-medium">
                  {featuredPost.excerpt}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Recent Posts List */}
            <div className="lg:col-span-5 space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Recent Posts
              </h4>
              <div className="space-y-8">
                {recentPosts.map((post) => (
                  <div key={post.id} className="group cursor-pointer flex gap-6">
                    <div className="w-32 h-24 rounded-2xl overflow-hidden border border-border/40 shrink-0">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="space-y-2 py-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="ghost" className="p-0 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-transparent">
                          {post.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground/60 font-bold tracking-widest">• {post.readingTime}</span>
                      </div>
                      <h5 className="text-base font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-6 relative overflow-hidden bg-background">
        <div className="max-w-5xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="reveal-section p-12 md:p-32 rounded-[4rem] bg-gradient-to-br from-card to-background border border-border/60 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10 rounded-full" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-10 relative z-10">Scale with <br /><span className="text-muted-foreground">Nexus Analytics.</span></h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-xl mx-auto relative z-10 font-medium">
              Join the elite teams building the future of SaaS. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Button variant="premium" size="lg" onClick={onLogin} className="h-16 px-12 rounded-full text-xl">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-full text-xl font-bold hover:bg-secondary/50 border-border group" onClick={() => window.open('mailto:sales@nexus.com', '_blank')}>
                Contact Sales
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-32">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
                  <span className="text-background font-bold text-xl">N</span>
                </div>
                <span className="font-bold text-2xl tracking-tight">Nexus</span>
              </div>
              <p className="text-muted-foreground max-w-sm mb-10 text-lg font-medium">
                The high-density analytics platform for teams who demand precision and speed.
              </p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <MousePointer2 className="w-6 h-6 hover:text-foreground cursor-pointer transition-colors" />
                <BarChart3 className="w-6 h-6 hover:text-foreground cursor-pointer transition-colors" />
                <Users className="w-6 h-6 hover:text-foreground cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8">Product</h4>
              <ul className="space-y-5 text-muted-foreground font-medium">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8">Company</h4>
              <ul className="space-y-5 text-muted-foreground font-medium">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8">Legal</h4>
              <ul className="space-y-5 text-muted-foreground font-medium">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-16 border-t border-border/40 text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
            <p>© 2024 Nexus Analytics Inc.</p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span>Systems Operational</span>
              </div>
              <a href="#" className="hover:text-foreground transition-colors">Status Page</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
