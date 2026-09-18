import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaDownload } from 'react-icons/fa';
import nithinImg from '../../assets/nithin-profile.jpeg';
import Magnetic from '../Magnetic';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const greetingString = "Hello,";
const greetingVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 120, damping: 10 } 
  }
};

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background blobs */}
      <div className="hero__blob hero__blob--blue" />
      <div className="hero__blob hero__blob--red" />
      <div className="hero__circle hero__circle--1" />
      <div className="hero__circle hero__circle--2" />

      <div className="container hero__inner">
        {/* Left Content */}
        <div className="hero__content">
          <motion.div
            className="hero__greeting"
            variants={greetingVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}
          >
            {greetingString.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.h1
            className="hero__title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            I'm <span className="hero__name text-gradient-accent">Nithin</span>, a Digital Marketing
            professional with{' '}
            <span className="hero__highlight">5+ years</span> of experience.
          </motion.h1>

          <motion.div
            className="accent-bar"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
          >
            <span />
            <span />
          </motion.div>

          <motion.p
            className="hero__tagline"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
          >
            Specializing in data-driven paid advertising, strategic brand growth, and high-converting creative campaigns that scale businesses.
          </motion.p>

          <motion.div
            className="hero__contacts"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.55}
          >
            <Magnetic>
              <motion.a 
                href="tel:+971503459193" 
                className="hero__contact-link" 
                id="hero-phone"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hero__contact-icon">
                  <FaWhatsapp />
                </span>
                +971 50 345 9193
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a 
                href="mailto:nithinkumars618@gmail.com" 
                className="hero__contact-link" 
                id="hero-email"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hero__contact-icon">
                  <FaEnvelope />
                </span>
                nithinkumars618@gmail.com
              </motion.a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero__cta-row"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.65}
          >
            <Magnetic>
              <motion.a 
                href="#contact" 
                className="btn btn--primary btn-shimmer" 
                id="hero-cta-contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a 
                href="#experience" 
                className="btn btn--ghost btn-shimmer" 
                id="hero-cta-work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Work Experience
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a 
                href="/Nithin_Kumar_Resume.pdf"
                download="Nithin_Kumar_Resume.pdf"
                className="btn btn--download btn-shimmer" 
                id="hero-cta-resume"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload style={{ marginRight: '8px', fontSize: '13px' }} />
                Download CV
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          className="hero__image-wrap"
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="hero__image-glow" />
          <div className="hero__image-ring" />
          <img
            src={nithinImg}
            alt="Nithin Kumar — Digital Marketing Professional"
            className="hero__photo"
          />

          {/* Floating badge placeholder coordinate anchor */}
          <div 
            id="hero-badge-placeholder" 
            style={{ 
              position: 'absolute', 
              top: '60px', 
              left: '-10px', 
              width: '90px', 
              height: '70px', 
              pointerEvents: 'none', 
              visibility: 'hidden' 
            }} 
          />

          {/* Stats pill */}
          <motion.div
            className="hero__stat-pill"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            whileHover={{ scale: 1.1, rotate: -2 }}
          >
            <span className="hero__stat-icon">📊</span>
            <div>
              <p className="hero__stat-num">Multi-Channel</p>
              <p className="hero__stat-desc">Campaign Expert</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="hero__scroll-dot" />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
