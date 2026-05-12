import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
 * Digideck-style navigation system.
 *
 * Three persistent layers:
 *   1. Slim top brand bar — anchored, never moves
 *   2. Left chapter rail  — vertical 01–07 index, hover reveals labels
 *   3. Top-right Inquire CTA — always visible, drives the primary business action
 *
 * Mobile collapses rail into a hamburger sheet.
 */

const sections = [
  { id: 'hero',          num: '00', label: 'Arrival' },
  { id: 'why',           num: '01', label: 'The Case for MOA' },
  { id: 'retail',        num: '02', label: 'Retail' },
  { id: 'luxury',        num: '03', label: 'Luxury' },
  { id: 'dining',        num: '04', label: 'Dining' },
  { id: 'entertainment', num: '05', label: 'Attractions' },
  { id: 'events',        num: '06', label: 'Events' },
  { id: 'sponsorship',   num: '07', label: 'Sponsorship' },
  { id: 'leasing',       num: '08', label: 'Partnership' },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navigation({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const activeIndex = Math.max(0, sections.findIndex(s => s.id === activeSection));
  const currentChapter = sections[activeIndex] || sections[0];

  return (
    <>
      {/* ───────── TOP BAR ───────── */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: 'clamp(0.85rem, 1.5vw, 1.25rem) clamp(1.25rem, 3vw, 2.25rem)',
          background: scrolled ? 'rgba(8,8,8,0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.16)' : '1px solid transparent',
          transition: 'background 0.6s var(--ease-cinema), border-color 0.6s var(--ease-cinema)',
        }}
      >
        {/* Brand mark — invisible slot reserves layout space for FloatingLogo in travel phase */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3" style={{ background: 'none', border: 'none' }}>
          <span
            id="topbar-logo-slot"
            aria-hidden="true"
            className="hidden lg:inline-flex items-center justify-center"
            style={{ width: 22, height: 22, flexShrink: 0 }}
          >
            <img
              src="/moa%20logo.svg"
              alt=""
              draggable="false"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                opacity: 0,
                transition: 'opacity 0.45s var(--ease-cinema, cubic-bezier(0.22,1,0.36,1))',
                filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.18))',
              }}
            />
          </span>
          <div style={{
            fontFamily: 'Italiana, serif',
            fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
            color: 'white',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            Mall of America
          </div>
          <div style={{ width: 1, height: 14, background: 'rgba(201,168,76,0.4)' }} />
          <div style={{
            fontSize: '0.55rem',
            letterSpacing: '0.32em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Sales Deck · 2025
          </div>
        </button>

        {/* Right cluster — chapter readout + Inquire CTA */}
        <div className="flex items-center gap-6">
          {/* Live chapter readout */}
          <div className="hidden md:flex items-center gap-3">
            <span style={{
              fontFamily: 'Italiana, serif',
              fontSize: '0.85rem',
              color: 'var(--gold-light)',
              letterSpacing: '0.1em',
            }}>
              {currentChapter.num}
            </span>
            <span style={{ width: 24, height: 1, background: 'rgba(201,168,76,0.4)' }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentChapter.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease }}
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.32em',
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  display: 'inline-block',
                }}
              >
                {currentChapter.label}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Inquire CTA — minimal, restrained */}
          <button
            onClick={() => scrollTo('leasing')}
            className="hidden md:flex items-center gap-3 group"
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.4)',
              padding: '0.55rem 1.25rem',
              fontSize: '0.6rem',
              letterSpacing: '0.32em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              fontWeight: 500,
              transition: 'all 0.5s var(--ease-cinema)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--gold)';
              e.currentTarget.style.color = '#0A0A0A';
              e.currentTarget.style.borderColor = 'var(--gold)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--gold)';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
            }}
          >
            Inquire
            <span style={{ fontFamily: 'Italiana, serif', fontSize: '0.85rem', letterSpacing: 0 }}>→</span>
          </button>

          {/* Hamburger (mobile + tablet) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none' }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{
                  width: menuOpen && i === 1 ? 0 : 22,
                  rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y: menuOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                }}
                style={{ width: 22, height: 1, background: 'var(--gold)', transformOrigin: 'center' }}
              />
            ))}
          </button>
        </div>
      </motion.div>

      {/* ───────── LEFT CHAPTER RAIL (desktop) ───────── */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1.2, ease }}
        className="hidden lg:flex fixed top-1/2 left-6 z-40 flex-col gap-1"
        style={{ transform: 'translateY(-50%)' }}
      >
        {sections.map((s, i) => {
          const isActive = activeSection === s.id;
          const isHovered = hovered === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-4 group"
              style={{
                background: 'none',
                border: 'none',
                padding: '0.6rem 0',
                position: 'relative',
              }}
            >
              {/* Index numeral */}
              <span style={{
                fontFamily: 'Italiana, serif',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                color: isActive ? 'var(--gold-light)' : isHovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
                transition: 'color 0.5s var(--ease-cinema)',
                width: 22,
                textAlign: 'left',
              }}>
                {s.num}
              </span>

              {/* Hairline indicator */}
              <motion.span
                animate={{
                  width: isActive ? 36 : isHovered ? 24 : 14,
                  background: isActive
                    ? 'var(--gold)'
                    : isHovered
                      ? 'rgba(201,168,76,0.6)'
                      : 'rgba(255,255,255,0.25)',
                }}
                transition={{ duration: 0.5, ease }}
                style={{ height: 1, display: 'block' }}
              />

              {/* Hover label only — keeps rail compact, prevents content overlap */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.35, ease }}
                    style={{
                      fontSize: '0.58rem',
                      letterSpacing: '0.32em',
                      color: 'rgba(255,255,255,0.85)',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </motion.aside>

      {/* ───────── PROGRESS — bottom-right vertical (desktop) ───────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="hidden lg:flex fixed bottom-8 right-8 z-40 flex-col items-center gap-3"
      >
        <span style={{
          fontFamily: 'Italiana, serif',
          fontSize: '0.85rem',
          color: 'var(--gold-light)',
          letterSpacing: '0.05em',
        }}>
          {currentChapter.num}
        </span>
        <div style={{
          width: 1, height: 80,
          background: 'rgba(255,255,255,0.12)',
          position: 'relative',
        }}>
          <motion.div
            animate={{ height: `${((activeIndex) / (sections.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%',
              background: 'linear-gradient(180deg, var(--gold-light), var(--gold))',
            }}
          />
        </div>
        <span style={{
          fontFamily: 'Italiana, serif',
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.05em',
        }}>
          {sections[sections.length - 1].num}
        </span>
      </motion.div>

      {/* ───────── MOBILE / TABLET MENU SHEET ───────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-center"
            style={{
              background: 'rgba(8,8,8,0.97)',
              backdropFilter: 'blur(30px) saturate(140%)',
              WebkitBackdropFilter: 'blur(30px) saturate(140%)',
              padding: 'clamp(2rem, 8vw, 5rem)',
            }}
          >
            <div className="kicker" style={{ marginBottom: '2.5rem', color: 'var(--gold-light)' }}>
              Index
            </div>
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease }}
                onClick={() => scrollTo(s.id)}
                className="flex items-baseline gap-6 text-left py-3"
                style={{ background: 'none', border: 'none', borderBottom: '1px solid rgba(201,168,76,0.12)' }}
              >
                <span style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: '1rem',
                  color: activeSection === s.id ? 'var(--gold-light)' : 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.05em',
                  width: 36,
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: 'clamp(2rem, 7vw, 3.2rem)',
                  letterSpacing: '0.04em',
                  color: activeSection === s.id ? 'white' : 'rgba(255,255,255,0.85)',
                  textTransform: 'uppercase',
                  lineHeight: 1.05,
                }}>
                  {s.label}
                </span>
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="cta-btn"
              style={{ alignSelf: 'flex-start', marginTop: '2.5rem' }}
              onClick={() => scrollTo('leasing')}
            >
              Inquire →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
