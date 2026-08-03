import { useEffect, useRef, useState } from 'react';

// Animates a number from 0 to `value` when scrolled into view.
// Falls back to the final value immediately if IntersectionObserver is
// unavailable (e.g. jsdom test environment).
export default function CountUp({ value, decimals = 0, suffix = '', duration = 1200 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      setStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!started) return undefined;
    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}{suffix}
    </span>
  );
}
