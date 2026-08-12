import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGraduationCap, FaAward, FaBookOpen } from 'react-icons/fa';
import './Education.css';

const educationData = [
  {
    id: 'edu-mba',
    degree: 'Master of Business Administration',
    shortBadge: 'MBA',
    badgeColor: '#e8192c',
    school: 'Shree Devi Institute of Technology (VTU)',
    location: 'Mangalore, India',
    year: '2020',
    icon: <FaGraduationCap />,
    description: 'Advanced specialization in Business Management, Strategic Marketing, Brand Planning, and Consumer Behavior analysis.',
  },
  {
    id: 'edu-bcom',
    degree: 'Bachelor of Commerce',
    shortBadge: 'B.COM',
    badgeColor: '#1e6be8',
    school: 'Mahesh College of Management',
    location: 'Mangalore, India',
    year: '2018',
    icon: <FaAward />,
    description: 'Foundational degree covering Business Finance, Accounting, Commercial Principles, and Market Operations.',
  },
  {
    id: 'edu-puc',
    degree: 'Pre-University Course',
    shortBadge: 'PUC',
    badgeColor: '#8b5cf6',
    school: 'Mahesh College of Management',
    location: 'Mangalore, India',
    year: '2018',
    icon: <FaBookOpen />,
    description: 'Higher secondary educational qualification laying the analytical foundation for undergraduate studies.',
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="education" id="education">
      <div className="education__wave-top" />
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Academic Foundation</div>
          <h2 className="section-title">Education &amp; Qualifications</h2>
          <div className="accent-bar"><span /><span /></div>
          <p className="section-subtitle">
            Solid academic background providing strong strategic, analytical, and marketing management fundamentals.
          </p>
        </motion.div>

        <div className="education__grid">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="education-card glass-card"
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              onMouseMove={handleMouseMove}
            >
              <div className="education-card__header">
                <div className="education-card__icon-box">
                  {edu.icon}
                </div>
                <span 
                  className="education-card__badge"
                  style={{ 
                    background: `${edu.badgeColor}18`, 
                    color: edu.badgeColor, 
                    borderColor: `${edu.badgeColor}40` 
                  }}
                >
                  {edu.shortBadge}
                </span>
              </div>

              <div className="education-card__body">
                <h3 className="education-card__degree">{edu.degree}</h3>
                <p className="education-card__school">{edu.school}</p>
                <div className="education-card__meta">
                  <span>{edu.year}</span>
                  <span className="education-card__dot">•</span>
                  <span>{edu.location}</span>
                </div>
                <p className="education-card__desc">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
