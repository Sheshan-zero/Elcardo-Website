import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand-link">
            <img src={logo} alt="Elcardo" className="footer-logo" />
            <span className="footer-brand-name">Elcardo Industries</span>
          </Link>
          <p className="footer-tagline">
            A diversified industrial group powering growth across Sri Lanka — one sector at a time.
          </p>
          <div className="footer-socials">
            <a href="#" className="footer-social" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" className="footer-social" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
            </a>
            <a href="#" className="footer-social" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" className="footer-social" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#041562"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h6>Companies</h6>
          <ul>
            <li><Link to="/roller-gates">Elcardo Roller Gates</Link></li>
            <li><Link to="/#companies">Elcardo Solar</Link></li>
            <li><Link to="/#companies">Elme Battery</Link></li>
            <li><Link to="/#companies">Anilad Hotels</Link></li>
            <li><Link to="/#companies">Vehicle Modification</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h6>Company</h6>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/#projects">Projects</Link></li>
            <li><Link to="/#innovation">Innovation</Link></li>
            <li><Link to="/">News</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h6>Contact</h6>
          <div className="footer-contact-info">
            <p>No. 42, Industrial Zone,<br />Peliyagoda, Colombo,<br />Sri Lanka</p>
            <p>+94 11 234 5678</p>
            <p>info@elcardoindustries.lk</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2024 Elcardo Industries (Pvt) Ltd. All rights reserved.</span>
        <div className="footer-links">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Use</Link>
          <Link to="/">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
