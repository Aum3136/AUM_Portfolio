// Vercel deployment trigger
import React, { useState } from 'react';
import { StyleProvider } from './components/StyleProvider';
import { Layout } from './components/Layout';
import { HeroCanvas } from './components/HeroCanvas';
import { BentoGrid } from './components/BentoGrid';
import { ContactPage } from './components/ContactPage';
import { Cursor } from './components/Cursor';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' | 'contact'

  return (
    <StyleProvider>
      <Cursor />
      <Layout 
        heroCanvas={<HeroCanvas />}
        onContactClick={() => setCurrentView('contact')}
        onHomeClick={() => setCurrentView('portfolio')}
      >
        <AnimatePresence mode="wait">
          {currentView === 'portfolio' ? (
            <div key="portfolio" className="w-full flex flex-col items-center">
              {/* Intro Subtitle/Hook */}
              <div className="w-full mb-8 max-w-7xl text-left" id="about">
                <p className="font-mono text-xs text-terracotta uppercase tracking-widest font-bold mb-2">
                  [ PORTFOLIO ARCHITECTURE v2.6 ]
                </p>
                <div className="h-1 w-12 bg-terracotta mb-6"></div>
              </div>

              {/* Bento Grid layout */}
              <BentoGrid onContactClick={() => setCurrentView('contact')} />
            </div>
          ) : (
            <ContactPage key="contact" onClose={() => setCurrentView('portfolio')} />
          )}
        </AnimatePresence>
      </Layout>
      <Analytics />
    </StyleProvider>
  );
}

export default App;
