import React from 'react';
import TechIcon from './TechIcon';

const ProjectCard = ({ title, desc, tech, live, github, img, topic }) => {
  return (
    <article className="project-card">
      {img && (
        <div className="project-image-wrap">
          <img src={img} alt={title} className="project-image" />
          {topic && <span className="project-topic-badge">{topic}</span>}
        </div>
      )}

      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{desc}</p>

      <div className="tech-list">
        {tech?.map((t, index) => (
          <span key={index} className="tech-pill">
            <TechIcon techName={t} className="tech-pill-icon" />
            {t}
          </span>
        ))}
      </div>

      <div className="links">
        {live && live !== '#' && (
          <a href={live} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
        {github && github !== '#' && (
          <a href={github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
