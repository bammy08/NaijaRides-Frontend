'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Car,
  Route,
  Settings,
  LogOut,
  BarChart2,
  UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const links = [
  {
    href: '/dashboard/overview',
    label: 'Overview',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    href: '/dashboard/users',
    label: 'Users',
    icon: <Users className="w-5 h-5" />,
  },
  {
    href: '/dashboard/drivers',
    label: 'Drivers',
    icon: <Car className="w-5 h-5" />,
  },
  {
    href: '/dashboard/rides',
    label: 'Rides',
    icon: <Route className="w-5 h-5" />,
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: <BarChart2 className="w-5 h-5" />,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen flex flex-col bg-white border-r">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between py-6">
        <nav className="flex flex-col gap-1 px-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group',
                pathname === link.href
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <span
                className={cn(
                  'p-1.5 rounded-md',
                  pathname === link.href
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                )}
              >
                {link.icon}
              </span>
              <span>{link.label}</span>
              {pathname === link.href && (
                <span className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="px-4 space-y-4">
          <div className="border-t border-gray-200 my-2"></div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
              <AvatarFallback className="bg-indigo-100 text-indigo-800">
                <UserRound className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-500">admin@example.com</p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-600 hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
