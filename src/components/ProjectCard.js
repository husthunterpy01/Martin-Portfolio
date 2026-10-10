import React from 'react';
import { PiArrowRight, PiArrowUpRight } from 'react-icons/pi';
import highlight from './highlight';
import TechIcon from './TechIcon';

const ProjectCard = ({
  title,
  desc,
  bullets,
  meta,
  tech,
  live,
  github,
  img,
  topic,
  featured,
  imgContain,
  onOpen,
}) => {
  const hasLive = live && live !== '#';
  const hasGithub = github && github !== '#';

  return (
    <article
      onClick={(e) => {
        if (!e.target.closest('a, button')) onOpen?.();
      }}
      className={`project-card tilt${featured ? ' project-card--featured' : ''}${
        img ? '' : ' project-card--text'
      }`}
    >
      {img && (
        <div className={`project-image-wrap${imgContain ? ' project-image-wrap--diagram' : ''}`}>
          <img src={img} alt={`${title} preview`} className="project-image" loading="lazy" />
        </div>
      )}

      <div className="project-body">
        <p className="project-topic">{topic}</p>
        <h3 className="project-title">{title}</h3>
        {meta && <p className="project-meta">{meta}</p>}
        {desc && <p className="project-desc">{desc}</p>}
        {bullets && (
          <ul className="project-bullets">
            {bullets.map((b) => (
              <li key={b}>{highlight(b)}</li>
            ))}
          </ul>
        )}

        <ul className="chip-list">
          {tech?.map((t) => (
            <li key={t} className="chip">
              <TechIcon techName={t} className="chip-icon" />
              {t}
            </li>
          ))}
        </ul>

        {(hasLive || hasGithub || onOpen) && (
          <div className="project-links">
            {onOpen && (
              <button type="button" className="text-link project-open" onClick={onOpen}>
                View details
                <PiArrowRight aria-hidden="true" />
              </button>
            )}
            {hasLive && (
              <a href={live} target="_blank" rel="noreferrer" className="text-link">
                Live Demo
                <PiArrowUpRight aria-hidden="true" />
              </a>
            )}
            {hasGithub && (
              <a href={github} target="_blank" rel="noreferrer" className="text-link">
                GitHub
                <PiArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
      <span className="tilt-glare" aria-hidden="true" />
    </article>
  );
};

export default ProjectCard;
