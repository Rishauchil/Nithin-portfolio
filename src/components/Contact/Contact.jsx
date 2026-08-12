import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send (replace with EmailJS when configured)
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__wave-top" />
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Contact Me</h2>
          <div className="accent-bar"><span /><span /></div>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="contact__info-card glass-card"
              onMouseMove={handleMouseMove}
            >
              <div className="contact__info-items">
                <motion.a 
                  href="tel:+971503459193" 
                  className="contact__info-item" 
                  id="contact-phone"
                  whileHover={{ x: 4, background: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <div className="contact__info-icon">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <p className="contact__info-label">Phone / WhatsApp</p>
                    <p className="contact__info-value">+971 50 345 9193</p>
                  </div>
                </motion.a>

                <motion.a 
                  href="mailto:nithinkumars618@gmail.com" 
                  className="contact__info-item" 
                  id="contact-email"
                  whileHover={{ x: 4, background: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <div className="contact__info-icon">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="contact__info-label">Email</p>
                    <p className="contact__info-value">nithinkumars618@gmail.com</p>
                  </div>
                </motion.a>

                <motion.div 
                  className="contact__info-item"
                  whileHover={{ x: 4, background: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <div className="contact__info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="contact__info-label">Location</p>
                    <p className="contact__info-value">Al Karama, Dubai, UAE</p>
                  </div>
                </motion.div>
              </div>

              <div className="contact__availability">
                <span className="contact__avail-dot" />
                <span>Available for freelance &amp; full-time opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact__form glass-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            id="contact-form"
            onMouseMove={handleMouseMove}
          >
            <div className="contact__form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email-input">Your Email</label>
                <input
                  id="contact-email-input"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="How can I help you?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="btn btn--primary btn-shimmer contact__submit"
              id="contact-submit"
              disabled={status === 'sending' || status === 'sent'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'idle' && <><FaPaperPlane /> Send Message</>}
              {status === 'sending' && <>Sending...</>}
              {status === 'sent' && <>✓ Message Sent!</>}
            </motion.button>

            {status === 'sent' && (
              <p className="contact__success">
                Thanks! I'll get back to you as soon as possible.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
