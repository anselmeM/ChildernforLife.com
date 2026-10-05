import { useEffect, useRef } from 'react';

// Scroll reveals are decorative, so gsap is imported on demand and skipped
// entirely for users who ask for reduced motion. The previous version imported
// gsap + ScrollTrigger at module scope, which pulled ~115 kB (≈43 kB gzip) into
// the chunk the browser had to fetch, parse and execute before the home page
// could render, and then animated for people who had opted out of motion.
//
// If gsap never arrives (slow network, blocked chunk, failure), nothing is
// hidden: the animation only ever sets styles once it runs.
export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let cancelled = false;
    let ctx;

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (cancelled || !ref.current) return;

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.from('.hero-animate', {
            opacity: 0,
            y: 28,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power2.out',
          });

          gsap.to('.float-item', {
            y: -6,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: 'power1.inOut',
          });

          const elements = ref.current?.querySelectorAll('.scroll-animate');
          if (elements?.length) {
            gsap.fromTo(
              elements,
              { opacity: 0, y: 46, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.1,
                ease: 'power2.out',
                stagger: 0.12,
                scrollTrigger: {
                  trigger: elements[0],
                  start: 'top bottom-=120',
                  toggleActions: 'play none none reverse',
                },
              },
            );
          }
        }, ref);
      } catch {
        // Decorative only — leave the content exactly as it is.
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return ref;
}
