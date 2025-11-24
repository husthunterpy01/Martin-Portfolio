import React, { useState, useEffect, useRef } from 'react';

const KeyboardBackground = () => {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const intervalRef = useRef(null);

  // Mechanical keyboard layout (QWERTY)
  const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl']
  ];

  // Code snippets to simulate typing
  const codeSnippets = [
    'const portfolio = () => {',
    'function createAmazing() {',
    'import React from "react";',
    'def build_something():',
    'class Developer {',
    'async function innovate() {',
    'const code = "beautiful";',
    'let projects = [];',
  ];

  // Map characters to keyboard keys
  const charToKey = (char) => {
    const upperChar = char.toUpperCase();
    if (upperChar === ' ') return 'SPACE';
    if (upperChar === '\n' || upperChar === '\r') return 'ENTER';
    if (upperChar === '\t') return 'TAB';
    if (upperChar === '(' || upperChar === ')') return upperChar;
    if (upperChar === '{' || upperChar === '}') return upperChar;
    if (upperChar === '[' || upperChar === ']') return upperChar;
    if (upperChar === '=') return '=';
    if (upperChar === '-') return '-';
    if (upperChar === '_') return upperChar;
    if (upperChar === '.') return '.';
    if (upperChar === ',') return ',';
    if (upperChar === ';') return ';';
    if (upperChar === ':') return ';'; // Colon uses semicolon key with shift
    if (upperChar === "'" || upperChar === '"') return "'";
    if (upperChar === '/') return '/';
    if (upperChar === '\\') return '\\';
    // For special characters that need shift, we'll use the base key
    return upperChar.match(/[A-Z0-9]/) ? upperChar : 'SHIFT';
  };

  useEffect(() => {
    let currentSnippet = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 120;
    let pauseTime = 0;

    const typeNext = () => {
      if (pauseTime > 0) {
        pauseTime -= typingSpeed;
        intervalRef.current = setTimeout(typeNext, typingSpeed);
        return;
      }

      const snippet = codeSnippets[currentSnippet];

      if (!isDeleting && currentChar < snippet.length) {
        // Simulate typing
        const char = snippet[currentChar];
        const key = charToKey(char);
        
        setActiveKeys((prev) => {
          const newSet = new Set(prev);
          newSet.add(key);
          return newSet;
        });

        setTimeout(() => {
          setActiveKeys((prev) => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
          });
        }, 120);

        currentChar++;
        typingSpeed = Math.random() * 50 + 80; // Random typing speed
      } else if (isDeleting && currentChar > 0) {
        // Simulate backspace
        setActiveKeys((prev) => {
          const newSet = new Set(prev);
          newSet.add('BACKSPACE');
          return newSet;
        });

        setTimeout(() => {
          setActiveKeys((prev) => {
            const newSet = new Set(prev);
            newSet.delete('BACKSPACE');
            return newSet;
          });
        }, 120);

        currentChar--;
        typingSpeed = Math.random() * 30 + 50; // Faster deletion
      } else if (!isDeleting && currentChar === snippet.length) {
        // Pause before deleting
        isDeleting = true;
        pauseTime = 2000;
        typingSpeed = 100;
      } else if (isDeleting && currentChar === 0) {
        // Move to next snippet
        isDeleting = false;
        currentSnippet = (currentSnippet + 1) % codeSnippets.length;
        pauseTime = 500;
        typingSpeed = 100;
      }

      intervalRef.current = setTimeout(typeNext, typingSpeed);
    };

    // Start typing after initial delay
    intervalRef.current = setTimeout(typeNext, 1500);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  const getKeyClass = (key) => {
    const keyName = key === ' ' ? 'SPACE' : key.toUpperCase();
    const isActive = activeKeys.has(keyName);
    let sizeClass = 'key-standard';
    
    // Special key sizes
    if (key === 'Backspace' || key === 'Enter' || key === 'Tab') {
      sizeClass = 'key-large';
    } else if (key === 'Caps' || key === 'Shift' || key === 'Ctrl' || key === 'Alt' || key === 'Win') {
      sizeClass = 'key-medium';
    } else if (key === ' ') {
      sizeClass = 'key-space';
    }

    return `key ${sizeClass} ${isActive ? 'key-active' : ''}`;
  };

  return (
    <div className="keyboard-background">
      <div className="keyboard-container">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key, keyIndex) => (
              <div
                key={`${rowIndex}-${keyIndex}`}
                className={getKeyClass(key)}
              >
                <span className="key-label">{key === ' ' ? 'Space' : key}</span>
                {key !== ' ' && <div className="key-cap"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardBackground;

