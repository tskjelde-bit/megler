import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  share: string;
  growth: string;
}

interface UserMapProps {
  locations?: Location[];
}

export const UserMap: React.FC<UserMapProps> = ({ locations = [] }) => {
  return (
    <Card className="col-span-1 border-border/40 bg-card/20 backdrop-blur-md flex flex-col h-full overflow-hidden group">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1.5">
          <CardTitle className="text-lg font-bold tracking-tight text-foreground/90 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Global Presence
          </CardTitle>
          <CardDescription className="text-muted-foreground/50 text-[10px] uppercase tracking-wider font-semibold">Active sessions by region</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between py-2">
        <div className="relative aspect-square w-full">
          {/* Stylized Grid Map */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
          </div>
          
          <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30 transition-opacity group-hover:opacity-40 duration-700 fill-muted-foreground/30">
             {/* Abstract World Map Paths */}
             <path d="M150,150 Q200,100 250,150 T350,150 T450,150 T550,150 T650,150 T750,150 T850,150 L850,350 Q800,400 750,350 T650,350 T550,350 T450,350 T350,350 T250,350 T150,350 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
             
             {/* Stylized Continents as abstract shapes */}
             <rect x="180" y="140" width="120" height="80" rx="40" className="fill-muted-foreground/10" />
             <rect x="420" y="120" width="100" height="150" rx="50" className="fill-muted-foreground/10" />
             <rect x="700" y="180" width="140" height="100" rx="50" className="fill-muted-foreground/10" />
             <rect x="250" y="280" width="80" height="120" rx="40" className="fill-muted-foreground/10" />

             {/* Dynamic Location Pulse Points */}
             {locations.length > 0 ? (
               locations.map((loc, i) => {
                 // Use lat/lng to position dots roughly on our abstract map
                 // lat: -90 to 90, lng: -180 to 180
                 // map x: 0-1000, y: 0-500
                 const x = ((loc.lng + 180) / 360) * 1000;
                 const y = ((90 - loc.lat) / 180) * 500;
                 
                 return (
                   <g key={loc.id}>
                     <circle 
                       cx={x} 
                       cy={y} 
                       r="12" 
                       fill="hsl(var(--primary))" 
                       className="opacity-20 animate-ping" 
                       style={{ animationDuration: `${2 + (i % 3)}s` }}
                     />
                     <circle 
                       cx={x} 
                       cy={y} 
                       r="4" 
                       fill="hsl(var(--primary))" 
                       className="shadow-[0_0_12px_rgba(69,170,247,0.8)]"
                       >
                       <title>{loc.name}: {loc.share}</title>
                     </circle>
                   </g>
                 );
               })
             ) : (
               // Fallback default dots
               <>
                 <circle cx="220" cy="180" r="4" fill="hsl(var(--primary))" />
                 <circle cx="480" cy="220" r="4" fill="hsl(var(--primary))" />
                 <circle cx="780" cy="240" r="4" fill="hsl(var(--primary))" />
               </>
             )}
          </svg>
        </div>

        <div className="space-y-4 mt-4 px-2">
          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">North America</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold">42%</span>
              <div className="w-16 h-1 bg-secondary/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[42%] rounded-full shadow-[0_0_8px_rgba(69,170,247,0.4)]" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">Europe</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold">28%</span>
              <div className="w-16 h-1 bg-secondary/30 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[28%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">Asia Pacific</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold">15%</span>
              <div className="w-16 h-1 bg-secondary/30 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[15%] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};