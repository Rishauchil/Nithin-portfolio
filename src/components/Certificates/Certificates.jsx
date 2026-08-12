import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCertificate, FaCheckCircle } from 'react-icons/fa';
import './Certificates.css';

const certificates = [
  { id: 'cert-1', name: 'Digital Marketing Internship Certificate', issuer: 'IICT Bangalore' },
  { id: 'cert-2', name: 'Advanced Digital Marketing', issuer: 'Indian Institute of Computer Technology' },
  { id: 'cert-3', name: 'SEO Certified', issuer: 'Professional Certification', code: 'Code: C07CE510445934555/4235569' },
  { id: 'cert-4', name: 'Fundamental of Digital Marketing Certification', issuer: 'Google', code: 'ID: MFS FSE WYT' },
  { id: 'cert-5', name: 'Google Ads Display Certification', issuer: 'Google Skillshop', code: 'ID: 79258315' },
  { id: 'cert-6', name: 'Indian Institute of Computer Technology, Bangalore (IICT)', issuer: 'IICT' },
];

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="certificates" id="certificates">
      <div className="certificates__wave-top" />
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Credentials</div>
          <h2 className="section-title">Certificates</h2>
          <div className="accent-bar"><span /><span /></div>
          <p className="section-subtitle">
            Continuously expanding expertise through professional certifications and specialized training programs.
          </p>
        </motion.div>

        <div className="certs__grid">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              id={cert.id}
              className="cert-card glass-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onMouseMove={handleMouseMove}
            >
              <div className="cert-card__icon">
                <FaCertificate />
              </div>
              <div className="cert-card__content">
                <p className="cert-card__name">{cert.name}</p>
                <p className="cert-card__issuer">{cert.issuer}</p>
                {cert.code && <span className="cert-card__code" style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', display: 'block', marginTop: '3px' }}>{cert.code}</span>}
              </div>
              <div className="cert-card__check">
                <FaCheckCircle />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
