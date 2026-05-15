"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { CommandPalette } from "./CommandPalette";
import { Toaster } from "sonner";
import { useLayoutStore } from "@/store/useLayoutStore";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  const { theme } = useLayoutStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'glass-dark', 'cyber-neon');
    
    if (theme === 'glass-dark' || theme === 'cyber-neon') {
      root.classList.add('dark');
    }
    
    root.classList.add(theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <CommandPalette />
      {children}
    </QueryClientProvider>
  );
}

