'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'AUTHENTICATING' | 'DENIED'>('IDLE');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setStatus('AUTHENTICATING');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setStatus('DENIED');
        setPassword('');
        setTimeout(() => setStatus('IDLE'), 3000);
      }
    } catch {
      setStatus('DENIED');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-[#4ade80] selection:text-black">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-size-[2rem_2rem] opacity-50 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 font-mono"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="w-12 h-12 border border-[#4ade80]/30 rounded-full flex items-center justify-center mb-6">
            <div className="w-2 h-2 bg-[#4ade80] animate-pulse rounded-full" />
          </div>
          <h1 className="text-xl tracking-[0.2em] text-[#4ade80] uppercase">Admin Login</h1>
          <p className="text-[10px] text-muted tracking-widest mt-2 uppercase">Secure Access Required</p>
        </div>

        <form onSubmit={handleLogin} className="border border-border/50 bg-background/80 backdrop-blur-md p-8 flex flex-col gap-6 shadow-2xl">
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-muted tracking-widest uppercase">Username</label>
            <div className="flex items-center gap-3 border-b border-border/50 pb-2 focus-within:border-[#4ade80] transition-colors">
              <span className="text-[#4ade80]">&gt;</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={status === 'AUTHENTICATING'}
                className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted/30"
                autoFocus
                spellCheck={false}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-muted tracking-widest uppercase">Password</label>
            <div className="flex items-center gap-3 border-b border-border/50 pb-2 focus-within:border-[#4ade80] transition-colors">
              <span className="text-[#4ade80]">&gt;</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={status === 'AUTHENTICATING'}
                className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted/30"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-[10px] tracking-widest uppercase">
              {status === 'IDLE' && <span className="text-muted">Awaiting Input...</span>}
              {status === 'AUTHENTICATING' && <span className="text-[#4ade80] animate-pulse">Logging in...</span>}
              {status === 'DENIED' && <span className="text-red-500">Invalid Credentials</span>}
            </div>

            <button
              type="submit"
              disabled={status === 'AUTHENTICATING' || !username || !password}
              className="text-[10px] tracking-widest uppercase text-foreground hover:text-[#4ade80] transition-colors disabled:opacity-50"
            >
              [ Login ]
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}