"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4 px-2">
      <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home size={14} />
      </Link>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const label = path.charAt(0).toUpperCase() + path.slice(1);

        return (
          <React.Fragment key={path}>
            <ChevronRight size={12} className="text-slate-300" />
            {isLast ? (
              <span className="text-slate-600 dark:text-slate-200 font-bold">{label}</span>
            ) : (
              <Link href={href} className="hover:text-primary transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
