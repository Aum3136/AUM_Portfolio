import React from 'react';

export function Layout({ children, heroCanvas, onContactClick, onHomeClick }) {
  return (
    <div className="relative min-h-screen bg-sage text-oatmeal w-full select-none selection:bg-terracotta selection:text-oatmeal">
      {/* 3D background scene */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {heroCanvas}
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-16">
        {/* Navigation header */}
        <header className="flex justify-between items-center w-full mb-16 md:mb-24">
          <div onClick={onHomeClick} className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-terracotta border-2 border-charcoal flex items-center justify-center font-bold text-sm text-oatmeal shadow-[2px_2px_0px_0px_#1E1E1E]">
              α
            </div>
            <span className="font-semibold text-lg tracking-wider uppercase font-sans select-none">
              Aum Pandya - my Portfolio
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); onHomeClick(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
              className="hover:text-terracotta transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); onHomeClick(); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
              className="hover:text-terracotta transition-colors duration-200"
            >
              Projects
            </a>
            <button 
              onClick={onContactClick} 
              className="px-4 py-2 bg-terracotta text-oatmeal border-2 border-charcoal shadow-[2px_2px_0px_0px_#1E1E1E] hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-pointer transition-all duration-200 active:translate-x-0 active:translate-y-0"
            >
              Get In Touch
            </button>
          </nav>
        </header>

        {/* Content body */}
        <main className="flex-1 w-full flex flex-col justify-center">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t-2 border-oatmeal/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-oatmeal/60">
          <div>
            &copy; {new Date().getFullYear()} Aum Pandya. Handcrafted with React + R3F + GSAP.
          </div>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-oatmeal transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-oatmeal transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-oatmeal transition-colors">Twitter</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
