import React from 'react';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const AboutPage: React.FC = () => {
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/nexus', color: 'hover:text-foreground' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/nexus', color: 'hover:text-[#1DA1F2]' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/nexus', color: 'hover:text-[#0A66C2]' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@nexus.com', color: 'hover:text-primary' },
  ];

  const skills = ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'PostgreSQL', 'AWS', 'Docker'];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-fade-in">
      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-foreground rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <Avatar className="h-32 w-32 border-2 border-background relative">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nexus" />
            <AvatarFallback>NX</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Nexus Analytics</h1>
            <p className="text-xl text-muted-foreground font-medium">Data Visualisation & Analytics Platform</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground transition-colors ${link.color}`}
              >
                <link.icon className="w-5 h-5" />
                <span className="sr-only">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/40 pb-2">About Us</h2>
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
          <p>
            Nexus Analytics was born out of a desire to make complex data accessible and actionable. Inspired by the clean aesthetics of Linear and Vercel, we've built a dashboard that doesn't just show numbers, but tells a story.
          </p>
          <p>
            Our mission is to provide high-density, executive-level insights that help B2B SaaS companies thrive in a data-driven world. We focus on performance, clarity, and real-time updates to ensure you're always ahead of the curve.
          </p>
        </div>
      </section>

      {/* Stats/Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Founded', value: '2023' },
          { label: 'Global Users', value: '10,000+' },
          { label: 'Data Points/Day', value: '1M+' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/40 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tech Stack */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/40 pb-2">Our Stack</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1 bg-secondary/30 border-border/40 text-xs font-semibold">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center space-y-6">
        <h3 className="text-2xl font-bold">Ready to take control of your data?</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Join thousands of other forward-thinking companies using Nexus Analytics to power their growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 border-border/40">
            View Documentation <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};
