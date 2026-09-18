import { FaWhatsapp, FaEnvelope, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__wave" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#hero" className="footer__logo" onClick={handleScrollTop}>
            <span className="logo-n">N</span>ithin<span className="logo-dot">.</span>
          </a>
          <p className="footer__tagline">Digital Marketing Specialist</p>
        </div>

        <div className="footer__contacts">
          <a href="tel:+971503459193" className="footer__contact-item" id="footer-phone">
            <FaWhatsapp className="footer__contact-icon" />
            +971 50 345 9193
          </a>
          <a href="mailto:nithinkumars618@gmail.com" className="footer__contact-item" id="footer-email">
            <FaEnvelope className="footer__contact-icon" />
            nithinkumars618@gmail.com
          </a>
        </div>

        <div className="footer__socials">
          {/* LinkedIn – commented out
          <a
            href="https://www.linkedin.com/in/hellonickdigital"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label="LinkedIn"
            id="footer-linkedin"
          >
            <FaLinkedinIn />
          </a>
          */}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copy">
            © {year} Nithin Kumar. Made with <FaHeart className="footer__heart" /> All rights reserved.
          </p>
          <a href="#hero" className="footer__back-top" onClick={handleScrollTop} id="footer-back-top">
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
