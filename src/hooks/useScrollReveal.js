import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        gsap.fromTo(elements,
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
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
