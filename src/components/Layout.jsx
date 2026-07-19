import React, { useState } from 'react';

export function Layout({ children, heroCanvas, onContactClick, onHomeClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-sage text-oatmeal w-full select-none selection:bg-terracotta selection:text-oatmeal layout-main-wrapper">
      {/* 3D background scene */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 hero-canvas-wrapper">
        {heroCanvas}
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-16 layout-content-wrapper">
        {/* Navigation header */}
        <header className="relative flex justify-between items-center w-full mb-16 md:mb-24 layout-header">
          <div onClick={onHomeClick} className="flex items-center gap-3 cursor-pointer min-w-0">
            <div className="w-8 h-8 rounded-full bg-terracotta border-2 border-charcoal flex items-center justify-center font-bold text-sm text-oatmeal shadow-[2px_2px_0px_0px_#1E1E1E] shrink-0">
              α
            </div>
            <span className="font-semibold text-sm sm:text-lg tracking-wider uppercase font-sans select-none whitespace-nowrap overflow-hidden text-ellipsis layout-logo-text">
              Aum Pandya - my Portfolio
            </span>
          </div>

          {/* Hamburger Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-between w-6 h-4 cursor-pointer focus:outline-none z-50 group"
            aria-label="Toggle Menu"
          >
            <span className={`h-[3px] w-full bg-terracotta transition-all duration-300 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`h-[3px] w-full bg-terracotta transition-all duration-300 rounded-sm ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-[3px] w-full bg-terracotta transition-all duration-300 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
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
            <a 
              href="/blog.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-terracotta transition-colors duration-200"
            >
              Blog
            </a>
            <a 
              href="/Aum_Pandya_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-oatmeal text-charcoal border-2 border-charcoal shadow-[2px_2px_0px_0px_#1E1E1E] hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-pointer transition-all duration-200 active:translate-x-0 active:translate-y-0 font-semibold"
            >
              Resume
            </a>
            <button 
              onClick={onContactClick} 
              className="px-4 py-2 bg-terracotta text-oatmeal border-2 border-charcoal shadow-[2px_2px_0px_0px_#1E1E1E] hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-pointer transition-all duration-200 active:translate-x-0 active:translate-y-0"
            >
              Get In Touch
            </button>
          </nav>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-12 left-0 right-0 bg-oatmeal text-charcoal border-2 border-charcoal p-6 flex flex-col gap-4 shadow-[4px_4px_0px_0px_#1E1E1E] z-40 md:hidden">
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onHomeClick(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="hover:text-terracotta font-medium transition-colors duration-200 text-sm font-sans"
              >
                About
              </a>
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onHomeClick(); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="hover:text-terracotta font-medium transition-colors duration-200 text-sm font-sans"
              >
                Projects
              </a>
              <a 
                href="/blog.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-terracotta font-medium transition-colors duration-200 text-sm font-sans"
              >
                Blog
              </a>
              <div className="flex flex-col gap-2 mt-2">
                <a 
                  href="/Aum_Pandya_Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2 bg-oatmeal text-charcoal border-2 border-charcoal font-semibold text-center shadow-[2px_2px_0px_0px_#1E1E1E] hover:shadow-[4px_4px_0px_0px_#1E1E1E] transition-all duration-200 active:translate-x-0 active:translate-y-0 cursor-pointer"
                >
                  Resume
                </a>
                <button 
                  onClick={() => { setIsMenuOpen(false); onContactClick(); }} 
                  className="w-full py-2 bg-terracotta text-oatmeal border-2 border-charcoal font-semibold shadow-[2px_2px_0px_0px_#1E1E1E] hover:shadow-[4px_4px_0px_0px_#1E1E1E] transition-all duration-200 active:translate-x-0 active:translate-y-0 cursor-pointer"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          )}
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
            <a href="https://github.com/Aum3136" target="_blank" rel="noopener noreferrer" className="hover:text-oatmeal transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/aum-pandya-832269254" target="_blank" rel="noopener noreferrer" className="hover:text-oatmeal transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-oatmeal transition-colors">Twitter</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
