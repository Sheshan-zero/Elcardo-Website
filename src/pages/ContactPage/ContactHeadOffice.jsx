import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ease = [0.16, 1, 0.3, 1];

export default function ContactHeadOffice() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="contact-hq-section" id="contact-head-office" ref={ref}>
      <div className="contact-hq-inner">
        {/* Left — Title */}
        <div className="contact-hq-left">
          <motion.p
            className="contact-hq-kicker"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            Primary Contact
          </motion.p>

          <motion.h2
            className="contact-hq-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            Head <em>Office</em>
          </motion.h2>

          <motion.p
            className="contact-hq-note"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            For general inquiries, partnerships, or corporate communications — reach out to our headquarters directly.
          </motion.p>
        </div>

        {/* Right — Details Card */}
        <motion.div
          className="contact-hq-right"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <div className="contact-hq-detail-group">
            <div className="contact-hq-detail-label">Address</div>
            <div className="contact-hq-detail-value">
              No. 42, Industrial Zone,<br />
              Peliyagoda, Colombo,<br />
              Sri Lanka
            </div>
          </div>

          <div className="contact-hq-detail-group">
            <div className="contact-hq-detail-label">Hotline</div>
            <div className="contact-hq-detail-value">
              <a href="tel:+94112345678">+94 11 234 5678</a>
            </div>
          </div>

          <div className="contact-hq-detail-group">
            <div className="contact-hq-detail-label">Email</div>
            <div className="contact-hq-detail-value">
              <a href="mailto:info@elcardoindustries.lk">info@elcardoindustries.lk</a>
            </div>
          </div>

          <div className="contact-hq-detail-group">
            <div className="contact-hq-detail-label">Business Hours</div>
            <div className="contact-hq-detail-value contact-hq-hours">
              Monday – Friday: 8:30 AM – 5:30 PM<br />
              Saturday: 8:30 AM – 1:00 PM<br />
              Sunday & Public Holidays: Closed
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
