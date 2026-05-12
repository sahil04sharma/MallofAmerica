import { motion } from 'framer-motion';
import { useIntersection } from '../hooks/useIntersection';

const ease = [0.22, 1, 0.36, 1];

const retailers = [
  { name: 'NORDSTROM', category: 'Anchor', tier: 'Luxury' },
  { name: 'BLOOMINGDALE\'S', category: 'Anchor', tier: 'Luxury' },
  { name: 'MACY\'S', category: 'Anchor', tier: 'Department' },
  { name: 'SEARS', category: 'Anchor', tier: 'Department' },
  { name: 'APPLE', category: 'Tech & Lifestyle', tier: 'Premium' },
  { name: 'LOUIS VUITTON', category: 'Luxury', tier: 'Ultra-Luxury' },
  { name: 'COACH', category: 'Luxury', tier: 'Accessible Luxury' },
  { name: 'MICROSOFT', category: 'Tech', tier: 'Premium' },
  { name: 'TESLA', category: 'Auto', tier: 'Premium' },
  { name: 'LEGO', category: 'Entertainment Retail', tier: 'Flagship' },
  { name: 'RALPH LAUREN', category: 'Fashion', tier: 'Premium' },
  { name: 'SEPHORA', category: 'Beauty', tier: 'Premium' },
];

const leasingTiers = [
  {
    label: 'Luxury Flagship',
    sqft: '3,000–15,000 sq ft',
    desc: 'Premium positioning in the luxury wing alongside Nordstrom and global heritage brands. Your highest-intent customer, already here.',
    icon: '◆',
  },
  {
    label: 'Mid-Tier & Specialty',
    sqft: '800–5,000 sq ft',
    desc: '500+ retail opportunities across lifestyle, fashion, beauty, and specialty. High foot traffic, proven category performance.',
    icon: '◇',
  },
  {
    label: 'Pop-Up & Activation',
    sqft: '100–2,000 sq ft',
    desc: 'Short-term, high-visibility spaces in premium corridors. Test markets, launch products, build brand awareness with 40M eyes.',
    icon: '○',
  },
  {
    label: 'Food & Lifestyle',
    sqft: '500–8,000 sq ft',
    desc: 'Join a dining ecosystem that draws guests for hours. MOA\'s F&B generates over $500M in annual spending.',
    icon: '◉',
  },
];

export default function Retail() {
  const [ref, isVisible] = useIntersection();

  return (
    <section id="retail" ref={ref} style={{
      padding: 'clamp(7rem, 12vw, 11rem) 2rem',
      background: 'linear-gradient(180deg, var(--black) 0%, #0d0a02 55%, var(--black) 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Marquee tenant reel — opens the chapter (luxury aspiration) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 1.4, ease }}
          className="mb-20 overflow-hidden"
          style={{
            borderTop: '1px solid rgba(201,168,76,0.2)',
            borderBottom: '1px solid rgba(201,168,76,0.2)',
            padding: '1.4rem 0',
            maskImage: 'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          }}
        >
          <div className="marquee-track flex gap-12">
            {[...retailers, ...retailers].map((r, i) => (
              <div key={i} className="flex items-center gap-12 flex-shrink-0">
                <span style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: '1.25rem',
                  letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.78)',
                }}>
                  {r.name}
                </span>
                <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>✦</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Asymmetric editorial header — left aligned, large negative space */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
              <span className="kicker">Chapter 02 — Retail</span>
            </div>
            <h2 className="font-display" style={{
              fontFamily: 'Bebas Neue',
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 0.9,
              color: 'white',
              letterSpacing: '0.005em',
            }}>
              FIVE HUNDRED<br />
              FLAGSHIPS.<br />
              <span style={{ fontFamily: 'Italiana, serif', color: 'var(--gold-light)' }}>
                One address.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease }}
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.75,
              maxWidth: 460,
              borderLeft: '1px solid rgba(201,168,76,0.4)',
              paddingLeft: '1.5rem',
            }}
          >
            From heritage maisons to limited concept boutiques — the retail landscape at MOA is curated to reward intent, dwell time, and category leadership.
          </motion.p>
        </div>

        {/* Leasing tiers — editorial vertical list, NOT cards */}
        <div style={{ marginBottom: '7rem' }}>
          {leasingTiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 + i * 0.12, duration: 1.1, ease }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(60px, 90px) minmax(0, 1.2fr) minmax(0, 1.3fr) auto',
                gap: 'clamp(1rem, 3vw, 3rem)',
                alignItems: 'baseline',
                padding: '2.5rem 0',
                borderTop: i === 0 ? '1px solid rgba(201,168,76,0.2)' : 'none',
                borderBottom: '1px solid rgba(201,168,76,0.14)',
                transition: 'background 0.7s var(--ease-cinema)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.025)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{
                fontFamily: 'Italiana, serif',
                fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                color: 'var(--gold)',
                letterSpacing: '0.04em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 style={{
                fontFamily: 'Bebas Neue',
                fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)',
                letterSpacing: '0.04em',
                color: 'white',
                lineHeight: 1.05,
              }}>
                {tier.label}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.95rem',
                lineHeight: 1.75,
                fontFamily: 'Cormorant Garamond',
                fontStyle: 'italic',
                maxWidth: 460,
              }}>
                {tier.desc}
              </p>
              <div style={{
                fontSize: '0.6rem',
                letterSpacing: '0.28em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                fontWeight: 500,
                paddingTop: '0.4rem',
              }}>
                {tier.sqft}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial pull quote — no boxed card */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 1.3, ease }}
          style={{
            maxWidth: 880,
            margin: '0 auto',
            padding: '0 clamp(0rem, 2vw, 2rem)',
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: 'Italiana, serif',
            fontSize: 'clamp(1.6rem, 3.4vw, 2.8rem)',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.35,
            letterSpacing: '0.005em',
          }}>
            <span style={{ color: 'var(--gold)' }}>"</span>
            More retail sales per square foot than virtually any enclosed mall in North America.
            <span style={{ color: 'var(--gold)' }}>"</span>
          </div>
          <figcaption style={{
            marginTop: '2rem',
            fontSize: '0.62rem', letterSpacing: '0.32em',
            color: 'var(--gold)', textTransform: 'uppercase',
          }}>
            — CoStar Group · Retail Market Analysis 2024
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
