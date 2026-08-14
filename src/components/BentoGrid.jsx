import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { CurrentlyBuildingCard } from './CurrentlyBuildingCard';
import { Coffee, Layers, Sparkles, Compass } from 'lucide-react';

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Import project screenshots
import knowbotMockup from '../assets/knowbot_mockup.png';
import nutriscannMockup from '../assets/nutriscann_mockup.png';
import medicoreMockup from '../assets/medicore_mockup.png';
import slipstreamMockup from '../assets/slipstream_mockup.png';
import avatarImage from '../assets/avatar.jpg';

export function BentoGrid({ onContactClick }) {
  const cardTransition = { type: 'spring', stiffness: 60, damping: 15 };
  
  const [isColored, setIsColored] = useState(false);
  const [commits, setCommits] = useState([]);
  const [loadingCommits, setLoadingCommits] = useState(true);
  const [commitError, setCommitError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchCommits() {
      try {
        const cacheKey = 'github_commits_cache_v2';
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < 900000) { // 15 mins
            if (isMounted) {
              setCommits(data);
              setLoadingCommits(false);
            }
            return;
          }
        }

        const eventsRes = await fetch('https://api.github.com/users/Aum3136/events');
        if (!eventsRes.ok) throw new Error('Events API error');
        const events = await eventsRes.json();
        
        const pushEvents = events.filter(e => e.type === 'PushEvent').slice(0, 5);
        if (pushEvents.length === 0) {
          throw new Error('No push events found');
        }

        const commitPromises = pushEvents.map(async (event) => {
          const repoName = event.repo.name;
          const headSha = event.payload.head;
          const cleanRepo = repoName.replace('Aum3136/', '');
          
          try {
            const commitRes = await fetch(`https://api.github.com/repos/${repoName}/commits/${headSha}`);
            if (!commitRes.ok) {
              return {
                repo: cleanRepo,
                message: 'Pushed updates to main',
                time: timeAgo(event.created_at)
              };
            }
            const commitData = await commitRes.json();
            return {
              repo: cleanRepo,
              message: commitData.commit.message.split('\n')[0],
              time: timeAgo(event.created_at)
            };
          } catch (e) {
            return {
              repo: cleanRepo,
              message: 'Pushed updates to main',
              time: timeAgo(event.created_at)
            };
          }
        });

        const fetchedCommits = await Promise.all(commitPromises);
        if (isMounted) {
          setCommits(fetchedCommits);
          localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: fetchedCommits
          }));
        }
      } catch (err) {
        console.error('Error fetching GitHub activity:', err);
        if (isMounted) {
          setCommitError(true);
          const cached = localStorage.getItem('github_commits_cache_v2');
          if (cached) {
            const { data } = JSON.parse(cached);
            setCommits(data);
            setCommitError(false);
          }
        }
      } finally {
        if (isMounted) {
          setLoadingCommits(false);
        }
      }
    }

    fetchCommits();
    return () => {
      isMounted = false;
    };
  }, []);
  
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
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto bento-grid-container"
    >
      {/* 1. Hero Introduction Card (col-span-2, row-span-2) */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E1E' }}
        transition={cardTransition}
        className="md:col-span-2 md:row-span-2 bg-oatmeal text-charcoal p-8 border-2 border-charcoal flex flex-col justify-between bento-hero-card"
        style={{ boxShadow: '4px 4px 0px 0px #1E1E1E' }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between hero-columns-container">
          <div className="flex-1">
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
          
          {/* Polaroid Image Container */}
          <div 
            onTouchStart={() => setIsColored(true)}
            onTouchEnd={() => setIsColored(false)}
            onTouchCancel={() => setIsColored(false)}
            className="relative flex-shrink-0 mx-auto md:mx-0 mt-8 md:mt-0 rotate-[3deg] hover:rotate-0 transition-transform duration-300 select-none cursor-pointer"
          >
            {/* Terracotta Tape Effect at the Top */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-terracotta/90 border border-charcoal/30 -rotate-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] z-10 flex items-center justify-center font-mono text-[9px] text-oatmeal font-bold">
              aum_pandya.raw
            </div>
            {/* Polaroid Body */}
            <div className="bg-white p-3 pb-6 border-2 border-charcoal shadow-[4px_4px_0px_0px_#1E1E1E]">
              <div className="w-48 h-60 overflow-hidden border-2 border-charcoal bg-charcoal/10 relative">
                <img 
                  src={avatarImage} 
                  alt="Aum Pandya" 
                  className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${isColored ? 'grayscale-0' : 'grayscale'} hover:grayscale-0`} 
                />
              </div>
              <div className="mt-3 font-mono text-[10px] text-charcoal/70 text-center uppercase tracking-wider font-semibold">
                [ 22.3072° N, 73.1812° E ]
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-wrap gap-4">
          <a 
            href="#projects" 
            className="px-5 py-2.5 bg-terracotta text-oatmeal border-2 border-charcoal font-semibold text-sm hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200"
          >
            Explore Projects
          </a>
          <a 
            href="/Aum_Pandya_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-5 py-2.5 bg-oatmeal text-charcoal border-2 border-charcoal font-semibold text-sm hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200"
          >
            View Resume
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
        className="md:col-span-1 md:row-span-2 bg-oatmeal text-charcoal p-8 border-2 border-charcoal flex flex-col justify-between bento-obsessions-card"
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

      {/* 2.5 Currently Shipping Section Header & Strip */}
      <div className="col-span-1 md:col-span-3 mt-16 mb-2">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="font-mono text-sm md:text-base text-terracotta font-bold tracking-widest uppercase">
            [ 02 // CURRENTLY SHIPPING ]
          </h2>
          <div className="flex-1 h-0.5 bg-oatmeal/20"></div>
        </div>
        <p className="text-oatmeal/75 text-xs font-mono mb-6 uppercase tracking-widest">
          Active builds · Click cards to view technical specs
        </p>
      </div>

      <div className="col-span-1 md:col-span-3 flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none w-full pb-6 md:pb-0 min-w-0">
        <div className="w-[85vw] md:w-full shrink-0 snap-start snap-always">
          <CurrentlyBuildingCard
            title="Cafe Software"
            description="Multi-tenant café ordering SaaS, targeting Vadodara cafes."
            status="Live"
            tags={["React + Vite + TS", "Node/Express", "SQLite", "Railway"]}
            link="cafe-software.vercel.app"
            metrics={{
              tier: "Multi-Tenant SaaS",
              pricing: "₹499/month",
              database: "SQLite (WAL Mode)",
              hosting: "Railway",
              region: "BOM (Mumbai)"
            }}
          />
        </div>
        
        <div className="w-[85vw] md:w-full shrink-0 snap-start snap-always">
          <CurrentlyBuildingCard
            title="NutriScann"
            description="AI nutrition tracker using Gemini Vision to scan meals."
            status="In Progress"
            tags={["React 19", "TypeScript", "Firebase Auth", "Node/Express"]}
            link="#"
            metrics={{
              tier: "Collab Beta",
              vision: "Gemini Vision API",
              auth: "Firebase Auth",
              backend: "Node/Express",
              status: "Localhost Development"
            }}
          />
        </div>
        
        <div className="w-[85vw] md:w-full shrink-0 snap-start snap-always">
          <CurrentlyBuildingCard
            title="KnowBot"
            description="Enterprise RAG knowledge platform for Indian IT SMEs."
            status="Live"
            tags={["FastAPI", "LangChain", "Gemini 2.0 Flash", "Qdrant", "AWS EC2"]}
            link="knowbot3136.vercel.app"
            metrics={{
              tier: "Enterprise RAG",
              database: "Qdrant Vector DB",
              engine: "FastAPI + LangChain",
              llm: "Gemini 2.0 Flash",
              infrastructure: "AWS EC2"
            }}
          />
        </div>
      </div>

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
          4 projects · 2024-2026 · hover the cards. they do a little thing.
        </p>
      </div>

      {/* 4. Projects Cards Grid */}
      <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
        {/* Card 1: Slipstream Gateway (full-width) */}
        <motion.div variants={itemVariants} className="w-full">
          <ProjectCard 
            year="2026"
            category="LLM INFRASTRUCTURE / ROUTING"
            title="Slipstream Gateway"
            description="High-performance LLM middleware sitting between applications and multiple providers (Groq, Gemini, local Ollama). Reduces cost and latency while eliminating downtime risks through semantic caching, intelligent model routing, and automatic per-provider circuit breaking. Built with teammate Naitik Lavri."
            quote="Separating vector similarity search in ChromaDB from response payload storage in Redis kept semantic cache lookups under 4ms."
            highlights={[
              "Architected a 5-stage pipeline with zero-cost guardrails screening and sentence-transformers semantic cache (0.80 cosine threshold).",
              "Implemented granular per-provider circuit breakers (Open/Half-Open/Closed) and zero-dependency offline mock fallbacks."
            ]}
            tags={["FASTAPI", "CHROMADB", "REDIS", "SENTENCE-TRANSFORMERS", "GROQ API", "GEMINI API", "OLLAMA", "DOCKER COMPOSE"]}
            linkText="VIEW ON GITHUB ↗"
            link="https://github.com/Aum3136/slipstream-gateway"
            caseStudyLink="slipstream.html"
            index="01 / 04"
            theme="light"
            imageUrl={slipstreamMockup}
            hasTapeLeft={true}
          />
        </motion.div>

        {/* Card 2: KnowBot (full-width) */}
        <motion.div variants={itemVariants} className="w-full">
          <ProjectCard 
            year="2025"
            category="AI / ENTERPRISE"
            title="KnowBot"
            description="Enterprise knowledge management platform built for Indian IT SMEs — the kind of companies where tribal knowledge lives inside one guy's head and he's about to quit. Upload docs, ask questions in plain English (or Hindi), get answers that actually cite sources. Built for Google Solution Challenge 2026 under SDG 8. Deployed. Real users. Actual stakes."
            quote="The hardest part wasn't the RAG pipeline — it was getting Sarvam AI's STT to handle Gujarati-accented Hindi without hallucinating entire sentences."
            highlights={[
              "Developed a custom FastAPI RAG pipeline fetching source citations in under 1.2 seconds.",
              "Designed a hybrid search indexing structure combining Qdrant dense vectors and keyword match."
            ]}
            tags={["REACT + VITE", "FASTAPI", "LANGCHAIN", "GEMINI 2.0 FLASH", "QDRANT CLOUD", "SARVAM AI", "AWS EC2", "VERCEL"]}
            linkText="VIEW ON GITHUB ↗"
            link="https://github.com/Aum3136/KnowBot"
            caseStudyLink="knowbot.html"
            index="02 / 04"
            theme="dark"
            imageUrl={knowbotMockup}
            hasTapeRight={true}
          />
        </motion.div>

        {/* Card 3: NutriScann (full-width) */}
        <motion.div variants={itemVariants} className="w-full">
          <ProjectCard 
            year="2025"
            category="AI VISION - COLLAB"
            title="NutriScann"
            description="Snap a photo of literally any food — a plate of dal, a KitKat, your mum's sabzi — and get a full nutrition breakdown. Built with Zeel Damasiya. Gemini Vision does the heavy lifting. We spent two days making it work in bad restaurant lighting. Worth it."
            quote="Firebase auth went in at 2am the night before the deadline. The commit message just says 'auth i think'."
            highlights={[
              "Fine-tuned Gemini Vision prompts to classify complex Indian meals under poor restaurant lighting.",
              "Implemented responsive React client-side states for instant nutrition calculations."
            ]}
            tags={["REACT 19", "TYPESCRIPT", "GEMINI VISION", "FIREBASE", "NODE.JS", "TAILWIND CSS"]}
            linkText="VIEW ON GITHUB ↗"
            link="https://github.com/Aum3136/NutriScann"
            caseStudyLink="nutriscan.html"
            index="03 / 04"
            theme="light"
            imageUrl={nutriscannMockup}
            hasTapeLeft={true}
          />
        </motion.div>

        {/* Card 4: MediCore / Healix (full-width) */}
        <motion.div variants={itemVariants} className="w-full">
          <ProjectCard 
            year="2024"
            category="DBMS - UNIVERSITY"
            title="MediCore / Healix"
            description="Full hospital management system — patient intake, doctor scheduling, billing, discharge records — in PHP and MySQL. University DBMS project. No fancy framework, just raw SQL joins, stored procedures, and XAMPP running at 3am while the mysqli extension refused to load."
            quote="Taught me more about normalization and schema design than 8 months of lectures. Also taught me that PHP is fine, actually."
            highlights={[
              "Normalized relational database schemas into 3NF for patient records, billing, and scheduling.",
              "Wrote optimized PL/SQL triggers and stored procedures reducing query latency by 45%."
            ]}
            tags={["PHP", "MYSQL", "HTML / CSS / JS", "XAMPP", "PL/SQL"]}
            linkText="PRIVATE REPO —"
            link="#"
            index="04 / 04"
            theme="accent"
            imageUrl={medicoreMockup}
            hasTapeRight={true}
          />
        </motion.div>
      </div>

      {/* 4.5 Open Source Section */}
      <div className="col-span-1 md:col-span-3 mt-16 mb-2">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="font-mono text-sm md:text-base text-terracotta font-bold tracking-widest uppercase">
            [ OSS // OPEN SOURCE ]
          </h2>
          <div className="flex-1 h-0.5 bg-oatmeal/20"></div>
        </div>
        <p className="text-oatmeal/75 text-xs font-mono mb-6 uppercase tracking-widest">
          Public contributions · Community initiatives
        </p>
      </div>

      <motion.div 
        variants={itemVariants}
        className="col-span-1 md:col-span-3 flex flex-col md:flex-row gap-6 w-full bento-oss-container"
      >
        {/* Left Panel: Contribution Card */}
        <div className="w-full md:w-[65%] oss-left-panel p-8 border-2 border-charcoal bg-oatmeal text-charcoal flex flex-col justify-between bento-oss-left">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta font-bold">
                CONTRIBUTION #01
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-charcoal text-charcoal font-bold bg-[#EFECE3]">
                OPEN
              </span>
            </div>
            
            <h3 className="font-serif text-3xl font-extrabold mb-1 text-charcoal">
              AirDrawer
            </h3>
            
            <div className="font-mono text-xs text-charcoal/50 mb-4 select-all">
              github.com/AirDrawer/airdrawer
            </div>
            
            <p className="font-sans text-sm leading-relaxed text-charcoal/85 mb-6">
              AirDrawer is an open-source gesture-based drawing tool using MediaPipe Hands and WebGL. Contributed to the React + Vite frontend — worked on gesture detection pipeline and canvas rendering logic.
            </p>
          </div>
          
          <div className="mt-auto border-t border-charcoal/10 pt-4 flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-1.5">
              {["REACT", "VITE", "MEDIAPIPE", "WEBGL"].map((tag) => (
                <span 
                  key={tag} 
                  className="font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 border border-charcoal/20 bg-charcoal/5 text-charcoal/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <a 
              href="https://github.com/Aum3136/AirDrawer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-mono text-xs font-bold text-terracotta hover:underline flex items-center gap-1"
              data-cursor="link"
            >
              VIEW ON GITHUB →
            </a>
          </div>
        </div>

        {/* Right Panel: Commitment Statement Card */}
        <div className="w-full md:w-[35%] bg-[#4A5C4E] text-oatmeal p-8 border-2 border-charcoal flex flex-col justify-between rounded-none bento-oss-right">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-oatmeal/60 block mb-6">
              // CONTRIBUTOR MINDSET
            </span>
            <p className="font-serif text-lg md:text-xl italic leading-relaxed text-oatmeal/95 mb-6">
              "One contribution in. This is just the start.<br /><br />
              I plan to go deeper — bug fixes, feature PRs, documentation, and eventually maintaining something others depend on. Open source is how I intend to earn credibility the honest way."
            </p>
          </div>
          <div className="mt-auto border-t border-oatmeal/20 pt-4 font-mono text-[9px] text-oatmeal/50 uppercase tracking-wider">
            Next target: find a repo I use daily and fix something that's been bothering me.
          </div>
        </div>
      </motion.div>

      {/* 5. Scrapbook / Skills & Philosophy (Grid system details) */}
      <div className="col-span-1 md:col-span-3 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 scrapbook-grid-container">
        {/* Coordinates / Location */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E1E' }}
          transition={cardTransition}
          className="bg-terracotta text-oatmeal p-8 border-2 border-charcoal flex flex-col justify-between bento-location-card"
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
          className="bg-oatmeal text-charcoal p-8 border-2 border-charcoal flex flex-col justify-between bento-status-card"
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
          className="bg-oatmeal text-charcoal p-8 border-2 border-charcoal flex flex-col justify-between bento-system-card"
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

        {/* Card 5: GitHub Activity Feed */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E1E' }}
          className="col-span-1 md:col-span-3 bg-oatmeal text-charcoal p-8 border-2 border-charcoal relative flex flex-col justify-between bento-github-card"
          style={{ boxShadow: '4px 4px 0px 0px #1E1E1E' }}
          transition={cardTransition}
          data-cursor="link"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta font-bold">GITHUB ACTIVITY</span>
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-terracotta font-semibold">
                <span>↻ live</span>
                <span className="w-1.5 h-1.5 bg-terracotta rounded-full animate-pulse"></span>
              </div>
            </div>
            
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-charcoal">Latest Repository Commits</h3>
            <p className="font-sans text-xs text-charcoal/70 mb-6 max-w-2xl">
              Live stream of recent pushes and commits across my active public repositories. Cached locally to preserve API rate-limits.
            </p>

            {/* Terminal Screen Container */}
            <div className="bg-charcoal text-oatmeal p-5 border-2 border-charcoal font-mono text-xs space-y-3 relative overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex justify-between items-center border-b border-oatmeal/10 pb-2 mb-2 text-[10px] text-oatmeal/40 select-none">
                <span>aum@antigravity:~</span>
                <span>bash - 80x24</span>
              </div>
              
              {loadingCommits ? (
                <div className="text-oatmeal/40 animate-pulse">// loading terminal logs...</div>
              ) : commitError || commits.length === 0 ? (
                <div className="text-oatmeal/40">// last seen: pushing to main</div>
              ) : (
                <ul className="space-y-2 text-[11px] md:text-xs">
                  {commits.map((commit, idx) => (
                    <li key={idx} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 border-b border-oatmeal/5 pb-2 last:border-0 last:pb-0">
                      <span className="font-bold text-terracotta shrink-0">[{commit.repo}]</span>
                      <div className="text-oatmeal/90 flex-1 truncate min-w-0">{commit.message}</div>
                      <span className="text-oatmeal/40 text-[10px] shrink-0 font-sans">· {commit.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
