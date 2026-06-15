import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Coffee, Layers, Sparkles, Compass } from 'lucide-react';

// Import project screenshots
import knowbotMockup from '../assets/knowbot_mockup.png';
import nutriscannMockup from '../assets/nutriscann_mockup.png';
import medicoreMockup from '../assets/medicore_mockup.png';

export function BentoGrid({ onContactClick }) {
  const cardTransition = { type: 'spring', stiffness: 60, damping: 15 };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: cardTransition }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto"
    >
      {/* 1. Hero Introduction Card (col-span-2, row-span-2) */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E1E' }}
        transition={cardTransition}
        className="md:col-span-2 md:row-span-2 bg-oatmeal text-charcoal p-8 border-2 border-charcoal flex flex-col justify-between"
        style={{ boxShadow: '4px 4px 0px 0px #1E1E1E' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-6 text-terracotta">
            <Sparkles className="w-5 h-5" />
            <span className="font-mono text-sm uppercase tracking-wider font-semibold">Dev Manifesto</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6 text-charcoal">
            I build software that <span className="underline decoration-terracotta decoration-wavy decoration-3 underline-offset-4">defies gravity</span>.
          </h1>
          <p className="font-sans text-base leading-relaxed text-charcoal/90 mb-4">
            Hi, I'm Aum. I don't build generic web pages, and I don't write vibe-coded AI templates. I build human-centric interactive digital spaces. My work balances at the intersection of robust engineering systems and high-comfort, organic aesthetics.
          </p>
          <p className="font-sans text-base leading-relaxed text-charcoal/90">
            For me, code is physical. It should have weight, friction, and fluid dynamics. By mixing web architectures with WebGL physics, we can turn standard interfaces into responsive playgrounds.
          </p>
        </div>
        
        <div className="mt-8 flex gap-4">
          <a 
            href="#projects" 
            className="px-5 py-2.5 bg-terracotta text-oatmeal border-2 border-charcoal font-semibold text-sm hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200"
          >
            Explore Projects
          </a>
          <button 
            onClick={onContactClick} 
            className="px-5 py-2.5 bg-transparent text-charcoal border-2 border-charcoal font-semibold text-sm hover:bg-charcoal hover:text-oatmeal cursor-pointer transition-all duration-200"
          >
            Read Manifest
          </button>
        </div>
      </motion.div>

      {/* 2. Current Obsessions/Now (col-span-1, row-span-2) */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E1E' }}
        transition={cardTransition}
        className="md:col-span-1 md:row-span-2 bg-oatmeal text-charcoal p-8 border-2 border-charcoal flex flex-col justify-between"
        style={{ boxShadow: '4px 4px 0px 0px #1E1E1E' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-6 text-terracotta">
            <Coffee className="w-5 h-5" />
            <span className="font-mono text-sm uppercase tracking-wider font-semibold">Current Obsessions</span>
          </div>
          <h2 className="font-serif text-3xl font-bold mb-6 text-charcoal">What I'm focused on:</h2>
          <ul className="space-y-4 font-sans text-sm">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-1.5 bg-terracotta flex-shrink-0"></span>
              <div>
                <strong>Asynchronous Architecture:</strong> Architecting high-throughput, event-driven systems using Node.js and event-loop optimizations.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-1.5 bg-terracotta flex-shrink-0"></span>
              <div>
                <strong>Algorithmic Efficiency:</strong> Deep-diving into Data Structures & Algorithms to optimize memory footprint and runtime complexity.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-1.5 bg-terracotta flex-shrink-0"></span>
              <div>
                <strong>Synent Tech Insights:</strong> Hardening my production code with enterprise backend patterns from my engineering internship.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-1.5 bg-terracotta flex-shrink-0"></span>
              <div>
                <strong>Green Tea:</strong> Specifically organic Japanese Genmaicha.
              </div>
            </li>
          </ul>
        </div>
        
        <div className="mt-8 border-t-2 border-charcoal/10 pt-6 font-mono text-xs text-charcoal/60">
          Last updated: June 2026.
        </div>
      </motion.div>

      {/* 3. Project Showcase Header */}
      <div className="col-span-1 md:col-span-3 mt-16 mb-2">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-sm text-terracotta font-semibold">01</span>
          <h2 id="projects" className="font-serif text-3xl md:text-4xl font-extrabold text-oatmeal">
            Selected Work
          </h2>
          <div className="flex-1 h-0.5 bg-oatmeal/20"></div>
        </div>
        <p className="text-oatmeal/75 text-xs font-mono mb-8 uppercase tracking-widest">
          3 projects · 2024-2025 · hover the cards. they do a little thing.
        </p>
      </div>

      {/* 4. Projects Cards Grid */}
      <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
        {/* Card 1: KnowBot (full-width) */}
        <motion.div variants={itemVariants} className="w-full">
          <ProjectCard 
            year="2025"
            category="AI / ENTERPRISE"
            title="KnowBot"
            description="Enterprise knowledge management platform built for Indian IT SMEs — the kind of companies where tribal knowledge lives inside one guy's head and he's about to quit. Upload docs, ask questions in plain English (or Hindi), get answers that actually cite sources. Built for Google Solution Challenge 2026 under SDG 8. Deployed. Real users. Actual stakes."
            quote="The hardest part wasn't the RAG pipeline — it was getting Sarvam AI's STT to handle Gujarati-accented Hindi without hallucinating entire sentences."
            tags={["REACT + VITE", "FASTAPI", "LANGCHAIN", "GEMINI 2.0 FLASH", "QDRANT CLOUD", "SARVAM AI", "AWS EC2", "VERCEL"]}
            linkText="VIEW ON GITHUB ↗"
            link="https://github.com/Aum3136/KnowBot"
            index="01 / 03"
            theme="light"
            imageUrl={knowbotMockup}
            hasTapeLeft={true}
          />
        </motion.div>

        {/* Card 2: NutriScann (full-width) */}
        <motion.div variants={itemVariants} className="w-full">
          <ProjectCard 
            year="2025"
            category="AI VISION - COLLAB"
            title="NutriScann"
            description="Snap a photo of literally any food — a plate of dal, a KitKat, your mum's sabzi — and get a full nutrition breakdown. Built with Zeel Damasiya. Gemini Vision does the heavy lifting. We spent two days making it work in bad restaurant lighting. Worth it."
            quote="Firebase auth went in at 2am the night before the deadline. The commit message just says 'auth i think'."
            tags={["REACT 19", "TYPESCRIPT", "GEMINI VISION", "FIREBASE", "NODE.JS", "TAILWIND CSS"]}
            linkText="VIEW ON GITHUB ↗"
            link="https://github.com/Aum3136/NutriScann"
            index="02 / 03"
            theme="dark"
            imageUrl={nutriscannMockup}
            hasTapeRight={true}
          />
        </motion.div>

        {/* Card 3: MediCore / Healix (full-width) */}
        <motion.div variants={itemVariants} className="w-full">
          <ProjectCard 
            year="2024"
            category="DBMS - UNIVERSITY"
            title="MediCore / Healix"
            description="Full hospital management system — patient intake, doctor scheduling, billing, discharge records — in PHP and MySQL. University DBMS project. No fancy framework, just raw SQL joins, stored procedures, and XAMPP running at 3am while the mysqli extension refused to load."
            quote="Taught me more about normalization and schema design than 8 months of lectures. Also taught me that PHP is fine, actually."
            tags={["PHP", "MYSQL", "HTML / CSS / JS", "XAMPP", "PL/SQL"]}
            linkText="PRIVATE REPO —"
            link="#"
            index="03 / 03"
            theme="accent"
            imageUrl={medicoreMockup}
            hasTapeLeft={true}
            hasTapeRight={true}
          />
        </motion.div>
      </div>

      {/* 5. Scrapbook / Skills & Philosophy (Grid system details) */}
      <div className="col-span-1 md:col-span-3 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coordinates / Location */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E1E' }}
          transition={cardTransition}
          className="bg-terracotta text-oatmeal p-8 border-2 border-charcoal flex flex-col justify-between"
          style={{ boxShadow: '4px 4px 0px 0px #1E1E1E' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-5 h-5 text-oatmeal" />
              <span className="font-mono text-sm uppercase tracking-wider font-semibold text-oatmeal/90">Coordinates</span>
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4 text-oatmeal">Location</h2>
            <p className="font-sans text-sm leading-relaxed mb-6">
              Operating remotely from a sunlit study in Vadodara, Gujarat, India. Available for selective engineering consultations worldwide.
            </p>
          </div>
          <div className="font-mono text-xs bg-charcoal text-oatmeal p-3 border border-charcoal">
            LAT: 22.3072° N / LON: 73.1812° E
          </div>
        </motion.div>

        {/* Card 4: Open to Opportunities */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E1E' }}
          className="bg-oatmeal text-charcoal p-8 border-2 border-charcoal flex flex-col justify-between"
          style={{ boxShadow: '4px 4px 0px 0px #1E1E1E' }}
          transition={cardTransition}
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta font-bold">STATUS</span>
            <h3 className="font-serif text-2xl font-bold mt-2 mb-4 text-charcoal">Open to Opportunities</h3>
            <p className="font-sans text-xs leading-relaxed text-charcoal/80">
              Looking for engineering positions where I can bridge WebGL, creative frontends, and robust full-stack pipelines. Let's make something memorable.
            </p>
          </div>
          <div className="mt-6">
            <button 
              onClick={onContactClick} 
              className="block w-full text-center font-mono text-xs font-semibold py-2 bg-charcoal text-oatmeal hover:bg-terracotta cursor-pointer transition-colors duration-200"
            >
              CONTACT_ME.LOG
            </button>
          </div>
        </motion.div>

        {/* System Design */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E1E' }}
          transition={cardTransition}
          className="bg-oatmeal text-charcoal p-8 border-2 border-charcoal flex flex-col justify-between"
          style={{ boxShadow: '4px 4px 0px 0px #1E1E1E' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-6 text-terracotta">
              <Layers className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider font-semibold">System Design</span>
            </div>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal">The Comfort Ratio: 60-30-10</h2>
            <p className="font-sans text-sm leading-relaxed text-charcoal/85">
              This portfolio is visual comfort personified. Dominant Sage Green relaxes the optic nerve. Warm Oatmeal secondary panels host clean typographic grids. Terracotta orange is strictly isolated to draw the eye to critical CTA nodes. No generic templates, no AI-generated gradients. Pure architectural balance.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono">
            <span className="px-3 py-1 bg-sage/20 border border-charcoal/20">60% Muted Sage</span>
            <span className="px-3 py-1 bg-oatmeal border border-charcoal/20">30% Oatmeal Cream</span>
            <span className="px-3 py-1 bg-terracotta text-oatmeal">10% Terracotta Orange</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
