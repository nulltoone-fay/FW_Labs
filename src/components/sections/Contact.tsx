'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { CheckCircle2, Send, AlertCircle, ArrowUpRight } from 'lucide-react';

const scopeOptions = [
  'Custom Web App',
  'Next.js Website',
  'AI & Automation',
  'E-Commerce Engine',
  'Enterprise Architecture',
];

const budgetOptions = [
  '< $5,000',
  '$5k – $15k',
  '$15k – $30k',
  '$30k+',
];

const timelineOptions = [
  'Immediate (< 1 Mo)',
  '1 – 2 Months',
  '2 – 3 Months',
  'Flexible',
];

export default function Contact() {
  const [selectedScope, setSelectedScope] = useState('Custom Web App');
  const [selectedBudget, setSelectedBudget] = useState('$5k – $15k');
  const [selectedTimeline, setSelectedTimeline] = useState('1 – 2 Months');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Honeypot spam trap
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please provide your name or organization.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid business email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 8) {
      setErrorMessage('Please share a few details about your project requirements.');
      return;
    }

    setSubmitStatus('processing');
    setProgress(15);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 85) return prev + Math.floor(Math.random() * 15 + 10);
        return prev;
      });
    }, 120);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType: selectedScope,
        budget: `${selectedBudget} (${selectedTimeline})`,
        message: formData.message.trim(),
        honeypot: formData.honeypot,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      clearInterval(progressTimer);

      if (res.ok && data.success) {
        setProgress(100);
        setTimeout(() => {
          setSubmitStatus('success');
        }, 300);
      } else {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }
    } catch (err: unknown) {
      clearInterval(progressTimer);
      setSubmitStatus('idle');
      setProgress(0);
      const msg = err instanceof Error ? err.message : 'Transmission failed. Please email us directly.';
      setErrorMessage(msg);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '', honeypot: '' });
    setSubmitStatus('idle');
    setProgress(0);
    setErrorMessage(null);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-background border-t border-white/[0.08] overflow-hidden">
      
      {/* Background Orbital Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.06),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 tracking-widest mb-4 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
            START YOUR PROJECT
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-6">
            LET&apos;S ENGINEER<br />SOMETHING EXCEPTIONAL.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed">
            Tell us about your product goals, desired timeline, and technical scope. We evaluate every inquiry directly and provide a structured technical proposal within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Form Console (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-10 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  /* Confirmed Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 sm:py-16 text-center flex flex-col items-center justify-center font-mono"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80] mb-6 shadow-[0_0_30px_rgba(74,222,128,0.4)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    
                    <span className="text-xs text-[#4ade80] uppercase tracking-widest mb-2">
                      TRANSMISSION CONFIRMED // ID: #FW-8024
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                      We Received Your Project Brief.
                    </h3>
                    <p className="text-zinc-400 max-w-md text-sm leading-relaxed mb-8">
                      Thank you for reaching out. An engineering lead will review your requirements and reply to <strong className="text-white">{formData.email}</strong> within 24 business hours.
                    </p>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider text-white bg-white/[0.06] border border-white/20 hover:bg-white/[0.12] transition-colors cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                  </motion.div>
                ) : (
                  /* Interactive Form */
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    
                    {/* Honeypot hidden input for spam bots */}
                    <input
                      type="text"
                      name="website_source_hp"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Step 1: Project Scope Selection */}
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        01 // What are you looking to build?
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {scopeOptions.map((scope) => (
                          <button
                            key={scope}
                            type="button"
                            onClick={() => setSelectedScope(scope)}
                            className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                              selectedScope === scope
                                ? 'bg-white text-zinc-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                : 'bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {scope}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Budget Range Selection */}
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        02 // Anticipated Budget Range (USD)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {budgetOptions.map((budget) => (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setSelectedBudget(budget)}
                            className={`py-2 px-3 text-center rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                              selectedBudget === budget
                                ? 'bg-[#4ade80] text-black font-semibold shadow-[0_0_15px_rgba(74,222,128,0.4)]'
                                : 'bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Timeline */}
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        03 // Target Timeline
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {timelineOptions.map((timeline) => (
                          <button
                            key={timeline}
                            type="button"
                            onClick={() => setSelectedTimeline(timeline)}
                            className={`py-2 px-3 text-center rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                              selectedTimeline === timeline
                                ? 'bg-white text-zinc-950 font-semibold'
                                : 'bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {timeline}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 4: Contact & Project Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
                      
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                          Your Name / Company *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Morgan / Acme Inc"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#4ade80] transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@acme.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#4ade80] transition-colors"
                        />
                      </div>

                    </div>

                    {/* Project Details */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Project Brief & Goals *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe what you want to achieve, key features, and any existing design/tech references..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#4ade80] transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    {/* Error Notice */}
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Progress Bar (during submission) */}
                    {submitStatus === 'processing' && (
                      <div className="flex flex-col gap-2">
                        <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#4ade80]"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-[#4ade80] tracking-wider uppercase">
                          ENCRYPTING & TRANSMITTING BRIEF... {progress}%
                        </span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                        Strict NDA & IP Privacy Protected
                      </div>

                      <button
                        type="submit"
                        disabled={submitStatus === 'processing'}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4ade80] hover:bg-[#5cf094] text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(74,222,128,0.4)] disabled:opacity-50 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Project Brief</span>
                      </button>
                    </div>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Right Column: Direct Channels & Studio Info (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Direct Studio Contact Card */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md flex flex-col gap-5 text-xs font-mono">
              <span className="text-zinc-500 uppercase tracking-widest text-[11px]">
                DIRECT CLIENT CHANNELS
              </span>
              
              <div className="flex flex-col gap-1">
                <span className="text-zinc-400">Founder Email:</span>
                <a 
                  href="mailto:faysalwani9086@gmail.com" 
                  className="text-white hover:text-[#4ade80] text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <span>faysalwani9086@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="w-full h-px bg-white/[0.06]" />

              <div className="flex flex-col gap-1">
                <span className="text-zinc-400">Location:</span>
                <span className="text-white">Srinagar, Jammu & Kashmir, IN</span>
                <span className="text-zinc-500 text-[10px]">Serving Clients Across US, EU & Global</span>
              </div>

              <div className="w-full h-px bg-white/[0.06]" />

              <div className="flex flex-col gap-1">
                <span className="text-zinc-400">Response SLA:</span>
                <span className="text-[#4ade80] font-semibold">&lt; 24 Hours Guaranteed</span>
              </div>
            </div>

            {/* Client Guarantee Card */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-white font-medium uppercase tracking-wider">
                <span className="text-[#4ade80]">★</span>
                <span>The FW Labs Standard</span>
              </div>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                We take on a limited number of clients per sprint to maintain founder-level code reviews, zero communication friction, and rapid delivery cycles.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}