import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    id: 'exp-1',
    company: 'Samswek Global Events',
    role: 'Digital Marketing Specialist',
    period: 'November 2023 – Present',
    location: 'UAE',
    current: true,
    bullets: [
      'Managing multiple social media accounts across industries and executing optimized paid advertising campaigns to drive engagement, visibility and conversions.',
      'Monitored and analyzed the performance of digital marketing campaigns to optimize reach, engagement and ROI, resulting in an enhanced online presence.',
      'Designed visually appealing graphic content for digital advertising and social media, elevating brand awareness and engagement across online platforms.',
      'Actively monitored and adapted to the latest digital marketing trends and platform updates, effectively capitalizing on new tools and strategies to enhance performance and drive business results.',
      'Conducted keyword research and integrated relevant keywords into the content to improve search engine rankings and increasing organic traffic.',
      'Managed and maintained the Booqable website, ensuring optimal functionality and user experience.',
      'Collaborated with the marketing team to develop content strategies that drive engagement, traffic and conversions. Contributed innovative ideas to enhance content\'s quality and effectiveness.',
      'Created engaging content for our website, social media, email campaigns and other digital channels.',
      'Collaborated with influencers to effectively promote events and boosted brand visibility and engagement across various online platforms.',
      'Actively engaging with customer feedback and ensuring consistent and effective communication through our online platforms.',
      'Designed marketing materials such as brochures, flyers and advertisements that effectively communicated brand messages and resonated with target audiences.',
      'Shot and edited high-quality video content for social media and digital marketing campaigns, effectively communicating key messages and engaging audiences.',
    ],
  },
  {
    id: 'exp-2',
    company: 'Rezin Infosoft Private Limited',
    role: 'Digital Marketing Executive',
    period: 'June 2021 – June 2023',
    location: 'India',
    current: false,
    bullets: [
      'Developed the company website using WordPress and configured Google Analytics to track website performance, analyze user behavior, and provide actionable insights.',
      'Developed engaging content that resonated with the target audience, including writing and editing posts, creating graphics and videos, and curating relevant content from other sources.',
      'Designed visually appealing graphic content for digital advertising and social media, enhancing brand awareness and engagement across online platforms.',
      'Planned and optimized targeted Google Ads campaigns to maximize lead generation and conversions.',
      'Created, managed, and optimized social media advertising campaigns across platforms such as Facebook and Instagram.',
      'Implemented SEO strategies, including keyword research, on-page and off-page optimization, and analytics.',
      'Conducted market research and competitive analysis to identify the needs of target segments and inform marketing strategies and tactics.',
      'Collaborated with the tech team to improve user experience, respond to customer feedback, and maintain effective online communication.',
      'Appeared in advertising videos for the company on social media platforms and edited videos using the latest mobile applications.',
      'Suggested and implemented new features and initiatives to increase brand awareness, including promotions and competitions.',
    ],
  },
];

function ExperienceCard({ exp, index }) {
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
    <motion.div
      ref={ref}
      className={`exp-card ${exp.current ? 'exp-card--current' : ''}`}
      id={exp.id}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline dot */}
      <div className="exp-card__dot">
        <motion.div 
          className="exp-card__dot-inner" 
          animate={exp.current ? { scale: [1, 1.4, 1] } : {}}
          transition={exp.current ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
        />
      </div>

      <div 
        className="exp-card__body glass-card"
        onMouseMove={handleMouseMove}
      >
        {/* Header */}
        <div className="exp-card__header">
          <div className="exp-card__company-row">
            <div className="exp-card__icon">
              <FaBriefcase />
            </div>
            <div>
              <h3 className="exp-card__company">{exp.company}</h3>
              <p className="exp-card__role">Role: {exp.role}</p>
            </div>
            {exp.current && <span className="exp-card__badge">Current</span>}
          </div>

          <div className="exp-card__meta">
            <span className="exp-card__meta-item">
              <FaCalendarAlt /> {exp.period}
            </span>
            <span className="exp-card__meta-item">
              <FaMapMarkerAlt /> {exp.location}
            </span>
          </div>
        </div>

        {/* Bullets */}
        <ul className="exp-card__bullets">
          {exp.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              className="exp-card__bullet"
              initial={{ opacity: 0, x: -15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + i * 0.05 + 0.3 }}
              whileHover={{ x: 3 }}
            >
              <span className="exp-card__bullet-dot" />
              {bullet}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="experience" id="experience">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Career Journey</div>
          <h2 className="section-title">Work Experience</h2>
          <div className="accent-bar">
            <span /><span />
          </div>
        </motion.div>

        <div className="experience__timeline" ref={timelineRef}>
          {/* Scroll-Linked Drawing Line */}
          <motion.div
            className="experience__timeline-line"
            style={{ scaleY, transformOrigin: 'top' }}
          />

          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
