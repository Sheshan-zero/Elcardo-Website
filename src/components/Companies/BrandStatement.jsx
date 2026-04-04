import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '../../utils/motionVariantsNew';
import './BrandStatement.css';

export default function BrandStatement() {
  return (
    <section className="cp-statement">
      <div className="cp-statement__inner">
        <motion.div 
          className="cp-statement__left"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <span className="label-text text-accent">Our Philosophy</span>
          <p className="body-lg text-muted mt-4">
            For decades, Elcardo Industries has been the silent engine behind Sri Lanka's infrastructural 
            evolution. We don't just participate in markets; we build the foundational systems that allow 
            them to thrive.
          </p>
        </motion.div>

        <motion.div 
          className="cp-statement__right"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <h2 className="display-md">
            Built on <span className="text-italic">Precision.</span><br/>
            Scaled with <span className="text-italic">Purpose.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
