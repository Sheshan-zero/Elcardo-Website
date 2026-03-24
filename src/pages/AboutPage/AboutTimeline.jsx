import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineEvents = [
  { year: '2015', title: 'Company Founded', desc: 'Elcardo Industries opens its first manufacturing facility.' },
  { year: '2017', title: 'Roller Gates', desc: 'Pioneered high-security automated roller gates across the region.' },
  { year: '2019', title: 'Elcardo Solar', desc: 'Diversified into renewable energy and industrial solar installations.' },
  { year: '2021', title: 'Elme Battery', desc: 'Launched automotive and industrial battery manufacturing division.' },
  { year: '2023', title: 'Anilad Hotels', desc: 'Expanded into premium hospitality with our first resort property.' },
  { year: '2025', title: 'Future Mobility', desc: 'Opening the state-of-the-art vehicle modification center.' },
];

export default function AboutTimeline() {
  const scrollContainerRef = useRef(null);
  
  // Create a horizontal scroll effect mapped to vertical scroll inside this container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Translate the inner timeline track horizontally based on vertical scroll
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-65vw"]);

  return (
    <section className="about-timeline-wrap" ref={scrollContainerRef}>
      <div className="about-timeline-sticky">
        <div className="about-timeline-header">
          <h2 className="about-title-large">Our Journey</h2>
        </div>
        
        <motion.div className="about-timeline-track" style={{ x: xTransform }}>
          {timelineEvents.map((event, i) => (
            <div className="about-timeline-item" key={event.year}>
              <div className="about-timeline-year">{event.year}</div>
              <div className="about-timeline-dot" />
              <div className="about-timeline-content">
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Progress line behind dots */}
        <div className="about-timeline-line" />
      </div>
    </section>
  );
}
