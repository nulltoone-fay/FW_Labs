'use client';

import { MouseEvent, useState, useRef } from 'react';

interface TerminalButtonProps {
  className?: string;
  onClick?: () => void;
  text?: string;
}

export default function TerminalButton({
  className = '',
  onClick,
  text = 'Start a Project',
}: TerminalButtonProps) {
  const [buttonText, setButtonText] = useState(text);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [fixedWidth, setFixedWidth] = useState<number | undefined>(undefined);

  const handleStartProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (onClick) onClick();

    if (buttonRef.current) {
      setFixedWidth(buttonRef.current.offsetWidth);
    }

    const targetText = "[ INITIALIZING ]";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";
    let iteration = 0;
    
    const interval = setInterval(() => {
      setButtonText(
        targetText
          .split("")
          .map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return targetText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
        
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          
          setTimeout(() => {
            setIsTransitioning(false);
            setButtonText(text);
            setFixedWidth(undefined);
          }, 800);
        }, 200); 
      }

      iteration += 1 / 2.5; 
    }, 28);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleStartProject}
      style={{ width: fixedWidth ? `${fixedWidth}px` : 'auto' }}
      className={`
        group
        relative
        px-6 py-2.5 rounded-full
        font-mono
        text-xs sm:text-sm
        tracking-wider
        uppercase
        font-medium
        inline-flex
        items-center
        justify-center
        gap-2.5
        overflow-hidden
        whitespace-nowrap
        transition-all
        duration-300
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#4ade80]
        cursor-pointer
        ${
          isTransitioning 
            ? 'bg-[#4ade80] text-black shadow-[0_0_20px_rgba(74,222,128,0.6)] scale-[0.98]' 
            : 'bg-white text-zinc-950 hover:bg-[#4ade80] hover:text-black hover:shadow-[0_0_24px_rgba(74,222,128,0.4)]'
        }
        ${className}
      `}
    >
      <span className="relative z-10">{buttonText}</span>
      
      {!isTransitioning && (
        <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
  );
}