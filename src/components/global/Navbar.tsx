'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import TerminalButton from './TerminalButton';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Process', href: '#process' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Lock body scroll and handle ESC key when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeMobileMenu();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen, closeMobileMenu]);

  // Hide the public navbar on all admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Identity */}
        <Link 
          href="/" 
          onClick={closeMobileMenu}
          className="relative z-50 flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80] rounded-md px-1"
        >
          <span className="w-2 h-2 rounded-full bg-[#4ade80] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors font-mono">
            FW <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">LABS</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 relative bg-white/[0.02] border border-white/[0.06] rounded-full px-2 py-1 backdrop-blur-md">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-white transition-colors duration-200 z-10"
            >
              {link.name}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/[0.08] border border-white/10 rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Action Button */}
        <div className="hidden md:flex items-center">
          <TerminalButton className="px-5 py-2 rounded-full text-xs" />
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="md:hidden relative z-50 p-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-zinc-100" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 w-full h-dvh bg-zinc-950/95 flex flex-col justify-between z-40 px-6 pt-28 pb-10"
            >
              {/* Background Glow in Mobile Menu */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4ade80]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Navigation Links */}
              <div className="flex flex-col gap-6 relative z-10">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  DIRECTORY // NAVIGATION
                </span>
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between text-2xl font-bold tracking-tight text-zinc-300 hover:text-white transition-colors py-2 border-b border-white/[0.06]"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#4ade80] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Menu Footer & CTA */}
              <div className="flex flex-col gap-5 pt-8 border-t border-white/[0.08] relative z-10">
                <TerminalButton
                  onClick={closeMobileMenu}
                  className="w-full py-3.5 text-sm rounded-full"
                />
                <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500">
                  <span>EST // 2024</span>
                  <span className="text-[#4ade80] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                    STATUS ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}