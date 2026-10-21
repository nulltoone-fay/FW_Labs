
export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-mono">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border border-border rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-[#4ade80] animate-pulse rounded-full" />
        </div>
        <div className="text-[10px] text-muted tracking-widest uppercase flex items-center gap-2">
          Initializing System
          <span className="flex gap-0.5">
            <span className="animate-[bounce_1s_infinite_0ms]">.</span>
            <span className="animate-[bounce_1s_infinite_200ms]">.</span>
            <span className="animate-[bounce_1s_infinite_400ms]">.</span>
          </span>
        </div>
      </div>
    </div>
  );
}