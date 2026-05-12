import { motion } from 'framer-motion';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(201,168,76,0.15)',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div style={{
              fontFamily: 'Bebas Neue',
              fontSize: '1.8rem',
              letterSpacing: '0.12em',
              color: 'white',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}>
              {/* Invisible slot — reserves exact pixel space so the floating logo lands into it */}
              <span
                id="footer-logo-slot"
                aria-hidden="true"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 38,
                  height: 38,
                  flexShrink: 0,
                }}
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
                    transition: 'opacity 0.5s var(--ease-cinema, cubic-bezier(0.22,1,0.36,1))',
                    filter: 'drop-shadow(0 0 14px rgba(201,168,76,0.22))',
                  }}
                />
              </span>
              <span id="footer-brand-mark">MALL OF AMERICA</span>
            </div>
            <div style={{
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>Bloomington, Minnesota · Est. 1992</div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 300 }}>
              America's most visited destination. A global platform for retail, entertainment, and brand partnerships.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Explore
            </div>
            {[
              { id: 'why', label: 'Why MOA' },
              { id: 'retail', label: 'Retail' },
              { id: 'dining', label: 'Dining' },
              { id: 'entertainment', label: 'Entertainment' },
              { id: 'events', label: 'Events' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '0.75rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'none',
                  padding: 0,
                  textAlign: 'left',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Contact
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 2 }}>
              <div>Commercial Leasing</div>
              <div>Brand Partnerships</div>
              <div>Event Bookings</div>
              <div style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
                60 East Broadway<br />
                Bloomington, MN 55425
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2025 Mall of America. All rights reserved. This is an interactive sales presentation.
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
            Built with React · Deployed on Vercel
          </div>
        </div>
      </div>
    </footer>
  );
}
