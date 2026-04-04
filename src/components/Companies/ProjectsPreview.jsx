import { motion } from 'framer-motion';
import { imageReveal, staggerContainer, fadeUp, defaultViewport } from '../../utils/motionVariantsNew';
import { featuredProjects } from '../../data/companiesData';
import './ProjectsPreview.css';

export default function ProjectsPreview() {
  return (
    <section className="cp-projects">
      <div className="cp-projects__header">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <span className="label-text text-accent">Group Portfolio</span>
          <h2 className="display-lg mt-4">Selected Works</h2>
        </motion.div>
      </div>

      <motion.div 
        className="cp-projects__grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {featuredProjects.map((project, idx) => {
          const isLarge = idx === 0 || idx === 3;
          return (
            <motion.div 
              key={project.id} 
              className={`cp-project-card ${isLarge ? 'cp-project-card--large' : ''}`}
            >
              <div className="cp-project-card__image">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  variants={imageReveal} 
                  loading="lazy"
                />
              </div>

              <motion.div className="cp-project-card__info" variants={fadeUp}>
                <span className="label-text text-accent">{project.category}</span>
                <h3 className="display-sm cp-project-card__title">{project.title}</h3>
                <div className="cp-project-card__meta">
                  <span>{project.company}</span>
                  <span className="dot">•</span>
                  <span>{project.location}</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
