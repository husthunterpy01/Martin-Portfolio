import React, { useEffect, useRef } from 'react';

const faces = [
  { cls: 'front', icon: '💻', label: 'Languages' },
  { cls: 'back', icon: '🤖', label: 'AI / ML' },
  { cls: 'right', icon: '🌐', label: 'Web' },
  { cls: 'left', icon: '🗄️', label: 'Data' },
  { cls: 'top', icon: '☁️', label: 'Cloud' },
  { cls: 'bottom', icon: '📦', label: 'DevOps' },
];

const HoloCube = () => {
  const cubeRef = useRef(null);
  const rot = useRef({ x: -20, y: -28 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const auto = useRef(true);
  const resumeTimer = useRef(null);

  useEffect(() => {
    const cube = cubeRef.current;
    let rafId = null;

    const apply = () => {
      if (cube) {
        cube.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      }
    };

    const loop = () => {
      if (auto.current && !dragging.current) {
        rot.current.y += 0.28;
        rot.current.x += 0.04;
        apply();
      }
      rafId = window.requestAnimationFrame(loop);
    };

    const getPoint = (e) =>
      e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };

    const onMove = (e) => {
      if (!dragging.current) return;
      const p = getPoint(e);
      const dx = p.x - last.current.x;
      const dy = p.y - last.current.y;
      rot.current.y += dx * 0.5;
      rot.current.x -= dy * 0.5;
      rot.current.x = Math.max(-90, Math.min(90, rot.current.x));
      last.current = p;
      apply();
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      if (cube) cube.classList.remove('grabbing');
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        auto.current = true;
      }, 2500);
    };

    apply();
    rafId = window.requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(resumeTimer.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  const onDown = (e) => {
    dragging.current = true;
    auto.current = false;
    last.current = e.touches
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    if (cubeRef.current) cubeRef.current.classList.add('grabbing');
  };

  return (
    <div className="holo-cube" aria-hidden="true">
      <div className="holo-cube-scene">
        <div
          className="holo-cube-body"
          ref={cubeRef}
          onMouseDown={onDown}
          onTouchStart={onDown}
        >
          {faces.map((f) => (
            <div key={f.cls} className={`holo-face holo-face-${f.cls}`}>
              <span className="holo-face-icon">{f.icon}</span>
              <span className="holo-face-label">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="holo-cube-shadow" />
      </div>
      <span className="holo-cube-hint">Drag to spin</span>
    </div>
  );
};

export default HoloCube;
