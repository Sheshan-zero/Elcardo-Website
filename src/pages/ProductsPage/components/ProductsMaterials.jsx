import React from 'react';
import { motion } from 'framer-motion';
import './ProductsMaterials.css';

import { LatticeGridSVG, CarbonWeaveSVG, SolarCellSVG, PolymerExtrusionSVG } from './MaterialsSVGs';

const ease = [0.16, 1, 0.3, 1];

const MATERIALS = [
  {
    kicker: '01 / Precision Steel',
    title: 'Cold-rolled integrity for structural permanence.',
    desc: 'Engineered at a molecular level to withstand excessive force without deformation. The structural foundation for our high-tension industrial applications.',
    SVG: LatticeGridSVG,
  },
  {
    kicker: '02 / Engineered Durability',
    title: 'Interwoven carbon fiber architectures.',
    desc: 'Advanced carbon fiber weave patterns endure continuous mechanical load in severe industrial and coastal environments.',
    SVG: CarbonWeaveSVG,
  },
  {
    kicker: '03 / Optimized Energy',
    title: 'Photovoltaic cells delivering maximum output.',
    desc: 'Monocrystalline architectures with anti-reflective shielding, ensuring superior energy capture in all conditions.',
    SVG: SolarCellSVG,
  },
  {
    kicker: '04 / Advanced Composites',
    title: 'Premium wood-polymer for lasting beauty.',
    desc: 'A fusion of natural wood fibers and high-density polymers. The warmth of timber with the resilience of industrial plastics.',
    SVG: PolymerExtrusionSVG,
  },
];

export default function ProductsMaterials() {
  return (
    <section className="pm-section">
      {/* Header */}
      <div className="pm-header">
        <motion.p
          className="pm-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Materials &amp; Engineering
        </motion.p>
        <motion.h2
          className="pm-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          Built from the<br /><em>finest materials.</em>
        </motion.h2>
      </div>

      {/* Material rows — each scrolls into view */}
      <div className="pm-materials-list">
        {MATERIALS.map((mat, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className={`pm-row ${isEven ? '' : 'pm-row-reverse'}`}>
              
              {/* SVG Diagram */}
              <motion.div
                className="pm-row-vis"
                initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, ease }}
              >
                <div className="pm-row-svg-wrap">
                  <mat.SVG />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                className="pm-row-text"
                initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, delay: 0.15, ease }}
              >
                <p className="pm-row-kicker">{mat.kicker}</p>
                <h3 className="pm-row-title">{mat.title}</h3>
                <p className="pm-row-desc">{mat.desc}</p>
                
                {/* Decorative line */}
                <motion.div 
                  className="pm-row-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4, ease }}
                />
              </motion.div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
