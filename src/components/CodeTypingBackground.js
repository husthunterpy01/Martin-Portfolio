import React, { useState, useEffect } from 'react';

const codeBlocks = [
  {
    lines: [
      'const portfolio = () => {',
      '  return {',
      '    name: "Martin Dang",',
      '    role: "Software Engineer",',
      '    skills: ["Python", "React", "ML"]',
      '  }',
      '};'
    ],
    startLine: 74
  },
  {
    lines: [
      'function buildProject() {',
      '  const idea = "innovative";',
      '  const tech = "cutting-edge";',
      '  return create(idea, tech);',
      '}'
    ],
    startLine: 120
  },
  {
    lines: [
      'import React from "react";',
      'import { useState } from "react";',
      '',
      'const App = () => {',
      '  return <Portfolio />;',
      '};'
    ],
    startLine: 45
  },
  {
    lines: [
      'def train_model():',
      '    data = load_dataset()',
      '    model = NeuralNetwork()',
      '    model.fit(data)',
      '    return model'
    ],
    startLine: 200
  }
];

const CodeTypingBackground = () => {
  const [visibleBlocks, setVisibleBlocks] = useState([]);

  useEffect(() => {
    // Show code blocks with staggered timing
    const timers = codeBlocks.map((block, index) => {
      return setTimeout(() => {
        setVisibleBlocks(prev => [...prev, block]);
      }, index * 2000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="code-typing-background">
      {visibleBlocks.map((block, blockIndex) => (
        <div
          key={blockIndex}
          className="code-block"
          style={{
            left: `${20 + blockIndex * 25}%`,
            top: `${15 + blockIndex * 20}%`,
            animationDelay: `${blockIndex * 0.5}s`,
          }}
        >
          <div className="code-block-content">
            {block.lines.map((line, lineIndex) => (
              <div key={lineIndex} className="code-line-wrapper">
                <span className="line-number">{block.startLine + lineIndex}</span>
                <span className="code-line-text">{line || ' '}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CodeTypingBackground;

