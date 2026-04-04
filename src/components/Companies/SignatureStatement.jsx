import { motion } from 'framer-motion';
import { fadeUp, lineGrowCenter, defaultViewport } from '../../utils/motionVariantsNew';
import './SignatureStatement.css';

export default function SignatureStatement() {
  return (
    <section className="cp-signature">
      <div className="cp-signature__inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <h2 className="display-lg text-center">
            Driven by Engineering.<br/>
            Defined by <span className="text-accent">Excellence.</span>
          </h2>
        </motion.div>
        
        <motion.div 
          className="cp-signature__line"
          variants={lineGrowCenter}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        />
      </div>
    </section>
  );
}
