import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PiTerminalWindow, PiX } from 'react-icons/pi';
import { triggerCat } from './PixelCat';
import { triggerGameClear } from './GameClear';

// Page name -> route. The same names work in `cd <page>` and in link transitions.
const PAGES = {
  home: '/',
  about: '/about',
  experience: '/experience',
  projects: '/projects',
  dashboard: '/dashboard',
  contact: '/contact',
};

const HELP = [
  'help            show this list',
  'ls              list pages',
  'cd <page>       go to a page, e.g. cd projects',
  'theme [mode]    dark | light | toggle',
  'guide           open the site guide',
  'cat            send a visitor running',
  'whoami          who is this',
  'clear           clear the screen',
  'bye             end the game',
  'exit            close the terminal',
];

// Bottom-right terminal: visitors type commands (help, cd, theme, bye...).
function TerminalDock({ theme, setTheme, onGuide }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const history = useRef({ items: [], at: -1 });
  const timers = useRef([]);

  const later = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };
  const print = useCallback((...texts) => setLines((l) => [...l, ...texts.map((text) => ({ text }))]), []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines, open]);

  const exec = useCallback(
    (raw) => {
      const cmd = raw.trim();
      setLines((l) => [...l, { text: cmd, cmd: true }]);
      if (!cmd) return;
      history.current.items.push(cmd);
      history.current.at = -1;
      const [name, ...args] = cmd.split(/\s+/);
      const arg = (args[0] || '').toLowerCase().replace(/^\.?\/|\/$/g, '');

      switch (name.toLowerCase()) {
        case 'help':
          print(...HELP);
          break;
        case 'ls':
          print(Object.keys(PAGES).filter((k) => k !== 'home').map((k) => `${k}/`).join('  '));
          break;
        case 'cd': {
          const target = !arg || arg === '~' || arg === '..' ? 'home' : arg;
          if (!PAGES[target]) {
            print(`cd: no such page: ${arg}`, 'try: ls');
            break;
          }
          print(`opening ${target}... ok`);
          navigate(PAGES[target]);
          break;
        }
        case 'theme': {
          const next = arg === 'toggle' || !arg ? (theme === 'dark' ? 'light' : 'dark') : arg;
          if (next !== 'dark' && next !== 'light') {
            print('usage: theme [dark|light|toggle]');
            break;
          }
          setTheme(next);
          print(`theme set to ${next}`);
          break;
        }
        case 'guide':
          print('opening site guide...');
          later(onGuide, 250);
          break;
        case 'cat':
          print('meow.');
          triggerCat();
          break;
        case 'whoami':
          print('martin dang, software engineer. perth, australia.', 'type `cd about` to learn more.');
          break;
        case 'clear':
          setLines([]);
          break;
        case 'bye':
        case 'quit':
          print('game clear!');
          later(triggerGameClear, 450);
          break;
        case 'exit':
          setOpen(false);
          break;
        default:
          print(`command not found: ${name}`, 'type `help` for a list of commands');
      }
    },
    [navigate, onGuide, print, setTheme, theme]
  );
  // Backtick toggles the terminal (ignored while typing in a field).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '`' || e.target.closest?.('input, textarea, select, [contenteditable]')) return;
      e.preventDefault();
      setOpen((o) => !o);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      exec(input);
      setInput('');
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const h = history.current;
      if (!h.items.length) return;
      h.at = e.key === 'ArrowUp' ? Math.min(h.at + 1, h.items.length - 1) : Math.max(h.at - 1, -1);
      setInput(h.at === -1 ? '' : h.items[h.items.length - 1 - h.at]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="term-dock">
      {open ? (
        <section className="term-panel" aria-label="Terminal">
          <div className="term-bar">
            <i /><i /><i />
            <span>martin@perth: ~{location.pathname === '/' ? '' : location.pathname}</span>
            <button type="button" className="term-x" onClick={() => setOpen(false)} aria-label="Close terminal">
              <PiX />
            </button>
          </div>
          <div className="term-body" ref={logRef} role="log" aria-live="polite" onClick={() => inputRef.current?.focus()}>
            <p className="term-tip">
              Welcome. Type <b>help</b> for commands, or try <b>cd projects</b>.
            </p>
            {lines.map((l, i) => (
              <p key={i} className={l.cmd ? 'term-cmd' : 'term-out'}>
                {l.cmd && <span className="term-prompt">$ </span>}
                {l.text}
              </p>
            ))}
            <label className="term-input-row">
              <span className="term-prompt">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal command"
              />
            </label>
          </div>
        </section>
      ) : (
        <button type="button" className="term-fab" onClick={() => setOpen(true)} aria-label="Open terminal" title="Terminal (`)">
          <PiTerminalWindow aria-hidden="true" />
          <span>~/terminal</span>
        </button>
      )}
    </div>
  );
}

export default TerminalDock;
