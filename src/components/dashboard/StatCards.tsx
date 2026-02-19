import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Users, Zap, Activity, Heart, Shield, Loader2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '@/lib/utils';
import { blink } from '@/lib/blink';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  data: any[];
  color: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon: Icon, data, color, loading }) => {
  return (
    <Card className="overflow-hidden relative group border-border/40 bg-card/30 backdrop-blur-md hover:border-primary/30 transition-all duration-500">
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
        {!loading && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.4}/>
                  <stop offset="100%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                fillOpacity={1} 
                fill={`url(#gradient-${title})`} 
                strokeWidth={1.5}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0 relative z-10">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">{title}</CardTitle>
        <div className="p-1.5 bg-secondary/30 rounded-md border border-border/20">
          <Icon className="w-3.5 h-3.5 text-foreground/80" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-2">
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 w-24 bg-muted/20 animate-pulse rounded" />
            <div className="h-4 w-16 bg-muted/10 animate-pulse rounded" />
          </div>
        ) : (
          <>
            <div className="text-h2 font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              {value}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border",
                trend === 'up' 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
              )}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {change}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground/60">vs prev. period</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const StatCardsGrid: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const customers = await blink.db.table('customers').list();
      
      const totalMRR = customers.reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
      const activeUsers = customers.length;
      
      // Churn and NPS are mock for now since they are not in schema
      // but we could pull them from a settings/metrics table if we added one
      
      const dynamicStats = [
        {
          title: "Credits Used",
          value: "Unlimited",
          change: "0.00$",
          trend: "down" as const,
          icon: Zap,
          color: "#ADFA1D",
          data: [
            { value: 10 }, { value: 10 }, { value: 10 }, { value: 10 }, 
            { value: 10 }, { value: 10 }, { value: 10 }, { value: 10 }, 
            { value: 10 }, { value: 10 }, { value: 10 }, { value: 10 }
          ]
        },
        {
          title: "Premium Status",
          value: "Unlocked",
          change: "Lifetime",
          trend: "up" as const,
          icon: Shield,
          color: "#8b5cf6",
          data: [
            { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, 
            { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, 
            { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }
          ]
        },
        {
          title: "MRR",
          value: `${totalMRR.toLocaleString()}`,
          change: "+12.5%",
          trend: "up" as const,
          icon: DollarSign,
          color: "#3b82f6",
          data: [
            { value: 40 }, { value: 35 }, { value: 45 }, { value: 42 }, 
            { value: 50 }, { value: 48 }, { value: 55 }, { value: 52 }, 
            { value: 60 }, { value: 58 }, { value: 65 }, { value: 62 }
          ]
        },
        {
          title: "Active Users",
          value: activeUsers.toLocaleString(),
          change: "+8.2%",
          trend: "up" as const,
          icon: Users,
          color: "#8b5cf6",
          data: [
            { value: 30 }, { value: 35 }, { value: 32 }, { value: 38 }, 
            { value: 40 }, { value: 45 }, { value: 42 }, { value: 50 }, 
            { value: 48 }, { value: 55 }, { value: 52 }, { value: 60 }
          ]
        },
        {
          title: "Churn Rate",
          value: "2.4%",
          change: "-0.5%",
          trend: "down" as const,
          icon: Activity,
          color: "#f43f5e",
          data: [
            { value: 50 }, { value: 48 }, { value: 45 }, { value: 42 }, 
            { value: 40 }, { value: 38 }, { value: 35 }, { value: 32 }, 
            { value: 30 }, { value: 28 }, { value: 25 }, { value: 22 }
          ]
        },
        {
          title: "NPS Score",
          value: "72",
          change: "+4",
          trend: "up" as const,
          icon: Heart,
          color: "#10b981",
          data: [
            { value: 20 }, { value: 25 }, { value: 22 }, { value: 28 }, 
            { value: 30 }, { value: 35 }, { value: 32 }, { value: 40 }, 
            { value: 38 }, { value: 45 }, { value: 42 }, { value: 50 }
          ]
        },
      ];
      
      setStats(dynamicStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (
        [...Array(4)].map((_, i) => (
          <StatCard 
            key={i} 
            title="Loading..." 
            value="..." 
            change="..." 
            trend="up" 
            icon={Activity} 
            data={[]} 
            color="#333" 
            loading={true} 
          />
        ))
      ) : (
        stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))
      )}
    </div>
  );
};