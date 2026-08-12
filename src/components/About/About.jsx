import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaUser, FaBullseye, FaChartLine, FaPaintBrush, FaGlobe } from 'react-icons/fa';
import './About.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariantsLeft = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariantsRight = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const pillarVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="about" id="about">
      {/* Dark wave top */}
      <div className="about__wave-top" />

      <motion.div
        className="container about__inner"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={titleVariants}>
          <div className="section-label">Who I Am</div>
          <h2 className="section-title">About Me</h2>
          <div className="accent-bar">
            <span />
            <span />
          </div>
        </motion.div>

        <div className="about__grid">
          {/* Personal Profile */}
          <motion.div 
            className="about__card glass-card" 
            variants={cardVariantsLeft}
            onMouseMove={handleMouseMove}
          >
            <div className="about__card-header">
              <div className="about__icon-wrap">
                <FaUser />
              </div>
              <h3 className="about__card-title">Professional Summary</h3>
            </div>
            <p className="about__text">
              Digital Marketing Specialist with <strong>4 years of experience</strong> in
              developing and executing multi-channel campaigns, analyzing performance, and
              creating engaging content. Proficient in digital marketing tools and software,
              along with graphic designing. Adept at leveraging the latest marketing trends
              to achieve business goals and deliver impactful results.
            </p>

            {/* Quick stats */}
            <div className="about__stats">
              <div className="about__stat">
                <span 
                  id="about-badge-placeholder" 
                  className="about__stat-num"
                  style={{ opacity: 0, transition: 'opacity 0.2s ease', display: 'inline-block' }}
                >
                  4+
                </span>
                <span className="about__stat-label">Years Exp.</span>
              </div>
              <div className="about__stat-divider" />
              <div className="about__stat">
                <span className="about__stat-num">6+</span>
                <span className="about__stat-label">Certifications</span>
              </div>
              <div className="about__stat-divider" />
              <div className="about__stat">
                <span className="about__stat-num">2</span>
                <span className="about__stat-label">Companies</span>
              </div>
            </div>
          </motion.div>

          {/* Core Strengths & Impact Pillars */}
          <motion.div 
            className="about__card glass-card" 
            variants={cardVariantsRight}
            onMouseMove={handleMouseMove}
          >
            <div className="about__card-header">
              <div className="about__icon-wrap">
                <FaBullseye />
              </div>
              <h3 className="about__card-title">Core Marketing Pillars</h3>
            </div>

            <motion.div
              className="about__credentials"
              variants={containerVariants}
            >
              <motion.div className="about__credential" variants={pillarVariants} whileHover={{ y: -3, scale: 1.01 }}>
                <div className="about__credential-badge" style={{ background: 'rgba(232, 25, 44, 0.15)', color: 'var(--accent)' }}>
                  <FaChartLine />
                </div>
                <div className="about__credential-info">
                  <p className="about__credential-degree">Paid Ads &amp; ROI Growth</p>
                  <p className="about__credential-school">Meta Ads, Google Ads, LinkedIn Ads &amp; Conversion Optimization</p>
                </div>
              </motion.div>

              <motion.div className="about__credential" variants={pillarVariants} whileHover={{ y: -3, scale: 1.01 }}>
                <div className="about__credential-badge" style={{ background: 'rgba(30, 107, 232, 0.15)', color: '#1e6be8' }}>
                  <FaPaintBrush />
                </div>
                <div className="about__credential-info">
                  <p className="about__credential-degree">Creative Design &amp; Video</p>
                  <p className="about__credential-school">Canva, Photoshop, CapCut, InShot &amp; Multi-Media Content</p>
                </div>
              </motion.div>

              <motion.div className="about__credential" variants={pillarVariants} whileHover={{ y: -3, scale: 1.01 }}>
                <div className="about__credential-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <FaGlobe />
                </div>
                <div className="about__credential-info">
                  <p className="about__credential-degree">SEO &amp; CMS Management</p>
                  <p className="about__credential-school">WordPress, Booqable CMS, Keyword Research &amp; Analytics</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
