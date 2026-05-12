import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersection } from '../hooks/useIntersection';

const ease = [0.22, 1, 0.36, 1];

const paths = [
  {
    id: 'lease',
    title: 'Retail Leasing',
    icon: '◆',
    desc: 'Join 520+ brands in the most visited retail destination in America. Spaces from 100 to 50,000 sq ft across all categories.',
    cta: 'Inquire About Leasing',
    details: [
      'Luxury & Premium Flagship positions available',
      'Mid-tier and specialty retail spaces',
      'Pop-up and short-term activation zones',
      'Food & Beverage and lifestyle concepts',
      'Direct access to 40M+ annual visitors',
    ],
  },
  {
    id: 'sponsor',
    title: 'Brand Sponsorship',
    icon: '◈',
    desc: 'Partner with MOA to activate across our physical and digital ecosystem. Custom programs from 6-figure to 8-figure engagements.',
    cta: 'Explore Partnerships',
    details: [
      'Naming rights & exclusive category sponsorships',
      'In-mall physical brand activations',
      'Digital screen & media network',
      'Co-branded event programming',
      'Audience data & attribution reporting',
    ],
  },
  {
    id: 'event',
    title: 'Event Booking',
    icon: '⬡',
    desc: 'Book MOA\'s spaces for concerts, conventions, product launches, and brand activations. Year-round availability, full production support.',
    cta: 'Book a Venue',
    details: [
      'Rotunda Stage — up to 12,000 capacity',
      'Expo Hall — 200,000 sq ft flexible space',
      'Luxury Wing private event spaces',
      'In-mall activation corridors',
      'Outdoor plaza & seasonal spaces',
    ],
  },
];

