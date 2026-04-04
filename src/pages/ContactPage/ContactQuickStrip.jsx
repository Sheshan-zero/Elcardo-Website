import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ease = [0.16, 1, 0.3, 1];

export default function ContactQuickStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="contact-quick-section" id="contact-quick" ref={ref}>
      <motion.div
        className="contact-quick-inner"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1, ease }}
      >
        {/* Call */}
        <div className="contact-quick-block">
          <svg className="contact-quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <div className="contact-quick-label">Call Us</div>
          <div className="contact-quick-value">
            <a href="tel:+94112345678">+94 11 234 5678</a>
          </div>
          <div className="contact-quick-value" style={{ fontSize: '13px', marginTop: '4px' }}>
            Speak with our team directly
          </div>
        </div>

        {/* Email */}
        <div className="contact-quick-block">
          <svg className="contact-quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <div className="contact-quick-label">Email Us</div>
          <div className="contact-quick-value">
            <a href="mailto:info@elcardoindustries.lk">info@elcardoindustries.lk</a>
          </div>
          <div className="contact-quick-value" style={{ fontSize: '13px', marginTop: '4px' }}>
            Send us a message anytime
          </div>
        </div>

        {/* Visit */}
        <div className="contact-quick-block">
          <svg className="contact-quick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div className="contact-quick-label">Visit a Branch</div>
          <div className="contact-quick-value">
            6 locations island-wide
          </div>
          <a href="#contact-map" className="contact-quick-link" data-cursor="expand">
            Find nearest branch
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
