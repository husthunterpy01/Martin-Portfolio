import React, { useEffect, useMemo, useRef, useState } from 'react';

const COLS = 12;
const ROWS = 7;
const SHOW_MS = 4300;

export const triggerGameClear = () => window.dispatchEvent(new Event('game-clear'));

// "GAME CLEAR!" then "SEE YOU NEXT GAME", as an arcade end card over the page.
// Click, Esc or waiting dismisses it.
function GameClear() {
  const [run, setRun] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);

  const cells = useMemo(
    () => Array.from({ length: COLS * ROWS }, () => Math.round(Math.random() * 700)),
    [run] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const close = () => {
    timers.current.forEach(clearTimeout);
    setLeaving(true);
    timers.current = [setTimeout(() => { setRun(0); setLeaving(false); }, 450)];
  };

  useEffect(() => {
    const onRun = () => {
      timers.current.forEach(clearTimeout);
      setLeaving(false);
      setRun((n) => n + 1);
      timers.current = [setTimeout(close, SHOW_MS)];
    };
    window.addEventListener('game-clear', onRun);
    return () => {
      window.removeEventListener('game-clear', onRun);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!run) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [run]);

  if (!run) return null;
  return (
    <div
      key={run}
      className={`gc${leaving ? ' gc-leaving' : ''}`}
      role="status"
      aria-label="Game clear. See you next game."
      onClick={close}
    >
      <div className="gc-pixels" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {cells.map((d, i) => (
          <span key={i} style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
      <div className="gc-stage" aria-hidden="true">
        <p className="gc-clear">GAME CLEAR!</p>
        <p className="gc-next" data-text="SEE YOU NEXT GAME">
          SEE YOU NEXT GAME<span className="gc-cursor" />
        </p>
        <p className="gc-hint">click or press esc to continue</p>
      </div>
    </div>
  );
}

export default GameClear;
