import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '../../utils/motionVariantsNew';
import { companies } from '../../data/companiesData';
import { Link } from 'react-router-dom';
import './CompanyShowcase.css';

export default function CompanyShowcase() {
  return (
    <section className="cp-showcase" id="divisions">
      {companies.map((company, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div 
            key={company.id} 
            className={`showcase-row ${isReversed ? 'showcase-row--reversed' : ''}`}
            data-section={company.index} /* Keep old anchor IDs mapped to roman chapters */
          >
            {/* Image Side */}
            <motion.div 
              className="showcase-row__visual"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="showcase-row__image-wrapper">
                <img src={company.image} alt={company.name} loading="lazy" />
                <div 
                  className="showcase-row__accent" 
                  style={{ backgroundColor: company.theme.accent }}
                />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
              className="showcase-row__content"
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeUp}
            >
              <div className="showcase-row__header">
                <span className="label-text" style={{ color: company.theme.accent }}>
                  {company.sector}
                </span>
                <span className="showcase-row__number">{company.index}</span>
              </div>
              
              <h2 className="display-md showcase-row__title">{company.name}</h2>
              <p className="body-md text-muted showcase-row__desc">
                {company.description}
              </p>

              <div className="showcase-row__stats">
                <div className="stat-box">
                  <span className="stat-box__val" style={{ color: company.theme.accent }}>{company.stats.metric1}</span>
                  <span className="stat-box__lbl">{company.stats.label1}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-box__val" style={{ color: company.theme.accent }}>{company.stats.metric2}</span>
                  <span className="stat-box__lbl">{company.stats.label2}</span>
                </div>
              </div>

              <Link to={company.ctaLink} className="cp-link">
                Explore Solutions
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
