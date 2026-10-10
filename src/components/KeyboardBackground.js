import React, { useEffect, useRef } from 'react';

// Layout in key-width units; each row sums to 15.
const ROWS = [
  [...'`1234567890-='.split('').map((k) => [k, 1]), ['BACKSPACE', 2, '⌫']],
  [['TAB', 1.5, 'tab'], ...'QWERTYUIOP[]'.split('').map((k) => [k, 1]), ['\\', 1.5]],
  [['CAPS', 1.75, 'caps'], ...'ASDFGHJKL;\''.split('').map((k) => [k, 1]), ['ENTER', 2.25, 'enter']],
  [['SHIFT', 2.25, 'shift'], ...'ZXCVBNM,./'.split('').map((k) => [k, 1]), ['SHIFT', 2.75, 'shift']],
  [['CTRL', 1.25, 'ctrl'], ['WIN', 1.25, 'win'], ['ALT', 1.25, 'alt'], ['SPACE', 6.25, ''],
    ['ALT', 1.25, 'alt'], ['WIN', 1.25, 'win'], ['MENU', 1.25, '≡'], ['CTRL', 1.25, 'ctrl']],
];

const SNIPPETS = [
  'const portfolio = () => {',
  'import pandas as pd',
  'SELECT skill, COUNT(*) FROM jobs;',
  'docker compose up -d',
  'git commit -m "ship it"',
  'def build_pipeline(raw):',
  'pip install dbt-postgres',
  'await fetch("/api/jobs")',
];

// Characters that need Shift, mapped to the key that carries them.
const SHIFTED = {
  '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
  _: '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/', '~': '`',
};

const toKeys = (ch) => {
  if (ch === ' ') return ['SPACE'];
  if (SHIFTED[ch]) return ['SHIFT', SHIFTED[ch]];
  if (/[A-Z]/.test(ch)) return ['SHIFT', ch];
  return [ch.toUpperCase()];
};

const fromEvent = (e) => {
  const k = e.key;
  if (k === ' ') return 'SPACE';
  const named = { Enter: 'ENTER', Backspace: 'BACKSPACE', Tab: 'TAB', Shift: 'SHIFT', Control: 'CTRL', Alt: 'ALT', Meta: 'WIN', CapsLock: 'CAPS', ContextMenu: 'MENU' };
  if (named[k]) return named[k];
  if (k.length === 1) return SHIFTED[k] || k.toUpperCase();
  return null;
};

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Faint page-wide mechanical keyboard wallpaper: keys press on their own and light up
// as the visitor types. Key states are toggled on the DOM directly (no re-render per key).
function KeyboardBackground() {
  const boardRef = useRef(null);
  const lastReal = useRef(0);

  useEffect(() => {
    const board = boardRef.current;
    const press = (id, on) =>
      board.querySelectorAll(`[data-k="${CSS.escape(id)}"]`).forEach((el) => el.classList.toggle('down', on));

    const onDown = (e) => {
      const id = fromEvent(e);
      if (!id) return;
      lastReal.current = Date.now();
      press(id, true);
    };
    const onUp = (e) => {
      const id = fromEvent(e);
      if (id) press(id, false);
    };
    document.addEventListener('keydown', onDown);
    document.addEventListener('keyup', onUp);

    let timer;
    let snippet = 0;
    let pos = 0;
    let deleting = false;
    const tap = (ids) => {
      ids.forEach((id) => press(id, true));
      setTimeout(() => ids.forEach((id) => press(id, false)), 110);
    };
    const tick = () => {
      let delay = 90 + Math.random() * 90;
      const paused = document.hidden || Date.now() - lastReal.current < 2500;
      if (!paused) {
        const text = SNIPPETS[snippet];
        if (!deleting && pos < text.length) {
          tap(toKeys(text[pos]));
          pos += 1;
        } else if (!deleting) {
          deleting = true;
          delay = 1500;
        } else if (pos > 0) {
          tap(['BACKSPACE']);
          pos -= 1;
          delay = 28;
        } else {
          deleting = false;
          snippet = (snippet + 1) % SNIPPETS.length;
          delay = 450;
        }
      }
      timer = setTimeout(tick, delay);
    };
    if (!reduced()) timer = setTimeout(tick, 1200);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', onDown);
      document.removeEventListener('keyup', onUp);
    };
  }, []);

  return (
    <div className="kb-bg" aria-hidden="true">
      <div className="kb-stage">
        <div className="kb-board" ref={boardRef}>
          <div className="kb-plate">
          {ROWS.map((row, r) => (
            <div className="kb-row" key={r}>
              {row.map(([id, w, label], i) => (
                <div
                  className={`kb-key${id.length > 1 ? ' kb-mod' : ''}`}
                  data-k={id}
                  key={`${id}-${i}`}
                  style={{ flexGrow: w, flexBasis: 0, '--col': r * 3 + i }}
                >
                  <span className="kb-cap">
                    <span className="kb-legend">{label === undefined ? id : label}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyboardBackground;
