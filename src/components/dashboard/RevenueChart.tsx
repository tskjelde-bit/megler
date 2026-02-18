import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 32000, users: 800 },
  { month: 'Feb', revenue: 35000, users: 850 },
  { month: 'Mar', revenue: 33000, users: 820 },
  { month: 'Apr', revenue: 38000, users: 950 },
  { month: 'May', revenue: 42000, users: 1050 },
  { month: 'Jun', revenue: 40000, users: 1000 },
  { month: 'Jul', revenue: 45000, users: 1100 },
  { month: 'Aug', revenue: 48000, users: 1200 },
  { month: 'Sep', revenue: 46000, users: 1150 },
  { month: 'Oct', revenue: 52000, users: 1300 },
  { month: 'Nov', revenue: 50000, users: 1250 },
  { month: 'Dec', revenue: 55000, users: 1400 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 border border-border/40 p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">{label}</p>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[9px] font-bold text-emerald-500">+12.4%</span>
          </div>
        </div>
        <p className="text-2xl font-bold tracking-tight text-foreground">
          ${payload[0].value.toLocaleString()}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-primary/20"></div>
          <p className="text-[10px] font-semibold text-muted-foreground/70">Monthly Revenue (MRR)</p>
        </div>
      </div>
    );
  }
  return null;
};

interface RevenueChartProps {
  currentMRR?: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ currentMRR }) => {
  const chartData = [...data];
  if (currentMRR !== undefined) {
    // Update the last month with real data if available
    chartData[chartData.length - 1] = { 
      ...chartData[chartData.length - 1], 
      revenue: currentMRR 
    };
  }

  return (
    <Card className="col-span-1 lg:col-span-2 border-border/40 bg-card/20 backdrop-blur-md overflow-hidden group">
      <CardHeader className="flex flex-row items-start justify-between pb-8">
        <div className="space-y-1.5">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground/90 flex items-center gap-2">
            Revenue Performance
            <div className="h-4 w-px bg-border/40 mx-1 hidden sm:block" />
            <span className="text-xs font-medium text-muted-foreground/60 hidden sm:block">Annual overview</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground/50 text-xs">Monitor your monthly recurring revenue and growth trends over time.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/20 border border-border/20 transition-colors group-hover:border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(69,170,247,0.5)] animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Revenue</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] w-full pl-0 pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25}/>
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke="hsl(var(--border))" 
              opacity={0.15}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 500 }}
              tickFormatter={(value) => `${value / 1000}k`}
              dx={-10}
              domain={['dataMin - 5000', 'dataMax + 5000']}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1.5, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              animationDuration={2000}
              animationEasing="ease-in-out"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
