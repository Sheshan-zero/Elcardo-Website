import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './Clients.css';

const clientsRow1 = [
  'Etisalat', 'Dialog', 'Cargills', 'Hemas Group', 'Aitken Spence',
  'LOLC Group', 'John Keells', 'MAS Holdings', 'Bank of Ceylon', 'SLT-Mobitel',
];
const clientsRow2 = [
  'LOLC Group', 'Bank of Ceylon', 'Etisalat', 'MAS Holdings', 'Aitken Spence',
  'Cargills', 'SLT-Mobitel', 'Dialog', 'John Keells', 'Hemas Group',
];

const testimonials = [
  {
    quote: "Elcardo's engineering team delivered beyond our expectations. The industrial gate system is world-class.",
    author: 'Rajitha Fernando',
    role: 'Operations Director, Cargills',
  },
  {
    quote: 'Our 150kW solar installation has reduced energy costs by 65%. Elcardo Solar made the entire process seamless.',
    author: 'Nimal Perera',
    role: 'CEO, Hemas Manufacturing',
  },
  {
    quote: 'The vehicle modifications were executed with precision. Elcardo understands luxury and performance.',
    author: 'Sanjeev Gupta',
    role: 'Fleet Manager, Aitken Spence',
  },
];

export default function Clients() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="clients" className="clients" ref={ref}>
      {/* Header */}
      <div className="clients-header section-padding" style={{ paddingBottom: 0 }}>
        <motion.div
          className="clients-header-inner"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="label-line" />
            <span className="label-text">Trusted By</span>
          </div>
          <h2 className="display-lg" style={{ color: 'var(--primary-navy)', textAlign: 'center' }}>
            Partners &<br />
            <span className="text-italic">Clients</span>
          </h2>
          <p className="clients-subtitle body-md">
            Proud to work alongside some of Sri Lanka's most respected
            organizations across every industry we serve.
          </p>
        </motion.div>
      </div>

      {/* Scrolling Logo Tickers */}
      <div className="clients-tickers">
        <div className="ticker-row">
          <div className="ticker-track ticker-left">
            {[...clientsRow1, ...clientsRow1].map((name, i) => (
              <div className="ticker-logo" key={`r1-${i}`}>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ticker-row">
          <div className="ticker-track ticker-right">
            {[...clientsRow2, ...clientsRow2].map((name, i) => (
              <div className="ticker-logo" key={`r2-${i}`}>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="clients-testimonials section-padding" style={{ paddingTop: '80px' }}>
        <motion.div
          className="testimonials-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="testimonial-name">{t.author}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
