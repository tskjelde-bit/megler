import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ChevronLeft, Share2, Facebook, Twitter, Linkedin, Link2, BookOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BlogPost, mockPosts } from './BlogPage';
import { toast } from 'sonner';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  onPostClick: (post: BlogPost) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack, onPostClick }) => {
  const [activeHeading, setActiveHeading] = useState<string>('');
  
  // Extract headings for Table of Contents
  const headings = [
    { id: 'prediction', text: 'The Shift to Predictive Analytics' },
    { id: 'decision', text: 'Real-time Decision Support' },
    { id: 'benefits', text: 'Key Benefits' },
    { id: 'performance', text: 'The Performance Challenge' },
    { id: 'virtualization', text: 'Virtualization and Memoization' },
    { id: 'growth', text: 'Career Growth: From Developer to Product Engineer' },
    { id: 'mindset', text: 'The Mindset Shift' },
    { id: 'minimalism', text: 'The Power of Minimalism' },
    { id: 'speed', text: 'Speed as a Feature' },
  ].filter(h => post.content.toLowerCase().includes(h.text.toLowerCase()));

  const relatedPosts = mockPosts
    .filter(p => p.id !== post.id && (p.category === post.category || Math.random() > 0.5))
    .slice(0, 3);

  const shareUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-8 animate-fade-in pb-24">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="group text-muted-foreground hover:text-foreground hover:bg-secondary/30"
        >
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Button>

        <div className="space-y-6">
          <Badge variant="secondary" className="bg-primary shadow-lg shadow-primary/20 text-xs font-bold uppercase tracking-widest px-3 py-1">
            {post.category}
          </Badge>
          <h1 className="text-h2 md:text-h1 font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border/20">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border/40">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{post.author.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Author</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium">{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">{post.readingTime}</span>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-border/40" onClick={copyToClipboard}>
                <Link2 className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-border/40" onClick={() => toast.info('Shared to Twitter')}>
                <Twitter className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-border/40" onClick={() => toast.info('Shared to LinkedIn')}>
                <Linkedin className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="aspect-video rounded-3xl overflow-hidden border border-border/40 shadow-2xl">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="prose prose-invert max-w-none prose-headings:font-bold prose-h2:text-h2 prose-h2:mt-12 prose-h2:mb-6 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-body-large prose-li:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        <div className="pt-24 space-y-8 border-t border-border/20">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-h2 font-bold">Related Posts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <div 
                key={related.id} 
                className="group cursor-pointer space-y-3"
                onClick={() => onPostClick(related)}
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-border/40 shadow-sm transition-shadow group-hover:shadow-lg group-hover:shadow-primary/5">
                  <img src={related.featuredImage} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">{related.title}</h3>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{related.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - TOC & Socials */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="sticky top-24 space-y-8">
          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="bg-card/30 backdrop-blur-md border border-border/40 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Table of Contents
              </h3>
              <nav className="space-y-4">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => setActiveHeading(heading.id)}
                    className={`text-sm block text-left transition-all hover:text-primary ${activeHeading === heading.id ? 'text-primary font-bold border-l-2 border-primary pl-3 ml-[-12px]' : 'text-muted-foreground'}`}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* About the Author */}
          <div className="bg-card/30 backdrop-blur-md border border-border/40 rounded-2xl p-6 shadow-sm space-y-4">
             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
               <User className="w-3 h-3" />
               About the Author
             </div>
             <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-border/40">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm">{post.author.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">SaaS Product Expert</p>
                </div>
             </div>
             <p className="text-xs text-muted-foreground leading-relaxed">
               Expert in SaaS growth strategies and modern analytics architectures. Passionate about building products that users love.
             </p>
             <Button variant="outline" size="sm" className="w-full text-xs font-bold uppercase tracking-widest border-border/40">
               Follow on Twitter
             </Button>
          </div>

          {/* Newsletter (Compact) */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4 shadow-[0_10px_40px_-15px_hsl(var(--primary)/0.1)]">
            <h3 className="font-bold text-lg leading-tight">Get the latest SaaS insights</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Join 5,000+ readers getting our weekly newsletter on SaaS growth, AI, and design.
            </p>
            <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed successfully!'); }}>
              <input 
                type="email" 
                placeholder="you@company.com" 
                className="w-full h-9 rounded-lg px-3 text-xs bg-background/50 border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                required
              />
              <Button type="submit" size="sm" className="w-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                Subscribe Now
              </Button>
            </form>
            <p className="text-[10px] text-muted-foreground text-center">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};
