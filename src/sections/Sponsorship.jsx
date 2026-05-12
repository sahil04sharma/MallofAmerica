import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersection } from '../hooks/useIntersection';

const ease = [0.22, 1, 0.36, 1];

/*
 * Sponsorship — partnership module.
 * Three tiers, audience data, past activation examples.
 * Editorial tier selector with cinematic content swap.
 */

const tiers = [
  {
    id: 'title',
    name: 'Title',
    subtitle: 'Property-wide naming & integration',
    investment: '$2M – $8M / yr',
    desc: 'Anchor partnership for global brands seeking permanent presence. Naming rights on key venues, year-round integration across all touchpoints, custom-built brand experiences within the property.',
    inclusions: [
      'Naming rights on a flagship venue or wing',
      'Integration into hero campaigns and out-of-home media',
      'Permanent brand environment installation',
      'Premium event hosting allotments (12+ per year)',
      'Direct access to 40M annual visitors',
    ],
  },
  {
    id: 'presenting',
    name: 'Presenting',
    subtitle: 'Headline event & seasonal moments',
    investment: '$500K – $1.5M / yr',
    desc: 'Premier sponsorship of marquee events and signature seasonal programs. High-visibility activation tied to the moments that drive media coverage and traffic peaks.',
    inclusions: [
      'Presenting status on 3–6 marquee events',
      'Seasonal campaign integration (Holiday, Back-to-School)',
      'Custom activation footprint (2,000–5,000 sqft)',
      'Co-branded media and PR program',
      'VIP guest experiences for partner stakeholders',
    ],
  },
  {
    id: 'activation',
    name: 'Activation',
    subtitle: 'Tactical brand experiences',
    investment: '$50K – $400K / event',
    desc: 'Short-form, high-impact activations — product launches, sampling drives, immersive brand environments, and limited-run experiences engineered for capture and conversion.',
    inclusions: [
      'Pop-up footprint up to 1,500 sqft',
      'Rotunda or mall-floor placement options',
      'Sampling, demo, and lead-capture infrastructure',
      'Social and on-property amplification',
      'Production support and creative consultation',
    ],
  },
];

const audience = [
  { label: 'Annual Visitors',         value: '40M+' },
  { label: 'Avg. Household Income',   value: '$92K' },
  { label: 'Out-of-State Visitors',   value: '34%' },
  { label: 'International Guests',    value: '18%' },
  { label: 'Avg. Dwell Time',          value: '3.4 hrs' },
  { label: 'Stay Overnight',           value: '30%' },
];

const recentPartners = [
  { brand: 'PEPSI',     activation: 'Title sponsor — Nickelodeon Universe' },
  { brand: 'TOYOTA',    activation: 'Auto reveal pop-up · 14-day run · 900K visitors' },
  { brand: 'BARBIE',    activation: 'Movie launch immersive — 3-week takeover' },
  { brand: 'AT&T',      activation: 'Connected store flagship · year-round' },
  { brand: 'AMAZON',    activation: 'Holiday gifting concept · 6-week activation' },
  { brand: 'L\'OREAL',  activation: 'Beauty hall pop-up — Mother\'s Day window' },
];

