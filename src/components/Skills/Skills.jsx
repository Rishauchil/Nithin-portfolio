import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Skills.css';

import logo1 from '../../assets/1.png';
import logo2 from '../../assets/2.png';
import logo3 from '../../assets/3.png';
import logo4 from '../../assets/4.png';
import logo5 from '../../assets/5.png';
import logo6 from '../../assets/6.png';
import logo7 from '../../assets/7.png';
import logo8 from '../../assets/8.png';
import logo9 from '../../assets/9.png';
import logo10 from '../../assets/10.png';
import logo11 from '../../assets/11.png';
import logo12 from '../../assets/12.png';
import logo13 from '../../assets/13.png';
import logo14 from '../../assets/14.png';
import logo15 from '../../assets/15.png';
import logo16 from '../../assets/16.png';
import logo17 from '../../assets/17.png';
import logo18 from '../../assets/18.png';
import logo19 from '../../assets/19.png';
import logo20 from '../../assets/20.png';
import logo21 from '../../assets/21.png';
import logo22 from '../../assets/22.png';
import logo23 from '../../assets/23.png';
import logo24 from '../../assets/24.png';

const keySkills = [
  {
    category: 'Digital Marketing & Campaigns',
    color: '#e8192c',
    items: [
      'Campaign Coordination',
      'Email Campaign Management',
      'Online Promotions',
      'Campaign Optimization',
      'Marketing Calendar Management',
      'Campaign Budget Tracking',
    ],
  },
  {
    category: 'Analytics',
    color: '#1e6be8',
    items: ['Performance Reporting', 'ROI Tracking', 'Lead Generation', 'Market Research'],
  },
  {
    category: 'Events & Stakeholders',
    color: '#8b5cf6',
    items: [
      'Events & Exhibitions',
      'Vendor Management',
      'Stakeholder Collaboration',
      'Cross-Functional Coordination',
    ],
  },
  {
    category: 'Content & Creative',
    color: '#10b981',
    items: ['Influencer Marketing', 'Creative Briefing'],
  },
];

const languages = ['English', 'Hindi', 'Malayalam', 'Kannada', 'Tulu'];

const filterCategories = [
  { id: 'all', label: 'All Tools (24)' },
  { id: 'ads', label: 'Digital Ads' },
  { id: 'web', label: 'Web & CRM' },
  { id: 'ai', label: 'Generative AI' },
  { id: 'design', label: 'Design & Video' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'office', label: 'MS Office' },
];

