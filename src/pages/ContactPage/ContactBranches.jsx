import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { branches } from './sriLankaPath';

const ease = [0.16, 1, 0.3, 1];

function BranchCard({ branch, index, inView }) {
  return (
    <motion.div
      className="contact-branch-card"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
    >
      {branch.isHQ && <div className="contact-branch-card-hq">HQ</div>}

      <div className="contact-branch-card-name">{branch.name}</div>
      <div className="contact-branch-card-region">{branch.region}</div>

      <div className="contact-branch-card-info">
        <div className="contact-branch-card-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{branch.address}</span>
        </div>

        <div className="contact-branch-card-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <a href={`tel:${branch.phone}`}>{branch.phone}</a>
        </div>

        <div className="contact-branch-card-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <a href={`mailto:${branch.email}`}>{branch.email}</a>
        </div>
      </div>

      <a
        href={branch.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-branch-card-map-link"
        data-cursor="expand"
      >
        View on Maps
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </motion.div>
  );
}

export default function ContactBranches() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="contact-branches-section" id="contact-branches" ref={ref}>
      <motion.div
        className="contact-branches-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease }}
      >
        <p className="contact-branches-kicker">Directory</p>
        <h2 className="contact-branches-title">
          All <em>Branches</em>
        </h2>
      </motion.div>

      <div className="contact-branches-grid">
        {branches.map((branch, i) => (
          <BranchCard key={branch.id} branch={branch} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
