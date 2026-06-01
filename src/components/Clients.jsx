import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Clients.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
const GOOGLE_SCRIPT_ID = 'google-maps-places-sdk';

/* ===== Floating logo wall data ===== */
const BASE = import.meta.env.BASE_URL;
const L = (f) => `${BASE}logos/${f}`;

const LOGO_FILES = [
  '1-1.png',  '2-1.png',  '6-1.png',  '7-1.png',
  '8-1.png',  '9-1.png',  '10-2.png', '11-2.png',
  '12-2.png', '13-2.png', '14-2.png', '15-1.png',
  '16-2.png', '17-2.png', '18-1.png', '19-1.png',
  '20-1.png', '21-1.png', '22-1.png', '23-1.png',
  '24-1.png', '25-1.png', '26-1.png', '27-1.png',
  '28-1.png', '29-1.png', '30-1.png', '31-1.png',
  'Ac1.png',  'ccc1.png', 'cr1.png',  'dia1.png',
  'fc1.png',  'HayFab1.png', 'lio1.png', 'Mali1.png',
  'sl1.png',  'uni.png',
];

const SECTORS = ['Manufacturing', 'Construction', 'Hospitality', 'Retail', 'Industrial', 'Real Estate'];
const PROD_TAGS = [
  ['Roller Doors', 'Automation'],
  ['Steel Gates', 'Fabrication'],
  ['WPC Decking', 'Interior'],
  ['Roofing Sheets', 'Purlins'],
  ['Solar Systems', 'Pipes & Tubes'],
  ['Roller Shutters', 'Access Control'],
];

const LOGO_DATA = LOGO_FILES.map((file, i) => ({
  id: i,
  src: L(file),
  sector: SECTORS[i % SECTORS.length],
  tags: PROD_TAGS[i % PROD_TAGS.length],
  floatAmp: 4 + (i % 5) * 2.2,
  floatDur: 3.2 + (i % 7) * 0.5,
  floatDelay: -(i * 0.42) % 3.2,
}));

// depth: parallax multiplier | speed: scroll duration (s) | imgH: logo height for depth illusion
const ROW_CONFIGS = [
  { depth: 0.25, speed: 88, reverse: false, baseOpacity: 0.44, imgH: 24 },
  { depth: 0.65, speed: 56, reverse: true,  baseOpacity: 0.70, imgH: 34 },
  { depth: 1.10, speed: 36, reverse: false, baseOpacity: 1.00, imgH: 44 },
];

const ROW_LOGOS = [
  LOGO_DATA.slice(0, 13),
  LOGO_DATA.slice(13, 26),
  LOGO_DATA.slice(26),
];

