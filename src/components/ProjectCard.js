import React from 'react';

const ProjectCard = ({ title, desc, tech, live, github, img }) => {
  return (
    <article className="project-card">
      {img && <img src={img} alt={title} className="project-image" />}

      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{desc}</p>

      <div className="tech-list">
        {tech?.map((t, index) => (
          <span key={index} className="tech-pill">
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