const allTools = [
  // Web & CRM
  { name: 'WordPress', category: 'web', categoryLabel: 'Web & CRM', pct: 80, icon: logo1 },
  { name: 'Booqable', category: 'web', categoryLabel: 'Web & CRM', pct: 100, icon: logo2 },
  { name: 'Shopify', category: 'web', categoryLabel: 'Web & CRM', pct: 80, icon: logo3 },
  { name: 'Mailchimp', category: 'web', categoryLabel: 'Web & CRM', pct: 80, icon: logo5 },

  // Advertising
  { name: 'Meta Ads', category: 'ads', categoryLabel: 'Digital Advertising', pct: 100, icon: logo8 },
  { name: 'Google Ads', category: 'ads', categoryLabel: 'Digital Advertising', pct: 80, icon: logo9 },
  { name: 'LinkedIn Ads', category: 'ads', categoryLabel: 'Digital Advertising', pct: 80, icon: logo10 },
  { name: 'TikTok Ads', category: 'ads', categoryLabel: 'Digital Advertising', pct: 80, icon: logo11 },

  // Analytics
  { name: 'Google Analytics', category: 'analytics', categoryLabel: 'Digital Analytics', pct: 90, icon: logo18 },
  { name: 'YouTube Studio', category: 'analytics', categoryLabel: 'Digital Analytics', pct: 80, icon: logo19 },

  // Video & Design
  { name: 'Canva', category: 'design', categoryLabel: 'Design & Photography', pct: 100, icon: logo4 },
  { name: 'Photoshop', category: 'design', categoryLabel: 'Design & Photography', pct: 70, icon: logo6 },
  { name: 'Lightroom', category: 'design', categoryLabel: 'Design & Photography', pct: 80, icon: logo7 },
  { name: 'CapCut', category: 'design', categoryLabel: 'Video Editing', pct: 90, icon: logo20 },
  { name: 'InShot', category: 'design', categoryLabel: 'Video Editing', pct: 80, icon: logo21 },

  // Generative AI
  { name: 'Claude', category: 'ai', categoryLabel: 'Generative AI', pct: 80, icon: logo12 },
  { name: 'ChatGPT', category: 'ai', categoryLabel: 'Generative AI', pct: 80, icon: logo13 },
  { name: 'Midjourney', category: 'ai', categoryLabel: 'Generative AI', pct: 80, icon: logo14 },
  { name: 'Adobe Firefly', category: 'ai', categoryLabel: 'Generative AI', pct: 60, icon: logo15 },
  { name: 'Gemini', category: 'ai', categoryLabel: 'Generative AI', pct: 40, icon: logo16 },
  { name: 'OpenArt AI', category: 'ai', categoryLabel: 'Generative AI', pct: 50, icon: logo17 },

  // Microsoft Office
  { name: 'PowerPoint', category: 'office', categoryLabel: 'Microsoft Office', pct: 90, icon: logo22 },
  { name: 'Excel', category: 'office', categoryLabel: 'Microsoft Office', pct: 40, icon: logo23 },
  { name: 'Word', category: 'office', categoryLabel: 'Microsoft Office', pct: 90, icon: logo24 },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const filteredTools = activeFilter === 'all'
    ? allTools
    : allTools.filter(t => t.category === activeFilter);

  // Duplicated array for seamless infinite marquee ribbon
  const marqueeLogos = [...allTools, ...allTools];

  return (
    <section className="skills" id="skills">
      <div className="skills__wave-top" />
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Expertise &amp; Tech Stack</div>
          <h2 className="section-title">Skills &amp; Tools</h2>
          <div className="accent-bar"><span /><span /></div>
        </motion.div>

        {/* Top Infinite Marquee Ticker */}
        <motion.div
          className="skills__marquee-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="skills__marquee-track">
            <motion.div
              className="skills__marquee-content"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            >
              {marqueeLogos.map((tool, idx) => (
                <div key={`${tool.name}-${idx}`} className="skills__marquee-badge">
                  <div className="skills__marquee-img-box">
                    <img src={tool.icon} alt={tool.name} className="skills__marquee-img" />
                  </div>
                  <span className="skills__marquee-name">{tool.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="skills__grid">
          {/* Left — Key Skills + Languages */}
          <div className="skills__left">
            <motion.div 
              className="skills__panel glass-card"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
            >
              <h3 className="skills__panel-title">Key Core Competencies</h3>
              <div className="key-skills">
                {keySkills.map((group, gi) => (
                  <motion.div
                    key={group.category}
                    className="key-skills__group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: gi * 0.1 + 0.3, duration: 0.5 }}
                  >
                    <p
                      className="key-skills__category"
                      style={{ color: group.color }}
                    >
                      {group.category}
                    </p>
                    <ul className="key-skills__list">
                      {group.items.map((item) => (
                        <motion.li 
                          key={item} 
                          className="key-skills__item"
                          whileHover={{ x: 3, color: '#ffffff' }}
                        >
                          <span className="key-skills__dot" style={{ background: group.color }} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Languages */}
              <div className="languages" id="languages">
                <h3 className="skills__panel-title">Languages Spoken</h3>
                <div className="languages__pills">
                  {languages.map((lang, i) => (
                    <motion.span
                      key={lang}
                      className="lang-pill"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 100, damping: 10 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {lang}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Tools & Platforms Showcase */}
          <div className="skills__right">
            <motion.div 
              className="skills__panel glass-card"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
            >
              <div className="tools__header">
                <h3 className="skills__panel-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                  Marketing Tools &amp; Platforms
                </h3>

                {/* Filter Pills */}
                <div className="tools__filters">
                  {filterCategories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`tools__filter-btn ${activeFilter === cat.id ? 'tools__filter-btn--active' : ''}`}
                      onClick={() => setActiveFilter(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Tool Cards Grid */}
              <motion.div className="tools-card-grid" layout>
                <AnimatePresence mode="popLayout">
                  {filteredTools.map((tool) => (
                    <motion.div
                      layout
                      key={tool.name}
                      className="tool-card"
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -15 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      whileHover={{ y: -6, scale: 1.04 }}
                    >
                      <div className="tool-card__icon-box">
                        <img src={tool.icon} alt={tool.name} className="tool-card__img" />
                      </div>
                      <div className="tool-card__info">
                        <h4 className="tool-card__title">{tool.name}</h4>
                        <span className="tool-card__cat-label">{tool.categoryLabel}</span>
                      </div>
                      <div className="tool-card__pct-badge">
                        {tool.pct}%
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
