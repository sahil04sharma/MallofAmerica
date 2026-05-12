import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/*
 * FloatingLogo — signature element that travels through the deck.
 *
 * Three behavioral phases, controlled by which sentinel is in view:
 *   1. ARRIVAL — Hero is in view → large logo top-right
 *   2. TRAVEL  — neither Hero nor Footer slot in view → small logo tucked in top bar
 *   3. LANDING — Footer slot is in view → live-measured exact landing on the slot
 *
 * Phase detection via IntersectionObserver (not scroll math) — robust against
 * dynamic page heights, font loading, image reflows, and spring overshoot.
 *
 * Hidden below lg breakpoint.
 */

const LOGO_SRC = '/moa%20logo.svg';
const PHASE = { ARRIVAL: 'arrival', TRAVEL: 'travel', LANDING: 'landing' };

export default function FloatingLogo() {
  const [phase, setPhase] = useState(PHASE.ARRIVAL);
  const [landing, setLanding] = useState({ top: 0, left: 0, size: 38 });
  const [arrival, setArrival] = useState({ top: 0, left: 0, size: 80 });
  const [travel, setTravel] = useState({ top: 22, left: 24, size: 22 });
  const [ready, setReady] = useState(false);

  /* --------------------- viewport-relative arrival anchor */
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const arrivalSize = Math.min(96, vw * 0.07);
      setArrival({
        top: vh * 0.12,
        left: vw - arrivalSize - vw * 0.05,
        size: arrivalSize,
      });

      setReady(true);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  /* --------------------- live-measure top bar slot (TRAVEL phase) */
  useEffect(() => {
    const slot = document.getElementById('topbar-logo-slot');
    if (!slot) return;
    const measure = () => {
      const rect = slot.getBoundingClientRect();
      if (rect.width > 0) {
        setTravel({
          top: rect.top,
          left: rect.left,
          size: rect.width,
        });
      }
    };
    measure();
    setTimeout(measure, 600);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* --------------------- live-measure landing slot (LANDING phase) */
  useEffect(() => {
    if (phase !== PHASE.LANDING) return;
    const slot = document.getElementById('footer-logo-slot');
    if (!slot) return;

    let raf = 0;
    const measure = () => {
      const rect = slot.getBoundingClientRect();
      setLanding({
        top: rect.top,
        left: rect.left,
        size: rect.width,
      });
      raf = requestAnimationFrame(measure);
    };
    raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  /* --------------------- phase detection via IntersectionObserver */
  useEffect(() => {
    const hero = document.getElementById('hero');
    const slot = document.getElementById('footer-logo-slot');
    if (!hero || !slot) return;

    let heroIn = true;
    let slotIn = false;

    const updatePhase = () => {
      if (slotIn)      setPhase(PHASE.LANDING);
      else if (heroIn) setPhase(PHASE.ARRIVAL);
      else             setPhase(PHASE.TRAVEL);
    };

    const heroObs = new IntersectionObserver(([e]) => {
      heroIn = e.intersectionRatio > 0.4;   // Hero counts as "in view" while >40% visible
      updatePhase();
    }, { threshold: [0, 0.4, 0.8] });

    const slotObs = new IntersectionObserver(([e]) => {
      slotIn = e.isIntersecting;
      updatePhase();
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    heroObs.observe(hero);
    slotObs.observe(slot);
    return () => { heroObs.disconnect(); slotObs.disconnect(); };
  }, []);

  /* --------------------- broadcast phase to inline slot logos via CSS */
  useEffect(() => {
    document.body.dataset.logoPhase = phase;
    return () => { delete document.body.dataset.logoPhase; };
  }, [phase]);

  if (!ready) return null;

  // Resolve current target based on phase
  const target =
    phase === PHASE.LANDING ? landing :
    phase === PHASE.ARRIVAL ? arrival :
    travel;

  // Floating logo is the visual element ONLY during ARRIVAL and LANDING.
  // During TRAVEL the inline navbar <img> is the source of truth (perfect alignment).
  const floatingOpacity =
    phase === PHASE.TRAVEL  ? 0 :
    phase === PHASE.LANDING ? 1 :
    0.95;

  return (
    <motion.img
      src={LOGO_SRC}
      alt="Mall of America"
      className="hidden lg:block"
      animate={{
        top: target.top,
        left: target.left,
        width: target.size,
        height: target.size,
        opacity: floatingOpacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 24,
        mass: 0.7,
      }}
      style={{
        position: 'fixed',
        zIndex: 55,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 18px rgba(201,168,76,0.18))',
        willChange: 'top, left, width, height',
      }}
    />
  );
}
