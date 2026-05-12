import { motion } from 'framer-motion';
import { useIntersection } from '../hooks/useIntersection';

const ease = [0.22, 1, 0.36, 1];

const venues = [
  { name: 'Crayola Experience Café', cuisine: 'Interactive Family', mood: 'Playful & Colorful' },
  { name: 'The Tavern', cuisine: 'American Bar & Grill', mood: 'Lively & Social' },
  { name: 'Noodles & Company', cuisine: 'Fast Casual Asian', mood: 'Quick & Flavorful' },
  { name: 'Shake Shack', cuisine: 'Premium Burgers', mood: 'Modern & Fresh' },
  { name: 'California Pizza Kitchen', cuisine: 'Artisan Pizza', mood: 'Relaxed Dining' },
  { name: 'The Capital Grille', cuisine: 'Fine Dining Steakhouse', mood: 'Upscale & Refined' },
];

export default function Dining() {
  const [ref, isVisible] = useIntersection();

  return (
    <section id="dining" ref={ref} style={{
      padding: 'clamp(7rem, 12vw, 11rem) 2rem',
      background: 'linear-gradient(180deg, #14110A 0%, #1a160d 100%)',
      position: 'relative',
    }}>
      {/* Warm editorial atmosphere — soft lamp light, top-right glow */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 85% 15%, rgba(232,201,122,0.08) 0%, transparent 50%),
          radial-gradient(circle at 10% 90%, rgba(140,90,40,0.07) 0%, transparent 55%)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Editorial header — magazine spread */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
              <span className="kicker">Chapter 04 — Dining</span>
            </div>
            <h2 className="font-display" style={{
              fontFamily: 'Bebas Neue',
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              lineHeight: 0.92,
              color: 'white',
              letterSpacing: '0.005em',
            }}>
              FIFTY RESTAURANTS.<br />
              <span style={{ fontFamily: 'Italiana, serif', color: 'var(--gold-light)' }}>
                Every craving,
              </span><br />
              ALL DAY LONG.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease }}
          >
            <p style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.75,
              fontStyle: 'italic',
              marginBottom: '2.5rem',
              borderLeft: '1px solid rgba(232,201,122,0.5)',
              paddingLeft: '1.5rem',
            }}>
              From weekday power lunches to weekend celebrations, MOA's dining ecosystem is engineered to keep guests on property longer — and spending more.
            </p>

            <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
              {[
                { num: '50+', label: 'Restaurants' },
                { num: '$500M', label: 'F&B Spend' },
                { num: '3.4h', label: 'Avg Visit' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: 'Italiana, serif',
                    fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                    color: 'var(--gold-light)',
                    lineHeight: 1,
                    letterSpacing: '0.02em',
                  }}>{s.num}</div>
                  <div style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.32em',
                    color: 'rgba(255,255,255,0.45)',
                    textTransform: 'uppercase',
                    marginTop: 8,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Venue list — editorial menu, not cards */}
        <div style={{ marginBottom: '7rem' }}>
          <div className="kicker" style={{ marginBottom: '2rem', color: 'rgba(232,201,122,0.7)' }}>
            A selection in residence
          </div>
          {venues.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.09, duration: 1, ease }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(50px, 80px) minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)',
                gap: 'clamp(1rem, 3vw, 2.5rem)',
                alignItems: 'baseline',
                padding: '1.6rem 0',
                borderTop: i === 0 ? '1px solid rgba(232,201,122,0.25)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span style={{
                fontFamily: 'Italiana, serif',
                fontSize: '1rem',
                color: 'rgba(232,201,122,0.7)',
                letterSpacing: '0.1em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div style={{
                fontFamily: 'Italiana, serif',
                fontSize: 'clamp(1.3rem, 2.2vw, 1.85rem)',
                color: 'white',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
              }}>
                {v.name}
              </div>
              <div style={{
                fontSize: '0.6rem', letterSpacing: '0.28em',
                color: 'var(--gold)', textTransform: 'uppercase',
                fontWeight: 500,
              }}>
                {v.cuisine}
              </div>
              <div style={{
                fontFamily: 'Cormorant Garamond',
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.5)',
              }}>
                {v.mood}
              </div>
            </motion.div>
          ))}
        </div>

        {/* F&B Opportunities — editorial 3-up with hairline rules, not box */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid rgba(232,201,122,0.25)' }}>
          {[
            { title: 'The Food Hall', desc: 'Premium multi-vendor opportunities. Bring your ghost kitchen, regional concept, or emerging brand to forty million guests.' },
            { title: 'The Standalone', desc: 'Full-service restaurant spaces from 2,000–8,000 sq ft with long-term lease options and exceptional visibility.' },
            { title: 'The Quick Service', desc: 'High-traffic corridor kiosks and counter positions — ideal for emerging F&B concepts and franchise expansion.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.12, duration: 1.1, ease }}
              style={{
                padding: 'clamp(2rem, 3vw, 3rem) clamp(1.5rem, 2.5vw, 2.5rem)',
                borderLeft: i > 0 ? '1px solid rgba(232,201,122,0.18)' : 'none',
              }}
            >
              <div className="kicker" style={{ marginBottom: '1.25rem' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h4 style={{
                fontFamily: 'Italiana, serif',
                fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                color: 'white',
                marginBottom: '1rem',
                letterSpacing: '0.01em',
              }}>{item.title}</h4>
              <p style={{
                fontFamily: 'Cormorant Garamond',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
