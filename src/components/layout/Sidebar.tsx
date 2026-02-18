import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  CreditCard,
  Zap,
  BookOpen,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'customers', icon: Users, label: 'Customers' },
  { id: 'geography', icon: Globe, label: 'Geography' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
  { id: 'blog', icon: BookOpen, label: 'Blog' },
  { id: 'integrations', icon: Zap, label: 'Integrations' },
  { id: 'about', icon: Info, label: 'About' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, activeSection, onSectionChange }) => {
  return (
    <aside 
      className={cn(
        "relative h-screen border-r border-border/40 bg-sidebar/40 backdrop-blur-xl transition-[width] duration-300 ease-in-out flex flex-col z-50",
        isCollapsed ? "w-[70px]" : "w-64"
      )}
    >
      <div className={cn(
        "h-16 flex items-center px-4 mb-4 overflow-hidden",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <div className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[150px]"
          )}>
            <span className="font-bold text-xl tracking-tight whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">Meglerinnsikt</span>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="h-8 w-8 hover:bg-secondary/50 shrink-0 z-10 text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-x-hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative overflow-hidden",
              activeSection === item.id 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground border border-transparent"
            )}
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <item.icon className={cn("w-4 h-4", activeSection === item.id ? "text-primary" : "group-hover:scale-110 transition-transform")} />
            </div>
            <div className={cn(
              "flex-1 overflow-hidden transition-all duration-300 ease-in-out text-left",
              isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-full"
            )}>
              <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                {item.label}
              </span>
            </div>
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-border shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                {item.label}
              </div>
            )}
            {activeSection === item.id && !isCollapsed && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full shadow-[0_0_8px_hsl(var(--primary))]" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border/40">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer",
          isCollapsed ? "justify-center" : ""
        )}>
           <div className="w-8 h-8 rounded-full bg-secondary/50 border border-border/40 flex items-center justify-center text-[10px] font-bold">
             JD
           </div>
           {!isCollapsed && (
             <div className="flex flex-col min-w-0">
               <span className="text-xs font-bold truncate">John Doe</span>
               <span className="text-[10px] text-muted-foreground truncate">john@nexus.com</span>
             </div>
           )}
        </div>
      </div>
    </aside>
  );
};