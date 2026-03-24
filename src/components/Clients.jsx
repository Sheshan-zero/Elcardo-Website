import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './Clients.css';

/* ===== Client logos — using img.logo.dev for reliable company logos ===== */
const clientLogos = [
  { name: 'Dialog', logo: 'https://img.logo.dev/dialog.lk?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Cargills', logo: 'https://img.logo.dev/cargillsceylon.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Hemas', logo: 'https://img.logo.dev/hemas.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Aitken Spence', logo: 'https://img.logo.dev/aitkenspence.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'John Keells', logo: 'https://img.logo.dev/keells.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'MAS Holdings', logo: 'https://img.logo.dev/masholdings.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Bank of Ceylon', logo: 'https://img.logo.dev/boc.lk?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'SLT Mobitel', logo: 'https://img.logo.dev/mobitel.lk?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Brandix', logo: 'https://img.logo.dev/brandix.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Dilmah', logo: 'https://img.logo.dev/dilmahtea.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
];

const clientLogosRow2 = [
  { name: 'Dilmah', logo: 'https://img.logo.dev/dilmahtea.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Bank of Ceylon', logo: 'https://img.logo.dev/boc.lk?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Dialog', logo: 'https://img.logo.dev/dialog.lk?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'MAS Holdings', logo: 'https://img.logo.dev/masholdings.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Aitken Spence', logo: 'https://img.logo.dev/aitkenspence.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Cargills', logo: 'https://img.logo.dev/cargillsceylon.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'SLT Mobitel', logo: 'https://img.logo.dev/mobitel.lk?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Hemas', logo: 'https://img.logo.dev/hemas.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'John Keells', logo: 'https://img.logo.dev/keells.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
  { name: 'Brandix', logo: 'https://img.logo.dev/brandix.com?token=pk_a8z0NDMgSEijJTKNzUJhQg&size=80&format=png' },
];

const testimonials = [
  {
    quote: "Elcardo's engineering team delivered beyond our expectations. The industrial gate system is world-class.",
    author: 'Rajitha Fernando',
    role: 'Operations Director, Cargills',
    rating: 5,
    accent: 'var(--accent-red)',
  },
  {
    quote: 'Our 150kW solar installation has reduced energy costs by 65%. Elcardo Solar made the entire process seamless.',
    author: 'Nimal Perera',
    role: 'CEO, Hemas Manufacturing',
    rating: 5,
    accent: 'var(--mid-blue)',
  },
  {
    quote: 'The vehicle modifications were executed with precision. Elcardo understands luxury and performance.',
    author: 'Sanjeev Gupta',
    role: 'Fleet Manager, Aitken Spence',
    rating: 5,
    accent: 'var(--accent-red)',
  },
];

function StarRating({ count }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

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
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <div className="ticker-logo" key={`r1-${i}`}>
                <img
                  src={client.logo}
                  alt={client.name}
                  className="ticker-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="ticker-logo-fallback" style={{ display: 'none' }}>
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="ticker-row">
          <div className="ticker-track ticker-right">
            {[...clientLogosRow2, ...clientLogosRow2].map((client, i) => (
              <div className="ticker-logo" key={`r2-${i}`}>
                <img
                  src={client.logo}
                  alt={client.name}
                  className="ticker-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="ticker-logo-fallback" style={{ display: 'none' }}>
                  {client.name}
                </span>
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
            <motion.div
              className="testimonial-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ '--card-accent': t.accent }}
            >
              {/* Decorative accent border */}
              <div className="testimonial-accent-bar" />

              {/* Glass highlight */}
              <div className="testimonial-glass" />

              {/* Quote mark */}
              <div className="testimonial-quote-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M8 25.5C8 21.1 10.8 17.5 15 16L16.5 18.5C13.5 20 12 22.5 12 25H16V32H8V25.5ZM22 25.5C22 21.1 24.8 17.5 29 16L30.5 18.5C27.5 20 26 22.5 26 25H30V32H22V25.5Z" fill="url(#quoteGrad)" />
                  <defs>
                    <linearGradient id="quoteGrad" x1="8" y1="16" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--accent-red)" />
                      <stop offset="1" stopColor="var(--mid-blue)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Quote text */}
              <p className="testimonial-text">{t.quote}</p>

              {/* Author info */}
              <div className="testimonial-author">
                <div className="testimonial-avatar-ring">
                  <div className="testimonial-avatar">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <div className="testimonial-name">{t.author}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
