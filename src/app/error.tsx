'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error('System Fault:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center font-mono selection:bg-[#4ade80] selection:text-black">
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
          <span className="text-red-500 text-[10px] tracking-widest uppercase">Critical // 500</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground mb-6">
          System <br />Fault
        </h1>
        
        <p className="text-muted max-w-md mb-10 text-sm leading-relaxed">
          An unexpected error occurred while executing the sequence. Our telemetry has logged the fault.
        </p>
        
        <button 
          onClick={() => reset()}
          className="group flex items-center gap-3 text-xs tracking-widest text-foreground hover:text-[#4ade80] transition-colors uppercase border border-border/50 bg-[#050505] px-8 py-4"
        >
          <span className="text-muted/50 group-hover:text-[#4ade80]/50 transition-colors">[</span>
          Reboot Sequence
          <span className="text-muted/50 group-hover:text-[#4ade80]/50 transition-colors">]</span>
        </button>
      </div>
    </div>
  );
}