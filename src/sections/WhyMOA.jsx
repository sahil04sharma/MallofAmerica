import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIntersection, useCountUp } from '../hooks/useIntersection';

const ease = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------
 *  SIGNATURE MOMENT — "Scale" reveal
 *  Editorial vertical stat sequence. Each stat occupies its own
 *  beat. Numbers count up. Layout alternates left/right asymmetric.
 *  Replaces card grid.
 * ------------------------------------------------------------------ */
function ScaleStat({ index, num, suffix, label, copy, isActive, align }) {
  const count = useCountUp(num, 2400, isActive);
  const right = align === 'right';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ delay: 0.2 + index * 0.18, duration: 1.4, ease }}
      style={{
        display: 'grid',
        gridTemplateColumns: right ? '1fr auto' : 'auto 1fr',
        gap: 'clamp(1.5rem, 4vw, 4rem)',
        alignItems: 'baseline',
        padding: 'clamp(2.25rem, 5vw, 4rem) 0',
        borderTop: index === 0 ? '1px solid rgba(201,168,76,0.25)' : 'none',
        borderBottom: '1px solid rgba(201,168,76,0.18)',
      }}
    >
      {right && (
        <div style={{ maxWidth: 360, paddingTop: '0.5rem', textAlign: 'right' }}>
          <div className="kicker" style={{ marginBottom: 10 }}>
            {String(index + 1).padStart(2, '0')} — {label}
          </div>
          <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic',
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
            {copy}
          </p>
        </div>
      )}

      <motion.div
        initial={{ y: 40 }}
        animate={isActive ? { y: 0 } : {}}
        transition={{ delay: 0.3 + index * 0.18, duration: 1.3, ease }}
        style={{
          fontFamily: 'Bebas Neue',
          fontSize: 'clamp(5rem, 14vw, 13rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.005em',
          color: 'white',
          textAlign: right ? 'left' : 'right',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #C9A84C 110%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {count}<span style={{ fontFamily: 'Italiana, serif', fontSize: '0.55em' }}>{suffix}</span>
      </motion.div>

      {!right && (
        <div style={{ maxWidth: 360, paddingTop: '0.5rem' }}>
          <div className="kicker" style={{ marginBottom: 10 }}>
            {String(index + 1).padStart(2, '0')} — {label}
          </div>
          <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic',
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
            {copy}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function WhyMOA() {
  const [ref, isVisible] = useIntersection();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

  const stats = [
    { num: 40, suffix: 'M+', label: 'Annual Visitors',
      copy: 'More guests than Disney World, Yellowstone, and the Grand Canyon — combined.' },
    { num: 5, suffix: '.6M sqft', label: 'Of Floorplate',
      copy: 'Seventy-eight city blocks of leasable space, under one continuous roof.' },
    { num: 520, suffix: '+', label: 'Brands In Residence',
      copy: 'From heritage flagships to category-defining concepts and limited pop-ups.' },
    { num: 60, suffix: 'M+', label: 'Earned Impressions',
      copy: 'Featured across 200+ global media outlets every single year.' },
  ];

  return (
    <section
      id="why"
      ref={(node) => { ref.current = node; sectionRef.current = node; }}
      style={{
        padding: 'clamp(7rem, 12vw, 11rem) 2rem 8rem',
        background: 'var(--black)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost typography in the background — "SCALE" — parallax */}
      <motion.div
        aria-hidden
        style={{
          y: ghostY,
          position: 'absolute',
          top: '-2vw', left: '-2vw', right: '-2vw',
          fontFamily: 'Bebas Neue',
          fontSize: 'clamp(14rem, 38vw, 38rem)',
          lineHeight: 0.8,
          color: 'rgba(255,255,255,0.022)',
          letterSpacing: '0.02em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        SCALE
      </motion.div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Header — left aligned, generous space, no centering */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease }}
          className="mb-24"
          style={{ maxWidth: 880 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
            <span className="kicker">Chapter 01 — The Case for MOA</span>
          </div>
          <h2 className="font-display" style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            lineHeight: 0.9,
            letterSpacing: '0.005em',
            color: 'white',
            marginBottom: '2rem',
          }}>
            NOT A MALL.<br />
            <span style={{ fontFamily: 'Italiana, serif', fontStyle: 'normal',
              color: 'var(--gold-light)', letterSpacing: '0.01em' }}>
              A national landmark.
            </span>
          </h2>
          <p style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)',
            fontWeight: 300, fontStyle: 'italic',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 620, lineHeight: 1.7,
          }}>
            America's premier mixed-use destination. A city within a city, drawing visitors from all 50 states and 100+ countries — every single year.
          </p>
        </motion.div>

        {/* Signature scale reveal */}
        <div style={{ marginBottom: '7rem' }}>
          {stats.map((s, i) => (
            <ScaleStat
              key={i}
              index={i}
              isActive={isVisible}
              align={i % 2 === 0 ? 'left' : 'right'}
              {...s}
            />
          ))}
        </div>

        {/* Two column feature — catchment editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div style={{
              fontFamily: 'Bebas Neue',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.04em',
              color: 'white',
              marginBottom: '1.5rem',
              lineHeight: 1,
            }}>
              THE CATCHMENT AREA IS UNLIKE ANYTHING IN RETAIL
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Located at the intersection of I-35W and I-494 in Bloomington, Minnesota — Mall of America sits within a 20-minute drive of 3.7 million people and a 1-hour flight from 80% of the US population.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem' }}>
              Direct connection to Minneapolis-Saint Paul International Airport means international visitors step off a flight and arrive at our doors within 10 minutes.
            </p>

            {/* Demographics pill list */}
            <div className="flex flex-wrap gap-3">
              {[
                'Avg. Household Income: $92K+',
                '34% Out-of-State Visitors',
                '18% International',
                'Avg. Stay: 3+ Hours',
                '30% Stay Overnight',
              ].map((item, i) => (
                <div key={i} style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: 'var(--gold)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  padding: '6px 14px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual map/chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div style={{
              padding: '0.5rem 0 0',
              position: 'relative',
              borderTop: '1px solid rgba(201,168,76,0.25)',
            }}>
              <div className="kicker" style={{ marginBottom: '2.5rem', marginTop: '1.5rem' }}>
                Visitor Origin Breakdown
              </div>

              {[
                { label: 'Twin Cities Metro', pct: 52 },
                { label: 'Greater Minnesota & Midwest', pct: 14 },
                { label: 'Other US States', pct: 20 },
                { label: 'International', pct: 14 },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>{item.label}</span>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--gold)' }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${item.pct}%` } : {}}
                      transition={{ delay: 0.9 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute', top: 0, left: 0, height: '100%',
                        background: `linear-gradient(90deg, var(--gold-dark), var(--gold))`,
                      }}
                    />
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: '2rem',
                fontFamily: 'Cormorant Garamond',
                fontSize: '0.8rem',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.3)',
                textAlign: 'right',
              }}>
                Source: MOA Internal Research, 2024
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
