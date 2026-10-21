'use client';

import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { MouseEvent, useRef, useState, useEffect } from 'react';

interface ServiceData {
  id: string;
  code: string;
  title: string;
  description: string;
  outcome: string;
  capabilities: string[];
}

const services: ServiceData[] = [
  {
    id: '01',
    code: 'WEB',
    title: 'High-Performance Web Design',
    description: 'Bespoke corporate websites and marketing flagships engineered for extreme conversion rates, brand authority, and instant page loads.',
    outcome: '99+ Lighthouse Core Web Vitals Guaranteed',
    capabilities: ['Custom Next.js Engineering', 'Interactive 3D / WebGL Scenes', 'Headless CMS Integration', 'Enterprise Technical SEO'],
  },
  {
    id: '02',
    code: 'APP',
    title: 'Custom Web Applications',
    description: 'Complex SaaS platforms, internal operational portals, and high-throughput web apps built around your exact commercial business model.',
    outcome: 'Sub-100ms API Response & Realtime Sync',
    capabilities: ['Full-Stack SaaS Architecture', 'Microservices & Custom REST/GraphQL APIs', 'Relational & NoSQL Database Design', 'Role-Based Authentication (RBAC)'],
  },
  {
    id: '03',
    code: 'AUT',
    title: 'AI Workflows & Automation',
    description: 'Autonomous agentic systems, LLM integrations, and custom pipeline workflows that eliminate manual operational overhead.',
    outcome: '80% Reduction in Repetitive Workflows',
    capabilities: ['Autonomous AI Agent Workflows', 'Internal Knowledge-Base RAG Systems', 'Automated CRM & Operations Pipelines', 'Predictive Analytics & Data Routing'],
  },
  {
    id: '04',
    code: 'COM',
    title: 'Scalable E-Commerce Engines',
    description: 'Headless storefronts and multi-currency payment platforms architected for frictionless checkouts and high-volume order spikes.',
    outcome: '+35% Average Mobile Checkout Conversion',
    capabilities: ['Headless Shopify & Custom Storefronts', 'Stripe Global Checkout & Subscriptions', 'Realtime Inventory Synchronization', 'Custom Cart Flow & Edge Optimization'],
  },
];

function ServiceModule({ service, index }: { service: ServiceData; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 30 });
  const background = useMotionTemplate`radial-gradient(450px circle at ${springX}px ${springY}px, rgba(74, 222, 128, 0.08), transparent 80%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const handleInquire = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative p-7 sm:p-9 lg:p-10 rounded-2xl border transition-all duration-500 flex flex-col justify-between overflow-hidden bg-zinc-950/60 backdrop-blur-sm group ${
        isHovered ? 'border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)]' : 'border-white/[0.08]'
      }`}
    >
      {/* Dynamic Cursor Spotlight (Desktop) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{ background }}
        animate={{ opacity: !isMobile && isHovered ? 1 : 0 }}
      />

      {/* Subtle Corner Accents */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#4ade80] transition-opacity duration-300 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#4ade80] transition-opacity duration-300 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Service Header Info */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8 text-[11px] font-mono tracking-widest uppercase">
          <span className="text-zinc-400">
            SERVICE // {service.id} <span className="text-white font-semibold ml-2">{service.code}</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono">STATUS</span>
            <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-zinc-100 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-6 font-normal">
          {service.description}
        </p>

        {/* Measurable Client Outcome Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#4ade80] mb-8">
          <span>⚡</span>
          <span>{service.outcome}</span>
        </div>
      </div>

      {/* Capabilities Checklist */}
      <div className="relative z-10 pt-6 border-t border-white/[0.08]">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {service.capabilities.map((cap, i) => (
            <li key={i} className="text-xs sm:text-sm font-mono text-zinc-400 group-hover:text-zinc-300 flex items-center gap-2.5 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/70 shrink-0" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>

        {/* Inquire Action */}
        <button
          onClick={handleInquire}
          className="text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer group/btn"
        >
          <span>Start this service</span>
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1 text-[#4ade80]">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36 bg-background overflow-hidden border-t border-white/[0.08]">
      
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_30%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 tracking-widest mb-4 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
              CAPABILITIES & EXPERTISE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              ENGINEERING<br />SERVICES
            </h2>
          </div>
          
          <div className="flex flex-col gap-2 text-[11px] font-mono text-zinc-400 tracking-widest text-left md:text-right uppercase">
            <div className="text-white font-semibold">FW LABS / CORE 01</div>
            <div className="flex items-center md:justify-end gap-2">
              STATUS <span className="text-[#4ade80]">ACCEPTING CLIENTS</span>
            </div>
            <div className="text-zinc-500">CUSTOM SCOPES AVAILABLE</div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceModule key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}