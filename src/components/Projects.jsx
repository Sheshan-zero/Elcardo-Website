import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import imgSolar from '../assets/company_solar.png';
import imgRollerGates from '../assets/company_roller_gates.png';
import imgAutomotive from '../assets/company_automotive.png';
import imgHotel from '../assets/company_hotel.png';
import imgBattery from '../assets/company_battery.png';
import imgSolarRoof from '../assets/project_solar_roof.png';
import './Projects.css';

const projects = [
  {
    img: imgSolarRoof,
    category: 'Elcardo Solar • 2024',
    title: '150kW Commercial Rooftop Solar System',
    location: 'Colombo, Western Province',
    label: 'Solar Installation',
    large: true,
  },
  {
    img: imgRollerGates,
    category: 'Roller Gates • 2024',
    title: 'High-Security Industrial Gate System',
    location: 'Katunayake Free Trade Zone',
    label: 'Gate Automation',
  },
  {
    img: imgAutomotive,
    category: 'Automotive • 2023',
    title: 'Commercial Fleet — 20 Custom Builds',
    location: 'Kandy, Central Province',
    label: 'Fleet Build',
  },
  {
    img: imgHotel,
    category: 'Anilad Hotels • 2023',
    title: 'Beachfront Boutique Hotel',
    location: 'Negombo, Western Province',
    label: 'Hospitality',
  },
  {
    img: imgBattery,
    category: 'Elme Battery • 2023',
    title: '500kWh Industrial Storage System',
    location: 'Galle, Southern Province',
    label: 'Battery Storage',
  },
];

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="projects section-padding" ref={ref}>
      <div className="projects-header">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="label-line" />
            <span className="label-text">Featured Work</span>
          </div>
          <h2 className="display-lg" style={{ color: 'var(--primary-navy)' }}>
            Real projects.<br />
            <span className="text-italic">Real impact.</span>
          </h2>
        </motion.div>
        <motion.a
          href="#"
          className="projects-view-all"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          data-cursor="expand"
        >
          All Projects →
        </motion.a>
      </div>

      <motion.div
        className="projects-mosaic"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {projects.map((proj, i) => (
          <div
            className={`proj-card ${proj.large ? 'proj-large' : ''}`}
            key={i}
            data-cursor="expand"
          >
            <div className="proj-bg">
              <img src={proj.img} alt={proj.title} className="proj-bg-img" loading="lazy" decoding="async" />
            </div>
            <div className="proj-overlay" />
            <span className="proj-static-label">{proj.label}</span>
            <div className="proj-info">
              <div className="proj-category">{proj.category}</div>
              <div className="proj-title">{proj.title}</div>
              <div className="proj-location">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {proj.location}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
