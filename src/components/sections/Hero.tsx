'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import TerminalButton from '@/components/global/TerminalButton';

// Lightweight non-blocking skeleton loader for instant FCP/LCP
function HeroSceneSkeleton() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),rgba(74,222,128,0.08)_40%,transparent_70%)] blur-2xl animate-pulse" />
    </div>
  );
}

// Dynamically import 3D Canvas without SSR to optimize Core Web Vitals
const CoreScene = dynamic(() => import('@/components/canvas/CoreScene'), {
  ssr: false,
  loading: () => <HeroSceneSkeleton />,
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause WebGL rendering loop when Hero section leaves the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    const currentRef = heroRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center overflow-x-clip overflow-y-hidden bg-background pt-28 pb-16 lg:py-0 border-b border-white/[0.06]"
    >
      {/* Ambient Multi-Layer Radial Glow Behind 3D Canvas */}
      <div className="absolute top-1/2 left-1/2 lg:left-[55%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] lg:w-[720px] lg:h-[720px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12),rgba(74,222,128,0.06)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
      
      {/* Secondary Depth Shadow */}
      <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <CoreScene isVisible={isVisible} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Content (Left 7 Columns on Desktop) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Live Studio Status Badge (Mobile / Tablet friendly) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md w-fit mb-6 text-xs font-mono text-zinc-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ade80]" />
              </span>
              <span className="tracking-widest uppercase text-[11px] text-zinc-200">
                AVAILABLE FOR Q4 / 2026 PROJECTS
              </span>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
              }}
              className="mb-6 md:mb-8"
            >
              <h1 className="flex flex-col tracking-tight">
                <motion.span 
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} 
                  className="text-lg sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent mb-2.5"
                >
                  Digital products,
                </motion.span>
                <motion.span 
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-foreground uppercase leading-[1.04] tracking-tight"
                >
                  Engineered to<br className="hidden sm:block" /> Perform.
                </motion.span>
              </h1>
            </motion.div>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl mb-8 md:mb-10 leading-relaxed font-normal"
            >
              High-performance websites, custom web applications, and intelligent software designed around the way your business works.
            </motion.p>

            {/* High-Conversion Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <TerminalButton className="w-full sm:w-auto h-12 md:h-13 px-8 text-sm" />
              
              <Link 
                href="#work" 
                className="w-full sm:w-auto h-12 md:h-13 flex items-center justify-center px-8 rounded-full text-sm font-medium border border-white/20 text-zinc-200 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/50 hover:text-white transition-all duration-300 shadow-sm group"
              >
                <span>View Our Work</span>
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  ↓
                </span>
              </Link>
            </motion.div>

            {/* Mobile / Tablet Responsive Studio Metadata Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex lg:hidden flex-wrap items-center gap-x-6 gap-y-2 mt-12 pt-6 border-t border-white/[0.08] text-[11px] font-mono text-zinc-400"
            >
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">LOC</span>
                <span className="text-zinc-200 font-medium">SRINAGAR, IN</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">CLIENTS</span>
                <span className="text-zinc-200 font-medium">GLOBAL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">STATUS</span>
                <span className="text-[#4ade80] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                  ONLINE
                </span>
              </div>
            </motion.div>

          </div>

          {/* Desktop Right Column: Protected Glassmorphic Studio HUD Card */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full max-w-xs p-6 rounded-2xl bg-zinc-950/75 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col gap-5 text-[11px] font-mono tracking-wider text-right"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-left">
                <span className="text-zinc-200 font-semibold uppercase">FW LABS / STUDIO</span>
                <span className="text-[10px] text-zinc-500">EST. 2024</span>
              </div>

              <div className="flex flex-col gap-1.5 text-zinc-400">
                <div className="flex justify-between">
                  <span className="text-zinc-500">HEADQUARTERS</span>
                  <span className="text-zinc-200">SRINAGAR, IN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">CLIENTELE</span>
                  <span className="text-zinc-200">US, EU & GLOBAL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">SPECIALTY</span>
                  <span className="text-zinc-200">NEXT.JS & AI</span>
                </div>
              </div>

              <div className="w-full h-px bg-white/[0.08]" />

              <div className="flex flex-col gap-2 text-zinc-400">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">STUDIO STATUS</span>
                  <span className="flex items-center gap-2 text-zinc-200 font-medium">
                    ONLINE
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_rgba(74,222,128,0.6)] animate-pulse" />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">STUDIO CAPACITY</span>
                  <span className="text-[#4ade80] font-medium">AVAILABLE</span>
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-3 text-[10px] text-zinc-500 flex justify-between">
                <span>01 STRATEGY</span>
                <span>02 DESIGN</span>
                <span>03 BUILD</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Refined Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-3 text-[10px] font-mono tracking-widest text-zinc-500 z-10 pointer-events-none"
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="relative w-12 h-px bg-white/20 overflow-hidden">
          <motion.div 
            animate={{ left: ['-100%', '100%'] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-y-0 w-4 bg-[#4ade80]"
          />
        </div>
      </motion.div>

    </section>
  );
}