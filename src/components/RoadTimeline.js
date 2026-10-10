import React, { useEffect, useRef, useState } from 'react';
import { PiArrowLeft, PiArrowRight, PiCalendarBlank, PiMapPin } from 'react-icons/pi';
import highlight from './highlight';

const yearOf = (period) => (period.match(/\d{4}/) || [''])[0];

// Side-view car heading right. Wheels spin while `moving`.
const Car = () => (
  <svg viewBox="0 0 64 32" width="64" height="32" aria-hidden="true" className="hroad-car-svg">
    <path className="hroad-beam" d="M58 20 L100 8 L100 34 Z" />
    <path className="hroad-body" d="M4 22 L4 16 Q4 13 7 13 L16 13 L22 5 Q23 4 25 4 L41 4 Q43 4 44 5 L50 13 L58 14 Q61 15 61 18 L61 22 Z" />
    <path className="hroad-glass" d="M20 13 L25 7 L33 7 L33 13 Z M36 13 L36 7 L41 7 L46 13 Z" />
    <rect x="57" y="15" width="4" height="3" rx="1" fill="#fff6c8" />
    <rect x="3" y="15" width="3" height="3" rx="1" fill="#ff4d4d" />
    <g className="hroad-wheel" style={{ transformOrigin: '16px 24px' }}>
      <circle cx="16" cy="24" r="6" className="hroad-tyre" />
      <path d="M16 19 V29 M11 24 H21" className="hroad-spoke" />
    </g>
    <g className="hroad-wheel" style={{ transformOrigin: '48px 24px' }}>
      <circle cx="48" cy="24" r="6" className="hroad-tyre" />
      <path d="M48 19 V29 M43 24 H53" className="hroad-spoke" />
    </g>
  </svg>
);

// Horizontal road: pick a role (stop, arrows or prev/next) and the car drives there.
function RoadTimeline({ items }) {
  // Chronological, oldest on the left; the newest role is where the car ends up.
  const stops = [...items].reverse();
  const last = stops.length - 1;
  const [active, setActive] = useState(last);
  const [carAt, setCarAt] = useState(0);
  const [facing, setFacing] = useState(1);
  const [moving, setMoving] = useState(false);
  const [duration, setDuration] = useState(1);
  const carIdx = useRef(0);
  const first = useRef(true);

  const pos = (i) => ((i + 0.5) / stops.length) * 100;

  useEffect(() => {
    const from = carIdx.current;
    if (!first.current && from === active) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dist = first.current ? stops.length * 0.6 : Math.abs(active - from);
    setFacing(active >= from ? 1 : -1);
    setDuration(reduced ? 0 : 0.45 + 0.4 * dist);
    setMoving(!reduced);
    // let the start position paint first so the initial drive-in animates
    const t = setTimeout(() => setCarAt(pos(active)), first.current ? 120 : 0);
    first.current = false;
    carIdx.current = active;
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const item = stops[active];
  const go = (i) => setActive(Math.min(Math.max(i, 0), last));

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
  };

  return (
    <div className="hroad">
      <div className={`hroad-lane${moving ? ' moving' : ''}`} onKeyDown={onKey}>
        <div className="hroad-asphalt" aria-hidden="true" />
        <div
          className="hroad-car"
          aria-hidden="true"
          style={{ left: `${carAt}%`, transitionDuration: `${duration}s` }}
          onTransitionEnd={(e) => e.propertyName === 'left' && setMoving(false)}
        >
          <div style={{ transform: `scaleX(${facing})` }}>
            <Car />
          </div>
        </div>

        <ol className="hroad-stops">
          {stops.map((s, i) => (
            <li key={`${s.org}-${s.period}`} style={{ left: `${pos(i)}%` }}>
              <button
                type="button"
                className={`hroad-stop${i === active ? ' active' : ''}${i <= active ? ' passed' : ''}`}
                aria-current={i === active ? 'step' : undefined}
                aria-label={`${s.title}, ${s.org}, ${s.period}`}
                onClick={() => go(i)}
              >
                <span className="hroad-dot" />
                <span className="hroad-year">{yearOf(s.period)}</span>
                <span className="hroad-org">{s.org}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="hroad-nav">
        <button type="button" className="filter" onClick={() => go(active - 1)} disabled={active === 0}>
          <PiArrowLeft aria-hidden="true" /> Earlier
        </button>
        <span className="hroad-count" aria-live="polite">{active + 1} / {stops.length}</span>
        <button type="button" className="filter" onClick={() => go(active + 1)} disabled={active === last}>
          Later <PiArrowRight aria-hidden="true" />
        </button>
      </div>

      <article className="hroad-card" key={active} aria-live="polite">
        <header className="hroad-card-head">
          <img src={item.logo} alt="" className="timeline-logo" />
          <div className="timeline-main">
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-org">{item.org}</p>
            <p className="timeline-meta">
              {item.location && (
                <span className="timeline-meta-item"><PiMapPin aria-hidden="true" />{item.location}</span>
              )}
              <span className="timeline-meta-item"><PiCalendarBlank aria-hidden="true" />{item.period}</span>
            </p>
          </div>
        </header>
        <ul className="timeline-details">
          {item.details.map((line) => (
            <li key={line}>{highlight(line)}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default RoadTimeline;
