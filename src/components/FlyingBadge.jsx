import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

export default function FlyingBadge() {
  const [coords, setCoords] = useState(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateCoords = () => {
      const heroEl = document.getElementById('hero-badge-placeholder');
      const aboutEl = document.getElementById('about-badge-placeholder');
      if (heroEl && aboutEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const aboutRect = aboutEl.getBoundingClientRect();
        
        // Calculate the exact center coordinates for pixel-perfect center-to-center alignment
        setCoords({
          heroX: heroRect.left + heroRect.width / 2 + window.scrollX,
          heroY: heroRect.top + heroRect.height / 2 + window.scrollY,
          aboutX: aboutRect.left + aboutRect.width / 2 + window.scrollX,
          aboutY: aboutRect.top + aboutRect.height / 2 + window.scrollY,
        });
      }
    };

    // Initial check
    updateCoords();

    // Re-check on resize and scroll events
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords, { passive: true });

    // Re-check on ResizeObserver for DOM shifts (images, fonts loading)
    const observer = new ResizeObserver(updateCoords);
    const root = document.getElementById('root');
    if (root) observer.observe(root);

    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords);
      observer.disconnect();
    };
  }, []);

  // Compute endScroll threshold so the badge lands just as the target enters the viewport
  const endScroll = coords ? Math.max(150, coords.aboutY - window.innerHeight + 100) : 0;

  // React to scroll events to hide/show the target About placeholder dynamically
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!coords) return;
    const aboutEl = document.getElementById('about-badge-placeholder');
    if (aboutEl) {
      // Once the flying badge is 95% close, make the static one in About section visible
      if (latest >= endScroll * 0.95) {
        aboutEl.style.opacity = '1';
      } else {
        aboutEl.style.opacity = '0';
      }
    }
  });

  const startScroll = 0;
  const heroX = coords ? coords.heroX : 0;
  const heroY = coords ? coords.heroY : 0;
  const aboutX = coords ? coords.aboutX : 0;
  const aboutY = coords ? coords.aboutY : 0;

  // Center-aligned coordinates
  const rawX = useTransform(scrollY, [startScroll, endScroll], [heroX, aboutX]);
  const rawY = useTransform(scrollY, [startScroll, endScroll], [heroY, aboutY]);
  
  // Smooth spring motion for fly trajectory
  const x = useSpring(rawX, { stiffness: 60, damping: 15 });
  const y = useSpring(rawY, { stiffness: 60, damping: 15 });

  // Staged elastic zoom animation: zooms in to 1.5 in flight, then zooms out and settles at 0.45 on land
  const scale = useTransform(
    scrollY, 
    [startScroll, endScroll * 0.4, endScroll * 0.7, endScroll], 
    [1, 1.55, 1.0, 0.45]
  );

  // Fade out background card elements (border, glass bg, shadow) as it lands
  const bgOpacity = useTransform(scrollY, [startScroll, endScroll * 0.95], [1, 0]);
  
  // Fade out the "Years Experience" label
  const labelOpacity = useTransform(scrollY, [startScroll, endScroll * 0.6], [1, 0]);

  // Make the flying number itself fade out right as it overlaps the static one,
  // creating a completely seamless handoff
  const badgeNumberOpacity = useTransform(scrollY, [startScroll, endScroll * 0.95, endScroll], [1, 1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        x: '-50%', // center-align horizontally
        y: '-50%', // center-align vertically
        scale,
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        pointerEvents: 'none',
        padding: '12px 18px',
        borderRadius: '16px',
        minWidth: '90px',
        opacity: badgeNumberOpacity,
      }}
    >
      {/* Animated card background overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          opacity: bgOpacity,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(232, 25, 44, 0.1)',
          zIndex: -1,
        }}
      />

      <span
        className="hero__badge-number"
        style={{
          fontSize: '28px',
          fontWeight: 900,
          color: '#e8192c',
          lineHeight: 1,
          display: 'block',
        }}
      >
        5+
      </span>

      <motion.span
        className="hero__badge-label"
        style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          textAlign: 'center',
          fontWeight: 500,
          lineHeight: 1.3,
          opacity: labelOpacity,
          display: 'block',
          marginTop: '2px',
        }}
      >
        Years Experience
      </motion.span>
    </motion.div>
  );
}
