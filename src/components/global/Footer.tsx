'use client';

import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

const siteLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Process', href: '#process' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', handle: '@faysalwani' },
  { name: 'X / Twitter', href: 'https://twitter.com', handle: '@fay_salwani' },
  { name: 'LinkedIn', href: 'https://linkedin.com', handle: '/in/faysalwani' },
];

const emptySubscribe = () => () => {};

export default function Footer() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>('');
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          timeZone: 'UTC',
        }) + ' UTC'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hide public footer on all admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#070709] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Studio Branding Watermark */}
        <div className="mb-16 select-none overflow-hidden">
          <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-white uppercase leading-none opacity-90">
            FW <span className="text-white/10">LABS</span>
          </h2>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 border-b border-white/[0.08] pb-16 font-mono text-xs">
          
          {/* Column 1: Live Status & Location */}
          <div className="flex flex-col gap-4">
            <span className="text-zinc-500 tracking-widest uppercase text-[11px]">
              STUDIO // AVAILABILITY
            </span>
            <div className="flex flex-col gap-2 text-zinc-300">
              <div className="flex items-center gap-2.5 text-white font-medium">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_rgba(74,222,128,0.7)] animate-pulse" />
                <span>Available for New Projects</span>
              </div>
              <span className="text-zinc-400">Headquarters: Srinagar, IN</span>
              <span className="text-zinc-500 font-mono text-[11px]">{mounted ? time : '00:00:00 UTC'}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <span className="text-zinc-500 tracking-widest uppercase text-[11px]">
              QUICK // DIRECTORY
            </span>
            <nav className="flex flex-col gap-2.5">
              {siteLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="group flex items-center text-zinc-400 hover:text-white transition-colors w-fit"
                >
                  <span className="text-zinc-600 group-hover:text-[#4ade80] transition-colors mr-2">→</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Social Profiles */}
          <div className="flex flex-col gap-4">
            <span className="text-zinc-500 tracking-widest uppercase text-[11px]">
              CONNECT // SOCIAL
            </span>
            <nav className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-400 hover:text-white transition-colors max-w-[200px]"
                >
                  <span>{link.name}</span>
                  <span className="text-zinc-600 group-hover:text-[#4ade80] transition-colors text-[10px]">
                    {link.handle}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Direct Inquiries */}
          <div className="flex flex-col gap-4">
            <span className="text-zinc-500 tracking-widest uppercase text-[11px]">
              DIRECT // INQUIRIES
            </span>
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:faysalwani9086@gmail.com" 
                className="group text-white hover:text-[#4ade80] transition-colors w-fit flex items-center gap-1.5 font-medium text-xs sm:text-sm"
              >
                <span>faysalwani9086@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#4ade80] transition-colors" />
              </a>
              <p className="text-zinc-500 leading-relaxed text-xs">
                Independent engineering studio building high-performance web applications and digital infrastructure.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 font-mono text-[11px] tracking-widest uppercase text-zinc-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} FW LABS</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1 text-[#4ade80]" />
          </button>
        </div>

      </div>
    </footer>
  );
}