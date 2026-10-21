'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ProcessPhase {
  id: string;
  phase: string;
  description: string;
  deliverables: string[];
  timeframe: string;
}

const processSteps: ProcessPhase[] = [
  {
    id: '01',
    phase: 'Discovery & Architecture Mapping',
    description: 'We align directly with your business goals, target conversion metrics, and technical constraints. We map the full database schema, component boundaries, and security model before a single line of production code is written.',
    deliverables: ['System Architecture Blueprint', 'Tech Stack & API Selection', 'Database & Entity ERD Mapping', 'Milestone Agreement'],
    timeframe: 'WEEK 01 - 02'
  },
  {
    id: '02',
    phase: 'UI/UX Design & Prototyping',
    description: 'Engineering meets aesthetic precision. We construct a bespoke, high-contrast design system with fluid typography, responsive layout specifications, and interactive micro-animations for client review and feedback.',
    deliverables: ['Figma Design System', 'Responsive Component Library', 'Interactive Clickable Prototype', 'Client Alignment & Sign-Off'],
    timeframe: 'WEEK 03 - 04'
  },
  {
    id: '03',
    phase: 'Full-Stack Engineering',
    description: 'The core development phase. We engineer the frontend with Next.js App Router, implement backend microservices, configure secure authentication, and optimize database indexing with strict typing throughout.',
    deliverables: ['Next.js / TypeScript Codebase', 'API & Third-party Integrations', 'State Management & Caching', 'Staging Environment Access'],
    timeframe: 'WEEK 05 - 08'
  },
  {
    id: '04',
    phase: 'QA, Security & Production Launch',
    description: 'End-to-end performance tuning, edge caching configuration, automated regression testing, and security hardening. We deploy to global CDN infrastructure with zero downtime and hand over full IP ownership.',
    deliverables: ['100% Core Web Vitals Optimization', 'Security & CSP Hardening', 'Production DNS Cutover', 'Handover & SLA Support'],
    timeframe: 'WEEK 09'
  }
];

function ProcessNode({ step, isLast }: { step: ProcessPhase; index: number; isLast: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

  return (
    <div ref={containerRef} className="relative flex gap-6 sm:gap-10 pb-20 sm:pb-28 last:pb-0">
      
      {/* Vertical Pipeline Tracker */}
      <div className="relative flex flex-col items-center">
        {/* Node */}
        <div className={`relative z-10 w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-zinc-950 ${
          isInView ? 'border-[#4ade80] shadow-[0_0_16px_rgba(74,222,128,0.6)]' : 'border-white/20'
        }`}>
          <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
            isInView ? 'bg-[#4ade80]' : 'bg-transparent'
          }`} />
        </div>
        
        {/* Connecting Line */}
        {!isLast && (
          <div className="absolute top-5 -bottom-20 sm:-bottom-28 w-px bg-white/10 overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-transparent via-[#4ade80] to-transparent absolute"
              initial={{ top: '-100%', height: '100%' }}
              animate={isInView ? { top: '100%' } : { top: '-100%' }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* Phase Card Content */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex-1 pt-0.5"
      >
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-white/[0.08] backdrop-blur-sm hover:border-white/20 transition-all duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
              PHASE // <span className="text-[#4ade80] font-semibold">{step.id}</span>
            </div>
            <div className={`text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-md border w-fit ${
              isInView ? 'text-white border-white/20 bg-white/[0.04]' : 'text-zinc-500 border-white/[0.06]'
            }`}>
              {step.timeframe}
            </div>
          </div>

          <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-4 uppercase transition-colors duration-300 ${
            isInView ? 'text-white' : 'text-zinc-200'
          }`}>
            {step.phase}
          </h3>
          
          <p className="text-zinc-400 leading-relaxed mb-6 text-sm sm:text-base font-normal">
            {step.description}
          </p>

          <div className="pt-5 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-3 block">
              PHASE DELIVERABLES:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {step.deliverables.map((item, i) => (
                <li key={i} className="text-xs sm:text-sm font-mono text-zinc-300 flex items-center gap-2">
                  <span className="text-[#4ade80] text-xs">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-36 bg-background border-t border-white/[0.08] overflow-hidden">
      
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Sticky Editorial Header */}
        <div className="w-full lg:w-4/12">
          <div className="lg:sticky lg:top-32 flex flex-col">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 tracking-widest mb-4 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
              CLIENT METHODOLOGY
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-6 leading-[1.05]">
              OUR<br />PROCESS
            </h2>
            
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-8 font-normal">
              Our engineering execution is transparent and systematic. We never guess, we don’t use fragile bloated templates, and every phase has verifiable checkpoints before rollout.
            </p>

            {/* Sticky Client Assurance Badges */}
            <div className="flex flex-col gap-3 p-6 rounded-2xl border border-white/[0.08] bg-zinc-950/70 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                <span className="text-zinc-400 uppercase">METHODOLOGY</span>
                <span className="text-[#4ade80] font-medium">LINEAR SPRINT</span>
              </div>
              <div className="w-full h-px bg-white/[0.06]" />
              <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                <span className="text-zinc-400 uppercase">CODE OWNERSHIP</span>
                <span className="text-white font-medium">100% CLIENT IP</span>
              </div>
              <div className="w-full h-px bg-white/[0.06]" />
              <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                <span className="text-zinc-400 uppercase">COMMUNICATION</span>
                <span className="text-white font-medium">DIRECT SLACK / ASYNC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scrolling Pipeline */}
        <div className="w-full lg:w-8/12">
          {processSteps.map((step, index) => (
            <ProcessNode 
              key={step.id} 
              step={step} 
              index={index} 
              isLast={index === processSteps.length - 1} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}