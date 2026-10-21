'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Tell TypeScript about our custom global function
declare global {
  interface Window {
    triggerFwTransition?: () => void;
  }
}

export default function SystemGrabOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Attach a direct method to the browser window
    window.triggerFwTransition = () => {
      setIsVisible(true);

      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        setIsVisible(false);
      }, 700);
    };

    // Cleanup
    return () => {
      delete window.triggerFwTransition;
    };
  }, []);

  const customEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-99999 pointer-events-none flex flex-col justify-end overflow-hidden">
          {/* Layer 1: Brand Green Curtain */}
          <motion.div
            key="green-curtain"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: customEase }}
            className="absolute inset-0 bg-[#4ade80]"
          />
          
          {/* Layer 2: Dark Foreground Primary Curtain */}
          <motion.div
            key="dark-curtain"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: customEase, delay: 0.1 }}
            className="absolute inset-0 bg-foreground flex items-center justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-background font-mono text-sm tracking-widest uppercase flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
              Initializing Sequence
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}