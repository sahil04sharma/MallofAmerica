import { motion } from 'framer-motion';
import { useIntersection } from '../hooks/useIntersection';

const ease = [0.22, 1, 0.36, 1];

/*
 * Luxury — positioning section.
 * Editorial spread that elevates MOA's premium wing as a destination
 * within a destination. Named maisons, atmosphere copy, premium metrics.
 */

const houses = [
  { name: 'Louis Vuitton', cat: 'Maison' },
  { name: 'Tiffany & Co.', cat: 'Jewelry' },
  { name: 'Burberry',       cat: 'Heritage' },
  { name: 'Coach',          cat: 'Leather' },
  { name: 'Michael Kors',   cat: 'Ready-to-Wear' },
  { name: 'Tory Burch',     cat: 'Ready-to-Wear' },
  { name: 'Swarovski',      cat: 'Crystal' },
  { name: 'Hugo Boss',      cat: 'Tailoring' },
  { name: 'Lululemon',      cat: 'Lifestyle' },
  { name: 'Apple',          cat: 'Tech & Lifestyle' },
];

const metrics = [
  { num: '$450', suffix: 'AVG', label: 'Luxury Basket Size' },
  { num: '38', suffix: '%', label: 'Repeat Affluent Visitors' },
  { num: '$92K+', suffix: '', label: 'Median Household Income' },
  { num: '12', suffix: 'MIN', label: 'From MSP International' },
];

export default function Luxury() {
  const [ref, isVisible] = useIntersection();

  return (
    <section id="luxury" ref={ref} style={{
      padding: 'clamp(7rem, 12vw, 12rem) 2rem',
      background: 'linear-gradient(180deg, #050505 0%, #0a0805 50%, #050505 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Atmospheric — single soft luxury spotlight */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(232,201,122,0.10) 0%, transparent 60%),' +
          'radial-gradient(ellipse 40% 50% at 10% 80%, rgba(140,90,40,0.06) 0%, transparent 65%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Header — editorial, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-24 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
              <span className="kicker">Chapter 03 — Luxury</span>
            </div>
            <h2 className="font-display" style={{
              fontFamily: 'Bebas Neue',
              fontSize: 'clamp(3rem, 8vw, 8.5rem)',
              lineHeight: 0.9,
              color: 'white',
              letterSpacing: '0.005em',
            }}>
              A WING<br />
              <span style={{ fontFamily: 'Italiana, serif', color: 'var(--gold-light)' }}>
                worth the journey.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease }}
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.75,
              maxWidth: 460,
              borderLeft: '1px solid rgba(232,201,122,0.5)',
              paddingLeft: '1.5rem',
            }}
          >
            Curated maisons. Considered architecture. A premium environment engineered for the affluent shopper who arrives by direct flight and leaves with intention.
          </motion.p>
        </div>

        {/* Houses in residence — serif name list, no boxes */}
        <div style={{ marginBottom: '6rem' }}>
          <div className="kicker" style={{
            marginBottom: '2.5rem',
            color: 'var(--gold-light)',
          }}>
            Houses in Residence — A Selection
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12">
            {houses.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.9, ease }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '1.5rem',
                  alignItems: 'baseline',
                  padding: '1.4rem 0',
                  borderBottom: '1px solid rgba(232,201,122,0.14)',
                }}
              >
                <span style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: '0.85rem',
                  color: 'rgba(232,201,122,0.55)',
                  letterSpacing: '0.05em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
                  color: 'white',
                  letterSpacing: '0.02em',
                }}>
                  {h.name}
                </span>
                <span style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.32em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}>
                  {h.cat}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Affluent metrics row — Italiana numerals */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 1.2, ease }}
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            borderTop: '1px solid rgba(232,201,122,0.3)',
            borderBottom: '1px solid rgba(232,201,122,0.18)',
            marginBottom: '5rem',
          }}
        >
          {metrics.map((m, i) => (
            <div key={i} style={{
              padding: 'clamp(2rem, 3vw, 3rem) clamp(1.25rem, 2vw, 2rem)',
              borderLeft: i > 0 ? '1px solid rgba(232,201,122,0.14)' : 'none',
            }}>
              <div className="kicker" style={{ marginBottom: '1.25rem', color: 'rgba(232,201,122,0.65)' }}>
                {String(i + 1).padStart(2, '0')} · {m.label}
              </div>
              <div style={{
                fontFamily: 'Italiana, serif',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                color: 'white',
                lineHeight: 1,
                letterSpacing: '0.005em',
                display: 'flex', alignItems: 'baseline', gap: 8,
              }}>
                {m.num}
                {m.suffix && (
                  <span style={{
                    fontSize: '0.32em',
                    color: 'var(--gold)',
                    letterSpacing: '0.25em',
                  }}>
                    {m.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pull quote */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 1.3, ease }}
          style={{ maxWidth: 920, marginLeft: 'auto' }}
        >
          <div style={{
            fontFamily: 'Italiana, serif',
            fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
            color: 'white',
            lineHeight: 1.32,
            letterSpacing: '0.005em',
            textAlign: 'right',
          }}>
            <span style={{ color: 'var(--gold)' }}>"</span>
            International arrivals from MSP land at our doors within twelve minutes — turning a flight into a flagship.
            <span style={{ color: 'var(--gold)' }}>"</span>
          </div>
          <figcaption style={{
            marginTop: '2rem',
            display: 'flex', alignItems: 'center', gap: 14,
            justifyContent: 'flex-end',
          }}>
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.32em',
              color: 'var(--gold)', textTransform: 'uppercase',
            }}>
              MOA Premium Tenant Brief
            </span>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
