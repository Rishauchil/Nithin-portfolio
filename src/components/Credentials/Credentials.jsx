import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaCheckCircle, FaGraduationCap, FaAward, FaBookOpen } from 'react-icons/fa';
import './Credentials.css';

const certificates = [
  { 
    id: 'cert-1', 
    type: 'cert', 
    name: 'Digital Marketing Internship Certificate', 
    issuer: 'IICT Bangalore',
    accentColor: '#10b981' // Emerald
  },
  { 
    id: 'cert-2', 
    type: 'cert', 
    name: 'Advanced Digital Marketing', 
    issuer: 'Indian Institute of Computer Technology',
    accentColor: '#06b6d4' // Cyan
  },
  { 
    id: 'cert-3', 
    type: 'cert', 
    name: 'SEO Certified', 
    issuer: 'Professional Certification', 
    code: 'Code: C07CE510445934555/4235569',
    accentColor: '#8b5cf6' // Violet
  },
  { 
    id: 'cert-4', 
    type: 'cert', 
    name: 'Fundamental of Digital Marketing Certification', 
    issuer: 'Google', 
    code: 'ID: MFS FSE WYT',
    accentColor: '#4285F4' // Google Blue
  },
  { 
    id: 'cert-5', 
    type: 'cert', 
    name: 'Google Ads Display Certification', 
    issuer: 'Google Skillshop', 
    code: 'ID: 79258315',
    accentColor: '#0284c7' // Sky Blue
  },
  { 
    id: 'cert-6', 
    type: 'cert', 
    name: 'Indian Institute of Computer Technology, Bangalore (IICT)', 
    issuer: 'IICT',
    accentColor: '#3b82f6' // Blue
  },
];

const educationData = [
  {
    id: 'edu-mba',
    type: 'edu',
    name: 'Master of Business Administration',
    issuer: 'Shree Devi Institute of Technology (VTU)',
    shortBadge: 'MBA',
    badgeColor: '#e8192c',
    year: '2020 · Mangalore, India',
    accentColor: '#e8192c'
  },
  {
    id: 'edu-bcom',
    type: 'edu',
    name: 'Bachelor of Commerce',
    issuer: 'Mahesh College of Management',
    shortBadge: 'B.COM',
    badgeColor: '#1e6be8',
    year: '2018 · Mangalore, India',
    accentColor: '#1e6be8'
  },
  {
    id: 'edu-puc',
    type: 'edu',
    name: 'Pre-University Course',
    issuer: 'Mahesh College of Management',
    shortBadge: 'PUC',
    badgeColor: '#8b5cf6',
    year: '2018 · Mangalore, India',
    accentColor: '#8b5cf6'
  },
];

const allItems = [
  ...educationData,
  ...certificates,
];

export default function Credentials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [filter, setFilter] = useState('all');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const filteredItems = filter === 'all'
    ? allItems
    : allItems.filter(item => item.type === filter);

  return (
    <section className="credentials" id="credentials">
      <div className="credentials__wave-top" />
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Qualifications &amp; Degrees</div>
          <h2 className="section-title">Certificates &amp; Education</h2>
          <div className="accent-bar"><span /><span /></div>
          
          <div className="credentials__filter-bar">
            <button
              className={`credentials__tab ${filter === 'all' ? 'credentials__tab--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Credentials (9)
            </button>
            <button
              className={`credentials__tab ${filter === 'cert' ? 'credentials__tab--active' : ''}`}
              onClick={() => setFilter('cert')}
            >
              Certifications (6)
            </button>
            <button
              className={`credentials__tab ${filter === 'edu' ? 'credentials__tab--active' : ''}`}
              onClick={() => setFilter('edu')}
            >
              Academic Degrees (3)
            </button>
          </div>
        </motion.div>

        <motion.div className="credentials__grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                layout
                key={item.id}
                id={item.id}
                className={`cred-card glass-card ${item.type === 'edu' ? 'cred-card--edu' : ''}`}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -15 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onMouseMove={handleMouseMove}
              >
                <div 
                  className="cred-card__icon-box"
                  style={{
                    background: `${item.accentColor}15`,
                    borderColor: `${item.accentColor}35`,
                    color: item.accentColor
                  }}
                >
                  {item.type === 'edu' ? (
                    <span className="cred-card__badge-text">{item.shortBadge}</span>
                  ) : (
                    <FaAward />
                  )}
                </div>

                <div className="cred-card__content">
                  <p className="cred-card__name">{item.name}</p>
                  <p className="cred-card__issuer">{item.issuer}</p>
                  {item.year && <p className="cred-card__year" style={{ color: item.accentColor }}>{item.year}</p>}
                  {item.code && <span className="cred-card__code">{item.code}</span>}
                </div>

                <div className="cred-card__check">
                  <FaCheckCircle />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
