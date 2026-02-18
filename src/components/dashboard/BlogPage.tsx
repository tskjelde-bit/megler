import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="space-y-16 pb-24 animate-fade-in max-w-5xl mx-auto">
      {/* Blog Header */}
      <div className="space-y-3 pt-8">
        <h1 className="text-5xl font-extrabold tracking-tight">Writing</h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl">
          Thoughts on product design, data engineering, and the future of SaaS analytics.
        </p>
      </div>

      <div className="h-px bg-border/20 w-full" />

      {/* Post Grid - 2 columns side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
        {mockPosts.map((post) => (
          <div 
            key={post.id} 
            className="group cursor-pointer space-y-6"
            onClick={() => onPostClick(post)}
          >
            <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-muted/20 border border-border/40 relative shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-500">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-lg line-clamp-2 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {mockPosts.length === 0 && (
        <div className="text-center py-24 space-y-4 bg-card/20 rounded-3xl border border-dashed border-border/40">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">No posts found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          <Button variant="outline" onClick={() => { /* No filters to clear */ }}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};
