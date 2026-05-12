import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Cinematic media bed.
// Poster is always rendered as the base layer (works offline / before video loads).
// Local MP4 plays on top once ready — if it fails, poster shows through cleanly.
const HERO_VIDEO  = '/hero.mp4';
const HERO_POSTER = '/hero-poster.jpg';

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    const on = () => setIsOnline(true);
    const off = () => { setIsOnline(false); setVideoReady(false); };
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      clearTimeout(t);
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative w-full" style={{ height: '100vh', minHeight: 640 }}>
      {/* Cinematic media bed --------------------------------------------------- */}
      <div className="absolute inset-0 overflow-hidden" style={{ background: 'var(--ink)' }}>

        {/* Layer 1 — Poster (always rendered, base layer / offline fallback) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_POSTER})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.92) contrast(1.08) brightness(0.78)',
          }}
        />

        {/* Layer 2 — Local MP4 (autoplay muted loop; fades in once it can play) */}
        <motion.video
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 1.6, ease }}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            pointerEvents: 'none',
            filter: 'saturate(0.92) contrast(1.08) brightness(0.78)',
          }}
        />
        {/* Suppress unused-variable lint */}
        {false && isOnline}

        {/* Layer 0 — Atmospheric base, behind everything */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 60%, #1a1408 0%, #0A0A0A 55%, #050505 100%)',
          zIndex: -1,
        }} />
      </div>

      {/* Cinematic overlays — vignette, gradient, ambient drift, grain */}
      <div className="absolute inset-0 video-overlay" />
      <div className="vignette" />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 30%, rgba(201,168,76,0.10) 0%, transparent 45%),' +
            'radial-gradient(circle at 15% 85%, rgba(201,168,76,0.06) 0%, transparent 40%)',
        }}
      />
      <div className="grain" />

      {/* Content — anchored bottom-left, editorial spread ---------------------- */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-24 px-8 md:px-16 lg:px-28">

        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1.1, ease }}
          className="flex items-center gap-4 mb-10"
        >
          <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
          <span className="kicker">Bloomington, Minnesota · Est. 1992</span>
        </motion.div>

        {/* Headline — single anchored statement, mask reveal line by line */}
        <h1 className="font-display" style={{
          fontFamily: 'Bebas Neue',
          fontSize: 'clamp(3.6rem, 11vw, 11rem)',
          lineHeight: 0.92,
          letterSpacing: '0.005em',
          color: 'white',
          marginBottom: '1.75rem',
        }}>
          {['WHERE AMERICA', 'SHOPS, PLAYS,', 'AND GATHERS.'].map((line, i) => (
            <span key={i} className="mask-line">
              <motion.span
                initial={{ y: '105%' }}
                animate={loaded ? { y: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.18, duration: 1.15, ease }}
                style={{
                  display: 'block',
                  color: i === 2 ? 'transparent' : 'white',
                  background: i === 2
                    ? 'linear-gradient(135deg, #F0D58A 0%, #C9A84C 50%, #8B6914 100%)'
                    : 'none',
                  WebkitBackgroundClip: i === 2 ? 'text' : 'unset',
                  backgroundClip: i === 2 ? 'text' : 'unset',
                  WebkitTextFillColor: i === 2 ? 'transparent' : 'white',
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Editorial caption row — serif italic + meta */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end mb-12 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.55, duration: 1.1, ease }}
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 'clamp(1.05rem, 1.7vw, 1.45rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.78)',
              maxWidth: 540,
              fontStyle: 'italic',
              lineHeight: 1.55,
              borderLeft: '1px solid rgba(201,168,76,0.5)',
              paddingLeft: '1.25rem',
            }}
          >
            The most visited destination in America.<br />
            Forty million guests. One extraordinary address.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.85, duration: 1.2, ease }}
            className="hidden md:flex items-end gap-10"
          >
            {[
              { num: '40M', label: 'Annual Guests' },
              { num: '520+', label: 'Brands' },
              { num: '#1', label: 'US Destination' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                  lineHeight: 1,
                  color: 'var(--gold-light)',
                  letterSpacing: '0.02em',
                }}>{s.num}</div>
                <div style={{
                  fontSize: '0.55rem', letterSpacing: '0.32em',
                  color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
                  marginTop: 6,
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.05, duration: 1, ease }}
          className="flex flex-wrap gap-4"
        >
          <button className="cta-btn" onClick={() => scrollTo('leasing')}>Lease Space Here</button>
          <button className="cta-outline" onClick={() => scrollTo('events')}>Book an Event</button>
        </motion.div>
      </div>

      {/* Restrained scroll cue — bottom-right, no bouncing */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.6, duration: 1.4 }}
        onClick={() => scrollTo('why')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ background: 'none', border: 'none' }}
      >
        <span style={{
          fontSize: '0.55rem', letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
        }}>Continue</span>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 36, background: 'var(--gold)', transformOrigin: 'top' }}
        />
      </motion.button>
    </section>
  );
}
