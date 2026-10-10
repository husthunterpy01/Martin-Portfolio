import React, { useEffect, useRef, useState } from 'react';

// Pixel art on a 16x8 grid. Two running frames swap with a stepped animation.
const BODY = [
  [3, 3, 8, 3, '#f2994a'], [11, 2, 4, 4, '#f2994a'], [11, 1, 1, 1, '#f2994a'], [14, 1, 1, 1, '#f2994a'],
  [1, 1, 1, 3, '#f2994a'], [2, 3, 1, 1, '#f2994a'],
  [5, 3, 1, 2, '#c9741f'], [7, 3, 1, 2, '#c9741f'], [9, 3, 1, 2, '#c9741f'],
  [13, 3, 1, 1, '#1d1612'], [14, 4, 1, 1, '#ff8fa3'], [1, 1, 1, 1, '#c9741f'],
];
const LEGS_A = [[3, 6, 1, 2], [5, 6, 1, 1], [8, 6, 1, 1], [10, 6, 1, 2]];
const LEGS_B = [[2, 6, 1, 1], [4, 6, 1, 2], [9, 6, 1, 2], [11, 6, 1, 1]];

const rects = (list, fill) =>
  list.map(([x, y, w, h, c], i) => <rect key={i} x={x} y={y} width={w} height={h} fill={c || fill} />);

export const triggerCat = () => window.dispatchEvent(new Event('cat-run'));

// Listens for `cat-run` and sends a cat sprinting across the bottom of the screen.
function PixelCat() {
  const [run, setRun] = useState(0);
  const busy = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const onRun = () => {
      if (busy.current) return;
      busy.current = true;
      setRun((n) => n + 1);
    };
    window.addEventListener('cat-run', onRun);
    return () => window.removeEventListener('cat-run', onRun);
  }, []);

  if (!run) return null;
  return (
    <div
      key={run}
      className="pixel-cat"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        busy.current = false;
        setRun(0);
      }}
    >
      <svg viewBox="0 0 16 8" shapeRendering="crispEdges" className="pixel-cat-svg">
        {rects(BODY)}
        <g className="cat-f1">{rects(LEGS_A, '#c9741f')}</g>
        <g className="cat-f2">{rects(LEGS_B, '#c9741f')}</g>
      </svg>
      <span className="pixel-cat-dust" />
    </div>
  );
}

export default PixelCat;
