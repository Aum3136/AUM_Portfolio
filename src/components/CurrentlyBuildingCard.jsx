import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function CurrentlyBuildingCard({
  title,
  description,
  status, // 'Live' | 'In Progress'
  tags = [],
  link = '#',
  metrics = {}, // Key-value pairs for the back system specs
  className = ''
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = (e) => {
    // Prevent flip if clicking active links or buttons
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  const isLive = status.toLowerCase() === 'live';

  return (
    <div 
      className={`w-full h-[360px] cursor-pointer ${className}`}
      style={{ perspective: '1200px' }}
      onClick={handleCardClick}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 13 }}
      >
        {/* ==================== FRONT SIDE ==================== */}
        <div 
          className="absolute inset-0 w-full h-full border-2 border-charcoal rounded-none p-6 flex flex-col justify-between overflow-hidden bg-oatmeal text-charcoal"
          style={{ 
            backfaceVisibility: 'hidden',
            boxShadow: '4px 4px 0px 0px #1E1E1E',
          }}
        >
          <div>
            {/* Top Meta info */}
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-terracotta font-bold">
                [ ● {status.toUpperCase()} ]
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/50">
                ACTIVE_BUILD
              </span>
            </div>

            {/* Title & Body */}
            <h3 className="font-serif text-2xl font-black tracking-tight mb-2 text-charcoal">
              {title}
            </h3>
            
            <p className="font-sans text-xs leading-relaxed text-charcoal/85 mb-4">
              {description}
            </p>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 border border-charcoal/20 bg-charcoal/5 text-charcoal/80 transition-colors duration-200 hover:bg-charcoal hover:text-oatmeal"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-charcoal/10 flex justify-between items-center">
            <button 
              onClick={() => setIsFlipped(true)}
              className="font-mono text-[10px] font-semibold text-terracotta hover:underline cursor-pointer flex items-center gap-1"
            >
              SPECS 🔀
            </button>
            
            {isLive ? (
              <a 
                href={link.startsWith('http') ? link : `https://${link}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-[10px] font-bold px-2.5 py-1.5 border border-charcoal bg-terracotta text-oatmeal hover:bg-charcoal hover:text-oatmeal shadow-[2px_2px_0px_0px_#1E1E1E] transition-all duration-200"
              >
                LIVE URL ↗
              </a>
            ) : (
              <span className="font-mono text-[10px] font-bold px-2.5 py-1.5 border border-charcoal/30 bg-charcoal/5 text-charcoal/40 select-none cursor-default">
                BUILDING...
              </span>
            )}
          </div>
        </div>

        {/* ==================== BACK SIDE ==================== */}
        <div 
          className="absolute inset-0 w-full h-full border-2 border-charcoal rounded-none p-6 flex flex-col justify-between overflow-hidden bg-oatmeal text-charcoal"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '4px 4px 0px 0px #1E1E1E',
          }}
        >
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-charcoal/50 font-bold">
                [ TECHNICAL SPECS ]
              </span>
              <span className="font-mono text-[9px] text-terracotta font-bold">
                ● STATUS_{status.toUpperCase()}
              </span>
            </div>

            {/* Terminal Block */}
            <div className="bg-[#EFECE3] border border-charcoal/20 p-3 font-mono text-[10px] text-sage space-y-1 mt-2">
              <div className="text-charcoal/40 mb-1">// SYSTEM_METRICS</div>
              {Object.entries(metrics).map(([key, val]) => (
                <div key={key} className="truncate">
                  <span className="font-bold text-terracotta/90">&gt; {key.toUpperCase()}:</span>{' '}
                  <span className="text-charcoal/80">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-charcoal/10 flex justify-between items-center">
            <button 
              onClick={() => setIsFlipped(false)}
              className="font-mono text-[10px] font-bold px-2.5 py-1.5 border border-charcoal bg-[#F4F1EA] text-charcoal hover:bg-charcoal hover:text-oatmeal shadow-[2px_2px_0px_0px_#1E1E1E] cursor-pointer transition-all duration-200"
            >
              BACK ↩
            </button>
            
            {isLive ? (
              <a 
                href={link.startsWith('http') ? link : `https://${link}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-[10px] font-bold px-2.5 py-1.5 border border-charcoal bg-terracotta text-oatmeal hover:bg-charcoal hover:text-oatmeal shadow-[2px_2px_0px_0px_#1E1E1E] transition-all duration-200"
              >
                LIVE URL ↗
              </a>
            ) : (
              <span className="font-mono text-[10px] font-bold px-2.5 py-1.5 border border-charcoal/30 bg-charcoal/5 text-charcoal/40 select-none cursor-default">
                BUILDING...
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
