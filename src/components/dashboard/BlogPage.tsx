import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Programming' | 'AI' | 'Career' | 'Reviews';
  date: string;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
  };
  featuredImage: string;
}

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-ai-analytics',
    title: 'The Future of AI-Driven Analytics in B2B SaaS',
    excerpt: 'How machine learning is transforming how we interpret business metrics and predict future growth.',
    content: `
      <h2>The Shift to Predictive Analytics</h2>
      <p>Traditional analytics tell you what happened. Modern AI-driven analytics tell you what will happen. In the world of B2B SaaS, this shift is revolutionary. We're moving from a retrospective view of data to a predictive one.</p>
      
      <blockquote>
        "The future belongs to those who can see it before it arrives. Predictive analytics is the telescope for the modern SaaS executive."
      </blockquote>

      <h2>Real-time Decision Support</h2>
      <p>Imagine a dashboard that doesn't just show churn rates, but identifies customers likely to churn before they even think about it. AI algorithms can analyze behavior patterns that humans might miss, providing a proactive approach to customer success.</p>
      
      <div class="blog-chart-container my-12 p-8 bg-secondary/20 rounded-3xl border border-border/40 shadow-2xl overflow-hidden relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
        <h4 class="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Predikert Vekst vs Faktisk (2024)
        </h4>
        <div id="chart-placeholder" class="h-64 flex items-center justify-center text-muted-foreground italic bg-background/50 rounded-xl border border-dashed border-border/20 relative z-10 group-hover:border-primary/30 transition-colors">
          <div class="flex flex-col items-center gap-3">
            <div class="flex gap-1 items-end h-12">
              <div class="w-3 bg-primary/20 h-4 rounded-t-sm"></div>
              <div class="w-3 bg-primary/40 h-8 rounded-t-sm"></div>
              <div class="w-3 bg-primary/60 h-12 rounded-t-sm"></div>
              <div class="w-3 bg-primary h-10 rounded-t-sm"></div>
              <div class="w-3 bg-primary/80 h-14 rounded-t-sm"></div>
            </div>
            <span>[Interaktiv Vekst-Graf Laster...]</span>
          </div>
        </div>
      </div>

      <h2>Key Strategies for 2024</h2>
      <p>To succeed with predictive analytics, organizations must focus on three core pillars of data maturity:</p>
      
      <ol>
        <li><strong>Data Quality:</strong> Ensuring that the underlying data is clean, consistent, and representative.</li>
        <li><strong>Algorithm Transparency:</strong> Building trust by explaining why a certain prediction was made.</li>
        <li><strong>Actionable Insights:</strong> Moving from "what" to "what now" by providing clear next steps.</li>
      </ol>

      <h3>Key Benefits</h3>
      <ul>
        <li><strong>Proactive Churn Prevention:</strong> Identify at-risk accounts early. <a href="#">Les mer om churn-strategier</a>.</li>
        <li><strong>Automated Forecasting:</strong> Highly accurate revenue predictions.</li>
        <li><strong>Dynamic Pricing:</strong> Optimize subscription tiers in real-time.</li>
      </ul>
      
      <p>Det er viktig å merke seg at teknologien alene ikke er nok. Man trenger også en kultur som er villig til å handle på innsiktene som blir presentert.</p>

      <h2>Conclusion</h2>
      <p>As we look forward, the integration of AI isn't just an advantage—it's a necessity for scaling in the competitive SaaS landscape. For more information, visit our <a href="/docs">dokumentasjon</a> or contact our support team.</p>
    `,
    category: 'AI',
    date: '2024-05-15',
    readingTime: '5 min read',
    author: { name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    slug: 'scaling-react-dashboards',
    title: 'Scaling React Dashboards for High-Density Data',
    excerpt: 'Strategies for maintaining performance when visualizing thousands of real-time data points in React.',
    content: `
      <h2>The Performance Challenge</h2>
      <p>When building high-density dashboards, the sheer volume of data can quickly degrade user experience if not handled correctly. React's rendering model needs careful optimization to remain snappy.</p>
      
      <blockquote>
        "Performance is not just about raw speed; it's about the reliability of the user experience under load."
      </blockquote>

      <h2>Virtualization and Memoization</h2>
      <p>Using libraries like <code>react-window</code> or <code>react-virtualized</code> is crucial for lists and grids. For charts, ensuring that only visible data points are processed can save significant CPU time.</p>
      
      <h3>Top Optimization Techniques</h3>
      <ol>
        <li><strong>Web Workers:</strong> Offload heavy data processing to a separate thread.</li>
        <li><strong>React.memo:</strong> Prevent unnecessary re-renders of heavy components.</li>
        <li><strong>Windowing:</strong> Render only the rows currently visible in the viewport.</li>
      </ol>

      <p>By implementing these techniques, we've seen dashboard load times drop by over 60% in high-density environments. Check out our <a href="/docs/performance">performance guide</a> for more details.</p>
    `,
    category: 'Programming',
    date: '2024-05-10',
    readingTime: '8 min read',
    author: { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    slug: 'career-growth-in-saas',
    title: 'Career Growth: From Developer to Product Engineer',
    excerpt: 'Why the best developers in SaaS are those who understand the business and product vision.',
    content: `
      <h2>Defining the Product Engineer</h2>
      <p>A Product Engineer is more than just a coder. They are a bridge between the technical implementation and the user's needs. In SaaS, this role is becoming increasingly critical.</p>
      
      <h2>The Mindset Shift</h2>
      <p>It's about asking "why" as often as "how". Understanding the business goals behind a feature allows for better technical decisions that align with the product roadmap.</p>
    `,
    category: 'Career',
    date: '2024-05-05',
    readingTime: '6 min read',
    author: { name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    featuredImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    slug: 'linear-vercel-review',
    title: 'Review: Why Linear and Vercel are the Gold Standard',
    excerpt: 'An in-depth look at the design principles that make these tools so successful in the developer community.',
    content: `
      <h2>The Power of Minimalism</h2>
      <p>Both Linear and Vercel have embraced a design philosophy that prioritizes focus. Their monochrome palettes and subtle typography allow the user's work to take center stage.</p>
      
      <h2>Speed as a Feature</h2>
      <p>In these tools, interactions feel instantaneous. This isn't just about fast APIs, but about perceived performance and optimistic UI updates.</p>
    `,
    category: 'Reviews',
    date: '2024-04-28',
    readingTime: '10 min read',
    author: { name: 'Sarah Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800'
  }
];

export const BlogPage: React.FC<{ onPostClick: (post: BlogPost) => void }> = ({ onPostClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Alle', 'Programmering', 'AI', 'Karriere', 'Anmeldelser'];

  const filteredPosts = mockPosts.filter(post => {
    const categoryMap: Record<string, string> = {
      'Alle': 'All',
      'Programmering': 'Programming',
      'AI': 'AI',
      'Karriere': 'Career',
      'Anmeldelser': 'Reviews'
    };
    const targetCategory = categoryMap[activeCategory] || activeCategory;
    const matchesCategory = activeCategory === 'Alle' || post.category === targetCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = mockPosts[0];

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/30 backdrop-blur-sm border border-border/40 p-6 rounded-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'ghost'}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'bg-primary shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>
        
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input 
            placeholder="Søk i artikler..." 
            className="pl-10 bg-background/50 border-border/40 focus:border-primary/50 transition-all rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="group cursor-pointer flex flex-col space-y-6"
            onClick={() => onPostClick(post)}
          >
            <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] relative bg-card/40 border border-border/20 shadow-2xl">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <Badge variant="secondary" className="bg-black/80 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 border border-white/10 rounded-lg">
                  {post.category === 'Programming' ? 'Programmering' : 
                   post.category === 'Career' ? 'Karriere' : 
                   post.category === 'Reviews' ? 'Anmeldelser' : post.category}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4 px-2">
              <div className="flex items-center gap-6 text-muted-foreground/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">{post.readingTime.toUpperCase()}</span>
                </div>
              </div>

              <h2 className="text-h2 md:text-[2.5rem] font-bold tracking-tight leading-[1.1] transition-colors group-hover:text-primary/90">
                {post.title}
              </h2>

              <p className="text-muted-foreground/80 text-lg leading-relaxed line-clamp-2 max-w-xl">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 pt-2 group/link">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/80 group-hover/link:text-primary transition-colors">
                  LES ARTIKKEL
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover/link:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-24 space-y-4 bg-card/20 rounded-3xl border border-dashed border-border/40">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Ingen artikler funnet</h3>
          <p className="text-muted-foreground">Prøv å justere søket eller filtrene.</p>
          <Button variant="outline" onClick={() => { setActiveCategory('Alle'); setSearchQuery(''); }}>
            Tøm alle filtre
          </Button>
        </div>
      )}
    </div>
  );
};
