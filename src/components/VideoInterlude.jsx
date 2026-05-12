import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/*
 * VideoInterlude — full-bleed video background between chapters.
 *
 * Two modes (one of these must be supplied):
 *   - videoSrc:  self-hosted MP4 path (preferred — no third-party branding, native quality)
 *   - youtubeId: YouTube embed fallback for when self-hosted asset isn't available
 *
 * Performance:
 *   - Player only mounts when section enters viewport (IntersectionObserver).
 *   - Unmounts when fully out of viewport (prevents multiple players running).
 *   - Poster image renders behind for instant paint + offline fallback.
 */
export default function VideoInterlude({
  videoSrc,
  youtubeId,
  poster,
  alt = '',
  kicker,
  caption,
  credit,
  align = 'left',
  height = 'tall',
}) {
  const ref = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Mount when even a sliver enters viewport, unmount well after exit.
        if (entry.isIntersecting) setShouldMount(true);
        else if (entry.intersectionRatio === 0) {
          setShouldMount(false);
          setVideoReady(false);
        }
      },
      { threshold: [0, 0.1] }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const heightMap = {
    tall:   'min(100vh, 1000px)',
    medium: 'min(75vh, 800px)',
    short:  'min(55vh, 600px)',
  };

  const captionPosition = {
    left:   { left: 'clamp(2rem, 6vw, 6rem)', right: 'auto', textAlign: 'left' },
    right:  { left: 'auto', right: 'clamp(2rem, 6vw, 6rem)', textAlign: 'right' },
    center: { left: '50%', right: 'auto', textAlign: 'center', transform: 'translateX(-50%)' },
  };

  const iframeSrc = (shouldMount && youtubeId && !videoSrc)
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`
    : null;

  return (
    <section
      ref={ref}
      style={{
        height: heightMap[height] || heightMap.tall,
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
      }}
    >
      {/* Layer 1 — Poster (instant paint, offline fallback) */}
      {poster && (
        <motion.div
          style={{
            y,
            position: 'absolute',
            top: '-6%',
            left: 0,
            width: '100%',
            height: '112%',
          }}
        >
          <img
            src={poster}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              filter: 'saturate(0.88) contrast(1.08) brightness(0.55)',
            }}
          />
        </motion.div>
      )}

      {/* Layer 2A — Self-hosted MP4 (preferred, no third-party branding) */}
      {videoSrc && shouldMount && (
        <motion.video
          src={videoSrc}
          autoPlay muted loop playsInline preload="metadata"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 1.6, ease }}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
          className="absolute"
          style={{
            top: '50%', left: '50%',
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'saturate(0.9) contrast(1.06) brightness(0.7)',
          }}
        />
      )}

      {/* Layer 2B — YouTube iframe (only when no self-hosted MP4 supplied) */}
      {iframeSrc && (
        <motion.iframe
          src={iframeSrc}
          title={alt || 'Video interlude'}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 1.8, ease }}
          onLoad={() => setTimeout(() => setVideoReady(true), 800)}
          allow="autoplay; fullscreen"
          className="absolute"
          style={{
            top: '50%', left: '50%',
            width: '177.78vh', height: '100vh',
            minWidth: '100vw', minHeight: '56.25vw',
            transform: 'translate(-50%, -50%)',
            border: 'none', pointerEvents: 'none',
            filter: 'saturate(0.88) contrast(1.08) brightness(0.65)',
          }}
        />
      )}

      {/* Cinematic gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: align === 'right'
          ? 'linear-gradient(270deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.32) 60%, transparent 100%)'
          : align === 'center'
            ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.7) 100%)'
            : 'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.32) 60%, transparent 100%)',
      }} />

      {/* Film grain on top */}
      <div className="grain" style={{ opacity: 0.45 }} />

      {/* Editorial caption block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 1.4, ease }}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 8vw, 6rem)',
          maxWidth: 'min(620px, 90vw)',
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
            fontSize: 'clamp(1.5rem, 3vw, 2.6rem)',
            color: 'white',
            lineHeight: 1.3,
            letterSpacing: '0.005em',
            margin: 0,
          }}>
            {caption}
          </p>
        )}
      </motion.div>

      {/* Credit + LIVE indicator */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(1rem, 2vw, 1.5rem)',
        right: 'clamp(1rem, 2vw, 1.5rem)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--gold)',
            display: 'inline-block',
          }}
        />
        <span style={{
          fontSize: '0.55rem',
          letterSpacing: '0.32em',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          {credit || 'In Motion'}
        </span>
      </div>
    </section>
  );
}
