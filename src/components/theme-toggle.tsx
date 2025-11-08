'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { ThemeToggleButton, useThemeTransition } from '@/components/ui/theme-toggle-button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set view-transition-name on root element for view transitions API
    if (typeof document !== 'undefined') {
      document.documentElement.style.viewTransitionName = 'root';
    }
  }, []);

  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    startTransition(() => {
      setTheme(newTheme);
    });
  }, [theme, setTheme, startTransition]);

  const currentTheme = theme === 'system' ? 'light' : (theme as 'light' | 'dark');

  if (!mounted) {
    return null;
  }

  return (
    <ThemeToggleButton 
      theme={currentTheme}
      onClick={handleThemeToggle}
      variant="polygon"
    />
  );
}

