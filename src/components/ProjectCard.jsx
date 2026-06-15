import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ProjectCard({ 
  year,
  category,
  title,
  description,
  quote,
  tags = [],
  linkText = 'VIEW ON GITHUB ↗',
  link = '#',
  index,
  theme = 'light', // 'light' | 'dark' | 'accent'
  imageUrl, // New prop for project mockups
  className = '',
  hasTapeLeft = false,
  hasTapeRight = false
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const themeClasses = {
    light: 'bg-oatmeal text-charcoal border-charcoal',
    dark: 'bg-[#3A4C3E] text-oatmeal border-charcoal',
    accent: 'bg-terracotta text-oatmeal border-charcoal',
  };

  const lineClass = theme === 'light' ? 'border-charcoal/20' : 'border-oatmeal/20';
  const quoteClass = theme === 'light' ? 'text-terracotta/90' : 'text-oatmeal/90';
  
  const tagClass = theme === 'light' 
    ? 'border-charcoal/20 bg-charcoal/5 text-charcoal/90 hover:bg-charcoal hover:text-oatmeal' 
    : 'border-oatmeal/20 bg-oatmeal/5 text-oatmeal/90 hover:bg-oatmeal hover:text-charcoal';

  const handleCardClick = (e) => {
    // Prevent flip if clicking active links or buttons
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`w-full h-[520px] cursor-pointer ${className}`}
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
          className={`absolute inset-0 w-full h-full border-2 rounded-none p-6 md:p-8 flex flex-col justify-between overflow-hidden ${themeClasses[theme]}`}
          style={{ 
            backfaceVisibility: 'hidden',
            boxShadow: '4px 4px 0px 0px #1E1E1E',
          }}
        >
          {/* Tape Effects */}
          {hasTapeLeft && (
            <div className="absolute -top-2.5 left-8 w-14 h-5 bg-[#D5D2C8]/75 border border-charcoal/10 -rotate-3 z-10 shadow-sm" />
          )}
          {hasTapeRight && (
            <div className="absolute -top-2.5 right-8 w-14 h-5 bg-terracotta/40 border border-charcoal/10 rotate-3 z-10 shadow-sm" />
          )}

          <div>
            {/* Top Meta info */}
            <div className="flex justify-between items-center mb-4 font-mono text-[10px] tracking-widest uppercase opacity-80">
              <span className="px-2 py-0.5 border border-current font-bold">{year}</span>
              <span>{category}</span>
            </div>

            {/* Title & Body */}
            <h3 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-none text-current">
              {title}
            </h3>
            
            <p className="font-sans text-xs md:text-sm leading-relaxed opacity-95 mb-3 line-clamp-4">
              {description}
            </p>

            {quote && (
              <div className={`font-mono text-[11px] italic pl-3 border-l-2 border-current/30 py-1.5 my-3 leading-relaxed ${quoteClass}`}>
                "{quote}"
              </div>
            )}
          </div>

          <div className="mt-auto">
            {/* Spacer Line */}
            <div className={`w-full border-t ${lineClass} my-4`} />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 border rounded-none transition-colors duration-200 ${tagClass}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Spacer Line */}
            <div className={`w-full border-t ${lineClass} mb-4`} />

            {/* Footer */}
            <div className="flex justify-between items-center font-mono text-xs font-semibold">
              <button 
                onClick={() => setIsFlipped(true)}
                className="text-terracotta hover:underline cursor-pointer flex items-center gap-1"
              >
                FLIP FOR PREVIEW 🔀
              </button>
              <span className="opacity-60">{index}</span>
            </div>
          </div>
        </div>

        {/* ==================== BACK SIDE ==================== */}
        <div 
          className={`absolute inset-0 w-full h-full border-2 rounded-none p-6 md:p-8 flex flex-col justify-between overflow-hidden ${themeClasses[theme]}`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '4px 4px 0px 0px #1E1E1E',
          }}
        >
          {/* Mockup Landing Page/Screenshot */}
          <div className="relative w-full h-[60%] border-2 border-charcoal bg-charcoal/10 overflow-hidden shadow-[2px_2px_0px_0px_#1E1E1E]">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={`${title} mockup`} 
                className="w-full h-full object-contain select-none bg-[#1E1E1E]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-charcoal/60">
                [NO_PREVIEW_AVAILABLE]
              </div>
            )}
            
            {/* Tiny tape overlay at the top center of image */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-[#D5D2C8]/80 border border-charcoal/10 rotate-1 shadow-sm" />
          </div>

          <div className="flex-1 flex flex-col justify-center mt-4 text-left">
            <h4 className="font-serif text-2xl font-black mb-1 leading-tight text-current">{title}</h4>
            <p className="font-sans text-xs opacity-75 uppercase font-mono tracking-widest">{category} // PREVIEW_MODE</p>
          </div>

          <div>
            {/* Spacer Line */}
            <div className={`w-full border-t ${lineClass} my-4`} />

            {/* Footer Actions */}
            <div className="flex justify-between items-center">
              {linkText === 'PRIVATE REPO —' ? (
                <span className="font-mono text-xs opacity-50 select-none cursor-default">{linkText}</span>
              ) : (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-charcoal bg-terracotta text-oatmeal hover:bg-charcoal hover:text-oatmeal shadow-[2px_2px_0px_0px_#1E1E1E] transition-all duration-200"
                >
                  {linkText}
                </a>
              )}
              
              <button 
                onClick={() => setIsFlipped(false)}
                className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-charcoal bg-[#F4F1EA] text-charcoal hover:bg-charcoal hover:text-oatmeal shadow-[2px_2px_0px_0px_#1E1E1E] cursor-pointer transition-all duration-200"
              >
                DETAILS ↩
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
