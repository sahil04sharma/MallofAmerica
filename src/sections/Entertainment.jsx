import { motion } from 'framer-motion';
import { useIntersection } from '../hooks/useIntersection';

const ease = [0.22, 1, 0.36, 1];

const attractions = [
  {
    name: 'Nickelodeon Universe',
    tag: 'Theme Park',
    desc: 'The nation\'s largest indoor theme park. 7 acres, 30+ rides, and one-of-a-kind SpongeBob, Dora, and Avatar experiences.',
    stat: '30+ Rides',
  },
  {
    name: 'SEA LIFE Minnesota',
    tag: 'Aquarium',
    desc: 'An immersive underwater journey through 10,000+ sea creatures, including sharks, rays, and jellyfish.',
    stat: '10,000+ Creatures',
  },
  {
    name: 'FlyOver America',
    tag: '4D Flight Experience',
    desc: 'A breathtaking aerial journey across the most stunning landscapes in North America — a premiere immersive experience.',
    stat: '10+ Minutes',
  },
  {
    name: 'Crayola Experience',
    tag: 'Interactive Arts',
    desc: '25,000 sq ft of family-focused hands-on arts and creativity activities — one of only four in the world.',
    stat: '25,000 Sq Ft',
  },
  {
    name: 'Theatres at MOA',
    tag: 'Cinemas',
    desc: 'A 14-screen premium cinema complex operated by AMC — an evening anchor and traffic driver.',
    stat: '14 Screens',
  },
  {
    name: 'Golf Mountain',
    tag: 'Mini Golf',
    desc: 'Three 18-hole indoor mini-golf experiences for all ages, adding dwell time and family-friendly entertainment.',
    stat: '54 Holes',
  },
];

export default function Entertainment() {
  const [ref, isVisible] = useIntersection();

  return (
    <section id="entertainment" ref={ref} style={{
      padding: 'clamp(7rem, 12vw, 11rem) 2rem',
      background: '#070707',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Diagonal energy accents */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 60% 40% at 100% 0%, rgba(201,168,76,0.08) 0%, transparent 60%),' +
          'radial-gradient(ellipse 70% 50% at 0% 100%, rgba(201,168,76,0.05) 0%, transparent 65%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Header — left aligned, charged */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-24 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
              <span className="kicker">Chapter 05 — Attractions</span>
            </div>
            <h2 className="font-display" style={{
              fontFamily: 'Bebas Neue',
              fontSize: 'clamp(3rem, 9vw, 9rem)',
              lineHeight: 0.88,
              color: 'white',
              letterSpacing: '0.005em',
            }}>
              THE REASON<br />
              THEY <span style={{ color: 'var(--gold)' }}>COME.</span><br />
              THE REASON<br />
              THEY <span style={{ fontFamily: 'Italiana, serif', color: 'var(--gold-light)' }}>stay.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 1, ease }}
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
              color: 'rgba(255,255,255,0.65)',
              fontStyle: 'italic',
              lineHeight: 1.75,
              maxWidth: 460,
              borderLeft: '1px solid rgba(201,168,76,0.4)',
              paddingLeft: '1.5rem',
            }}
          >
            MOA's entertainment ecosystem is what separates this destination from every other retail address on the continent — turning a visit into an event.
          </motion.p>
        </div>

        {/* Attractions — editorial mosaic with hairline grid (no boxed cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{
          borderTop: '1px solid rgba(201,168,76,0.18)',
          marginBottom: '6rem',
        }}>
          {attractions.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.9, ease }}
              style={{
                padding: 'clamp(2rem, 3vw, 3rem) clamp(1.5rem, 2.5vw, 2.5rem)',
                borderBottom: '1px solid rgba(201,168,76,0.14)',
                borderLeft: i % 3 !== 0 ? '1px solid rgba(201,168,76,0.10)' : 'none',
                position: 'relative',
                transition: 'background 0.7s var(--ease-cinema)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.035)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Big editorial index numeral */}
              <div style={{
                fontFamily: 'Italiana, serif',
                fontSize: 'clamp(2.5rem, 4vw, 3.6rem)',
                color: 'rgba(201,168,76,0.45)',
                lineHeight: 1,
                marginBottom: '1.25rem',
                letterSpacing: '0.02em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="kicker" style={{ marginBottom: '0.75rem' }}>{a.tag}</div>
              <h3 style={{
                fontFamily: 'Bebas Neue',
                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                letterSpacing: '0.02em',
                color: 'white',
                marginBottom: '1rem',
                lineHeight: 1.05,
              }}>{a.name}</h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.58)',
                lineHeight: 1.75,
                marginBottom: '1.5rem',
                fontFamily: 'Cormorant Garamond',
                fontStyle: 'italic',
              }}>{a.desc}</p>
              <div style={{
                fontFamily: 'Bebas Neue',
                fontSize: '1rem',
                letterSpacing: '0.18em',
                color: 'var(--gold)',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(201,168,76,0.18)',
              }}>{a.stat}</div>
            </motion.div>
          ))}
        </div>

        {/* Editorial pull quote — left-aligned, restrained */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 1.3, ease }}
          style={{ maxWidth: 920 }}
        >
          <div style={{
            fontFamily: 'Italiana, serif',
            fontSize: 'clamp(1.6rem, 3.6vw, 3rem)',
            color: 'white',
            lineHeight: 1.32,
            letterSpacing: '0.005em',
          }}>
            <span style={{ color: 'var(--gold)' }}>"</span>
            No standalone retailer in America can deliver the captive audience, dwell time, and diverse demographics that MOA generates every single day.
            <span style={{ color: 'var(--gold)' }}>"</span>
          </div>
          <figcaption style={{
            marginTop: '2rem',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.32em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              MOA Leasing Overview
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
