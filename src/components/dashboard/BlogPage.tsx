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
      
      <h2>Real-time Decision Support</h2>
      <p>Imagine a dashboard that doesn't just show churn rates, but identifies customers likely to churn before they even think about it. AI algorithms can analyze behavior patterns that humans might miss, providing a proactive approach to customer success.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Proactive Churn Prevention: Identify at-risk accounts early.</li>
        <li>Automated Forecasting: Highly accurate revenue predictions.</li>
        <li>Dynamic Pricing: Optimize subscription tiers in real-time.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As we look forward, the integration of AI isn't just an advantage—it's a necessity for scaling in the competitive SaaS landscape.</p>
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
      
      <h2>Virtualization and Memoization</h2>
      <p>Using libraries like react-window or react-virtualized is crucial for lists and grids. For charts, ensuring that only visible data points are processed can save significant CPU time.</p>
      
      <h3>Optimization Techniques</h3>
      <ul>
        <li>Web Workers for data processing: Offload heavy calculations.</li>
        <li>React.memo and useMemo: Avoid unnecessary re-renders.</li>
        <li>Optimized SVG rendering for charts.</li>
      </ul>
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

  const categories = ['All', 'Programming', 'AI', 'Career', 'Reviews'];

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = mockPosts[0];

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      {/* Featured Post */}
      {activeCategory === 'All' && !searchQuery && (
        <section 
          className="relative rounded-3xl overflow-hidden cursor-pointer group"
          onClick={() => onPostClick(featuredPost)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
          <img 
            src={featuredPost.featuredImage} 
            alt={featuredPost.title}
            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-2xl space-y-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] px-3 py-1">
              Featured
            </Badge>
            <h2 className="text-h1 font-bold tracking-tight text-white leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-body-large text-white/80 font-medium">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/60">{featuredPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/60">{featuredPost.readingTime}</span>
              </div>
            </div>
          </div>
        </section>
      )}

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
            placeholder="Search posts..." 
            className="pl-10 bg-background/50 border-border/40 focus:border-primary/50 transition-all rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Card 
            key={post.id} 
            className="group cursor-pointer bg-card/40 border-border/40 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 transition-all duration-300 rounded-2xl flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-primary/5"
            onClick={() => onPostClick(post)}
          >
            <div className="aspect-video overflow-hidden rounded-t-2xl relative">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-white/10">
                  {post.category}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-h3 font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-2 flex-grow">
              <p className="text-muted-foreground text-body-small line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </CardContent>
            <CardFooter className="px-6 py-4 pt-2 border-t border-border/20 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{post.date}</span>
                <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{post.readingTime}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-24 space-y-4 bg-card/20 rounded-3xl border border-dashed border-border/40">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">No posts found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          <Button variant="outline" onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};
