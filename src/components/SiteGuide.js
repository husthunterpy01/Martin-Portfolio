import React, { useEffect, useRef } from 'react';
import { PiX } from 'react-icons/pi';

const TIPS = [
  ['Move around', 'Use the top menu, or the terminal in the bottom-right corner. Links type a command like cd projects into it before the page changes, and you can type your own: try help.'],
  ['Projects', 'Click any project card to open its details. Open "Autonomous Vehicle Job Profiles" to explore its architecture diagram.'],
  ['The architecture diagram', 'Hover a box to see what I did on it. Click the data steps (Ingest, Bronze, Classifying, Labelled categories) to enlarge how each posting is handled.'],
  ['Dashboard', 'Live numbers from my GitHub plus charts of my skills and career. Hover or tab onto any bar for details, or open "View as table".'],
  ['Highlights', 'Green and amber chips mark the metrics worth knowing: results, scale and accuracy.'],
  ['Little surprises', 'Switch the theme, open a project or send a message, and you might see a visitor run by. Cards also tilt toward your cursor.'],
];

const SHORTCUTS = [
  ['?', 'Open or close this guide'],
  ['`', 'Open or close the terminal'],
  ['Esc', 'Close any pop-up'],
  ['Tab', 'Every hover has a keyboard equivalent'],
];

function SiteGuide({ onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      if (opener && opener.focus) opener.focus();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal guide" role="dialog" aria-modal="true" aria-labelledby="guide-title">
        <button type="button" ref={closeRef} className="icon-btn modal-close" onClick={onClose} aria-label="Close guide">
          <PiX />
        </button>
        <header className="modal-head">
          <p className="project-topic">Site guide</p>
          <h2 id="guide-title" className="modal-title">How to explore this site</h2>
          <p className="project-meta">A few things on this portfolio are interactive. Here is where to look.</p>
        </header>
        <div className="modal-body">
          <dl className="guide-list">
            {TIPS.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
          <h3 className="modal-data-sub">Keyboard</h3>
          <ul className="guide-keys">
            {SHORTCUTS.map(([k, d]) => (
              <li key={k}><kbd>{k}</kbd> {d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SiteGuide;
