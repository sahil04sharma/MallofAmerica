import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import FloatingLogo from './components/FloatingLogo';
import Hero from './sections/Hero';
import WhyMOA from './sections/WhyMOA';
import Retail from './sections/Retail';
import Luxury from './sections/Luxury';
import Dining from './sections/Dining';
import Entertainment from './sections/Entertainment';
import Events from './sections/Events';
import Sponsorship from './sections/Sponsorship';
import Leasing from './sections/Leasing';
import ImageInterlude from './components/ImageInterlude';
import VideoInterlude from './components/VideoInterlude';

const sectionIds = ['hero', 'why', 'retail', 'luxury', 'dining', 'entertainment', 'events', 'sponsorship', 'leasing'];

/* Interlude assets — locally hosted Nano Banana AI-generated assets where available,
 * with curated Unsplash placeholders as fallback for the rest.
 * See /prompts/AI-PROMPTS.md for the full prompt manifest. */
const INTERLUDES = {
  scale:        '/mutlistory%20interior.jpeg',                                                                    // AI-generated (Nano Banana)
  luxuryWing:   'https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=2400&q=80&auto=format&fit=crop',  // placeholder
  dining:       '/dinning.jpeg',                                                                                  // AI-generated (Nano Banana)
  attractions:  'https://images.unsplash.com/photo-1517495306984-f84210f9daa8?w=2400&q=80&auto=format&fit=crop',  // placeholder (used as video poster)
  events:       'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=2400&q=80&auto=format&fit=crop',  // placeholder (used as video poster)
};

/* Self-hosted videos — replace YouTube embeds for luxury feel + offline support. */
const VIDEOS = {
  attractions: '/videos/nicklodean.mp4',  // AI/sourced — replaces YouTube embed
};

function LoadScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(onDone, 500);
      }
      setProgress(Math.min(p, 100));
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      style={{ position:'fixed', inset:0, background:'#0A0A0A', zIndex:10000,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'3rem' }}>
      <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration: 1.2, ease: [0.22,1,0.36,1] }} style={{ textAlign:'center' }}>
        <div style={{ fontFamily:'Italiana, serif', fontSize:'clamp(0.7rem,1.2vw,0.9rem)', letterSpacing:'0.5em', color:'var(--gold-light)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          An Interactive Sales Presentation
        </div>
        <div style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2rem,6vw,4.5rem)', letterSpacing:'0.18em', color:'white', lineHeight:1 }}>
          MALL OF AMERICA
        </div>
        <div style={{ fontSize:'0.55rem', letterSpacing:'0.42em', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', marginTop:'0.85rem' }}>
          Bloomington, Minnesota · Est. 1992
        </div>
      </motion.div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }} style={{ width:'min(300px,70vw)' }}>
        <div style={{ width:'100%', height:'1px', background:'rgba(255,255,255,0.1)', position:'relative' }}>
          <div style={{ position:'absolute', top:0, left:0, height:'100%',
            background:'linear-gradient(90deg, var(--gold-dark), var(--gold))',
            width:`${progress}%`, transition:'width 0.1s ease' }} />
        </div>
        <div style={{ fontFamily:'Bebas Neue', fontSize:'0.9rem', letterSpacing:'0.2em',
          color:'rgba(255,255,255,0.3)', marginTop:'1rem', textAlign:'right' }}>
          {Math.round(progress)}%
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          const absTop = top + window.scrollY;
          const absBottom = bottom + window.scrollY;
          if (scrollY >= absTop && scrollY < absBottom) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {loading && <LoadScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}>
          <FloatingLogo />
          <Navigation activeSection={activeSection} />
          <main>
            <Hero />
            <WhyMOA />

            <ImageInterlude
              src={INTERLUDES.scale}
              alt="Grand interior atrium showing the scale of Mall of America"
              kicker="Interlude · Scale"
              caption="Five-and-a-half million square feet of programmed space — under one continuous roof."
              credit="Mall of America · 2024"
              align="left"
              height="tall"
            />

            <Retail />

            <ImageInterlude
              src={INTERLUDES.luxuryWing}
              alt="The luxury wing at Mall of America"
              kicker="Interlude · The Premium Wing"
              caption="Considered architecture. Curated maisons. A wing worth the journey."
              credit="MOA Premium Brief"
              align="right"
              height="medium"
            />

            <Luxury />

            <ImageInterlude
              src={INTERLUDES.dining}
              alt="Atmospheric fine dining at Mall of America"
              kicker="Interlude · A Table for Forty Million"
              caption="Where weekday lunches and weekend celebrations share an address."
              credit="MOA Dining"
              align="left"
              height="medium"
            />

            <Dining />

            <VideoInterlude
              videoSrc={VIDEOS.attractions}
              poster={INTERLUDES.attractions}
              alt="Nickelodeon Universe — indoor theme park attractions"
              kicker="Interlude · Energy"
              caption="The reason they come. The reason they stay all day."
              credit="Nickelodeon Universe · Live"
              align="right"
              height="tall"
            />

            <Entertainment />

            <VideoInterlude
              youtubeId="5NFICD4CJh8"
              poster={INTERLUDES.events}
              alt="KATSEYE live performance at Mall of America"
              kicker="Interlude · The Stage"
              caption="Three hundred events a year. Forty million captive guests. Every activation amplified."
              credit="KATSEYE · MOA · 2024"
              align="center"
              height="tall"
            />

            <Events />
            <Sponsorship />
            <Leasing />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
