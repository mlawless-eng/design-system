import { Home, CreditCard, ArrowLeftRight, Settings, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Coins, label: 'Assets', href: '/assets' },
  { icon: CreditCard, label: 'Accounts', href: '/dashboard/accounts' },
  { icon: ArrowLeftRight, label: 'Transactions', href: '/dashboard/transactions' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const currentPath = window.location.pathname;

  return (
    <aside className="w-60 border-r-2 border-foreground bg-sidebar p-4">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-sm border-2 text-sm font-bold transition-colors',
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-transparent text-foreground hover:border-foreground hover:bg-accent'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
