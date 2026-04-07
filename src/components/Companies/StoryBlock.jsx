import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StoryBlock.css';

/* ─── Story images (reuse existing assets) ─── */
import imgGates from '../../assets/company_roller_gates.png';
import imgSolar from '../../assets/story_solar_farm.png';
import imgSteel from '../../assets/project_steel_fabrication.png';
import imgHotel from '../../assets/company_hotel.png';

const EASE = [0.16, 1, 0.3, 1];
const SECTION_HEIGHT_VH = 400;

const CHAPTERS = [
  {
    step: '01',
    label: 'Origin',
    headline: 'Where It Began.',
    text: 'A single workshop. One vision for precision engineering and industrial excellence.',
    image: imgGates,
  },
  {
    step: '02',
    label: 'Growth',
    headline: 'How It Expanded.',
    text: 'From gates to solar farms — scaling across industries with the same standard of quality.',
    image: imgSolar,
  },
  {
    step: '03',
    label: 'Today',
    headline: 'What It Became.',
    text: 'Five companies. Four industries. One unified group engineering Sri Lanka\'s future.',
    image: imgSteel,
  },
  {
    step: '04',
    label: 'Tomorrow',
    headline: 'Where It Is Going.',
    text: 'Expanding into hospitality, automotive, and clean energy — built to last generations.',
    image: imgHotel,
  },
];

export default function StoryBlock() {
  const sectionRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) { ticking = false; return; }
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionH = sectionRef.current.scrollHeight;
          const viewH = window.innerHeight;
          const scrolled = -rect.top;
          const totalScrollable = sectionH - viewH;
          const p = Math.max(0, Math.min(1, scrolled / totalScrollable));

          const count = CHAPTERS.length;
          const idx = Math.min(Math.floor(p * count), count - 1);
          const localP = (p * count) - idx;
          setActiveChapter(idx);
          setChapterProgress(localP);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chapter = CHAPTERS[activeChapter];
  const overallProgress = (activeChapter + chapterProgress) / CHAPTERS.length;

  return (
    <section
      className="stb"
      ref={sectionRef}
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      id="story-block"
    >
      <div className="stb__sticky">
        {/* Image side */}
        <div className="stb__image-side">
          <AnimatePresence mode="wait">
            <motion.div
              key={`stb-img-${activeChapter}`}
              className="stb__image-container"
              initial={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
              transition={{ duration: 1.0, ease: EASE }}
            >
              <img
                src={chapter.image}
                alt={chapter.headline}
                className="stb__image"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
          {/* Masked border */}
          <div className="stb__image-border" />
        </div>

        {/* Text side */}
        <div className="stb__text-side">
          {/* Progress line */}
          <div className="stb__progress">
            <div className="stb__progress-track">
              <motion.div
                className="stb__progress-fill"
                style={{ scaleY: overallProgress }}
              />
            </div>
            {CHAPTERS.map((ch, i) => (
              <div
                key={i}
                className={`stb__progress-step ${i === activeChapter ? 'stb__progress-step--active' : ''} ${i < activeChapter ? 'stb__progress-step--done' : ''}`}
              >
                <span className="stb__progress-num">{ch.step}</span>
              </div>
            ))}
          </div>

          {/* Text content */}
          <div className="stb__text-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={`stb-text-${activeChapter}`}
                className="stb__text-inner"
                initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(3px)' }}
                transition={{ duration: 0.85, ease: EASE }}
              >
                <span className="stb__chapter-label">
                  <span className="stb__chapter-line" />
                  {chapter.label}
                </span>
                <h2 className="stb__headline">{chapter.headline}</h2>
                <p className="stb__text">{chapter.text}</p>
                <div className="stb__chapter-divider" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
