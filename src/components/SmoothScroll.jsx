import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP's ticker to fix ScrollTrigger jitter
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Ignore HashRouter path navigations
        if (href && href.startsWith('#/')) {
          return;
        }

        if (href && href !== '#') {
          e.preventDefault();
          try {
            const target = document.querySelector(href);
            if (target) {
              lenis.scrollTo(target, { offset: -68 });
            }
          } catch (err) {
            // Ignore invalid query selector errors
          }
        }
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
