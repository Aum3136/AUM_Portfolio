import React from 'react';
import './ProjectRowList.css';

// Import project screenshots
import knowbotMockup from '../assets/knowbot_mockup.png';
import nutriscannMockup from '../assets/nutriscann_mockup.png';
import medicoreMockup from '../assets/medicore_mockup.png';

const projects = [
  {
    number: '01',
    year: '2025',
    name: 'KnowBot',
    category: 'AI / ENTERPRISE RAG',
    stack: ['FastAPI', 'LangChain', 'Gemini'],
    caseStudyLink: '/knowbot.html',
    gitHub: 'https://github.com/Aum3136/KnowBot',
    badge: 'GOOGLE SOLUTION CHALLENGE 2026',
    imageUrl: knowbotMockup,
  },
  {
    number: '02',
    year: '2025',
    name: 'NutriScann',
    category: 'AI VISION · COLLAB',
    stack: ['React 19', 'Firebase', 'Gemini Vision'],
    caseStudyLink: '/nutriscan.html',
    gitHub: '#',
    imageUrl: nutriscannMockup,
  },
  {
    number: '03',
    year: '2025',
    name: 'Cafe Software',
    category: 'FULLSTACK SAAS',
    stack: ['React + Vite', 'Node', 'SQLite'],
    caseStudyLink: '#',
    liveUrl: 'https://cafe-software.vercel.app',
    imageUrl: null,
  },
  {
    number: '04',
    year: '2024',
    name: 'MediCore / Healix',
    category: 'DBMS · UNIVERSITY',
    stack: ['PHP', 'MySQL', 'XAMPP'],
    caseStudyLink: '#',
    imageUrl: medicoreMockup,
  }
];

export function ProjectRowList() {
  const handleRowClick = (project) => {
    // If clicking Case Study and it's a valid link
    if (project.caseStudyLink && project.caseStudyLink !== '#' && !project.caseStudyLink.includes('coming soon')) {
      window.location.href = project.caseStudyLink;
      return;
    }
    // If no case study but has liveUrl
    if (project.liveUrl && project.liveUrl !== '#') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
      return;
    }
  };

  return (
    <div className="col-span-1 md:col-span-3 project-rows-container">
      {projects.map((project, index) => {
        // Determine what the link text and link should be
        let actionText = 'CASE STUDY →';
        let isLinkActive = true;

        if (project.caseStudyLink && project.caseStudyLink !== '#' && !project.caseStudyLink.includes('coming soon')) {
          actionText = 'CASE STUDY →';
        } else if (project.liveUrl && project.liveUrl !== '#') {
          actionText = 'LIVE SITE ↗';
        } else {
          actionText = 'COMING SOON';
          isLinkActive = false;
        }

        return (
          <div
            key={project.number}
            className={`project-row ${!isLinkActive ? 'project-row-inactive' : ''}`}
            onClick={() => handleRowClick(project)}
            style={{ zIndex: projects.length - index }}
            data-cursor="project"
          >
            {/* Left Cluster */}
            <div className="project-left-cluster">
              <span className="project-row-number">{project.number}</span>
              <span className="project-row-year">{project.year}</span>
              <div className="project-row-divider"></div>
            </div>

            {/* Center Cluster */}
            <div className="project-center-cluster">
              <div className="project-name-badge-row">
                <h3 className="project-row-name">{project.name}</h3>
                {project.badge && (
                  <span className="project-row-badge">{project.badge}</span>
                )}
              </div>
              <span className="project-row-category">{project.category}</span>
            </div>

            {/* Right Cluster */}
            <div className="project-right-cluster">
              <div className="project-row-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="project-row-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <span className="project-row-action-link">
                {actionText}
              </span>
            </div>

            {/* Thumbnail Hover Effect (Desktop only) */}
            <div className="project-row-thumbnail-wrapper">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={`${project.name} preview`}
                  className="project-row-thumbnail-img"
                  loading="lazy"
                />
              ) : (
                <div className="project-row-thumbnail-placeholder" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
