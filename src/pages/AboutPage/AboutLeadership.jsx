import React from 'react';
import { motion } from 'framer-motion';

import ceoImg from '../../assets/leader_ceo.png';
import directorImg from '../../assets/leader_director.png';
import opsImg from '../../assets/leader_ops.png';
import ctoImg from '../../assets/leader_cto.png';
import financeImg from '../../assets/leader_finance.png';

const ease = [0.16, 1, 0.3, 1];

const leaders = [
  {
    name: 'Dinuka Herath',
    role: 'Founder & CEO',
    bio: 'Visionary entrepreneur who built Elcardo from a single workshop into a multi-sector industrial powerhouse.',
    img: ceoImg,
  },
  {
    name: 'Ravindu Fernando',
    role: 'Director of Operations',
    bio: 'Leads manufacturing excellence and operational strategy across all Elcardo divisions.',
    img: directorImg,
  },
  {
    name: 'Sanduni Perera',
    role: 'Head of Business Development',
    bio: 'Drives growth initiatives, strategic partnerships, and new market expansion for the group.',
    img: opsImg,
  },
  {
    name: 'Kasun Jayawardena',
    role: 'Chief Technology Officer',
    bio: 'Spearheads innovation, R&D, and technology integration across all product divisions.',
    img: ctoImg,
  },
  {
    name: 'Nirasha Silva',
    role: 'Head of Finance',
    bio: 'Oversees financial strategy, investment planning, and fiscal governance for the group.',
    img: financeImg,
  },
];

export default function AboutLeadership() {
  return (
    <section className="about-leadership" id="about-leadership">
      <div className="about-leadership-header">
        <motion.p
          className="about-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          The People
        </motion.p>
        <motion.h2
          className="about-title-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          Leadership <em>& Vision</em>
        </motion.h2>
      </div>

      <div className="about-leadership-grid">
        {leaders.map((leader, i) => (
          <motion.div
            key={leader.name}
            className="about-leader-card"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: i * 0.12, ease }}
            data-cursor="expand"
          >
            <div className="about-leader-img-wrap">
              <img
                src={leader.img}
                alt={leader.name}
                className="about-leader-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="about-leader-name">{leader.name}</h3>
            <p className="about-leader-role">{leader.role}</p>
            <p className="about-leader-bio">{leader.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
