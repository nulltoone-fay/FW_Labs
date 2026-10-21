'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface ProjectType {
  _id?: string;
  buildId: string;
  title: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  status: string;
  coordinates: string;
  link: string;
  image?: string;
}

const featuredProjects: ProjectType[] = [
  {
    buildId: '01',
    title: 'NULL TO ONE',
    category: 'Interactive Learning Platform & Community',
    description: 'An interactive technical learning platform built for developer education. Features real-time code execution environments, streaming video architecture, and ultra-low latency collaboration rooms.',
    metrics: [
      { label: 'Core Web Vitals', value: '100 / 100' },
      { label: 'Edge Latency', value: '38ms' },
      { label: 'Retention Lift', value: '+142%' }
    ],
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'WebSockets'],
    status: 'PRODUCTION',
    coordinates: 'WEB // APP.01',
    link: 'https://fwlabs.vercel.app',
  },
  {
    buildId: '02',
    title: 'FW CORESYNC',
    category: 'Cloud Infrastructure & Agentic Telemetry',
    description: 'Autonomous cloud infrastructure dashboard engineered to monitor microservices, analyze real-time streaming telemetry, and automatically self-heal failing worker nodes with AI agents.',
    metrics: [
      { label: 'Deploy Speed', value: '10x Faster' },
      { label: 'Manual Ops Reduced', value: '85%' },
      { label: 'Availability', value: '99.99%' }
    ],
    tech: ['React 19', 'Next.js App Router', 'Python', 'Redis', 'Autonomous AI'],
    status: 'ACTIVE',
    coordinates: 'SYS // ENG.02',
    link: 'https://fwlabs.vercel.app',
  },
  {
    buildId: '03',
    title: 'AURORA COMMERCE',
    category: 'High-Velocity Headless E-Commerce',
    description: 'Global headless commerce engine engineered for instant edge page loads, localized multi-currency conversion, and zero-drop checkout pipelines capable of handling peak flash sales.',
    metrics: [
      { label: 'Checkout Conversion', value: '+34%' },
      { label: 'Average LCP', value: '0.65s' },
      { label: 'Cart Abandonment', value: '-22%' }
    ],
    tech: ['Next.js', 'Stripe API', 'Shopify Storefront', 'Tailwind CSS', 'Edge Functions'],
    status: 'LAUNCHED',
    coordinates: 'COM // D2C.03',
    link: 'https://fwlabs.vercel.app',
  }
];

