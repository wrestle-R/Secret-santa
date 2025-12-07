import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Gift, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Create Group', link: '/create' }
  ];

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-3xl rounded-full border bg-background/80 backdrop-blur-md px-6 py-2 shadow-lg supports-[backdrop-filter]:bg-background/60">
        <Link to="/" className="flex items-center space-x-2">
          {/* <Gift className="h-5 w-5 text-primary" /> */}
          <span className="font-bold text-lg tracking-tight">Secret Santa</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.link ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 transition-all" />
            ) : (
              <Moon className="h-4 w-4 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
