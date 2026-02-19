import React, { useState } from 'react';
import { Search, Bell, User, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Kbd } from '@/components/ui/kbd';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [hasNotification, setHasNotification] = useState(true);
  const formattedSection = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);

  return (
    <header className="h-16 border-b border-border/40 flex items-center justify-between px-6 bg-background/30 backdrop-blur-xl z-40">
      <div className="flex items-center gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-foreground transition-colors" onClick={(e: React.MouseEvent) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate-section', { detail: 'overview' })); }}>
                Meglerinnsikt
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="opacity-20" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[11px] font-bold uppercase tracking-widest text-foreground">{formattedSection}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-muted-foreground/60 hover:text-foreground hover:bg-secondary/30 rounded-lg transition-all"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 bg-secondary/20 text-muted-foreground/60 hover:border-primary/30 hover:bg-secondary/40 transition-all group min-w-[200px]"
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
        >
          <Search className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
          <span className="text-[11px] font-medium tracking-wide">Søk Meglerinnsikt...</span>
          <div className="ml-auto flex items-center gap-1 opacity-60">
            <Kbd className="bg-background/50 border-border/40 px-1 py-0 min-w-0 h-5">
              <span className="text-[10px]">⌘</span>
            </Kbd>
            <Kbd className="bg-background/50 border-border/40 px-1 py-0 min-w-0 h-5">
              <span className="text-[10px]">K</span>
            </Kbd>
          </div>
        </button>

        <div className="h-4 w-px bg-border/40 mx-1" />

        <div className="flex items-center gap-2">
          <button 
            className="p-2 text-muted-foreground/60 hover:text-foreground hover:bg-secondary/30 rounded-lg transition-all relative group"
            onClick={() => {
              if (hasNotification) {
                toast.info('Notifications', { description: 'You have no new notifications.' });
                setHasNotification(false);
              } else {
                toast.info('All caught up!', { description: 'No new notifications.' });
              }
            }}
          >
            <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {hasNotification && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))] animate-pulse"></span>
            )}
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 rounded-full border border-border/40 bg-secondary/30 flex items-center justify-center overflow-hidden hover:border-primary/40 transition-all active:scale-95 shadow-inner">
                <User className="w-4 h-4 text-muted-foreground/70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-border/40 bg-background/95 backdrop-blur-xl p-2 shadow-2xl">
              <DropdownMenuLabel className="px-2 py-1.5">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-xs font-bold leading-none">{user?.displayName || 'Meglerinnsikt Bruker'}</p>
                  <p className="text-[10px] leading-none text-muted-foreground/60">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2 bg-border/40" />
              <DropdownMenuItem className="rounded-md cursor-pointer text-xs font-medium focus:bg-primary/10 focus:text-primary transition-colors" onClick={() => {
                window.dispatchEvent(new CustomEvent('navigate-section', { detail: 'settings' }));
              }}>
                <User className="mr-2 h-3.5 w-3.5" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-md cursor-pointer text-xs font-medium focus:bg-destructive/10 focus:text-destructive transition-colors" onClick={logout}>
                <LogOut className="mr-2 h-3.5 w-3.5" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
