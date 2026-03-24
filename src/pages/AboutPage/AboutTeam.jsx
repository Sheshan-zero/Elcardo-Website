import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Athula Rohan', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sarah Jenkins', role: 'Head of Engineering', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' },
  { name: 'David Chen', role: 'Director of Solar Integration', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600' },
  { name: 'Elena Rostova', role: 'VP of Hospitality Operations', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600' }
];

export default function AboutTeam() {
  return (
    <section className="about-section about-team">
      <div className="about-team-header">
        <h2 className="about-title-large">Leadership</h2>
      </div>

      <div className="about-team-grid">
        {teamMembers.map((member, i) => (
          <motion.div 
            key={member.name}
            className="about-team-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="about-team-img-wrap">
              <img src={member.img} alt={member.name} className="about-team-img" loading="lazy" />
            </div>
            <div className="about-team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
