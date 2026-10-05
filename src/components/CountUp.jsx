import { useEffect, useRef, useState } from 'react';

const format = (value, decimals, suffix) => `${value.toFixed(decimals)}${suffix}`;

// Animates a number from 0 to `value` when scrolled into view.
//
// Two changes from the previous implementation, both about doing less work:
//  - frames are written through a ref rather than setState, which used to
//    re-render four counters on the home page roughly 70 times each while they
//    animated (and produced React act() warnings in tests);
//  - the animation is skipped for users who prefer reduced motion, who now see
//    the final value immediately.
//
// Falls back to the final value when IntersectionObserver is unavailable
// (e.g. jsdom).
export default function CountUp({ value, decimals = 0, suffix = '', duration = 1200 }) {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
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
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!started) return undefined;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const paint = (shown) => {
      if (numberRef.current) numberRef.current.textContent = format(shown, decimals, suffix);
    };

    if (prefersReducedMotion || typeof requestAnimationFrame === 'undefined') {
      paint(value);
      return undefined;
    }

    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      paint(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration, decimals, suffix]);

  return (
    <span ref={containerRef}>
      {/* The animated number is decorative; the sr-only span carries the real
          value. The rendered child never changes, so React leaves the text the
          animation writes in place. */}
      <span ref={numberRef} aria-hidden="true" className="tabular-nums">
        {format(0, decimals, suffix)}
      </span>
      <span className="sr-only">{format(value, decimals, suffix)}</span>
    </span>
  );
}
