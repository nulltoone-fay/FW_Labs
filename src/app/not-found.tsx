import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center font-mono selection:bg-[#4ade80] selection:text-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
          <span className="text-red-500 text-[10px] tracking-widest uppercase">Error // 404</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground mb-6">
          System <br />Not Found
        </h1>
        
        <p className="text-muted max-w-md mb-10 text-sm leading-relaxed">
          The requested URL coordinates do not exist within the FW Labs digital infrastructure. The page may have been moved or deleted.
        </p>
        
        <Link 
          href="/"
          className="group flex items-center gap-3 text-xs tracking-widest text-foreground hover:text-[#4ade80] transition-colors uppercase border border-border/50 bg-[#050505] px-8 py-4"
        >
          <span className="text-muted/50 group-hover:text-[#4ade80]/50 transition-colors">[</span>
          Return to Base
          <span className="text-muted/50 group-hover:text-[#4ade80]/50 transition-colors">]</span>
        </Link>
      </div>
    </div>
  );
}