function StarRating({ count = 0 }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.round(count) ? 'currentColor' : 'none'} stroke="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ===== Floating Logo Wall components ===== */
function LogoCard({ logo, imgH, baseOpacity }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cls-card"
      style={{
        '--float-amp': `${logo.floatAmp}px`,
        '--float-dur': `${logo.floatDur}s`,
        '--float-delay': `${logo.floatDelay}s`,
      }}
    >
      <div className="cls-card-float">
        <motion.div
          className="cls-card-inner"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={hovered ? 'hovered' : 'idle'}
          variants={{
            idle: {
              scale: 1,
              opacity: baseOpacity,
              borderColor: 'rgba(255,255,255,0.07)',
              backgroundColor: 'rgba(255,255,255,0.04)',
            },
            hovered: {
              scale: 1.07,
              opacity: 1,
              borderColor: 'rgba(218,18,18,0.32)',
              backgroundColor: 'rgba(255,255,255,0.09)',
            },
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={logo.src}
            alt="Partner"
            className="cls-card-img"
            style={{ height: imgH }}
            loading="lazy"
            decoding="async"
          />

          <AnimatePresence>
            {hovered && (
              <motion.div
                className="cls-card-detail"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="cls-detail-sector">{logo.sector}</span>
                <div className="cls-detail-tags">
                  {logo.tags.map((tag) => (
                    <span key={tag} className="cls-detail-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function LogoRow({ logos, config, mouseY }) {
  const yShift = useTransform(mouseY, [-1, 1], [config.depth * -26, config.depth * 26]);

  return (
    <motion.div className="cls-row" style={{ y: yShift }}>
      <div
        className={`cls-track cls-track--${config.reverse ? 'right' : 'left'}`}
        style={{ animationDuration: `${config.speed}s` }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <LogoCard
            key={`${logo.id}-${i}`}
            logo={logo}
            imgH={config.imgH}
            baseOpacity={config.baseOpacity}
          />
        ))}
      </div>
    </motion.div>
  );
}

function FloatingLogoWall() {
  const mouseY = useMotionValue(0);
  const smoothY = useSpring(mouseY, { stiffness: 42, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, [mouseY]);

  const handleMouseLeave = useCallback(() => mouseY.set(0), [mouseY]);

  return (
    <div className="cls-belt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="cls-belt-glow" />

      <div className="cls-belt-stats">
        <div className="cls-stat">
          <span className="cls-stat-num">38<span className="cls-stat-plus">+</span></span>
          <span className="cls-stat-lbl">Industry Partners</span>
        </div>
        <div className="cls-stat-div" />
        <div className="cls-stat">
          <span className="cls-stat-num">6</span>
          <span className="cls-stat-lbl">Sectors Served</span>
        </div>
        <div className="cls-stat-div" />
        <div className="cls-stat">
          <span className="cls-stat-num">20<span className="cls-stat-plus">+</span></span>
          <span className="cls-stat-lbl">Years Trusted</span>
        </div>
      </div>

      {ROW_CONFIGS.map((config, ri) => (
        <LogoRow key={ri} logos={ROW_LOGOS[ri]} config={config} mouseY={smoothY} />
      ))}
    </div>
  );
}

function loadGooglePlacesScript() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();

  const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', resolve, { once: true });
      existingScript.addEventListener('error', reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = GOOGLE_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function normalizeGoogleReview(review, index) {
  const authorAttribution = review.authorAttribution || {};
  const author = authorAttribution.displayName || review.author_name || 'Google reviewer';

  return {
    id: review.publishTime?.toISOString?.() || review.time || `${author}-${index}`,
    quote: review.text || review.originalText || 'Rated Elcardo on Google.',
    author,
    role: review.relativePublishTimeDescription || review.relative_time_description || 'Google review',
    rating: review.rating || 0,
    avatar: authorAttribution.photoURI || review.profile_photo_url,
    url: review.googleMapsURI || authorAttribution.uri,
    accent: index % 2 === 0 ? 'var(--accent-red)' : 'var(--mid-blue)',
  };
}

function normalizeGooglePlace(place) {
  const name = typeof place.displayName === 'string'
    ? place.displayName
    : place.displayName?.text || place.name;

  return {
    name,
    rating: place.rating,
    userRatingCount: place.userRatingCount || place.user_ratings_total,
    url: place.googleMapsURI || place.url,
    reviews: place.reviews || [],
  };
}

async function fetchReviewsWithPlaceClass() {
  const { Place } = await window.google.maps.importLibrary('places');
  const place = new Place({ id: GOOGLE_PLACE_ID });

  await place.fetchFields({
    fields: ['displayName', 'rating', 'userRatingCount', 'googleMapsURI', 'reviews'],
  });

  return normalizeGooglePlace(place);
}

function fetchReviewsWithLegacyService() {
  return new Promise((resolve, reject) => {
    const mapNode = document.createElement('div');
    const service = new window.google.maps.places.PlacesService(mapNode);

    service.getDetails(
      {
        placeId: GOOGLE_PLACE_ID,
        fields: ['name', 'rating', 'user_ratings_total', 'url', 'reviews'],
      },
      (place, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || !place) {
          reject(new Error(`Legacy PlacesService status: ${status}`));
          return;
        }

        resolve(normalizeGooglePlace(place));
      }
    );
  });
}

function useGoogleReviews() {
  const [state, setState] = useState({
    loading: Boolean(GOOGLE_MAPS_API_KEY && GOOGLE_PLACE_ID),
    reviews: [],
    place: null,
    error: '',
  });

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !GOOGLE_PLACE_ID) {
      setState({
        loading: false,
        reviews: [],
        place: null,
        error: 'Google reviews are not configured yet.',
      });
      return;
    }

    let cancelled = false;

    loadGooglePlacesScript()
      .then(async () => {
        if (cancelled) return;

        let place;

        try {
          place = await fetchReviewsWithPlaceClass();
        } catch (placeClassError) {
          console.warn('Google Place class reviews failed, trying legacy PlacesService.', placeClassError);
          place = await fetchReviewsWithLegacyService();
        }

        if (!place.reviews?.length) {
          try {
            const legacyPlace = await fetchReviewsWithLegacyService();
            place = {
              ...place,
              ...legacyPlace,
              reviews: legacyPlace.reviews?.length ? legacyPlace.reviews : place.reviews,
            };
          } catch (legacyError) {
            console.warn('Legacy PlacesService also returned no review details.', legacyError);
          }
        }

        if (cancelled) return;

        const reviews = (place.reviews || []).map(normalizeGoogleReview);

        setState({
          loading: false,
          reviews,
          place,
          error: reviews.length ? '' : 'Google returned this place but did not include review details in the response.',
        });
      })
      .catch((error) => {
        if (cancelled) return;
        console.error('Google reviews failed to load.', error);
        setState({
          loading: false,
          reviews: [],
          place: null,
          error: error?.message || 'Google reviews could not be loaded right now.',
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Clients() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { loading, reviews, place, error } = useGoogleReviews();
  const isConfigured = Boolean(GOOGLE_MAPS_API_KEY && GOOGLE_PLACE_ID);
  const reviewSummary = useMemo(() => {
    if (!place?.rating || !place?.userRatingCount) return null;
    return `${place.rating.toFixed(1)} average from ${place.userRatingCount.toLocaleString()} Google reviews`;
  }, [place]);

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

      {/* Floating Logo Wall */}
      <FloatingLogoWall />

      {/* Google Reviews */}
      <div className="clients-testimonials section-padding" style={{ paddingTop: '80px' }}>
        <motion.div
          className="google-reviews-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="google-reviews-kicker">Google Reviews</p>
            <h3 className="google-reviews-title">Customer feedback from Google.</h3>
            {place?.name && <p className="google-reviews-place">Loaded from: {place.name}</p>}
          </div>
          {reviewSummary && (
            <a href={place.url} target="_blank" rel="noopener noreferrer" className="google-reviews-link">
              {reviewSummary}
            </a>
          )}
        </motion.div>

        <motion.div
          className="testimonials-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {loading && Array.from({ length: 3 }, (_, i) => (
            <div className="testimonial-card testimonial-card-loading" key={`review-loading-${i}`}>
              <div className="testimonial-skeleton testimonial-skeleton-stars" />
              <div className="testimonial-skeleton testimonial-skeleton-line" />
              <div className="testimonial-skeleton testimonial-skeleton-line short" />
              <div className="testimonial-skeleton testimonial-skeleton-author" />
            </div>
          ))}

          {!loading && reviews.map((t, i) => (
            <motion.div
              className="testimonial-card"
              key={t.id}
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
              <div className="testimonial-quote-icon" aria-hidden="true">
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
                    {t.avatar ? <img src={t.avatar} alt="" loading="lazy" /> : getInitials(t.author)}
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

        {!loading && !reviews.length && (
          isConfigured && place ? (
            <div className="google-rating-card">
              <div className="google-rating-main">
                <span className="google-rating-score">{place.rating?.toFixed?.(1) || place.rating}</span>
                <div>
                  <StarRating count={place.rating || 0} />
                  <p>{place.userRatingCount?.toLocaleString?.() || place.userRatingCount} Google reviews</p>
                </div>
              </div>
              <div className="google-rating-copy">
                <p>Individual review text is available on Google Maps.</p>
                <span>Google returned the live rating summary for this listing, but did not include individual review records in the API response.</span>
              </div>
              {place.url && (
                <a href={place.url} target="_blank" rel="noopener noreferrer" className="google-reviews-empty-link">
                  Read reviews on Google
                </a>
              )}
            </div>
          ) : (
            <div className="google-reviews-empty">
              <p>{error}</p>
              <span>Add `VITE_GOOGLE_MAPS_API_KEY` and `VITE_GOOGLE_PLACE_ID` to enable live Google reviews.</span>
            </div>
          )
        )}
      </div>
    </section>
  );
}
