import React, { useState, useRef, useEffect } from 'react';

/**
 * LazyCanvas wrapper — only renders children (a <Canvas>) when the
 * section is within `rootMargin` of the viewport. Unmounts when
 * the section scrolls far offscreen to free the WebGL context.
 */
export default function LazyCanvas({ children, rootMargin = '200px', className, style }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {isVisible ? children : (
        <div style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="rg-section-loader-spinner" />
        </div>
      )}
    </div>
  );
}
