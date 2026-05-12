import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/*
 * ImageInterlude — full-bleed parallax image strip used between chapters.
 * Editorial caption sits over the image like a magazine spread.
 *
 * Props:
 *   src       — image URL (use AI-generated for production)
 *   alt       — accessibility text
 *   kicker    — small label above caption (e.g. "Interlude · Scale")
 *   caption   — italic editorial caption (Cormorant Garamond)
 *   credit    — source / image credit (small, bottom right)
 *   align     — 'left' | 'right' | 'center' caption position
 *   height    — 'tall' (90vh) | 'medium' (70vh) | 'short' (50vh)
 */
export default function ImageInterlude({
  src,
  alt = '',
  kicker,
  caption,
  credit,
  align = 'left',
  height = 'medium',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Slow vertical parallax — Ken Burns drift
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.12]);

  const heightMap = {
    tall:   'min(90vh, 900px)',
    medium: 'min(70vh, 720px)',
    short:  'min(50vh, 540px)',
  };

  const captionPosition = {
    left:   { left: 'clamp(2rem, 6vw, 6rem)', right: 'auto', textAlign: 'left' },
    right:  { left: 'auto', right: 'clamp(2rem, 6vw, 6rem)', textAlign: 'right' },
    center: { left: '50%', right: 'auto', textAlign: 'center', transform: 'translateX(-50%)' },
  };

  return (
    <section
      ref={ref}
      style={{
        height: heightMap[height] || heightMap.medium,
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
      }}
    >
      {/* Parallax image — lazy loaded, native browser viewport-aware */}
      <motion.div
        style={{
          y,
          scale,
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '120%',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'saturate(0.88) contrast(1.08) brightness(0.62)',
          }}
        />
      </motion.div>

      {/* Cinematic gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: align === 'right'
          ? 'linear-gradient(270deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
          : align === 'center'
            ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)'
            : 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
      }} />

      {/* Subtle film grain on top */}
      <div className="grain" style={{ opacity: 0.4 }} />

      {/* Editorial caption block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 1.4, ease }}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 8vw, 6rem)',
          maxWidth: 'min(580px, 88vw)',
          ...captionPosition[align],
        }}
      >
        {kicker && (
          <div className="kicker" style={{ marginBottom: '1.25rem' }}>
            {kicker}
          </div>
        )}
        {caption && (
          <p style={{
            fontFamily: 'Italiana, serif',
            fontSize: 'clamp(1.4rem, 2.6vw, 2.4rem)',
            color: 'white',
            lineHeight: 1.3,
            letterSpacing: '0.005em',
            margin: 0,
          }}>
            {caption}
          </p>
        )}
      </motion.div>

      {/* Credit — bottom-right small */}
      {credit && (
        <div style={{
          position: 'absolute',
          bottom: 'clamp(1rem, 2vw, 1.5rem)',
          right: 'clamp(1rem, 2vw, 1.5rem)',
          fontFamily: 'Cormorant Garamond',
          fontStyle: 'italic',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.05em',
        }}>
          {credit}
        </div>
      )}
    </section>
  );
}