function ProjectCard({ project, priority = false }: { project: ProjectType; priority?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 140 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);

  const hudX = useTransform(x, [0, 1], [-30, 30]);
  const hudY = useTransform(y, [0, 1], [-30, 30]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percentX = (e.clientX - rect.left) / rect.width;
    const percentY = (e.clientY - rect.top) / rect.height;
    x.set(percentX);
    y.set(percentY);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div className="group flex flex-col lg:flex-row gap-10 lg:gap-16 items-center border-t border-white/[0.08] pt-14 lg:pt-20 first:border-none first:pt-0">
      
      {/* Left Column: Project Overview & Metrics */}
      <div className="w-full lg:w-5/12 order-2 lg:order-1 flex flex-col">
        <div className="flex items-center gap-3 mb-6 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
          <span>PROJECT // {project.buildId}</span>
          <div className="w-6 h-px bg-white/20" />
          <span className="text-[#4ade80] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            {project.status}
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mb-3 leading-tight">
          {project.title}
        </h3>

        <div className="text-xs font-mono text-[#38bdf8] mb-6">
          {project.category}
        </div>
        
        <p className="text-zinc-400 leading-relaxed mb-8 text-sm sm:text-base font-normal">
          {project.description}
        </p>

        {/* Business Impact Metrics */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-8">
          {project.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-base sm:text-lg font-bold font-mono text-white tracking-tight">
                {metric.value}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tag) => (
            <span key={tag} className="text-xs font-mono px-3 py-1 rounded-md border border-white/[0.08] text-zinc-300 bg-white/[0.03]">
              {tag}
            </span>
          ))}
        </div>

        {/* Live Project CTA */}
        <div>
          <Link 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-mono tracking-widest text-white bg-white/[0.05] border border-white/20 hover:border-[#4ade80] hover:text-[#4ade80] hover:bg-white/[0.08] transition-all duration-300 uppercase group/link"
          >
            <span>Explore Case Study</span>
            <span className="inline-block transform transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Right Column: 3D Tilt Mockup Frame */}
      <div className="w-full lg:w-7/12 order-1 lg:order-2 perspective-[1500px]">
        <motion.div
          ref={containerRef}
          style={{ 
            rotateX: isMobile ? 0 : rotateX, 
            rotateY: isMobile ? 0 : rotateY 
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-16/10 rounded-2xl bg-[#09090c] border border-white/[0.1] flex items-center justify-center overflow-hidden cursor-crosshair group/screen shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle Grid Matrix */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />
          
          {/* Simulated Browser Frame */}
          <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/[0.1] rounded-xl bg-zinc-950/80 backdrop-blur-md flex flex-col transition-colors duration-500 group-hover/screen:border-white/25 overflow-hidden shadow-2xl">
            
            {/* Window Topbar */}
            <div className="h-9 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between px-4 text-[10px] font-mono text-zinc-400 select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-3 text-zinc-300 font-medium">{project.coordinates}</span>
              </div>
              <div className="uppercase text-[9px] text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                HTTPS // LIVE
              </div>
            </div>
            
            {/* Viewport Content */}
            <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-zinc-900/40 via-zinc-950 to-black">
              {project.image ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    priority={priority}
                    className="object-cover object-top opacity-70 group-hover/screen:opacity-100 transition-opacity duration-500"
                  />
                </div>
              ) : (
                /* Dynamic Architectural UI Mockup */
                <div className="flex flex-col justify-between h-full gap-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wider">
                        {project.title}
                      </div>
                      <div className="text-xs font-mono text-zinc-400 mt-1">
                        SYSTEM ARCHITECTURE & CLIENT METRICS
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-mono">
                      LATENCY: 42ms
                    </div>
                  </div>

                  {/* Mock Telemetry Bars */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 py-4">
                    {[94, 88, 98, 92].map((height, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="h-16 sm:h-24 bg-white/[0.04] rounded border border-white/[0.06] flex items-end p-1">
                          <motion.div 
                            initial={{ height: '30%' }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                            className="w-full bg-gradient-to-t from-[#4ade80]/20 to-[#4ade80] rounded-xs"
                          />
                        </div>
                        <span className="text-[9px] font-mono text-zinc-400 text-center">NODE 0{idx+1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 border-t border-white/[0.06] pt-3">
                    <span>SECURITY: SSL / TLS 1.3</span>
                    <span className="text-[#38bdf8]">FRAMEWORK: NEXT.JS 16</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Magnetic Hover HUD Pill (Desktop) */}
          {!isMobile && (
            <motion.div 
              className="absolute z-20 pointer-events-none opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300"
              style={{ x: hudX, y: hudY }}
            >
              <div className="bg-white text-zinc-950 text-xs font-mono px-4 py-2 rounded-full uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-1.5">
                <span>View Project</span>
                <span>↗</span>
              </div>
            </motion.div>
          )}
          
        </motion.div>
      </div>

    </div>
  );
}

export default function Work() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          // Merge API data with rich fallback structure if fields are missing
          const formatted = json.data.map((proj: ProjectType, idx: number) => ({
            ...featuredProjects[idx % featuredProjects.length],
            ...proj,
          }));
          setProjects(formatted);
        } else {
          setProjects(featuredProjects);
        }
      } catch {
        setProjects(featuredProjects);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <section id="work" className="py-28 sm:py-36 bg-background border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 tracking-widest mb-4 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
            PROVEN CLIENT IMPACT
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            SELECTED<br />WORKS & METRICS
          </h2>
        </div>

        {/* Dynamic Project Specimen List */}
        <div className="flex flex-col gap-20 sm:gap-28 lg:gap-36">
          {loading ? (
            <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase animate-pulse flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-ping" />
              Loading verified portfolio records...
            </div>
          ) : (
            projects.map((project, idx) => (
              <ProjectCard 
                key={project._id || project.buildId} 
                project={project} 
                priority={idx === 0}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}