import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersection } from '../hooks/useIntersection';

const ease = [0.22, 1, 0.36, 1];

const eventTypes = [
  {
    id: 'concerts',
    label: 'Concerts & Live Music',
    icon: '♪',
    desc: 'Rotunda Stage and multiple activation points handle intimate showcases to 12,000+ concerts. Taylor Swift, BTS, and Garth Brooks have all activated here.',
    capacity: 'Up to 12,000',
    formats: ['Main Stage Concerts', 'Rotunda Performances', 'Branded Artist Activations', 'Album Launch Events'],
  },
  {
    id: 'brand',
    label: 'Brand Activations',
    icon: '◈',
    desc: 'Turn Mall of America into your brand\'s biggest stage. With 40M annual visitors and premium corridor placement, activations here generate national media coverage.',
    capacity: 'Flexible — 500 to 40M reach',
    formats: ['Product Launches', 'Pop-Up Brand Experiences', 'Celebrity Appearances', 'Sampling & Demo Events'],
  },
  {
    id: 'corporate',
    label: 'Corporate & Convention',
    icon: '⬡',
    desc: 'The MOA Expo Hall provides 200,000 sq ft of flexible convention-grade space. Direct airport access and 30,000+ hotel rooms within 10 minutes.',
    capacity: '200,000 Sq Ft Expo Hall',
    formats: ['Corporate Conventions', 'Trade Shows', 'Awards Galas', 'Product Showcases'],
  },
  {
    id: 'fashion',
    label: 'Fashion & Lifestyle',
    icon: '◬',
    desc: 'Our runway-ready spaces and luxury wing make MOA ideal for fashion shows, beauty launches, and lifestyle brand events with built-in premium audiences.',
    capacity: '500–5,000 guests',
    formats: ['Runway Shows', 'Beauty Launches', 'Lifestyle Brand Events', 'Influencer Days'],
  },
];

const pastHighlights = [
  { year: '2024', event: 'Major Artist Concert — Sold Out', reach: '12,000 Attendees' },
  { year: '2024', event: 'Fortune 500 National Convention', reach: '8,500 Delegates' },
  { year: '2023', event: 'Global Sportswear Brand Launch', reach: '62M Media Impressions' },
  { year: '2023', event: 'Celebrity Holiday Activation', reach: '40M+ Viewers' },
  { year: '2023', event: 'Film Premiere & Press Event', reach: '28M Impressions' },
  { year: '2022', event: 'International Auto Brand Pop-Up', reach: '900K Visitors' },
];

export default function Events() {
  const [ref, isVisible] = useIntersection();
  const [activeTab, setActiveTab] = useState('concerts');
  const active = eventTypes.find(e => e.id === activeTab);

  return (
    <section id="events" ref={ref} style={{
      padding: 'clamp(7rem, 12vw, 11rem) 2rem',
      background: 'var(--charcoal)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient platform glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Header — global platform feel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
            <span className="kicker">Chapter 06 — Events & Platform</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-end">
            <h2 className="font-display" style={{
              fontFamily: 'Bebas Neue',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              lineHeight: 0.9,
              color: 'white',
              letterSpacing: '0.005em',
            }}>
              THE WORLD'S STAGE<br />
              <span style={{ fontFamily: 'Italiana, serif', color: 'var(--gold-light)' }}>
                lives at
              </span><br />
              MALL OF AMERICA.
            </h2>
            <p style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.75,
              fontStyle: 'italic',
              borderLeft: '1px solid rgba(201,168,76,0.4)',
              paddingLeft: '1.5rem',
            }}>
              Not a venue — a platform. Three hundred events a year, forty million guests, and direct access to national and global media make every activation here more than an event.
            </p>
          </div>
        </motion.div>

        {/* Event Type — editorial underline tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease }}
          className="flex flex-wrap gap-x-10 gap-y-3 mb-10"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', paddingBottom: '1rem' }}
        >
          {eventTypes.map((et, i) => {
            const isActive = activeTab === et.id;
            return (
              <button
                key={et.id}
                onClick={() => setActiveTab(et.id)}
                style={{
                  position: 'relative',
                  padding: '0.4rem 0',
                  fontSize: '0.7rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                  cursor: 'none',
                  display: 'flex', alignItems: 'baseline', gap: 10,
                  transition: 'color 0.6s var(--ease-cinema)',
                }}
              >
                <span style={{
                  fontFamily: 'Italiana, serif', fontSize: '0.8rem',
                  color: isActive ? 'var(--gold-light)' : 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.05em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {et.label}
                {isActive && (
                  <motion.div
                    layoutId="event-tab-underline"
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

        {/* Active event detail */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
              className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20 mb-20"
              style={{ padding: '2rem 0 0' }}
            >
              <div>
                <div style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                  letterSpacing: '0.01em',
                  color: 'white',
                  lineHeight: 0.95,
                  marginBottom: '1.5rem',
                }}>{active.label}</div>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.85,
                  fontSize: '1.05rem',
                  fontFamily: 'Cormorant Garamond',
                  fontStyle: 'italic',
                  marginBottom: '2.5rem',
                  maxWidth: 640,
                }}>{active.desc}</p>
                <div className="kicker" style={{ marginBottom: '1rem' }}>Event Formats</div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {active.formats.map((f, i) => (
                    <span key={i} style={{
                      fontFamily: 'Italiana, serif',
                      fontSize: '1.05rem',
                      color: 'rgba(255,255,255,0.78)',
                      letterSpacing: '0.02em',
                      borderBottom: '1px solid rgba(201,168,76,0.25)',
                      paddingBottom: 4,
                    }}>{f}</span>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center',
                borderLeft: '1px solid rgba(201,168,76,0.25)',
                paddingLeft: 'clamp(1.5rem, 3vw, 3rem)',
              }}>
                <div className="kicker" style={{ marginBottom: '1.25rem' }}>
                  Capacity · Reach
                </div>
                <div style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                  color: 'white',
                  lineHeight: 1.15,
                  marginBottom: '2.5rem',
                  letterSpacing: '0.01em',
                }}>{active.capacity}</div>
                <button
                  className="cta-btn"
                  style={{ alignSelf: 'flex-start' }}
                  onClick={() => document.getElementById('leasing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book This Space
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Past highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="kicker" style={{ marginBottom: '1.5rem' }}>Recent Highlights — A Sampling</div>
          <div style={{
            borderTop: '1px solid rgba(201,168,76,0.25)',
            overflow: 'hidden',
          }}>
            {pastHighlights.map((h, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '2rem',
                alignItems: 'center',
                padding: '1.4rem 0',
                borderBottom: i < pastHighlights.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontFamily: 'Bebas Neue', color: 'var(--gold)', fontSize: '1rem' }}>{h.year}</span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>{h.event}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{h.reach}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
