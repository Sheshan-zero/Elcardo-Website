import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './ProjectGallery.css';

/* ─── Project images (using existing assets) ─── */
import imgGate from '../../assets/project_commercial_gate.png';
import imgSolarInstall from '../../assets/project_solar_install.png';
import imgSteel from '../../assets/project_steel_fabrication.png';
import imgDecking from '../../assets/project_luxury_decking.png';
import imgRoller from '../../assets/project_industrial_roller.png';
import imgResGate from '../../assets/project_residential_gate.png';

const EASE = [0.16, 1, 0.3, 1];

const PROJECTS = [
  { img: imgGate, label: 'Commercial Gate System', tall: true },
  { img: imgSolarInstall, label: 'Solar Installation' },
  { img: imgSteel, label: 'Steel Fabrication' },
  { img: imgDecking, label: 'Luxury Decking' },
  { img: imgRoller, label: 'Industrial Roller' },
  { img: imgResGate, label: 'Residential Gate', tall: false },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
};

export default function ProjectGallery() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="cpg-proj" id="project-gallery">
      <motion.div
        className="cpg-proj__header"
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
        variants={fadeUp}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="cpg-proj__kicker">
          <span className="cpg-proj__kicker-line" />
          Proof of Work
        </span>
        <h2 className="cpg-proj__title">
          Real Projects, <em>Real Impact</em>
        </h2>
        <p className="cpg-proj__subtitle">
          From industrial roller gates to solar farms — built to perform,
          engineered to last.
        </p>
      </motion.div>

      <div className="cpg-proj__grid">
        {PROJECTS.map((proj, i) => (
          <ProjectCard key={i} project={proj} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      className={`cpg-proj__card ${project.tall ? 'cpg-proj__card--tall' : ''}`}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={scaleIn}
      transition={{ duration: 0.85, ease: EASE, delay: index * 0.08 }}
      data-cursor="expand"
    >
      <img src={project.img} alt={project.label} loading="lazy" />
      <div className="cpg-proj__card-overlay" />
      <span className="cpg-proj__card-label">{project.label}</span>
    </motion.div>
  );
}