export default function Sponsorship() {
  const [ref, isVisible] = useIntersection();
  const [activeTier, setActiveTier] = useState('title');
  const tier = tiers.find(t => t.id === activeTier);

  return (
    <section id="sponsorship" ref={ref} style={{
      padding: 'clamp(7rem, 12vw, 12rem) 2rem',
      background: 'var(--charcoal)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle ambient platform glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 70% 40% at 20% 10%, rgba(201,168,76,0.06) 0%, transparent 60%),' +
          'radial-gradient(ellipse 60% 50% at 100% 90%, rgba(201,168,76,0.04) 0%, transparent 65%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-24 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
              <span className="kicker">Chapter 07 — Sponsorship</span>
            </div>
            <h2 className="font-display" style={{
              fontFamily: 'Bebas Neue',
              fontSize: 'clamp(3rem, 8vw, 8.5rem)',
              lineHeight: 0.9,
              color: 'white',
              letterSpacing: '0.005em',
            }}>
              BRANDS DON'T<br />
              ADVERTISE HERE.<br />
              <span style={{ fontFamily: 'Italiana, serif', color: 'var(--gold-light)' }}>
                They live here.
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
              borderLeft: '1px solid rgba(201,168,76,0.4)',
              paddingLeft: '1.5rem',
            }}
          >
            Forty million annual impressions, designed-in activation footprints, and a year-round programming calendar make MOA the rare environment where brands don't interrupt — they belong.
          </motion.p>
        </div>

        {/* Audience snapshot — 6-up editorial strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1.2, ease }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          style={{
            borderTop: '1px solid rgba(201,168,76,0.25)',
            borderBottom: '1px solid rgba(201,168,76,0.18)',
            marginBottom: '6rem',
          }}
        >
          {audience.map((a, i) => (
            <div key={i} className="sponsor-cell" style={{
              padding: 'clamp(1.5rem, 2.5vw, 2.25rem) clamp(1rem, 1.5vw, 1.5rem)',
              position: 'relative',
            }}>
              <div style={{
                fontFamily: 'Italiana, serif',
                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                color: 'var(--gold-light)',
                lineHeight: 1,
                letterSpacing: '0.01em',
                marginBottom: '0.75rem',
              }}>{a.value}</div>
              <div style={{
                fontSize: '0.55rem',
                letterSpacing: '0.32em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
              }}>{a.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tier selector — editorial underline tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1, ease }}
          className="flex flex-wrap gap-x-12 gap-y-3 mb-12"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', paddingBottom: '1rem' }}
        >
          {tiers.map((t, i) => {
            const isActive = activeTier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                style={{
                  position: 'relative',
                  padding: '0.5rem 0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'none',
                  display: 'flex', alignItems: 'baseline', gap: 14,
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: '0.95rem',
                  color: isActive ? 'var(--gold-light)' : 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.05em',
                  transition: 'color 0.6s var(--ease-cinema)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                    letterSpacing: '0.04em',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                    lineHeight: 1,
                    transition: 'color 0.6s var(--ease-cinema)',
                  }}>
                    {t.name}
                  </span>
                  <span style={{
                    fontFamily: 'Cormorant Garamond',
                    fontStyle: 'italic',
                    fontSize: '0.85rem',
                    color: isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)',
                  }}>
                    {t.subtitle}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="sponsor-tier-underline"
                    style={{
                      position: 'absolute', left: 0, right: 0, bottom: -17,
                      height: 1, background: 'var(--gold)',
                    }}
                    transition={{ duration: 0.6, ease }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Active tier detail */}
        <AnimatePresence mode="wait">
          {tier && (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease }}
              className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 mb-24"
            >
              <div>
                <div className="kicker" style={{ marginBottom: '1rem' }}>
                  {tier.name} Tier
                </div>
                <p style={{
                  fontFamily: 'Cormorant Garamond',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
                  color: 'rgba(255,255,255,0.78)',
                  lineHeight: 1.7,
                  marginBottom: '2.5rem',
                  maxWidth: 640,
                }}>
                  {tier.desc}
                </p>

                <div className="kicker" style={{ marginBottom: '1.25rem' }}>What's Included</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {tier.inclusions.map((inc, i) => (
                    <li key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '1rem',
                      padding: '0.85rem 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      fontFamily: 'Cormorant Garamond',
                      fontStyle: 'italic',
                      fontSize: '1rem',
                      color: 'rgba(255,255,255,0.7)',
                      alignItems: 'baseline',
                    }}>
                      <span style={{
                        fontFamily: 'Italiana, serif',
                        fontSize: '0.85rem',
                        color: 'var(--gold)',
                        letterSpacing: '0.05em',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                borderLeft: '1px solid rgba(201,168,76,0.25)',
                paddingLeft: 'clamp(1.5rem, 3vw, 3rem)',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
                <div className="kicker" style={{ marginBottom: '1rem' }}>Investment Range</div>
                <div style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
                  color: 'white',
                  lineHeight: 1.15,
                  marginBottom: '2.5rem',
                  letterSpacing: '0.005em',
                }}>
                  {tier.investment}
                </div>

                <div className="kicker" style={{ marginBottom: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                  Typical Term
                </div>
                <p style={{
                  fontFamily: 'Cormorant Garamond',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                  marginBottom: '2.5rem',
                }}>
                  {tier.id === 'title' ? '3–5 year integrated commitment with annual review and program evolution.' :
                   tier.id === 'presenting' ? '12-month program with seasonal moments and renewable structure.' :
                   'Single-event or short-form campaign — 1 day to 8 weeks.'}
                </p>

                <button
                  className="cta-btn"
                  style={{ alignSelf: 'flex-start' }}
                  onClick={() => document.getElementById('leasing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Begin Conversation →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent partners — editorial register */}
        <div>
          <div className="kicker" style={{ marginBottom: '2rem' }}>
            Recent Partners — A Sampling
          </div>
          <div style={{ borderTop: '1px solid rgba(201,168,76,0.25)' }}>
            {recentPartners.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.9, ease }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(60px, 80px) minmax(0, 1fr) minmax(0, 1.6fr)',
                  gap: 'clamp(1rem, 3vw, 2.5rem)',
                  alignItems: 'baseline',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  transition: 'background 0.7s var(--ease-cinema)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.025)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: '0.95rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.05em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: 'clamp(1.2rem, 2vw, 1.7rem)',
                  letterSpacing: '0.08em',
                  color: 'white',
                }}>
                  {p.brand}
                </span>
                <span style={{
                  fontFamily: 'Cormorant Garamond',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  {p.activation}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
