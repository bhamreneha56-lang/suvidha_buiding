import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplet, Flame, Calculator, Home, User, Sun, Moon, Bell, Shield } from 'lucide-react';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'PNG Portal', path: '/dashboard', icon: <Droplet size={18} /> },
    { name: 'LPG Profile', path: '/lpg-profile', icon: <Flame size={18} /> },
    { name: 'Calculator', path: '/dashboard/gas-bills', icon: <Calculator size={18} /> },
    { name: 'Profile', path: '/profile', icon: <User size={18} /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell size={18} /> },
    { name: 'Admin', path: '/admin', icon: <Shield size={18} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50 transition-colors" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="brand-logo-flame-small text-white">
              <Flame size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-[var(--color-text)] leading-tight">Unified Gas Services</span>
              <span className="text-xxs text-[var(--color-text-muted)] font-medium">Customer Portal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={isActive(link.path) ? 'nav-link-active' : 'nav-link-inactive'}
              >
                {link.name}
              </Link>
            ))}
            
            <button onClick={toggleTheme} className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[var(--color-text)] transition-colors">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-[var(--color-text)]">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="text-[var(--color-text)]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] py-2">
            <div className="container mx-auto px-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    isActive(link.path) ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text)] hover:bg-[var(--color-border)]'
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}

            </div>
          </div>
        )}
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-[var(--color-text-muted)] text-sm">
          <p>© 2026 Methane Gas Services. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="hover:text-[var(--color-primary)] cursor-pointer">Support</span>
            <span className="hover:text-[var(--color-primary)] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[var(--color-primary)] cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
