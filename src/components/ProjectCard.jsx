import React from 'react';
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
  className = '',
  hasTapeLeft = false,
  hasTapeRight = false
}) {
  // Define themes matching user screenshots
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

  // Spring transition config
  const springTransition = { type: 'spring', stiffness: 60, damping: 15 };

  return (
    <motion.div
      className={`relative border-2 rounded-none p-6 md:p-8 flex flex-col justify-between overflow-hidden select-none ${themeClasses[theme]} ${className}`}
      style={{
        boxShadow: '4px 4px 0px 0px #1E1E1E',
      }}
      whileHover={{ 
        y: -4, 
        x: -4, 
        boxShadow: '8px 8px 0px 0px #1E1E1E' 
      }}
      whileTap={{ 
        y: 0, 
        x: 0, 
        boxShadow: '4px 4px 0px 0px #1E1E1E' 
      }}
      transition={springTransition}
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
        <div className="flex justify-between items-center mb-6 font-mono text-[10px] tracking-widest uppercase opacity-80">
          <span className="px-2 py-0.5 border border-current font-bold">{year}</span>
          <span>{category}</span>
        </div>

        {/* Title & Body */}
        <h3 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-none">
          {title}
        </h3>
        
        <p className="font-sans text-sm md:text-base leading-relaxed opacity-90 mb-4">
          {description}
        </p>

        {quote && (
          <div className={`font-mono text-xs italic pl-3 border-l-2 border-current/30 py-2 my-4 leading-relaxed ${quoteClass}`}>
            "{quote}"
          </div>
        )}
      </div>

      <div className="mt-auto">
        {/* Spacer Line */}
        <div className={`w-full border-t ${lineClass} my-5`} />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border rounded-none transition-colors duration-200 ${tagClass}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spacer Line */}
        <div className={`w-full border-t ${lineClass} mb-5`} />

        {/* Footer */}
        <div className="flex justify-between items-center font-mono text-xs font-semibold">
          {linkText === 'PRIVATE REPO —' ? (
            <span className="opacity-50 select-none cursor-default">{linkText}</span>
          ) : (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-terracotta hover:underline transition-all duration-200"
            >
              {linkText}
            </a>
          )}
          <span className="opacity-60">{index}</span>
        </div>
      </div>
    </motion.div>
  );
}