export default function Leasing() {
  const [ref, isVisible] = useIntersection();
  const [activePath, setActivePath] = useState('lease');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', interest: 'lease', message: '' });

  const active = paths.find(p => p.id === activePath);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="leasing" ref={ref} style={{
      padding: 'clamp(7rem, 12vw, 12rem) 2rem',
      background: 'linear-gradient(180deg, #050505 0%, var(--black) 50%, #050505 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle exclusivity glow */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '20%', left: '50%',
        width: 1200, height: 1200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 60%)',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />
      <div className="grain" style={{ opacity: 0.08 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Header — confident, anchored, NOT centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, ease }}
          className="mb-24"
          style={{ maxWidth: 1100 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div style={{ width: 56, height: 1, background: 'var(--gold)' }} />
            <span className="kicker">Chapter 08 — Partnership</span>
          </div>
          <h2 className="font-display" style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(3.2rem, 9vw, 9.5rem)',
            lineHeight: 0.88,
            color: 'white',
            letterSpacing: '0.005em',
            marginBottom: '2rem',
          }}>
            YOUR NEXT MOVE<br />
            <span style={{ fontFamily: 'Italiana, serif', color: 'var(--gold-light)' }}>
              starts here.
            </span>
          </h2>
          <p style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 620,
            fontStyle: 'italic',
            lineHeight: 1.75,
            borderLeft: '1px solid rgba(201,168,76,0.4)',
            paddingLeft: '1.5rem',
          }}>
            Leasing, sponsorship, or a flagship event — our commercial team designs the program around your ambition. By appointment.
          </p>
        </motion.div>

        {/* Path selector — editorial numbered tabs, NOT cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.2, ease }}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            borderTop: '1px solid rgba(201,168,76,0.25)',
            borderBottom: '1px solid rgba(201,168,76,0.18)',
            marginBottom: '5rem',
          }}
        >
          {paths.map((p, i) => {
            const isActive = activePath === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePath(p.id)}
                style={{
                  padding: 'clamp(2rem, 3vw, 2.75rem) clamp(1.5rem, 2.5vw, 2rem)',
                  borderLeft: i > 0 ? '1px solid rgba(201,168,76,0.18)' : 'none',
                  background: isActive ? 'rgba(201,168,76,0.045)' : 'transparent',
                  textAlign: 'left',
                  cursor: 'none',
                  position: 'relative',
                  transition: 'background 0.7s var(--ease-cinema)',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="leasing-path-bar"
                    style={{
                      position: 'absolute', top: -1, left: 0, right: 0,
                      height: 2, background: 'var(--gold)',
                    }}
                    transition={{ duration: 0.7, ease }}
                  />
                )}
                <div style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: '1rem',
                  color: isActive ? 'var(--gold-light)' : 'rgba(255,255,255,0.4)',
                  marginBottom: '1.25rem',
                  letterSpacing: '0.1em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: 'clamp(1.3rem, 2.2vw, 1.85rem)',
                  letterSpacing: '0.04em',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.85)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.05,
                }}>{p.title}</div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                  fontFamily: 'Cormorant Garamond',
                  fontStyle: 'italic',
                }}>{p.desc}</p>
              </button>
            );
          })}
        </motion.div>

        {/* Active detail + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={activePath}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="kicker" style={{ marginBottom: '1rem' }}>
                  {active.title}
                </div>
                <div style={{
                  fontFamily: 'Italiana, serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'white',
                  marginBottom: '2.5rem',
                  letterSpacing: '0.005em',
                  lineHeight: 1.1,
                }}>The Opportunities</div>
                <div style={{ marginBottom: '3rem' }}>
                  {active.details.map((d, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{ width: 6, height: 6, background: 'var(--gold)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>{d}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))',
                  border: '1px solid rgba(201,168,76,0.2)',
                  padding: '2rem',
                }}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '0.5rem',
                  }}>
                    "Every brand that has invested in a presence at Mall of America has seen outsized returns — in traffic, in media, and in sales."
                  </div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                    — MOA Commercial Development Team
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 1.2, ease }}
            style={{
              padding: 'clamp(2rem, 4vw, 3.5rem) 0 0',
              borderTop: '1px solid rgba(201,168,76,0.4)',
              position: 'relative',
            }}
          >

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full"
                  style={{ minHeight: 400 }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    border: '1px solid var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '2rem',
                    fontSize: '1.5rem',
                  }}>✓</div>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', letterSpacing: '0.1em', color: 'white', marginBottom: '1rem' }}>
                    MESSAGE RECEIVED
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    Our commercial development team will reach out within 24 hours to schedule a discovery call and send you a customized opportunity overview.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit}>
                  <div className="kicker" style={{ marginBottom: '0.75rem' }}>By Appointment</div>
                  <div style={{
                    fontFamily: 'Italiana, serif',
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    color: 'white',
                    marginBottom: '2.5rem',
                    letterSpacing: '0.005em',
                    lineHeight: 1.15,
                  }}>
                    {active?.cta || 'Get in Touch'}
                  </div>

                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your Name' },
                    { label: 'Company', key: 'company', type: 'text', placeholder: 'Your Company' },
                    { label: 'Business Email', key: 'email', type: 'email', placeholder: 'you@company.com' },
                  ].map((field, fi) => (
                    <div key={field.key} style={{ marginBottom: '1.75rem' }}>
                      <label className="kicker" style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.45)' }}>
                        {String(fi + 1).padStart(2,'0')} · {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        required
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid rgba(201,168,76,0.25)',
                          color: 'white',
                          padding: '0.7rem 0',
                          fontSize: '1rem',
                          outline: 'none',
                          fontFamily: 'Cormorant Garamond, serif',
                          fontStyle: 'italic',
                          cursor: 'none',
                          transition: 'border-color 0.5s var(--ease-cinema)',
                        }}
                        onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--gold)'}
                        onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.25)'}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: '1.75rem' }}>
                    <label className="kicker" style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.45)' }}>
                      04 · Interested In
                    </label>
                    <select
                      value={form.interest}
                      onChange={e => { setForm(f => ({ ...f, interest: e.target.value })); setActivePath(e.target.value); }}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(201,168,76,0.25)',
                        color: 'rgba(255,255,255,0.85)',
                        padding: '0.7rem 0',
                        fontSize: '1rem',
                        outline: 'none',
                        fontFamily: 'Cormorant Garamond, serif',
                        fontStyle: 'italic',
                        cursor: 'none',
                        appearance: 'none',
                        backgroundImage: 'linear-gradient(45deg, transparent 50%, var(--gold) 50%), linear-gradient(135deg, var(--gold) 50%, transparent 50%)',
                        backgroundPosition: 'calc(100% - 14px) 50%, calc(100% - 8px) 50%',
                        backgroundSize: '6px 6px',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      {paths.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: '2.25rem' }}>
                    <label className="kicker" style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.45)' }}>
                      05 · A Few Words
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your opportunity..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(201,168,76,0.25)',
                        color: 'white',
                        padding: '0.7rem 0',
                        fontSize: '1rem',
                        outline: 'none',
                        fontFamily: 'Cormorant Garamond, serif',
                        fontStyle: 'italic',
                        resize: 'none',
                        cursor: 'none',
                      }}
                    />
                  </div>

                  <button type="submit" className="cta-btn" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
                    Submit Inquiry
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
