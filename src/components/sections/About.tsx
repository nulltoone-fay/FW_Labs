'use client';

import { motion } from 'framer-motion';

const principles = [
  {
    id: '01',
    title: 'Engineered for Performance',
    description: 'Every millisecond of latency costs conversions. We write lean, hand-crafted Next.js and React code without bloated dependencies, guaranteeing sub-second load times worldwide.',
  },
  {
    id: '02',
    title: 'Architected to Scale',
    description: 'We don’t build disposable prototypes. We design resilient microservices, normalized databases, and scalable edge infrastructure capable of handling millions of requests gracefully.',
  },
  {
    id: '03',
    title: 'High-Conversion UI/UX',
    description: 'Design serves commercial utility. We combine aesthetic polish with data-informed conversion patterns to turn first-time visitors into committed paying clients.',
  },
  {
    id: '04',
    title: 'Intelligent AI Automation',
    description: 'We integrate cutting-edge LLMs, autonomous agents, and automated data pipelines into your existing operational stack to eliminate human error and reduce ongoing operational overhead.',
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-background border-t border-white/[0.08] overflow-hidden">
      
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_100%_0%,#000_20%,transparent_80%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Who We Are & Studio Terminal */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 tracking-widest mb-6 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                ABOUT FW LABS
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.08] mb-6">
                Independent <br />
                <span className="bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">
                  Engineering
                </span><br />
                Studio.
              </h2>
              
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8 font-normal">
                Operating at the intersection of high-tier design and extreme technical performance. We build mission-critical digital platforms for founders and enterprises who refuse to compromise on quality, speed, and execution.
              </p>

              {/* Verified Credentials Bar */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.08]">
                  <div className="text-2xl font-bold font-mono text-white">100%</div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">In-House Engineering</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.08]">
                  <div className="text-2xl font-bold font-mono text-[#4ade80]">Global</div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">Client Footprint</div>
                </div>
              </div>

              {/* Studio Telemetry Console */}
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] font-mono text-xs text-zinc-400 tracking-wider flex flex-col gap-2.5 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-[10px] text-zinc-500">
                  <span>TERMINAL // STACK_INFO</span>
                  <span className="text-[#4ade80]">INITIALIZED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#4ade80]">&gt;</span>
                  <span>CORE: NEXT.JS 16 // TURBOPACK // REACT 19</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#4ade80]">&gt;</span>
                  <span>INFRASTRUCTURE: SERVERLESS EDGE / MONGODB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#4ade80]">&gt;</span>
                  <span className="text-white">AVAILABILITY: ACCEPTING NEW CLIENTS</span>
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-1.5 h-3.5 bg-[#4ade80] inline-block ml-1" 
                  />
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Core Principles Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {principles.map((principle, idx) => (
                <motion.div 
                  key={principle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="mb-4 text-[11px] font-mono tracking-widest uppercase flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <span className="text-zinc-400">PRINCIPLE // {principle.id}</span>
                      <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#4ade80] group-hover:shadow-[0_0_8px_rgba(74,222,128,0.6)] transition-all duration-300" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight group-hover:text-zinc-100 transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}