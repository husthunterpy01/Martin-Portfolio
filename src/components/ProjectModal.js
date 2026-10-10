import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PiArrowUpRight, PiCornersOut, PiX } from 'react-icons/pi';
import highlight from './highlight';
import TechIcon from './TechIcon';

const HIDE_DELAY = 500;

const DataFlowDetail = ({ dataFlow }) => (
  <>
    <p className="project-desc">{dataFlow.intro}</p>
    <div className="modal-data-figure">
      <img src={dataFlow.image} alt={dataFlow.alt} />
    </div>

    <div className="branch-grid">
      {dataFlow.branches.map((b) => (
        <div className="branch-card" key={b.name}>
          <strong>{b.name}</strong>
          <p>{b.steps}</p>
          <span className="branch-out">Output: {b.output}</span>
        </div>
      ))}
    </div>

    <h4 className="modal-data-sub">Why this design</h4>
    <ul className="reason-list">
      {dataFlow.reasons.map(([t, d]) => (
        <li key={t}><strong>{t}.</strong> {d}</li>
      ))}
    </ul>

    <h4 className="modal-data-sub">From messy payloads to bronze, silver and gold</h4>
    <div className="messy-table" role="table">
      {dataFlow.messy.map(([what, how]) => (
        <div className="messy-row" role="row" key={what}>
          <p role="cell">{what}</p>
          <p role="cell">{how}</p>
        </div>
      ))}
    </div>
    <p className="project-meta">{dataFlow.footer}</p>
  </>
);

const ProjectModal = ({ project, onClose }) => {
  const [active, setActive] = useState(null);
  const [preview, setPreview] = useState(false);
  const [zoom, setZoom] = useState(false);
  const closeRef = useRef(null);
  const hideTimer = useRef(null);
  const zoomRef = useRef(false);
  const { title, topic, meta, desc, bullets, tech, live, github, img, hotspots, dataFlow } = project;
  const hasLive = live && live !== '#';
  const hasGithub = github && github !== '#';
  const current = hotspots?.find((h) => h.id === active);

  zoomRef.current = zoom;

  const cancelHide = useCallback(() => clearTimeout(hideTimer.current), []);
  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setPreview(false), HIDE_DELAY);
  }, []);

  useEffect(() => {
    const opener = document.activeElement;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (zoomRef.current) setZoom(false);
      else onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(hideTimer.current);
      if (opener && opener.focus) opener.focus();
    };
  }, [onClose]);

  const enter = (h) => {
    setActive(h.id);
    if (h.more && dataFlow) {
      cancelHide();
      setPreview(true);
    }
  };
  const leave = (h) => {
    setActive(null);
    if (h.more) scheduleHide();
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button type="button" ref={closeRef} className="icon-btn modal-close" onClick={onClose} aria-label="Close">
          <PiX />
        </button>

        <header className="modal-head">
          <p className="project-topic">{topic}</p>
          <h2 id="modal-title" className="modal-title">{title}</h2>
          {meta && <p className="project-meta">{meta}</p>}
        </header>

        {img && (
          <div className="modal-media">
            <div className="modal-figure">
              <img src={img} alt={`${title} preview`} className="modal-img" />
              {hotspots?.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  className={`hotspot${active === h.id ? ' active' : ''}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
                  aria-label={h.title}
                  onMouseEnter={() => enter(h)}
                  onMouseLeave={() => leave(h)}
                  onFocus={() => enter(h)}
                  onBlur={() => leave(h)}
                  onClick={() => {
                    setActive(h.id);
                    if (h.more && dataFlow) setZoom(true);
                  }}
                />
              ))}

              {dataFlow && preview && (
                <button
                  type="button"
                  className="data-preview"
                  onMouseEnter={cancelHide}
                  onMouseLeave={scheduleHide}
                  onFocus={cancelHide}
                  onBlur={scheduleHide}
                  onClick={() => setZoom(true)}
                  aria-label={`${dataFlow.title}: click to enlarge`}
                >
                  <span className="data-preview-head">
                    {dataFlow.title}
                    <span><PiCornersOut aria-hidden="true" /> Click to enlarge</span>
                  </span>
                  <img src={dataFlow.image} alt="" />
                </button>
              )}
            </div>

            {hotspots && (
              <div className="hotspot-info" aria-live="polite">
                {current ? (
                  <>
                    <strong>{current.title}</strong>
                    <p>{current.text}</p>
                  </>
                ) : (
                  <p className="hotspot-hint">
                    Hover over (or tap) a component in the diagram to see what I did on it.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="modal-body">
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
          {(hasLive || hasGithub) && (
            <div className="project-links">
              {hasLive && (
                <a href={live} target="_blank" rel="noreferrer" className="text-link">
                  Live Demo <PiArrowUpRight aria-hidden="true" />
                </a>
              )}
              {hasGithub && (
                <a href={github} target="_blank" rel="noreferrer" className="text-link">
                  GitHub <PiArrowUpRight aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {dataFlow && zoom && (
        <div
          className="lightbox"
          onMouseDown={(e) => {
            e.stopPropagation();
            if (e.target === e.currentTarget) setZoom(false);
          }}
        >
          <div className="lightbox-card" role="dialog" aria-modal="true" aria-label={dataFlow.title}>
            <button type="button" className="icon-btn modal-close" onClick={() => setZoom(false)} aria-label="Close enlarged view">
              <PiX />
            </button>
            <h3 className="modal-data-title">{dataFlow.title}</h3>
            <DataFlowDetail dataFlow={dataFlow} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal;
